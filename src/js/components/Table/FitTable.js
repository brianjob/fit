import React from "react";
import Row from "./Row";

import {Table,Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

export default class FitTable extends React.Component {
    render() {
        const header = this.props.header.map((x,i) => <th key={i}>{x}</th>);
        const rows = this.props.rows.map((x,i) => <Row key={i} cells={x}/>);

        return (
            <div>
            <CreateButton createNew={this.props.createNew}/>
            <Table>
                <thead>
                    <tr>
                    {header}
                    </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </Table>
            </div>
        );
    }
}

class CreateButton extends React.Component {
    render() {
        if (this.props.createNew) {
            return (
                <Button onClick={this.props.createNew} class="pull-right"><span class="glyphicon glyphicon-plus"></span></Button>
            );
        }
        return (<span></span>)
    }
}