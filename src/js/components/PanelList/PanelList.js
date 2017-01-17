import React from "react";
import {Button, Col, Panel, ListGroup, ListGroupItem } from "react-bootstrap";

export default class PanelList extends React.Component {
    render() {
        const {xs, sm, md, lg} = this.props.colSizes;
        const listItems = this.props.listItems;
        const exitButton = (<Button bsClass="btn-link" bsSize="xsmall" onClick={this.props.removePanel}>
                                Remove Movement
                            </Button>);
        const addNewButton = (<Button bsClass="btn-link pull-right" bsSize="xsmall" onClick={this.props.addNew}>Add Set</Button>);
        const header = (<div>{this.props.header}</div>);
        
        return (
            <Col lg={lg} md={md} sm={sm} xs={xs}>
                <Panel header={header}>
                <ListGroup>
                    { listItems.map((y,j) => <ListGroupItem key={j}>{y}</ListGroupItem>) }
                </ListGroup>
                {addNewButton}
                {exitButton}
                </Panel>
            </Col>
        );
    }
}
