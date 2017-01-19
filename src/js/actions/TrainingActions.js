import dispatcher from "../dispatcher";

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

export function updateMovement(workoutId, exerciseIndex, movementId) {
    dispatcher.dispatch({
        type: 'UPDATE_MOVEMENT',
        workoutId,
        exerciseIndex,
        movementId
    });
}