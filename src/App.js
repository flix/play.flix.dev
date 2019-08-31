import React from 'react';
import './App.css';

import Menu from "./Menu";
import CodePane from "./CodePane";
import OutputPane from "./OutputPane";

const SocketAddress = 'wss://flix-evaluator.cs.au.dk/ws';

class App extends React.Component {

    constructor(props) {
        super(props);

        console.log("Connecting to: " + SocketAddress);

        this.state = {
            connected: false,
            websocket: null,
            program: this.getInitialProgram(),
            result: ""
        };

        try {
            this.state.websocket = new window.WebSocket(SocketAddress);

            this.state.websocket.onopen = event => {
                console.log("Connected to: " + SocketAddress);
                this.setState({connected: true})
            }
        } catch (ex) {
            console.log("Unable to connect: " + ex)
        }
    }

    runProgram(src, callback) {
        if (!this.state.connected) {
            console.log("Not connected yet");
            return;
        }

        this.state.websocket.onmessage = event => {
            console.log("Received reply from: " + SocketAddress);
            const data = JSON.parse(event.data);

            console.log(data);
            callback(data);
        };

        this.state.websocket.send(src);
    };

    notifyRun() {
        this.runProgram("", data => {
            this.setState({result: data.result})
        })
    }

    notifyOnChange(src) {
        this.setState({program: src});
    }

    render() {
        return (
            <div>
                <Menu connected={this.state.connected} notifyRun={this.notifyRun.bind(this)}/>
                <div className="page">
                    <CodePane initial={this.getInitialProgram()} notifyOnChange={this.notifyOnChange.bind(this)}/>
                    <OutputPane output={this.state.result}/>
                </div>
            </div>
        );
    }

    getInitialProgram() {
        return `/// We can use Flix as an ordinary Datalog solver.

/// Declare two predicate symbols.
rel DirectedEdge(x: Int, y: Int)
rel Connected(x: Int, y: Int)

/// Declare some edge facts.
DirectedEdge(1, 2).
DirectedEdge(2, 3).
DirectedEdge(2, 4).
DirectedEdge(3, 5).

// Declare some constraints.
Connected(x, y) :- DirectedEdge(x, y).
Connected(x, z) :- Connected(x, y), DirectedEdge(y, z).
`
    }
}


export default App;
