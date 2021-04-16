import React from "react";
import { Container, Button, Card, Badge, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getApiProjectDetail } from "../../services/projectservice";
import { PUBLIC_URL } from "../../constant";
class Projectview extends React.Component {
    state = {
        projectDetail: {},
        tasksList: [],
        isLoading: false,
        toggleAddTask: false
    };
    componentDidMount() {
        this.getProjectDetail();
    }

    getProjectDetail = () => {
        this.setState({ isLoading: true });
        getApiProjectDetail(this.props.match.params.id).then(res => {
            const projectDetail = res.data.data;
            this.setState({
                projectDetail,
                tasksList: projectDetail.tasks,
                isLoading: false
            });
        });
    };

    toggleAddTask = () => {
        this.setState({
            toggleAddTask: !this.state.toggleAddTask
        });
    };
    render() {
        return (
            <>
                <Container className="mt-4" style={{ marginBottom: "70px" }}>
                    <div className="d-flex justify-content-between">
                        <div>
                            <h5>
                                {this.state.projectDetail.name}{" "}
                                <Badge variant="primary">
                                    {this.state.tasksList.length}
                                </Badge>
                            </h5>
                        </div>
                        <div>
                            <Button className="btn btn-xs btn-warning mr-2">
                                Edit
                            </Button>
                            <Button
                                className="btn btn-xs btn-primary"
                                onClick={() => this.toggleAddTask()}
                            >
                                {!this.state.toggleAddTask && (
                                    <span>Add New Taks</span>
                                )}
                                {this.state.toggleAddTask && (
                                    <span>Cancel Add Taks</span>
                                )}
                            </Button>
                        </div>
                    </div>
                    <div>{this.state.projectDetail.description}</div>
                    {this.state.toggleAddTask && (
                        <Card className="mt-3">Add New Taks</Card>
                    )}
                    <hr />
                    {this.state.isLoading && (
                        <div className="text-center mt-5">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    )}
                    {this.state.tasksList.map((taks, index) => (
                        <Card key={index} className="mt-3">
                            <Card.Header>
                                {taks.name}{" "}
                                {taks.status === 0 && (
                                    <Badge variant="danger">
                                        <i className="fa fa-times"></i>
                                    </Badge>
                                )}
                                {taks.status === 1 && (
                                    <Badge variant="success">
                                        <i className="fa fa-check"></i>
                                    </Badge>
                                )}
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>{taks.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Container>
            </>
        );
    }
}

export default Projectview;
