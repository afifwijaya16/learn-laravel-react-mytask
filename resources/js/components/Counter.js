import React, { Component } from "react";
import ReactDOM from "react-dom";

class Counter extends Component {
    state = {
        counter: 0
    };

    incrementCounter = () => {
        let counter = this.state.counter + 1;
        this.setState({
            counter
        });
    };

    decrementCounter = () => {
        let counter = this.state.counter - 1;
        this.setState({
            counter
        });
    };

    render() {
        return (
            <div>
                <div className="container mt-5">
                    <h1>test 123</h1>
                    <h2>Count: {this.state.counter}</h2>
                    <p>
                        <button
                            className="btn btn-success btn-lg"
                            onClick={() => this.incrementCounter()}
                        >
                            +
                        </button>

                        <button
                            className="btn btn-danger btn-lg ml-2"
                            onClick={() => this.decrementCounter()}
                        >
                            -
                        </button>
                    </p>
                </div>
            </div>
        );
    }
}

export default Counter;

if (document.getElementById("counter")) {
    ReactDOM.render(<Counter />, document.getElementById("counter"));
}
