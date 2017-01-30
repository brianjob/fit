import React from "react";
import { Grid, Row, Col, Panel, FormGroup, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default class Login extends React.Component {

    login() {
        console.log('login');
    }

    render() {
        const panelTitle = (<h3>Please sign in</h3>);

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
                <Button onClick={ this.login.bind(this) }>Login</Button>
                <LinkContainer to="register">
                    <Button bsStyle="link">Sign up</Button>
                </LinkContainer>
            </form>
            </Panel>
            </Col>
            </Row>
            </Grid>
        );
    }
}