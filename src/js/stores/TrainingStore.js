import {EventEmitter} from "events";
import uuid from "uuid";
import dispatcher from "../dispatcher";
import * as TrainingActions from "../actions/TrainingActions";

class TrainingStore extends EventEmitter {
    constructor() {
        super();

        this.workouts = [];
        this.movements = [];
        this.alert = {
            style: 'info',
            text: 'Workout Exists',
            show: false
        };

        TrainingActions.fetchWorkouts();
        TrainingActions.fetchMovements();
    }

    getAlert() {
        return this.alert;
    }

    alertWorkoutSaved(response) {
        if (response.data.ok) {
            this.alert = {
                style: "success",
                text: "Workout Saved",
                show: true
            };
        } else {
            this.alert = {
                style: "danger",
                text: "Workout Could Not Be Saved",
                show: true
            };
        }
        
        this.setAlertTimer();
        this.emit('change');
    }

    setAlertTimer() {
        setTimeout(() => {
            this.clearAlert();
        }, 5000);
    }

    clearAlert() {
        this.alert.show = false;
        this.emit('change');
    }

    getMovements() {
        return this.movements;
    }

    getWorkouts() {
        return this.workouts;
    }

    getWorkout(id) {
        var workout = this.workouts.find(x => x._id === id);
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

    addSet(workoutId, exerciseIndex) {
        var exercise = this.getExercise(workoutId, exerciseIndex);

        if (exercise) {
            exercise.sets.push(new ExerciseSet());
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
            movement: this.movements[0]._id,
            sets: [new ExerciseSet()]
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
        exercise.movement = this.movements.find(a => a._id === movementId);
        this.emit('change');
    }

    createWorkout() {
        var workout = new Workout();
        this.workouts.push(workout);
        this.emit('change');
    }

    removeWorkout(workoutId) {
        var index = this.workouts.findIndex(a => a.workoutId === workoutId);
        this.workouts.splice(index, 1);
        this.emit('change');
    }

    setMovements(movements) {
        this.movements = movements;
        this.emit('change');
    }

    setWorkouts(workouts) {
        this.workouts = workouts;
        this.emit('change');
    }

    setWorkoutDate(workoutId, date) {
        this.getWorkout(workoutId).date = date;
        this.emit('change');
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
            case 'CREATE_WORKOUT':
                this.createWorkout();
                break;
            case 'REMOVE_WORKOUT':
                this.removeWorkout(action.workoutId);
                break;
            case 'FETCH_WORKOUTS':
                this.setWorkouts(action.workouts);
                break;
            case 'FETCH_MOVEMENTS':
                this.setMovements(action.movements);
                break;
            case 'WORKOUT_SAVED':
                this.alertWorkoutSaved(action.response);
                break;
            case 'SET_WORKOUT_DATE':
                this.setWorkoutDate(action.workoutId, action.date);
                break;
        }
    }
}

class ExerciseSet {
    constructor(reps = 0, weight = 0, unit = 'lbs') {
        this.reps = reps;
        this.weight = weight;
        this.unit = unit;
    }
}

class Exercise {
    constructor(movement) {
        this.movement = movement;
        this.sets = [new ExerciseSet()];
    }
}

class Workout {
    constructor(id = uuid.v4(), date = new Date()) {
        this.id = id;
        this.date = date.toJSON();
        this.exercises = [];
    }
}

const trainingStore = new TrainingStore();
dispatcher.register(trainingStore.handleActions.bind(trainingStore));

export default trainingStore;