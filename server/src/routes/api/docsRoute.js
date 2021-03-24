import express from "express";
import Validator from "../../middlewares/Validator";
import { docsExists, isOwner } from "../../middlewares/scodeChecker";
import DocController from "../../controllers/DocController";
import verifyAccess from "../../middlewares/verifyAccess";
import verifyToken from "../../middlewares/verifyToken";

const docsRoute = express.Router();

// add docs
docsRoute.post(
  "/add",
  Validator.newDocRules(),
  Validator.validateInput,
  verifyToken,
  DocController.addDoc
);

// Get all available docs
docsRoute.get("/", DocController.getAllDocs);

// Get specific doc
docsRoute.get("/:id", docsExists, verifyToken, DocController.getSpecificDoc);

// Edit specific doc
docsRoute.patch(
  "/:id",
  verifyToken,
  Validator.newDocRules(),
  Validator.validateInput,
  docsExists,
  isOwner,
  DocController.updateDoc
);

// Delete a specific doc
docsRoute.delete(
  "/:id",
  verifyToken,
  docsExists,
  isOwner,
  DocController.deleteDoc
);

export default docsRoute;
