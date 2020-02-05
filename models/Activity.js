const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }
    },
});

module.exports = Activity = mongoose.model('activity', ActivitySchema);