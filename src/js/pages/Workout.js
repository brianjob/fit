import React from "react";
import { Grid, Row, Col, Button, Alert } from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";
import * as TrainingActions from "../actions/TrainingActions";
import TrainingStore from "../stores/TrainingStore";
import Exercise from "../components/Workout/Exercise";

export default class Workout extends React.Component {
    constructor(props) {
        super(props);

        this._movements = TrainingStore.getMovements().map(x => {return {id: x.id, label: x.name}});
        
        this.state = {
            workout: TrainingStore.getWorkout(props.params.id)
        }
    }

    _onChange = () => {
        this.setState({
            workout: TrainingStore.getWorkout(this.props.params.id)
        });
    };

    componentWillMount() {
        TrainingStore.on('change', this._onChange);
    }

    componentWillUnmount() {
        TrainingStore.removeListener('change', this._onChange);
    }

    addExercise() {
        TrainingActions.addExercise(this.state.workout.id);
    }

    render() {
        if (this.state.workout) {
            const exercises = this.state.workout.exercises.map((x,i) => (
                <Exercise workoutId={this.props.params.id} exercise={x} exerciseIndex={i} key={i} />
            ));
        
            return (
                <Grid>
                    <Row>
                    <Col lg={3}>
                    <DatePicker placeholder="date" value={this.state.workout.date} />
                    <Button onClick={this.addExercise.bind(this)} style={{marginBottom: "15px", marginTop: "15px"}}>New Exercise</Button>
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