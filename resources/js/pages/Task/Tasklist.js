import React from "react";
import { Card, Badge } from "react-bootstrap";
class Tasklist extends React.Component {
    render() {
        return (
            <>
                {this.props.tasksList.map((task, index) => (
                    <Card key={index} className="mt-3">
                        <Card.Header>
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
