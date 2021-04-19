import React from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { registerUsers } from "../../services/authservice";
import { PUBLIC_URL } from "../../constant";
class Register extends React.Component {
    state = {
        isLoading: false,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        errors: {},
        validated: false
    };

    changeInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    submitForm = async e => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.setState({
            validated: true
        });

        const { history } = this.props;

        const postBody = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        };
        if (form.checkValidity() !== false) {
            event.preventDefault();
            this.setState({ isLoading: true });
            const response = await registerUsers(postBody);
            if (response.success) {
                this.setState({
                    name: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                    isLoading: false,
                    errors: {},
                    validated: false
                });
                localStorage.setItem("loginData", JSON.stringify(response));
                // history.push(`${PUBLIC_URL}login`);
            } else {
                // console.log("response.errors", response.errors);
                this.setState({
                    errors: response.errors,
                    isLoading: false
                });
                localStorage.setItem("loginData", null);
            }
        }
    };
    render() {
        return (
            <>
                <Container className="mt-4">
                    <div className="text-center">
                        <h5>Register</h5>
                    </div>
                    <hr />
                    <Card>
                        <Card.Body>
                            <Form
                                noValidate
                                validated={this.state.validated}
                                onSubmit={this.submitForm}
                            >
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter Name"
                                        value={this.state.name}
                                        name="name"
                                        onChange={e => this.changeInput(e)}
                                    />
                                    {this.state.errors &&
                                        this.state.errors.name && (
                                            <p className="text-danger">
                                                {this.state.errors.name[0]}
                                            </p>
                                        )}
                                    <Form.Control.Feedback type="invalid">
                                        Please give your name
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter Email"
                                        value={this.state.email}
                                        name="email"
                                        onChange={e => this.changeInput(e)}
                                    />
                                    {this.state.errors &&
                                        this.state.errors.email && (
                                            <p className="text-danger">
                                                {this.state.errors.email[0]}
                                            </p>
                                        )}
                                    <Form.Control.Feedback type="invalid">
                                        Please give your valid email address
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Enter password"
                                        value={this.state.password}
                                        name="password"
                                        autoComplete="off"
                                        onChange={e => this.changeInput(e)}
                                    />
                                    {this.state.errors &&
                                        this.state.errors.password && (
                                            <p className="text-danger">
                                                {this.state.errors.password[0]}
                                            </p>
                                        )}
                                    <Form.Control.Feedback type="invalid">
                                        Please give your password
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Confirm Password </Form.Label>
                                    <Form.Control
                                        type="password"
                                        required
                                        autoComplete="off"
                                        placeholder="Enter Confirm password"
                                        value={this.state.password_confirmation}
                                        name="password_confirmation"
                                        onChange={e => this.changeInput(e)}
                                    />
                                    {this.state.errors &&
                                        this.state.errors
                                            .password_confirmation && (
                                            <p className="text-danger">
                                                {
                                                    this.state.errors
                                                        .password_confirmation[0]
                                                }
                                            </p>
                                        )}
                                    <Form.Control.Feedback type="invalid">
                                        Please give your password confirmation
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {this.state.isLoading && (
                                    <Button
                                        variant="primary"
                                        type="button"
                                        disabled
                                    >
                                        <Spinner
                                            animation="border"
                                            role="status"
                                        >
                                            <span className="sr-only">
                                                Loading...
                                            </span>
                                        </Spinner>{" "}
                                        Signing Up...
                                    </Button>
                                )}

                                {!this.state.isLoading && (
                                    <Button variant="success" type="submit">
                                        Sign Up
                                    </Button>
                                )}
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </>
        );
    }
}

export default withRouter(Register);
