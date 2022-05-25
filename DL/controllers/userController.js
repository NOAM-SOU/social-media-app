const userModel = require("../models/user");
const ObjectId = require("mongoose").Types.ObjectId;

const create = async (user) => {
  return await userModel.create(user);
};

const read = async (filter, proj) => {
  return await userModel.find(filter, proj);
};

const readOne = async (filter, proj) => {
  return await userModel.findOne(filter, proj);
};

const update = async (id, who, updated) => {
  return await userModel.findOneAndUpdate(
    { _id: id },
    { $push: { [who]: updated } },
    { new: true }
  );
};

const del = async (id) => {
  return await userModel.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
};

module.exports = { create, read, readOne, update, del, readAndCheckIfExist };
