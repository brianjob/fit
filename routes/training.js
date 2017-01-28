const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const Movement = require('../models/Movement');

router.get('/workouts', (req, res) => {
    Workout.find({}, (err, workouts) => {
        res.json(workouts);
    });
});

router.get('/workout/:id', (req, res) => {
    const id = req.params.id;
    Workout.findById(id, function(err, data) {
        res.json(data);
    });
});

router.post('/workout', (req, res) => {
    if (req.body.workout._id) {
        var promise = Workout.update(req.body.workout);
    } else {
        var promise = Workout.create(req.body.workout);
    }

    promise.then(workout => {
        res.json(workout)
    }).catch(err => {
        console.error(err);
        res.json(err);  
    });
});

router.get('/movements', (req, res) => {
    Movement.find({}, (err, data) => {
        res.json(data);
    });
});

module.exports = router;