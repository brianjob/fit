import React from "react";
import {Button, Col, Panel, ListGroup, ListGroupItem } from "react-bootstrap";
import TrainingStore from "../../stores/TrainingStore";
import * as TrainingActions from "../../actions/TrainingActions";
import { Typeahead } from "react-bootstrap-typeahead";
import ExerciseSet from "./ExerciseSet";

export default class Exercise extends React.Component {
    constructor(props) {
        super();

        this._movements = TrainingStore.getMovements().map(x => { return { label: x.name, id: x.id}});
    }

    addSet() {
        TrainingActions.addSet(
            this.props.workoutId,
            this.props.exerciseIndex
        );
    }

    updateMovement(selections) {
        if (selections.length > 0) {
            TrainingActions.updateMovement(
                this.props.workoutId,
                this.props.exerciseIndex,
                selections[0].id
            );
        }
    }

    removeExercise() {
        TrainingActions.removeExercise(
            this.props.workoutId,
            this.props.exerciseIndex
        );
    }

    render() {
        const removeExerciseButton = (
            <Button bsClass="btn-link" bsSize="xsmall" onClick={ this.removeExercise.bind(this) }>
                Remove Exercise
            </Button>);

        const addSetButton = (
            <Button bsClass="btn-link pull-right" bsSize="xsmall" onClick={this.addSet.bind(this)}>
            Add Set
            </Button>);

        const header = (<Typeahead selected={[ this._movements.find(a => a.id === this.props.exercise.movement.id)]} 
                                   allowNew={false} 
                                   options={this._movements} 
                                   onChange={this.updateMovement.bind(this)}/>);

        const sets = this.props.exercise.sets.map((x,i) => (<ExerciseSet set={x} 
                                                                         key={i} 
                                                                         workoutId={this.props.workoutId}
                                                                         exerciseIndex={this.props.exerciseIndex}
                                                                         setIndex={i} />));
        
        return (
            <Col lg={4} md={4} sm={6} xs={12}>
                <Panel header={header}>
                <ListGroup>
                    { sets }
                </ListGroup>
                {addSetButton}
                {removeExerciseButton}
                </Panel>
            </Col>
        );
    }
}
