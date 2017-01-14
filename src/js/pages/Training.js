import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router";
import FitTable from "../components/Table/FitTable";
import TrainingStore from "../stores/TrainingStore";

export default class Training extends React.Component {
    constructor() {
        super();

        this.state = {
            workouts: TrainingStore.getWorkouts()
        };
    }

    componentWillMount() {
        TrainingStore.on("change", () => {
            this.setState({
                workouts: TrainingStore.getWorkouts()
            });
        });
    }

    render() {
        const rows = this.state.workouts.map(x => {
            return {
                date: x.date,
                numExercises: x.exercises.length,
                totalVolume: x.exercises.map(y =>{
                    return y.sets.map(z => z.weight.magnitude * z.repetitions).reduce((a,b) => a + b)
                }).reduce((a,b) => a + b)
            };
        }).map((x, i) => {
            return [x.date, x.numExercises, x.totalVolume]
        });

        const header = ["Date", "Number of Exercises", "Total Volume"];

        return (
            <div>
            <h1>Training</h1>
            <FitTable header={header} rows={rows} createRoute="workout"/>
            </div>
        );
    }
}