import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
// pages
import Home from "../pages/Home";
import About from "../pages/About";
import Projectlist from "../pages/Project/Projectlist";
import Projectcreate from "../pages/Project/Projectcreate";
import Projectview from "../pages/Project/Projectview";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
// constant
import { PUBLIC_URL } from "../constant";
import { checkIfAuthenticated } from "../services/authservice";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
class App extends Component {
    state = {
        user: {},
        isLoggedIn: false
    };
    componentDidMount() {
        if (checkIfAuthenticated()) {
            this.setState({
                user: checkIfAuthenticated(),
                isLoggedIn: true
            });
        }
    }
    render() {
        return (
            <Router>
                <Header authData={this.state} />
                <Switch>
                    <Route
                        path={`${PUBLIC_URL}about`}
                        exact
                        component={About}
                    />
                    <Route path={`${PUBLIC_URL}`} exact component={Home} />

                    {/* <Route
                        path={`${PUBLIC_URL}project`}
                        exact
                        component={Projectlist}
                    />
                    <Route
                        path={`${PUBLIC_URL}project/create`}
                        exact
                        component={Projectcreate}
                    />
                    <Route
                        path={`${PUBLIC_URL}project/view/:id`}
                        exact
                        component={Projectview}
                    /> */}
                    <AuthenticatedRoutes
                        authed={this.state.isLoggedIn}
                        path={`${PUBLIC_URL}project/view/:id`}
                        component={Projectview}
                    />

                    <AuthenticatedRoutes
                        authed={this.state.isLoggedIn}
                        path={`${PUBLIC_URL}project/create`}
                        component={Projectcreate}
                    />

                    <AuthenticatedRoutes
                        authed={this.state.isLoggedIn}
                        path={`${PUBLIC_URL}project`}
                        component={Projectlist}
                    />
                    {/* auth */}
                    <Route
                        path={`${PUBLIC_URL}register`}
                        exact
                        component={Register}
                    />
                    <Route
                        path={`${PUBLIC_URL}login`}
                        exact
                        component={Login}
                    />
                </Switch>
                <Footer />
            </Router>
        );
    }
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
