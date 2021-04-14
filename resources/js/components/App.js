import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
// pages
import Home from "../pages/Home";
import About from "../pages/About";
import Projectlist from "../pages/Project/Projectlist";
class App extends Component {
    state = {
        PUBLIC_URL: "/laravel-react-mytask/"
    };

    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route path={`${this.state.PUBLIC_URL}about`} exact>
                        <About />
                    </Route>
                    <Route path={`${this.state.PUBLIC_URL}`} exact>
                        <Home />
                    </Route>
                    <Route path={`${this.state.PUBLIC_URL}project`} exact>
                        <Projectlist />
                    </Route>
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
