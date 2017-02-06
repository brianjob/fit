import React from "react";
import { Grid, Row, Col, Panel, FormGroup, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import * as UserActions from "../actions/UserActions";
import UserStore from "../stores/UserStore";

export default class Login extends React.Component {

     _onChange = () => {
    };

    componentWillMount() {
        UserStore.on('change', this._onChange);
    }

    componentWillUnmount() {
        UserStore.removeListener('change', this._onChange);
    }

    setEmail(e) {
        this.setState({email: e.target.value});
    }

    setPassword(e) {
        this.setState({password: e.target.value});
    }
    
    login() {
        UserActions.login({
            email: this.state.email,
            password: this.state.password
        })
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
                    <FormControl onChange={this.setEmail.bind(this)} type="text" placeholder="Email" />
                </FormGroup>
                <FormGroup>
                    <FormControl onChange={this.setPassword.bind(this)} type="password" placeholder="Password" />
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