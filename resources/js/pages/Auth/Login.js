import React from "react";
import { Alert, Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { loginUser } from "../../services/authservice";
import { PUBLIC_URL } from "../../constant";
class Login extends React.Component {
    state = {
        isLoading: false,
        email: "",
        password: "",
        errors: {},
        errorMessage: "",
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
            email: this.state.email,
            password: this.state.password
        };
        if (form.checkValidity() !== false) {
            event.preventDefault();
            this.setState({ isLoading: true });
            const response = await loginUser(postBody);
            console.log("response login", response);
            if (response.success) {
                this.setState({
                    email: "",
                    password: "",
                    isLoading: false,
                    errors: {},
                    errorMessage: "",
                    validated: false
                });
                localStorage.setItem("loginData", JSON.stringify(response));
                // history.push(`${PUBLIC_URL}project`);
                window.location.href = PUBLIC_URL;
            } else {
                console.log("response.errors", response.errors);
                this.setState({
                    errors: response.errors,
                    isLoading: false,
                    errorMessage: response.message
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
                        <h5>Login</h5>
                    </div>
                    <hr />
                    <Card>
                        <Card.Body>
                            {this.state.errorMessage.length > 0 && (
                                <Alert
                                    variant="danger"
                                    onClose={() =>
                                        this.setState({ errorMessage: "" })
                                    }
                                    dismissible
                                >
                                    {this.state.errorMessage}
                                </Alert>
                            )}
                            <Form
                                noValidate
                                validated={this.state.validated}
                                onSubmit={this.submitForm}
                            >
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
                                        Signing In...
                                    </Button>
                                )}

                                {!this.state.isLoading && (
                                    <Button variant="success" type="submit">
                                        Sign In
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

export default withRouter(Login);
