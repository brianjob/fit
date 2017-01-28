import React from "react";
import { Table, Button, Dropdown, Glyphicon, MenuItem, Modal } from "react-bootstrap";
import { Link, hashHistory } from "react-router";
import FitTable from "../components/Table/FitTable";
import TrainingStore from "../stores/TrainingStore";
import * as TrainingActions from "../actions/TrainingActions";

export default class Training extends React.Component {
    _onChange = () => {
        this.setState({
            workouts: TrainingStore.getWorkouts()
        });
    };

    constructor() {
        super();

        this.state = {
            workouts: TrainingStore.getWorkouts(),
            showModal: false
        };
    }

    componentWillMount() {
        TrainingStore.on("change", this._onChange);
    }

    componentWillUnmount() {
        TrainingStore.removeListener("change", this._onChange);
    }

    openModal() {
        this.setState({ showModal: true });
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    createWorkout() {
        TrainingActions.createWorkout();
    }

    viewWorkout(workoutId) {
        hashHistory.push(`/workout/${workoutId}`);
    }

    removeWorkout(workoutId) {
        this.idToRemove = workoutId;
        this.openModal();
    }

    confirmRemove() {
        if (this.idToRemove) {
            TrainingActions.removeWorkout(this.idToRemove);
            this.idToRemove = null;
            this.closeModal();
        }
    }

    cancelRemove() {
        this.idToRemove = null;
        this.closeModal();
    }

    render() {
        const rows = this.state.workouts.map(x => {
            return {
                id: x._id,
                date: x.date,
                numExercises: x.exercises.length,
                totalVolume: x.exercises.map(y => {
                    return y.sets.map(z => z.weight * z.reps).reduce((a,b) => a + b)
                }).reduce((a,b) => a + b, 0)
            };
        }).map((x, i) => {
            return [x.date, x.numExercises, x.totalVolume, actionButton.bind(this)(i, x.id)]
        });

        const header = ["Date", "Number of Exercises", "Total Volume"];

        const modalInstance = (
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Really delete this workout?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.cancelRemove.bind(this)}>Cancel</Button>
            <Button bsStyle="primary" onClick={this.confirmRemove.bind(this)}>Delete</Button>
          </Modal.Footer>
        </Modal>);

        return (
            <div>
            <h1>Training</h1>
            <FitTable header={header} rows={rows} createNew={this.createWorkout.bind(this)} />
            { modalInstance }
            </div>
        );
    }
}

function actionButton(key, workoutId) {
    return (
    <Dropdown id={`workouts-action-${key}`}>
      <Dropdown.Toggle>
        <Glyphicon glyph="cog" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <MenuItem eventKey="1" onClick={() => this.viewWorkout(workoutId)}>View</MenuItem>
        <MenuItem eventKey="2" onClick={() => this.removeWorkout(workoutId)}>Delete</MenuItem>
      </Dropdown.Menu>
    </Dropdown>);
}