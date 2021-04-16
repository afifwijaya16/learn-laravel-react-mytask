import React from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../constant";
import { updateApiProject } from "../../services/projectservice";
class Projectedit extends React.Component {
    state = {
        isLoading: false,
        id: this.props.project.id,
        name: this.props.project.name,
        description: this.props.project.description,
        status: this.props.project.status,
        errors: {}
    };
    changeInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    submitForm = async e => {
        e.preventDefault();
        const { history } = this.props;

        this.setState({ isLoading: true });
        const postBody = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            status: this.state.status
        };
        const response = await updateApiProject(postBody, this.state.id);
        if (response.success) {
            this.setState({
                name: "",
                description: "",
                isLoading: false
            });
            // history.push(`${PUBLIC_URL}project`);
            this.props.onCompleteProjectEdit();
        } else {
            console.log("response.errors", response.errors);
            this.setState({
                errors: response.errors,
                isLoading: false
            });
        }
    };
    render() {
        return (
            <>
                <Container className="mt-4">
                    <Card>
                        <Card.Body>
                            <Form onSubmit={this.submitForm}>
                                <Form.Group>
                                    <Form.Label>Project Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter project title"
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
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter description"
                                        as="textarea"
                                        rows="2"
                                        name="description"
                                        value={this.state.description}
                                        onChange={e => this.changeInput(e)}
                                    />
                                    {this.state.errors &&
                                        this.state.errors.description && (
                                            <p className="text-danger">
                                                {
                                                    this.state.errors
                                                        .description[0]
                                                }
                                            </p>
                                        )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Project Status</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={this.state.status}
                                        name="status"
                                        onChange={e => this.changeInput(e)}
                                    >
                                        <option value={0}>Pending</option>
                                        <option value={1}>Completed</option>
                                    </Form.Control>

                                    {this.state.errors &&
                                        this.state.errors.status && (
                                            <p className="text-danger">
                                                {this.state.errors.status[0]}
                                            </p>
                                        )}
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
                                        Updating...
                                    </Button>
                                )}

                                {!this.state.isLoading && (
                                    <Button variant="primary" type="submit">
                                        Update Project
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

export default withRouter(Projectedit);
