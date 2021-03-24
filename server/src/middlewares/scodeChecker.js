import Response from "../helpers/Response";
import { users, published_docs, comments } from "../db/models";
import HttpStatus from "http-status";
import Sequelize from "sequelize";

const Op = Sequelize.Op;

export const accountExist = async (req, res, next) => {
  const { email } = req.body;
  const user = await users.findOne({ where: { email } });
  if (user) {
    return Response.errorMessage(res, "Email address already exists", 409);
  }
  next();
};

export const docsExists = async (req, res, next) => {
  const { id } = req.params;
  const doc = await published_docs.findOne({
    where: { id },
  });
  if (!doc) {
    return Response.errorMessage(
      res,
      "Doc with the provided ID does not exist",
      HttpStatus.NOT_FOUND
    );
  }
  next();
};

export const commentExists = async (req, res, next) => {
  const { commentId } = req.params;
  const comment = await comments.findOne({
    where: { id: commentId },
  });
  if (!comment) {
    return Response.errorMessage(
      res,
      "Comment with the provided ID does not exist",
      HttpStatus.NOT_FOUND
    );
  }
  next();
};

export const isOwner = async (req, res, next) => {
  const {
    params: { id: docId },
    user: { id: userId, role },
  } = req;
  const doc = await published_docs.findOne({
    where: { id: docId, publisher: userId },
  });
  // Check if it's the owner of doc or Admin
  if (!doc && role !== 1) {
    return Response.errorMessage(
      res,
      "Unable to process your request. Please make sure it's your resource",
      HttpStatus.FORBIDDEN
    );
  }
  next();
};

export const userExists = async (req, res, next) => {
  const { userId: id } = req.body;
  const user = await users.findOne({ where: { id } });
  if (!user) {
    return Response.errorMessage(
      res,
      "User with the provided ID does not exist",
      HttpStatus.NOT_FOUND
    );
  }
  next();
};
