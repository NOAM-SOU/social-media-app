const userModel = require("../models/user");

const create = async (user) => {
  return await userModel.create(user);
};

const read = async (filter, proj) => {
  return await userModel.find(filter, proj);
};

const readOne = async (filter, proj) => {
  return await userModel.findOne(filter, proj);
};

const update = async (id, who, updated, number) => {
  return await userModel.findOneAndUpdate(
    { _id: id },
    { $push: { [who]: updated }, $inc: { [number]: 1 } },
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

const updateUser = async (userId, field, postId, number) => {
  return await userModel.findByIdAndUpdate(
    userId,
    {
      $pull: {
        [field]: postId,
      },

      $inc: {
        [number]: -1,
      },
    },
    {
      new: true,
    }
  );
};

const readAndNestedPopulate = async (userId, path, model, path2, by, limit) => {
  return await userModel.findOne({ _id: userId }).populate({
    path: path,
    populate: {
      path: path2,
      model: model,
    },
  });
};

const readAndPopulate = (userId, path, model) => {
  const user = userModel.findOne({ _id: userId });
  return user.populate({
    path: path,
    model: model,
  });
};

module.exports = {
  create,
  read,
  readOne,
  update,
  del,
  readAndPopulate,
  updateUser,
  readAndNestedPopulate,
};
