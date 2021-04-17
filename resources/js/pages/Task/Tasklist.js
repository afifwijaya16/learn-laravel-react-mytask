import React from "react";
import { Card, Badge } from "react-bootstrap";
import { updateApiTask, deleteApiTask } from "../../services/taskservice";
class Tasklist extends React.Component {
    state = {
        isLoading: false,
        errors: {}
    };

    toggleCompleteStatus = async item => {
        if (item.status === 0) {
            item.status = 1;
        } else {
            item.status = 0;
        }
        await updateApiTask(item.id, item);
        this.props.onEditTask();
    };

    deleteTask = async id => {
        await deleteApiTask(id);
        this.props.onEditTask();
    };
    render() {
        return (
            <>
                {this.props.tasksList.map((task, index) => (
                    <Card key={index} className="mt-3">
                        <Card.Header>
                            <div className="d-flex justify-content-between">
                                <div>
                                    {task.status === 1 && (
                                        <del className="text-success">
                                            <strong>
                                                {task.name}{" "}
                                                <Badge variant="primary">
                                                    {task.tasks_count}
                                                </Badge>
                                            </strong>
                                        </del>
                                    )}

                                    {task.status === 0 && (
                                        <span>
                                            {task.name}{" "}
                                            <Badge variant="primary">
                                                {task.tasks_count}
                                            </Badge>
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <button
                                        className={`btn btn-outline-${
                                            task.status === 1
                                                ? "info"
                                                : "success"
                                        } btn-sm`}
                                        onClick={() =>
                                            this.toggleCompleteStatus(task)
                                        }
                                    >
                                        {task.status === 0 && (
                                            <span> ✓ Mark as Completed</span>
                                        )}
                                        {task.status === 1 && (
                                            <span> Mark as Pending</span>
                                        )}
                                    </button>{" "}
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => this.deleteTask(task.id)}
                                    >
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </Card.Header>

                        {this.props.isDetailsView && (
                            <Card.Body>
                                <Card.Text>{task.description}</Card.Text>
                            </Card.Body>
                        )}
                    </Card>
                ))}
            </>
        );
    }
}

export default Tasklist;
