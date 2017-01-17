import {EventEmitter} from "events";
import dispatcher from "../dispatcher";

class TrainingStore extends EventEmitter {
    constructor() {
        console.log('constructor');
        super();

        this.workouts = [
        {
            "id": "8d2b699a-d96f-470a-b56b-a9790fa0617b",
            "date": "2017-01-11T17:00:00.000Z",
            "exercises": [
                {
                    "movement": {
                        "name": "low bar back squat"
                    },
                    "rest_minutes": 1.5,
                    "sets": [
                        {
                            "weight": {
                                "magnitude": 315,
                                "unit": "lbs"
                            },
                            "reps": 1
                        },
                        {
                            "weight": {
                                "magnitude": 315,
                                "unit": "lbs"
                            },
                            "reps": 2
                        },
                        {
                            "weight": {
                                "magnitude": 315,
                                "unit": "lbs"
                            },
                            "reps": 3
                        },
                        {
                            "weight": {
                                "magnitude": 315,
                                "unit": "lbs"
                            },
                            "reps": 4
                        }
                    ]
                },
                {
                    "movement": {
                        "name": "bench press"   
                    },
                    "rest_minutes": 1.5,
                    "sets": [
                        {
                            "weight": {
                                "magnitude": 135,
                                "unit": "lbs"
                            },
                            "reps": 5
                        },
                        {
                            "weight": {
                                "magnitude": 135,
                                "unit": "lbs"
                            },
                            "reps": 5
                        },
                        {
                            "weight": {
                                "magnitude": 135,
                                "unit": "lbs"
                            },
                            "reps": 5
                        }
                    ]
                }
            ]
        },
        {
            "id": "7c507166-1a1e-4997-a434-a312f70d6536",
            "date": "2017-01-01T17:00:00.000Z",
            "exercises": [
                {
                    "movement": {
                        "name": "low bar back squat"
                    },
                    "rest_minutes": 1.5,
                    "sets": [
                        {
                            "weight": {
                                "magnitude": 320,
                                "unit": "lbs"
                            },
                            "reps": 5
                        },
                        {
                            "weight": {
                                "magnitude": 320,
                                "unit": "lbs"
                            },
                            "reps": 5
                        },
                        {
                            "weight": {
                                "magnitude": 320,
                                "unit": "lbs"
                            },
                            "reps": 5
                        }
                    ]
                },
                {
                    "movement": {
                        "name": "overhead press"   
                    },
                    "rest_minutes": 1.5,
                    "sets": [
                        {
                            "weight": {
                                "magnitude": 120,
                                "unit": "lbs"
                            },
                            "reps": 5
                        },
                        {
                            "weight": {
                                "magnitude": 120,
                                "unit": "lbs"
                            },
                            "reps": 5
                        },
                        {
                            "weight": {
                                "magnitude": 120,
                                "unit": "lbs"
                            },
                            "reps": 5
                        }
                    ]
                }
            ]
        }];
    }

    getWorkouts() {
        return this.workouts;
    }

    getWorkout(id) {
        var workout = this.workouts.find(x => x.id === id);
        return workout;
    }

    getExercise(workoutId, movement) {
        var exercise = this.getWorkout(workoutId).exercises.find(x => x.movement.name === movement);
        return exercise;
    }

    getSet(workoutId, movement, setIndex) {
        var set = this.getExercise(workoutId, movement).sets[setIndex];
        return set;
    }

    createWorkout(workout) {
        this.workouts.push(workout);
        this.emit('change');
    }

    addSet(workoutId, movement) {
        var exercise = this.getExercise(workoutId, movement);

        if (exercise) {
            exercise.sets.push({
                reps: 0,
                weight: {
                    magnitude: 0,
                    unit: 'lbs'
                }
            });

            this.emit('change');
        }
    }

    removeSet(workoutId, movement, setIndex) {
        var exercise = this.getExercise(workoutId, movement);
        exercise.sets.splice(setIndex, 1);
        this.emit('change');
    }

    updateSet(workoutId, movement, setIndex, set) {
        var exercise = this.getExercise(workoutId, movement);
        exercise.sets.splice(setIndex, 1, set);
        this.emit('change');
    }

    handleActions(action) {
        console.log('received action: ', action);

        switch(action.type) {
            case 'ADD_SET':
                this.addSet(action.workoutId, action.movement);
                break;
            case 'REMOVE_SET':
                this.removeSet(action.workoutId, action.movement, action.setIndex);
                break;
            case 'UPDATE_SET':
                this.updateSet(action.workoutId, action.movement, action.setIndex, action.set);
                break;
            default:
                break;
        }
    }
}

const trainingStore = new TrainingStore();
dispatcher.register(trainingStore.handleActions.bind(trainingStore));

export default trainingStore;