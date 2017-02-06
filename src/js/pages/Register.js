import React from "react";
import { Grid, Row, Col, Panel, FormGroup, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserStore from "../stores/UserStore";
import * as UserActions from "../actions/UserActions";

export default class Register extends React.Component {
    
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
    
    register() {
        UserActions.register({
            email: this.state.email,
            password: this.state.password
        })
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
                    <FormControl type="text" placeholder="Email" onChange={this.setEmail.bind(this)}/>
                </FormGroup>
                <FormGroup>
                    <FormControl type="password" placeholder="Password" onChange={this.setPassword.bind(this)}/>
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