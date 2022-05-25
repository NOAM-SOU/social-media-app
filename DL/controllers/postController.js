const postModel = require("../models/post");

const create = async (post) => {
  return await postModel.create(post);
};

const read = async (filter, proj) => {
  return await postModel.find(filter, proj);
};

const readOne = async (filter, proj) => {
  return await postModel.findOne(filter, proj);
};

const update = async (id, who, updated, number) => {
  return await postModel.findOneAndUpdate(
    { _id: id },
    { $inc: { [number]: 1 }, $push: { [who]: updated } },
    { new: true }
  );
};

const del = async (id) => {
  return await postModel.findOneAndRemove(id);
};

module.exports = { create, read, readOne, update, del, readAndCheckIfExist };
