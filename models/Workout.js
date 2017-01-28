const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const setSchema = new Schema({
                reps: { type: Number, required: true },
                weight: { type: Number, required: true},
                unit: { type: String, required: true}
            });

const exerciseSchema = new Schema({
            movement: { type: Schema.Types.ObjectId, ref: 'Movement', required: true },
            sets: [setSchema]
        });

const workoutSchema = new Schema({
    date: { type: Date, required: true },
    exercises: [exerciseSchema]
});

module.exports = mongoose.model('Workout', workoutSchema);