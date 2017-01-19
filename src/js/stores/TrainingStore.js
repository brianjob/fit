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
                        "id": 0,
                        "name": "low bar back squat",
                    },
                    "rest_minutes": 1.5,
                    "sets": [
                        {
                            "weight": 315,
                            "unit": "lbs",
                            "reps": 1
                        },
                        {
                            "weight": 315,
                            "unit": "lbs",
                            "reps": 2
                        },
                        {
                            "weight": 315,
                            "unit": "lbs",
                            "reps": 3
                        },
                        {
                            "weight": 315,
                            "unit": "lbs",
                            "reps": 4
                        }
                    ]
                },
                {
                    "movement": {
                        "id": 2,
                        "name": "bench press"   
                    },
                    "rest_minutes": 1.5,
                    "sets": [
                        {
                            "weight": 135,
                            "unit": "lbs",
                            "reps": 5
                        },
                        {
                            "weight": 135,
                            "unit": "lbs",
                            "reps": 5
                        },
                        {
                            "weight": 135,
                            "unit": "lbs",
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
                            "weight": 320,
                            "unit": "lbs",
                            "reps": 5
                        },
                        {
                            "weight": 320,
                            "unit": "lbs",
                            "reps": 5
                        },
                        {
                            "weight": 320,
                            "unit": "lbs",
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
                            "weight": 120,
                            "unit": "lbs",
                            "reps": 5
                        },
                        {
                            "weight": 120,
                            "unit": "lbs",
                            "reps": 5
                        },
                        {
                            "weight": 120,
                            "unit": "lbs",
                            "reps": 5
                        }
                    ]
                }
            ]
        }];

        this.movements = [
        {
            id: 0,
            name: "low bar back squat",
        },
        {
            id: 1,
            name: "high bar back squat"
        },
        {
            id: 2,
            name: "bench press"
        },
        {
            id: 3,
            name: "overhead press"
        },
        {
            id: 4,
            name: "deadlift"
        },
        {
            id: 5,
            name: "power clean"
        }
    ];
    }

    getMovements() {
        return this.movements;
    }

    getWorkouts() {
        return this.workouts;
    }

    getWorkout(id) {
        var workout = this.workouts.find(x => x.id === id);
        return workout;
    }

    getExercise(workoutId, exerciseIndex) {
        var exercise = this.getWorkout(workoutId).exercises[exerciseIndex];
        return exercise;
    }

    getSet(workoutId, exerciseIndex, setIndex) {
        var set = this.getExercise(workoutId, exerciseIndex).sets[setIndex];
        return set;
    }

    createWorkout(workout) {
        this.workouts.push(workout);
        this.emit('change');
    }

    addSet(workoutId, exerciseIndex) {
        var exercise = this.getExercise(workoutId, exerciseIndex);

        if (exercise) {
            exercise.sets.push({
                reps: 0,
                weight: 0,
                unit: 'lbs'
            });

            this.emit('change');
        }
    }

    removeSet(workoutId, exerciseIndex, setIndex) {
        var exercise = this.getExercise(workoutId, exerciseIndex);
        exercise.sets.splice(setIndex, 1);
        this.emit('change');
    }

    updateSet(workoutId, exerciseIndex, setIndex, set) {
        var exercise = this.getExercise(workoutId, exerciseIndex);
        exercise.sets.splice(setIndex, 1, set);
        this.emit('change');
    }

    addExercise(workoutId) {
        var exercise = {
            movement: this.movements[0],
            sets: [{
                reps: 0,
                weight: 0,
                unit: 'lbs'
            }]
        };

        var workout = this.getWorkout(workoutId);
        workout.exercises.push(exercise);
        this.emit('change');
    }

    removeExercise(workoutId, exerciseIndex) {
        this.getWorkout(workoutId).exercises.splice(exerciseIndex, 1);
        this.emit('change');
    }

    updateMovement(workoutId, exerciseIndex, movementId) {
        var exercise = this.getExercise(workoutId, exerciseIndex);
        exercise.movement = this.movements.find(a => a.id === movementId);
    }

    handleActions(action) {
        console.log('received action: ', action);

        switch(action.type) {
            case 'ADD_SET':
                this.addSet(action.workoutId, action.exerciseIndex);
                break;
            case 'REMOVE_SET':
                this.removeSet(action.workoutId, action.exerciseIndex, action.setIndex);
                break;
            case 'UPDATE_SET':
                this.updateSet(action.workoutId, action.exerciseIndex, action.setIndex, action.set);
                break;
            case 'ADD_EXERCISE':
                this.addExercise(action.workoutId);
                break;
            case 'REMOVE_EXERCISE':
                this.removeExercise(action.workoutId, action.exerciseIndex);
                break;
            case 'UPDATE_MOVEMENT':
                this.updateMovement(action.workoutId, action.exerciseIndex, action.movementId);
                break;
            default:
                throw new Error('Unknown action type');
                break;
        }
    }
}

const trainingStore = new TrainingStore();
dispatcher.register(trainingStore.handleActions.bind(trainingStore));

export default trainingStore;