const mongoose = require("mongoose");
const File = require("../models/fileModel");

const ensureIndexes = async () => {
    try {
        const indexes = await File.listIndexes();
        const conflictingIndex = indexes.find(index =>
            index.name === "name_text_description_text_tags_text_content_text"
        );

        if (conflictingIndex) {
            console.log("Dropping conflicting index:", conflictingIndex.name);
            await File.collection.dropIndex(conflictingIndex.name);
        }

        await File.collection.createIndex(
            { name: "text", description: "text", tags: "text", content: "text" },
            { default_language: "none", language_override: "none", background: true, weights: { content: 1, description: 1, name: 1, tags: 1 } }
        );

        console.log("Index created successfully");
    } catch (error) {
        console.error("Error ensuring indexes:", error);
    }
};

module.exports = ensureIndexes;
