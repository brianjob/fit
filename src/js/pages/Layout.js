import React from "react";
import { LinkContainer } from "react-router-bootstrap"

import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

export default class Layout extends React.Component {
    constructor() {
        super();

        // all routes that shouldn't populate nav bar
        this.unprotectedRoutes = [
          '/login',
          '/register'
        ];
    }

    getNavBarItems() {
        if (~this.unprotectedRoutes.indexOf(this.props.location.pathname)) {
            return (<div></div>);
        } else {
            return (
            <div>
            <Nav>
                <LinkContainer to="training">
                    <NavItem eventKey={1} href="/training">Training</NavItem>
                </LinkContainer>
                <LinkContainer to="nutrition">
                    <NavItem eventKey={2} href="/nutrition">Nutrition</NavItem>
                </LinkContainer>
                <LinkContainer to="supplements">
                    <NavItem eventKey={2} href="/supplements">Supplements</NavItem>
                </LinkContainer>
            </Nav>
            <Nav pullRight>
                <NavItem eventKey={2} href="#">Profile</NavItem>
            </Nav>
            </div>);
        }
    }

    render() {
        return (
            <div>
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Fit</a>
                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                {this.getNavBarItems()}
                </Navbar.Collapse>
            </Navbar>
            <div class="container">
            {this.props.children}
            </div>
            </div>
            );
    };
}