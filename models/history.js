const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    body: String
}, {timestamps: true});

const History = mongoose.model('History',historySchema);

module.exports = History;