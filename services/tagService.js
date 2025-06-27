const Tag = require('../db/models/Tag');

const getTags = async () => {
    return await Tag.find();
}
const createTag = async (name) => {
    const newTag = new Tag({ name });
    return await newTag.save();
};
const getTagByName = async (name) => {
    return await Tag.findOne({ name });
}

module.exports = {
    getTags,
    createTag,
    getTagByName
};