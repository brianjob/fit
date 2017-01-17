import dispatcher from "../dispatcher";

export function addSet(workoutId, movement) {
    dispatcher.dispatch({
        type: 'ADD_SET',
        workoutId,
        movement
    });
}

export function removeSet(workoutId, movement, setIndex) {
    dispatcher.dispatch({
        type: 'REMOVE_SET',
        workoutId,
        movement,
        setIndex
    });
}

export function updateSet(workoutId, movement, setIndex, set) {
    dispatcher.dispatch({
        type: 'UPDATE_SET',
        workoutId,
        movement,
        setIndex,
        set
    });
}