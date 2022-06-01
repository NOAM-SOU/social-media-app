// @ts-check

/**
 * @param {array} array
 */

const filterFunc = (array) => {
  const filter = array.map((e) => {
    return {
      comment: e.content,
      user: e.userId,
    };
  });
  return filter;
};

module.exports = { filterFunc };
