import React from 'react';
import './App.css';

import Menu from "./Menu";
import LeftPane from "./LeftPane";
import RightPane from "./RightPane";

const SocketAddress = 'wss://flix-evaluator.cs.au.dk/ws';

class App extends React.Component {

    constructor(props) {
        super(props);

        let initialProgram = localStorage.getItem("program");
        if (typeof (initialProgram) !== "string") {
            console.log("No program saved in local storage. Using default.");
            initialProgram = this.getInitialProgram()
        }

        console.log("Connecting to: " + SocketAddress);

        this.state = {
            connected: undefined,
            websocket: this.connect(),
            program: initialProgram,
            result: ""
        };
    }

    connect() {
        let websocket = new window.WebSocket(SocketAddress);
        websocket.onopen = event => {
            console.log("Connected to: " + SocketAddress);
            this.setState({connected: true});
        };
        websocket.onclose = event => {
            console.log("Disconnected: " + event);
            this.setState({connected: false});
        };
        websocket.onerror = event => {
            console.log("Unable to connect: " + event);
            this.setState({connected: false});
        };
        return websocket;
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
        let t = new Date();
        this.setState({result: undefined});
        this.runProgram(this.state.program, data => {
            let e = new Date() - t;
            console.log("Elapsed: " + e + "ms.");
            this.setState({result: data.result})
        })
    }

    notifyOnChange(src) {
        localStorage.setItem("program", src);
        this.setState({program: src});
    }

    render() {
        return (
            <div>
                <Menu connected={this.state.connected} notifyRun={this.notifyRun.bind(this)}/>
                <div className="page">
                    <LeftPane initial={this.state.program} notifyOnChange={this.notifyOnChange.bind(this)}/>
                    <RightPane result={this.state.result}/>
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
