import React from "react";
import { Container, Button, Card, Badge, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getApiProjectDetail } from "../../services/projectservice";
import { PUBLIC_URL } from "../../constant";
import Taskcreate from "../Task/Taskcreate";
import Tasklist from "../Task/Tasklist";
import Projectedit from "./Projectedit";
class Projectview extends React.Component {
    state = {
        projectDetail: {},
        tasksList: [],
        isLoading: false,
        toggleAddTask: false,
        toggleEditProject: false
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
            toggleEditProject: false,
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

    toggleEditProject = () => {
        this.setState({
            toggleAddTask: false,
            toggleEditProject: !this.state.toggleEditProject
        });
    };

    onCompleteProjectEdit = () => {
        this.setState({
            toggleAddTask: false
        });
        this.getProjectDetail();
        this.toggleEditProject();
    };

    render() {
        return (
            <>
                <Container className="mt-4" style={{ marginBottom: "70px" }}>
                    <div className="d-flex justify-content-end my-2">
                        <div>
                            <Link to={`${PUBLIC_URL}project`}>
                                <div className="btn btn-sm btn-danger mr-2">
                                    <i className="fa fa-arrow-left"></i> Back To
                                    All Project
                                </div>
                            </Link>

                            <Button
                                className="btn btn-sm btn-warning mr-2"
                                onClick={() => this.toggleEditProject()}
                            >
                                {!this.state.toggleEditProject && (
                                    <span>Edit Project</span>
                                )}
                                {this.state.toggleEditProject && (
                                    <span>Cancel Edit Project</span>
                                )}
                            </Button>
                            <Button
                                className="btn btn-sm btn-primary"
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
                    {!this.state.toggleEditProject && (
                        <div>
                            <div>
                                <h5>
                                    {this.state.projectDetail.name}{" "}
                                    <Badge variant="primary">
                                        {this.state.tasksList.length}
                                    </Badge>
                                </h5>
                            </div>
                            <div>
                                {this.state.projectDetail.status === 1 && (
                                    <span className="text-success">
                                        <i className="fa fa-check"></i> Complete
                                    </span>
                                )}{" "}
                                {this.state.projectDetail.status === 0 && (
                                    <span className="text-danger">
                                        <i className="fa fa-times"></i> Pending
                                    </span>
                                )}{" "}
                            </div>
                            <div className="my-2">
                                {this.state.projectDetail.description}
                            </div>
                        </div>
                    )}
                    {this.state.toggleEditProject && (
                        <Projectedit
                            project={this.state.projectDetail}
                            onCompleteProjectEdit={this.onCompleteProjectEdit}
                        />
                    )}

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
