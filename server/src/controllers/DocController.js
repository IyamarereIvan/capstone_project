import { v4 as uuid } from "uuid";
import TokenAuthenticator from "../helpers//TokenAuthenticator";
import Response from "../helpers/Response";
import httpStatus from "http-status";
import DocService from "../services/DocService";

class DocController {
  static async addDoc(req, res) {
    const newDoc = await DocService.addDoc(req);
    const newDocData = newDoc.dataValues;
    Response.successMessage(
      res,
      "Document has been added successfully!",
      newDocData,
      httpStatus.CREATED
    );
  }

  static async getSpecificDoc(req, res) {
    const doc = await DocService.getSpecificDoc(req);
    Response.successMessage(
      res,
      "Doc has been retrieved successfully!",
      doc,
      httpStatus.OK
    );
  }

  static async getAllDocs(req, res) {
    const allDocs = await DocService.getAllDocs(req);
    Response.successMessage(
      res,
      "Docs have been retrieved successfully!",
      allDocs,
      httpStatus.OK
    );
  }


  static async updateDoc(req, res) {
    const newDoc = await DocService.updateDoc(req);
    const newDocData = newDoc.dataValues;
    Response.successMessage(
      res,
      "Doc has been updated successfully!",
      newDocData,
      httpStatus.OK
    );
  }


  static async deleteDoc(req, res) {
    const deletedDoc = await DocService.deleteDoc(req);
    Response.successMessage(
      res,
      "Doc has been deleted successfully!",
      deletedDoc,
      httpStatus.OK
    );
  }
}
export default DocController;
