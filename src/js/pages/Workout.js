import React from "react";
import { Grid, Row, Col, Panel, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";
import FitTable from "../components/Table/FitTable";
import FitForm from "../components/Form/FitForm";
import schema from "../../../sample_schema.json";
import TrainingStore from "../stores/TrainingStore";
import Input from "../components/Form/Input";
import PanelListCollection from "../components/PanelList/PanelListCollection";
import SetForm from "../components/Form/SetForm";

export default class Workout extends React.Component {
    _onChange = () => {
            this.setState({
                workout: TrainingStore.getWorkout(this.props.params.id)
            });
        };

    constructor() {
        super();
    }

    componentWillMount() {
        if (this.props.params.id) {
            this.state = {
                workout: TrainingStore.getWorkout(this.props.params.id)
            }
        }

        TrainingStore.on('change', this._onChange);
    }

    componentWillUnmount() {
        TrainingStore.removeListener('change', this._onChange);
    }

    addSet(movement) {
        TrainingStore.addSet({
            workoutId: this.state.workout.id,
            movement
        });
    }

    updateSet({movement, setIndex, set}) {
        TrainingStore.updateSet({
            workoutId: this.state.workout.id,
            movement,
            setIndex,
            set
        });
    }

    render() {
        const panelLists = this.state.workout.exercises.map((x) =>
        {
            return {
                header: x.movement.name,
                listItems: x.sets.map((y,j) => {
                    return (<SetForm workoutId={this.state.workout.id} set={y} updateSet={(set) => {
                        this.updateSet({
                            movement: x.movement.name,
                            setIndex: j,
                            set});
                    }} />);
                }),
                addNew: () => this.addSet(x.movement.name)
            }
        });

        return (
            <div>                
                <Grid>
                    <Row>
                    <Col lg={3}>
                    <h2>Workout</h2>
                    <Input data={{id: 'date', type: 'date', placeholder: 'date', defaultValue: this.state.workout.date}} />
                    <Button style={ {marginBottom: "15px"} }>New Movement</Button>
                    </Col>
                    </Row>
                </Grid>
                <PanelListCollection lg={4} panelLists={panelLists} />
            </div>
        );
    }
}