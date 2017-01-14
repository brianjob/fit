import React from "react";
import {Button, Col, Panel, ListGroup, ListGroupItem } from "react-bootstrap";
import FitTable from "../Table/FitTable";

export default class PanelList extends React.Component {
    render() {
        const {sm, md, lg} = this.props.colSizes;
        const listItems = this.props.listItems;
        const header = (<div>{this.props.header}<Button bsClass="btn-link pull-right" bsSize="xsmall"><span class="glyphicon glyphicon-remove"></span></Button></div>)

        const tableHeader = ["Reps", "Weight"]
        const tableRows = this.props.tableRows;

        return (
            <Col lg={lg} md={md} sm={sm}>
                <Panel header={header}>
                
                <ListGroup>
                { listItems.map((y,j) => <ListGroupItem key={j}>{y}</ListGroupItem>) }
                </ListGroup>
                </Panel>
            </Col>
        );
    }
}

//<FitTable header={tableHeader} rows={tableRows}/>