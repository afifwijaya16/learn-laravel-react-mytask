import React from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../constant";
import { storeApiNewProject } from "../../service/projectservice";
class Projectcreate extends React.Component {
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
            description: this.state.description
        };
        const response = await storeApiNewProject(postBody);
        if (response.success) {
            this.setState({
                name: "",
                description: "",
                isLoading: false
            });
            history.push(`${PUBLIC_URL}project`);
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
                    <div className="d-flex justify-content-between">
                        <div>
                            <h5>Project List </h5>
                        </div>
                        <div>
                            <Link to={`${PUBLIC_URL}project`}>
                                <div className="btn btn-xs btn-primary">
                                    <i className="fa fa-arrow-left"></i> Back
                                </div>
                            </Link>
                        </div>
                    </div>
                    <hr />
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
                                        Save Project
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

export default withRouter(Projectcreate);
