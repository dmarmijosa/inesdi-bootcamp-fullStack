const Item = require('../models/itemModel');

async function getAllItems() {
    return await Item.find();
}

async function searchItems(query) {
    return await Item.find(query);
}

async function updateItem(query, update, options) {
    return await Item.findOneAndUpdate(query, update, options);
}

async function deleteItems(query) {
    return await Item.deleteMany(query);
}

module.exports = {
    getAllItems,
    searchItems,
    updateItem,
    deleteItems
};
