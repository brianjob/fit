import React from "react";
import { Button, ButtonGroup, Form, InputGroup, FormGroup, FormControl, DropdownButton, MenuItem } from "react-bootstrap";

export default class SetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            set: props.set
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({set: nextProps.set});
    }

    setReps(e) {
        var state = this.state;
        state.set.reps = parseInt(e.target.value);
        this.setState(state);
        this.updateSet();
    }

    setWeight(e) {
        var state = this.state;
        state.set.weight.magnitude = parseInt(e.target.value);
        this.setState(state);
        this.updateSet();
    }

    setUnit(unit) {
        var state = this.state;
        state.set.weight.unit = unit;
        this.setState(state);
        this.updateSet();
    }

    updateSet() {
        this.props.updateSet(this.state.set);
    }

    render() {
        var unit = this.props.set.weight.unit;

        const possibleUnits = [
            {
                name: "kilogram",
                abbreviation: "kg"
            },
            {
                name: "pound",
                abbreviation: "lbs"
            }
        ];

        const dropdownOptions = possibleUnits.map((x,i) => <MenuItem onClick={() => this.setUnit(x.abbreviation)} key={i}>{x.abbreviation}</MenuItem>);

        return (
            <div>
            <div style={{display: "inline-block", width: "90%"}}>
            <Form inline>
            <FormGroup>
                <InputGroup>
                    <FormControl type="number" pattern="[0-9]" placeholder="reps" value={this.props.set.reps} onChange={this.setReps.bind(this)}/>
                    <InputGroup.Addon>x</InputGroup.Addon>
                    <FormControl type="number" placeholder="weight" value={this.props.set.weight.magnitude} onChange={this.setWeight.bind(this)}/>
                    <DropdownButton componentClass={InputGroup.Button} title={unit}>
                    {dropdownOptions}
                    </DropdownButton>
                </InputGroup>
            </FormGroup>
            </Form>
            </div>
            <div style={{display: "inline-block"}} class="pull-right">
            <Button onClick={this.props.removeSet} bsStyle="link" bsSize="xsmall" style={{paddingLeft: "0px", paddingRight: "0px", "paddingTop": "10px"}}>
            <span class="glyphicon glyphicon-remove"></span>
            </Button>
            </div>
            </div>
        );
    }
}