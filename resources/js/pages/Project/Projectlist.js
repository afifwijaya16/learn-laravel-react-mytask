import React from "react";
import { Container, Button, Card, Badge, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getApiProjectLists } from "../../services/projectservice";
import { PUBLIC_URL } from "../../constant";
import Tasklist from "../Task/Tasklist";
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
        getApiProjectLists().then(res => {
            const projectList = res.data.data;
            this.setState({
                projectList,
                isLoading: false
            });
        });
    };
    render() {
        return (
            <>
                <Container className="mt-4" style={{ marginBottom: "70px" }}>
                    <div className="d-flex justify-content-between">
                        <div>
                            <h5>
                                Project List{" "}
                                <Badge variant="primary">
                                    {this.state.projectList.length}
                                </Badge>
                            </h5>
                        </div>
                        <div>
                            <Link to={`${PUBLIC_URL}project/create`}>
                                <div className="btn btn-xs btn-primary">
                                    + Add Data
                                </div>
                            </Link>
                        </div>
                    </div>
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
                                <Tasklist
                                    tasksList={project.tasks}
                                    isDetailsView={false}
                                />
                                <hr />
                                <Link
                                    to={`${PUBLIC_URL}project/view/${project.id}`}
                                >
                                    <Button variant="primary" className="mr-2">
                                        View
                                    </Button>
                                </Link>
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
