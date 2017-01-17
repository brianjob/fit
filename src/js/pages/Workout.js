import React from "react";
import { Grid, Row, Col, Panel, ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";
import FitTable from "../components/Table/FitTable";
import FitForm from "../components/Form/FitForm";
import schema from "../../../sample_schema.json";
import * as TrainingActions from "../actions/TrainingActions";
import TrainingStore from "../stores/TrainingStore";
import Input from "../components/Form/Input";
import PanelListCollection from "../components/PanelList/PanelListCollection";
import SetForm from "../components/Form/SetForm";
import { Typeahead } from "react-bootstrap-typeahead";

export default class Workout extends React.Component {
    _onChange = () => {
            this.setState({
                workout: TrainingStore.getWorkout(this.props.params.id)
            });
        };

    constructor(props) {
        super(props);

        if (props.params.id) {
            this.state = {
                workout: TrainingStore.getWorkout(props.params.id)
            }
        }
    }

    componentWillMount() {
        TrainingStore.on('change', this._onChange);
    }

    componentWillUnmount() {
        TrainingStore.removeListener('change', this._onChange);
    }

    removeExercise(exerciseIndex) {
        TrainingActions.removeExercise(
            this.state.workout.id,
            exerciseIndex
        );
    }

    addSet(movement) {
        TrainingActions.addSet(
            this.state.workout.id,
            movement
        );
    }

    removeSet(movement, setIndex) {
        TrainingActions.removeSet(
            this.state.workout.id,
            movement,
            setIndex
        );
    }

    updateSet(movement, setIndex, set) {
        TrainingActions.updateSet(
            this.state.workout.id,
            movement,
            setIndex,
            set
        );
    }

    render() {
        const panelLists = this.state.workout.exercises.map((x,i) =>
        {
            const options = ["low bar back squat", "high bar back squat", "bench press", "overhead press", "deadlift", "power clean"];
            const header = (<div><Typeahead selected={[x.movement.name]} allowNew={false} options={options} /></div>);
            return {
                header: header,
                listItems: x.sets.map((y,j) => {
                    return (<SetForm workoutId={this.state.workout.id} set={y} updateSet={(set) => {
                        this.updateSet({
                            movement: x.movement.name,
                            setIndex: j,
                            set});
                    }} removeSet={() => this.removeSet({movement: x.movement.name, setIndex: j})} />);
                }),
                addNew: () => this.addSet(x.movement.name),
                removePanel: () => this.removeExercise(i)
            }
        });

        return (
            <div>                
                <Grid>
                    <Row>
                    <Col lg={3}>
                    <h2>Workout</h2>
                    <Input data={{id: 'date', type: 'date', placeholder: 'date', value: this.state.workout.date}} />
                    <Button style={{marginBottom: "15px"}}>New Movement</Button>
                    </Col>
                    </Row>
                </Grid>
                <PanelListCollection lg={4} panelLists={panelLists} />
            </div>
        );
    }
}