import { v4 as uuid } from "uuid";
import { users, published_docs } from "../db/models";
import Queries from "./Queries";
import Sequelize from "sequelize";

const Op = Sequelize.Op;

class DocService {
  /**
   * User add new doc
   * @static
   * @param {object} req  request object
   * @memberof DocService
   * @returns {object} data
   */
  static async addDoc(req) {
    const { title, description, isVisible, publishedAt, docUrl } = req.body;
    const newDocObject = {
      title,
      description,
      publisher: req.user.id,
      publishedAt,
      docUrl,
      is_visible: isVisible || true,
    };
    const newDoc = await Queries.create(published_docs, newDocObject);
    return newDoc;
  }

  /**
   * Get all available docs
   * @static
   * @param {object} req  request object
   * @memberof DocsService
   * @returns {object} data
   */
  static async getAllDocs(req) {
    const allDocs = await Queries.findAll(published_docs, {
      include: [
        {
          model: users,
          as: "docPublisher",
          attributes: ["firstName", "lastName", "email", "phone"],
        },
      ],
    });
    return allDocs;
  }

  /**
   * Get a specific doc
   * @static
   * @param {object} req  request object
   * @memberof DocsService
   * @returns {object} data
   */
  static async getSpecificDoc(req) {
    const doc = await Queries.findOne(published_docs, {
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: users,
          as: "docPublisher",
          attributes: ["firstName", "lastName", "email", "phone"],
        },
      ],
    });
    return doc;
  }

  /**
   * Update a specific doc
   * @static
   * @param {object} req  request object
   * @memberof publishedDoc
   * @returns {object} data
   */
  static async updateDoc(req) {
    const { id } = req.params;
    const { title, description, isVisible, publishedAt, docUrl } = req.body;
    const updatedDoc = [
      { title, description, isVisible, publishedAt, docUrl },
      {
        where: { id },
        plain: true,
        returning: true,
      },
    ];
    const updatedDocResult = await Queries.update(published_docs, updatedDoc);
    return updatedDocResult;
  }


  /**
   * Delete a specific docs
   * @static
   * @param {object} req  request object
   * @memberof DocService
   * @returns {object} data
   */
  static async deleteDoc(req) {
    const { id } = req.params;
    const deletedDoc = await Queries.destroy(published_docs, {
      where: { id },
    });
    return deletedDoc;
  }
}
export default DocService;
