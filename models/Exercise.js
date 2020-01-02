const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = Exercise = mongoose.model('exercise', ExerciseSchema);