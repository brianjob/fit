import React from "react";
import { Grid, Row, Col, Panel, FormGroup, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default class Register extends React.Component {
    register() {

    }

    render() {
        const panelTitle = (<h3>Please register</h3>);

        return (
            <Grid>
            <Row>
            <Col md={4} mdOffset={4}>
            <Panel header={panelTitle}>
            <form acceptCharset="UTF-8" role="form">
                <FormGroup>
                    <FormControl type="text" placeholder="Email" />
                </FormGroup>
                <FormGroup>
                    <FormControl type="password" placeholder="Password" />
                </FormGroup>
                <Button onClick={ this.register.bind(this) }>Register</Button>
                <LinkContainer to="login">
                    <Button bsStyle="link">Already registered? Login</Button>
                </LinkContainer>
            </form>
            </Panel>
            </Col>
            </Row>
            </Grid>
        );
    }
}