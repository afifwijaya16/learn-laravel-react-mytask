import React from "react";
import { Container, Button, Card, Badge, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getApiProjectDetail } from "../../services/projectservice";
import { PUBLIC_URL } from "../../constant";
import Taskcreate from "../Task/Taskcreate";
import Tasklist from "../Task/Tasklist";
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

    onCompleteTaskCreate = task => {
        this.toggleAddTask();
        let tasks = this.state.tasksList;
        tasks.unshift(task);
        this.setState({
            tasksList: tasks
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
                            <Link to={`${PUBLIC_URL}project`}>
                                <div className="btn btn-xs btn-danger mr-2">
                                    <i className="fa fa-arrow-left"></i> Back To
                                    All Project
                                </div>
                            </Link>
                            <Button className="btn btn-xs btn-warning mr-2">
                                Edit
                            </Button>
                            <Button
                                className="btn btn-xs btn-primary"
                                onClick={() => this.toggleAddTask()}
                            >
                                {!this.state.toggleAddTask && (
                                    <span>Add New Task</span>
                                )}
                                {this.state.toggleAddTask && (
                                    <span>Cancel Add Task</span>
                                )}
                            </Button>
                        </div>
                    </div>
                    <div>{this.state.projectDetail.description}</div>

                    {this.state.toggleAddTask && (
                        <Taskcreate
                            project_id={this.props.match.params.id}
                            onCompleteTaskCreate={this.onCompleteTaskCreate}
                        />
                    )}

                    {this.state.isLoading && (
                        <div className="text-center mt-5">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    )}
                    <hr />
                    <Tasklist
                        tasksList={this.state.tasksList}
                        isDetailsView={true}
                    />
                </Container>
            </>
        );
    }
}

export default Projectview;
