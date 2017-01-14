import React from "react";
import {FormGroup, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";

function FieldGroup({ type, id, label, help, ...props }) {
    var formControl;
    switch(type) {
        case "date":
            formControl = <DatePicker {...props}/>
            break;
        case "select":
            const options = props.options.map((x,i) => <option value={x.value} key={i}>{x.display}</option>);
            delete props.options;
            formControl = <FormControl componentClass="select" {...props}>{options}</FormControl>
            break;
        default:
            formControl = <FormControl type={type} {...props}/>
            break;
    }

    return (
    <FormGroup controlId={id}>
      {label && <ControlLabel>{label}</ControlLabel>}
      {formControl}
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class Input extends React.Component {
    render() {
        return (
            <FieldGroup {...this.props.data} />
        );
    }
}