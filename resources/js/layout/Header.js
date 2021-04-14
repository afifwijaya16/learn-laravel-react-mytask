import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
const Header = () => {
    const [publicUrl, setPublicUrl] = useState("/laravel-react-mytask/");
    return (
        <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
            <Container>
                <Link to={`${publicUrl}`}>
                    <Navbar.Brand>Taks Management</Navbar.Brand>
                </Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to={`${publicUrl}`}>
                            <Nav.Item className="nav-link">Home</Nav.Item>
                        </Link>
                        <Link to={`${publicUrl}project`}>
                            <Nav.Item className="nav-link">Project</Nav.Item>
                        </Link>
                        <Link to={`${publicUrl}about`}>
                            <Nav.Item className="nav-link">About</Nav.Item>
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
