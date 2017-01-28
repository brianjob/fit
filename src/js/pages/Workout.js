import React from "react";
import { Grid, Row, Col, Button, Alert, Fade } from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";
import * as TrainingActions from "../actions/TrainingActions";
import TrainingStore from "../stores/TrainingStore";
import Exercise from "../components/Workout/Exercise";

export default class Workout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            workout: TrainingStore.getWorkout(props.params.id),
            movements: TrainingStore.getMovements().map(x => { return { label: x.name, id: x._id}}),
            alert: TrainingStore.getAlert()
        }
    }

    _onChange = () => {
        this.setState({
            workout: TrainingStore.getWorkout(this.props.params.id),
            movements: TrainingStore.getMovements().map(x => { return { label: x.name, id: x._id}}),
            alert: TrainingStore.getAlert()
        });
    };

    componentWillMount() {
        TrainingStore.on('change', this._onChange);
    }

    componentWillUnmount() {
        TrainingStore.removeListener('change', this._onChange);
    }

    addExercise() {
        TrainingActions.addExercise(this.state.workout._id);
    }

    setDate(value) {
        TrainingActions.setWorkoutDate(this.state.workout._id, value);
    }

    saveWorkout() {
        TrainingActions.saveWorkout(this.state.workout);
    }

    render() {
        if (this.state.workout) {
            const exercises = this.state.workout.exercises.map((x,i) => (
                <Exercise movements={this.state.movements} workoutId={this.props.params.id} exercise={x} exerciseIndex={i} key={i} />
            ));

            const alert = (<Fade in={this.state.alert.show}><Alert bsStyle={this.state.alert.style}>{this.state.alert.text}</Alert></Fade>);
        
            return (
                <Grid>
                    <Row>
                    {alert}
                    </Row>
                    <Row>
                    <Col lg={3}>
                    <DatePicker onChange={this.setDate.bind(this)} placeholder="date" value={this.state.workout.date} />
                    <Button onClick={this.addExercise.bind(this)} style={{marginBottom: "15px", marginTop: "15px"}}>New Exercise</Button>
                    <Button onClick={this.saveWorkout.bind(this)} style={{marginBottom: "15px", marginTop: "15px"}} bsStyle="primary" class="pull-right">Save Workout</Button>
                    </Col>
                    </Row>
                    <Row>
                    {exercises}
                    </Row>
                </Grid>
            );
        } else {
            return (<Alert bsStyle="danger">Workout not found</Alert>);
        }
    }
}