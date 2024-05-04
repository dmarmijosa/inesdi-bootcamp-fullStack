const mongoose = require('../database/database');

const itemSchema = new mongoose.Schema({
    first_name: { type: String, required: true }, 
    last_name: String,
    email: { type: String, required: true, unique: true }, 
    gender: { type: String, required: true }, 
    address: {
        city: String,
        state: String,
        country: String,
        country_code: String
    },
    card: {
        card_number: String,
        card_type: String,
        currency_code: String,
        balance: String
    },
    married_status: Boolean
}, { collection: 'mycollection' });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
