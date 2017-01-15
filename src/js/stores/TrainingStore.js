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
                            "reps": 5
                        },
                        {
                            "weight": {
                                "magnitude": 315,
                                "unit": "lbs"
                            },
                            "reps": 5
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
        return this.workouts.find(x => x.id === id);
    }

    getExercise({workoutId, movement}) {
        return this.getWorkout(workoutId).exercises.find(x => x.movement.name === movement);
    }

    getSet({workoutId, movement, setIndex}) {
        return this.getExercise({workoutId, movement})[setIndex];
    }

    createWorkout(workout) {
        this.workouts.push(workout);
        this.emit('change');
    }

    addSet({workoutId, movement}) {
        var exercise = this.getExercise({workoutId, movement});

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

    updateSet({workoutId, movement, setIndex, set}) {
        var s = this.getSet({workoutId, movement, setIndex});
        s = set;
    }

    handleActions(action) {
        console.log('received action: ', action);

        switch(action.type) {
            case ('ADD_SET'):
                this.addSet({workoutId: action.workoutId, movement: action.movement});
                break;
            default:
                break;
        }
    }
}

const trainingStore = new TrainingStore();

dispatcher.register(trainingStore.handleActions.bind(trainingStore));
window.dispatcher = dispatcher;
export default trainingStore;