const TagsService = require('../services/tagsService');

const getTags = async (req, res) => {
    try {
        const tags = await TagsService.getTags();
        return res.status(200).json({
        method: "getTags",
        message: "Tags retrieved successfully",
        tags: tags,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
        method: "getTags",
        message: "Internal Server Error",
        });
    }
}

const createTag = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                method: "createTag",
                message: "Tag name is required",
            });
        }
        tag = await TagsService.getTagByName(name);
        if (tag) {
            return res.status(400).json({
                method: "createTag",
                message: "Tag already exists",
            });
        }
        const tag = await TagsService.createTag(name);
        return res.status(201).json({
            method: "createTag",
            message: "Tag created successfully",
            tag: tag,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            method: "createTag",
            message: "Internal Server Error",
        });
    }
}

const getTagByName = async (req, res) => {
    try {
        const { name } = req.params;
        const tag = await TagsService.getTagByName(name);

        if (!tag) {
            return res.status(404).json({
                method: "getTagByName",
                message: "Tag not found",
            });
        }

        return res.status(200).json({
            method: "getTagByName",
            message: "Tag details retrieved successfully",
            tag: tag,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            method: "getTagByName",
            message: "Internal Server Error",
        });
    }
}

module.exports = {
    getTags,
    createTag,
    getTagByName
};
