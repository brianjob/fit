import React from "react";
import {Button, Col, Panel, ListGroup, ListGroupItem } from "react-bootstrap";
import FitTable from "../Table/FitTable";

export default class PanelList extends React.Component {
    render() {
        const {xs, sm, md, lg} = this.props.colSizes;
        const listItems = this.props.listItems;
        const exitButton = (<Button bsClass="btn-link pull-right" bsSize="xsmall"><span class="glyphicon glyphicon-remove"></span></Button>);
        const addNewButton = (<Button bsClass="btn-link pull-right" bsSize="xsmall">Add Set</Button>);
        const header = (<div>{this.props.header}{exitButton}</div>);
        
        return (
            <Col lg={lg} md={md} sm={sm} xs={xs}>
                <Panel header={header}>
                <ListGroup>
                    { listItems.map((y,j) => <ListGroupItem key={j}>{y}</ListGroupItem>) }
                </ListGroup>
                {addNewButton}
                </Panel>
            </Col>
        );
    }
}
