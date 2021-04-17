import React from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../constant";
import { storeApiNewTask } from "../../services/taskservice";
class Takscreate extends React.Component {
    state = {
        isLoading: false,
        name: "",
        description: "",
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
            name: this.state.name,
            description: this.state.description,
            project_id: this.props.project_id
        };
        const response = await storeApiNewTask(postBody);
        if (response.success) {
            this.setState({
                name: "",
                description: "",
                isLoading: false
            });
            this.props.onCompleteTaskCreate(response.data);
        } else {
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
                        <Card.Header>
                            <h5>New Task </h5>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={this.submitForm}>
                                <Form.Group>
                                    <Form.Label>Tasks Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter task title"
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
                                    <Form.Label>Task Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter task description"
                                        as="textarea"
                                        rows="5"
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
                                        Saving...
                                    </Button>
                                )}

                                {!this.state.isLoading && (
                                    <Button variant="primary" type="submit">
                                        Save Task
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

export default withRouter(Takscreate);
