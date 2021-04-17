import React from "react";
import {
    Container,
    Button,
    Card,
    Badge,
    Spinner,
    InputGroup,
    FormControl
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
    getApiProjectLists,
    deleteApiProject
} from "../../services/projectservice";
import { PUBLIC_URL } from "../../constant";
import Tasklist from "../Task/Tasklist";
class Projectlist extends React.Component {
    state = {
        projectList: [],
        searchProjectList: [],
        isLoading: false
    };
    componentDidMount() {
        this.getProjectLists();
    }

    getProjectLists = async () => {
        this.setState({ isLoading: true });
        await getApiProjectLists().then(res => {
            const projectList = res.data.data;
            this.setState({
                projectList,
                searchProjectList: res.data.data,
                isLoading: false
            });
        });
    };

    deleteProject = async id => {
        this.setState({ isLoading: true });
        const response = await deleteApiProject(id);
        if (response.success) {
            this.setState({
                isLoading: false
            });
            this.getProjectLists();
        } else {
            alert("Sorry !! Something went wrong !!");
        }
    };

    onSearchProject = e => {
        this.setState({ isLoading: true });
        const searchText = e.target.value;
        if (searchText.length > 0) {
            const searchData = this.state.projectList.filter(function(item) {
                const itemData = item.name + " " + item.description;
                const textData = searchText.trim().toLowerCase();
                return (
                    itemData
                        .trim()
                        .toLowerCase()
                        .indexOf(textData) !== -1
                );
            });
            this.setState({
                searchProjectList: searchData,
                isLoading: false
            });
        } else {
            this.setState({
                searchText,
                isLoading: false
            });
            this.getProjectLists();
        }
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
                                    {this.state.searchProjectList.length}
                                </Badge>
                            </h5>
                        </div>
                        <div>
                            <InputGroup>
                                <FormControl
                                    placeholder="Search Project"
                                    onChange={e => this.onSearchProject(e)}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>
                                        <i className="fa fa-search"></i>
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
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
                    {this.state.searchProjectList.map((project, index) => (
                        <Card key={index} className="mt-3">
                            <Card.Header>
                                {project.name}{" "}
                                <Badge variant="primary">
                                    {project.tasks_count}
                                </Badge>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>{project.description}</Card.Text>
                                {/* <Tasklist
                                    tasksList={project.tasks}
                                    isDetailsView={false}
                                /> */}
                                <hr />
                                <Link
                                    to={`${PUBLIC_URL}project/view/${project.id}`}
                                >
                                    <Button variant="primary" className="mr-2">
                                        View & Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="danger"
                                    className="mr-2"
                                    onClick={() =>
                                        this.deleteProject(project.id)
                                    }
                                >
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}

                    {this.state.searchProjectList.length === 0 && (
                        <div className="text-center">
                            <h1>No Project Found !</h1>
                        </div>
                    )}
                </Container>
            </>
        );
    }
}

export default Projectlist;
