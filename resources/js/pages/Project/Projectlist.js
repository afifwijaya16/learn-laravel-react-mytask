import React from "react";
import { Container, Button, Card, Badge, Spinner } from "react-bootstrap";
import Axios from "axios";
class Projectlist extends React.Component {
    state = {
        projectList: [],
        isLoading: false
    };
    componentDidMount() {
        this.getProjectLists();
    }

    getProjectLists = () => {
        this.setState({ isLoading: true });
        Axios.get("http://localhost/laravel-react-mytask/api/projects").then(
            res => {
                const projectList = res.data.data;
                this.setState({
                    projectList,
                    isLoading: false
                });
            }
        );
    };
    render() {
        return (
            <>
                <Container className="mt-4">
                    <h5>Project List</h5>
                    <hr />
                    {this.state.isLoading && (
                        <div className="text-center mt-5">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    )}
                    {this.state.projectList.map((project, index) => (
                        <Card key={index} className="mt-3">
                            <Card.Header>
                                {project.name}{" "}
                                <Badge variant="primary">
                                    {project.tasks_count}
                                </Badge>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>{project.description}</Card.Text>
                                <Button variant="primary" className="mr-2">
                                    View
                                </Button>
                                <Button variant="success" className="mr-2">
                                    Edit
                                </Button>
                                <Button variant="danger" className="mr-2">
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Container>
            </>
        );
    }
}

export default Projectlist;
