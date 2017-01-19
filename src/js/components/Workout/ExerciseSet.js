import React from "react";
import { Button, ButtonGroup, Form, InputGroup, FormGroup, FormControl, DropdownButton, MenuItem, ListGroupItem } from "react-bootstrap";
import * as TrainingActions from "../../actions/TrainingActions";

export default class ExerciseSet extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = this.extractState(props);

        this.possibleUnits = [
            {
                name: "kilogram",
                abbreviation: "kg"
            },
            {
                name: "pound",
                abbreviation: "lbs"
            }
        ];
    }

    extractState(props) {
        return {
            reps: props.set.reps,
            weight: props.set.weight,
            unit: props.set.unit
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.extractState(nextProps));
    }

    setReps(e) {
        this.setState({reps: parseInt(e.target.value)}, this.updateSet);
    }

    setWeight(e) {
        this.setState({weight: parseInt(e.target.value)}, this.updateSet);
    }

    setUnit(unit) {
        this.setState({unit}, this.updateSet);
    }

    removeSet(movementId, setIndex) {
        TrainingActions.removeSet(
            this.props.workoutId,
            this.props.exerciseIndex,
            this.props.setIndex
        );
    }

    updateSet() {
        TrainingActions.updateSet(
            this.props.workoutId,
            this.props.exerciseIndex,
            this.props.setIndex,
            {
                reps: this.state.reps,
                weight: this.state.weight,
                unit: this.state.unit
            }
        );
    }

    render() {
        var unit = this.props.set.unit;

        const dropdownOptions = this.possibleUnits.map((x,i) => <MenuItem onClick={() => this.setUnit(x.abbreviation)} key={i}>{x.abbreviation}</MenuItem>);

        return (
            <ListGroupItem>
            <div>
            <div style={{display: "inline-block", width: "90%"}}>
            <Form inline>
            <FormGroup>
                <InputGroup>
                    <FormControl type="number" pattern="[0-9]" placeholder="reps" value={this.props.set.reps} onChange={this.setReps.bind(this)}/>
                    <InputGroup.Addon>x</InputGroup.Addon>
                    <FormControl type="number" placeholder="weight" value={this.props.set.weight} onChange={this.setWeight.bind(this)}/>
                    <DropdownButton componentClass={InputGroup.Button} title={unit} id={`set-${this.props.exerciseIndex}-${this.props.setIndex}`}>
                    {dropdownOptions}
                    </DropdownButton>
                </InputGroup>
            </FormGroup>
            </Form>
            </div>
            <div style={{display: "inline-block"}} class="pull-right">
            <Button onClick={this.removeSet.bind(this)} bsStyle="link" bsSize="xsmall" style={{paddingLeft: "0px", paddingRight: "0px", "paddingTop": "10px"}}>
            <span class="glyphicon glyphicon-remove"></span>
            </Button>
            </div>
            </div>
            </ListGroupItem>
        );
    }
}