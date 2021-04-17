import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../constant";
const Header = () => {
    return (
        <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
            <Container>
                <Link to={`${PUBLIC_URL}`}>
                    <Navbar.Brand>Taks Management</Navbar.Brand>
                </Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to={`${PUBLIC_URL}`}>
                            <Nav.Item className="nav-link">Home</Nav.Item>
                        </Link>
                        <Link to={`${PUBLIC_URL}project`}>
                            <Nav.Item className="nav-link">Project</Nav.Item>
                        </Link>
                        <Link to={`${PUBLIC_URL}about`}>
                            <Nav.Item className="nav-link">About</Nav.Item>
                        </Link>
                        <Link to={`${PUBLIC_URL}register`}>
                            <Nav.Item className="nav-link">Sign Up</Nav.Item>
                        </Link>
                        <Link to={`${PUBLIC_URL}login`}>
                            <Nav.Item className="nav-link">Sign In</Nav.Item>
                        </Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                Action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
