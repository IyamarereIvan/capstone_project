import { v4 as uuid } from "uuid";
import TokenAuthenticator from "../helpers//TokenAuthenticator";
import Response from "../helpers/Response";
import httpStatus from "http-status";
import CommentService from "../services/CommentService";

class CommentController {
  static async addNewComment(req, res) {
    const newComment = await CommentService.addNewComment(req);
    const newCommentData = newComment.dataValues;
    Response.successMessage(
      res,
      "Comment has been added successfully!",
      newCommentData,
      httpStatus.CREATED
    );
  }

    static async getAllComments(req, res) {
    const comments = await CommentService.getAllComments(req);
    Response.successMessage(
      res,
      "All docs comments have been retrieved successfully!",
      comments,
      httpStatus.OK
    );
  }

  static async getSpecificComment(req, res) {
    const comment = await CommentService.getSpecificComment(req);
    Response.successMessage(
      res,
      "Doc comment has been retrieved successfully!",
      comment,
      httpStatus.OK
    );
  }


  static async deleteComment(req, res) {
    const deletedComment = await CommentService.deleteComment(req);
    Response.successMessage(
      res,
      "Doc comment has been deleted successfully!",
      deletedComment,
      httpStatus.OK
    );
  }
}
export default CommentController;
