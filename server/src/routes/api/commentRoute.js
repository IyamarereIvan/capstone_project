import express from "express";
import Validator from "../../middlewares/Validator";
import { docsExists, isOwner, commentExists } from "../../middlewares/scodeChecker";
import CommentController from "../../controllers/CommentController";
import verifyAccess from "../../middlewares/verifyAccess";
import verifyToken from "../../middlewares/verifyToken";

const commentRoute = express.Router();

// add new comment
commentRoute.post(
  "/docs/:id",
  Validator.newCommentRules(),
  Validator.validateInput,
  verifyToken,
  CommentController.addNewComment
);

// Get all available doc comments
commentRoute.get("/docs/:id", CommentController.getAllComments);

// Get specific doc comment
commentRoute.get(
  "/docs/:id/comment/:commentId",
  verifyToken,
  docsExists,
  commentExists,
  CommentController.getSpecificComment
);

// Delete a specific doc comment
commentRoute.delete(
  "/docs/:id/comment/:commentId",
  verifyToken,
  docsExists,
  commentExists,
  isOwner,
  CommentController.deleteComment
);

export default commentRoute;
