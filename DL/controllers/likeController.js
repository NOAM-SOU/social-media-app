const likeModel = require("../models/like");

const create = async (comment) => {
  return await likeModel.create(comment);
};

const read = async (filter, proj) => {
  return await likeModel.find(filter, proj);
};

const del = async (id) => {
  return await likeModel.findOneAndRemove(id);
};

module.exports = { create, read, del };
