import dispatcher from "../dispatcher";
import axios from "axios";

export function addSet(workoutId, exerciseIndex) {
    dispatcher.dispatch({
        type: 'ADD_SET',
        workoutId,
        exerciseIndex
    });
}

export function removeSet(workoutId, exerciseIndex, setIndex) {
    dispatcher.dispatch({
        type: 'REMOVE_SET',
        workoutId,
        exerciseIndex,
        setIndex
    });
}

export function updateSet(workoutId, exerciseIndex, setIndex, set) {
    dispatcher.dispatch({
        type: 'UPDATE_SET',
        workoutId,
        exerciseIndex,
        setIndex,
        set
    });
}

export function addExercise(workoutId) {
    dispatcher.dispatch({
        type: 'ADD_EXERCISE',
        workoutId
    });
}

export function removeExercise(workoutId, exerciseIndex) {
    dispatcher.dispatch({
        type: 'REMOVE_EXERCISE',
        workoutId,
        exerciseIndex
    });
}

export function setWorkoutDate(workoutId, date) {
    dispatcher.dispatch({
        type: 'SET_WORKOUT_DATE',
        workoutId,
        date
    });
}

export function updateMovement(workoutId, exerciseIndex, movementId) {
    dispatcher.dispatch({
        type: 'UPDATE_MOVEMENT',
        workoutId,
        exerciseIndex,
        movementId
    });
}

export function createWorkout() {
    dispatcher.dispatch({
        type: 'CREATE_WORKOUT'
    });
}

export function removeWorkout(workoutId) {
    dispatcher.dispatch({
        type: 'REMOVE_WORKOUT',
        workoutId: workoutId
    });
}

export function fetchWorkouts() {
    axios.get('/training/workouts')
    .then(response => {
        dispatcher.dispatch({
            type: 'FETCH_WORKOUTS',
            workouts: response.data
        })
    });
}

export function fetchMovements() {
    axios.get('/training/movements')
    .then(response => {
        dispatcher.dispatch({
            type: 'FETCH_MOVEMENTS',
            movements: response.data
        });
    });
}

export function saveWorkout(workout) {
    axios.post('/training/workout', {
        workout
    }).then(response => {
        dispatcher.dispatch({
            type: 'WORKOUT_SAVED',
            response
        });
    });
}