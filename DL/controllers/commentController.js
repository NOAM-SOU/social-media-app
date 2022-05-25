const commentModel = require("../models/user");

const create = async (comment) => {
  return await commentModel.create(comment);
};

const read = async (filter, proj) => {
  return await commentModel.find(filter, proj);
};

const readOne = async (filter, proj) => {
  return await commentModel.findOne(filter, proj);
};

const update = async (id, newPost) => {
  return await commentModel.findOneAndUpdate(id, newPost, { new: true });
};

const del = async (id) => {
  return await commentModel.findOneAndRemove(id);
};

module.exports = { create, read, readOne, update, del };
