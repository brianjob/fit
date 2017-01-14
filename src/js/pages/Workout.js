import React from "react";
import { Grid, Row, Col, Panel, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";
import FitTable from "../components/Table/FitTable";
import FitForm from "../components/Form/FitForm";
import schema from "../../../sample_schema.json";
import TrainingStore from "../stores/TrainingStore";
import Input from "../components/Form/Input";
import PanelListCollection from "../components/PanelList/PanelListCollection";

export default class Workout extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        if (this.props.params.id) {
            this.state = {
                workout: TrainingStore.getWorkout(this.props.params.id)
            }
        }
    }

    render() {
        const panelLists = this.state.workout.exercises.map((x) =>
        {
            return {
                header: x.movement.name,
                listItems: x.sets.map(y => `${y.repetitions} x ${y.weight.magnitude} ${y.weight.unit}`),
                tableRows: x.sets.map(y => [y.repetitions, `${y.weight.magnitude} ${y.weight.unit}`])
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
                <PanelListCollection panelLists={panelLists} />
            </div>
        );
    }
}