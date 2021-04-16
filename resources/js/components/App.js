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
// constant
import { PUBLIC_URL } from "../constant";
class App extends Component {
    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route
                        path={`${PUBLIC_URL}about`}
                        exact
                        component={About}
                    />
                    <Route path={`${PUBLIC_URL}`} exact component={Home} />
                    {/* project */}
                    <Route
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
