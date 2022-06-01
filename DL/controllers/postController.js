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

const del = async (id) => {
  return await postModel.findOneAndRemove(id);
};

const addUpdate = async (id, who, updated, number) => {
  return await postModel.findOneAndUpdate(
    { _id: id },
    { $inc: { [number]: 1 }, $push: { [who]: updated } },
    { new: true }
  );
};

const removeUpdate = async (postId, userId, field, number) => {
  return await postModel.findByIdAndUpdate(
    postId,
    {
      $pull: {
        [field]: userId,
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

const readAndNestedPopulate = async (postId, path, model, path2, by, limit) => {
  return await postModel.findOne({ _id: postId }).populate({
    path: path,
    populate: {
      path: path2,
      model: model,
    },
  });
};

const readAndPopulate = async (postId, popu) => {
  return await postModel.findOne({ _id: postId }).populate(popu);
};

const readAndSort = () => {
  return postModel.find().sort({ createdAt: -1 }).limit(2);
};

module.exports = {
  create,
  read,
  readOne,
  addUpdate,
  del,
  removeUpdate,
  readAndNestedPopulate,
  readAndPopulate,
  readAndSort,
};
