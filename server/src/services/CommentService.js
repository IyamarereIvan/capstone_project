import { v4 as uuid } from "uuid";
import { users, published_docs, comments } from "../db/models";
import Queries from "./Queries";
import Sequelize from "sequelize";

const Op = Sequelize.Op;

class CommentService {
  /**
   * User add new doc
   * @static
   * @param {object} req  request object
   * @memberof CommentService
   * @returns {object} data
   */
  static async addNewComment(req) {
    const { description, isVisible } = req.body;
    const newCommentObj = {
      description,
      publishedDocId: req.params.id, 
      userId: req.user.id,
      isVisible: isVisible || true,
    };
    const newComment = await Queries.create(comments, newCommentObj);
    return newComment;
  }

    /**
     * Get all available domments
     * @static
     * @param {object} req  request object
     * @memberof CommentService
     * @returns {object} data
     */
    static async getAllComments(req) {
      const allComments = await Queries.findAll(comments, {
        Where:{ publishedDocId: req.params.id},
        include: [
          {
            model: users,
            attributes: ["firstName", "lastName", "email", "phone"],
          },
        ],
      });
      return allComments;
    }

    /**
     * Get a specific comment
     * @static
     * @param {object} req  request object
     * @memberof CommentService
     * @returns {object} data
     */
    static async getSpecificComment(req) {
      const doc = await Queries.findOne(comments, {
        where: {
          id: req.params.commentId,
          publishedDocId : req.params.id
        },
        include: [
          {
            model: users,
            attributes: ["firstName", "lastName", "email", "phone"],
          },
        ],
      });
      return doc;
    }


    /**
     * Delete a specific comment
     * @static
     * @param {object} req  request object
     * @memberof CommentService
     * @returns {object} data
     */
    static async deleteComment(req) {
      const { commentId } = req.params;
      const deletedDoc = await Queries.destroy(comments, {
        where: { id: commentId },
      });
      return deletedDoc;
    }
}
export default CommentService;
