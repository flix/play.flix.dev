import React from 'react';
import './App.css';

import ReconnectingWebSocket from 'reconnecting-websocket';

import Menu from "./Menu";
import LeftPane from "./LeftPane";
import RightPane from "./RightPane";

const SocketAddress = 'wss://evaluator.flix.dev/ws';

class App extends React.Component {

    constructor(props) {
        super(props);

        let initialProgram = localStorage.getItem("program");
        if (typeof (initialProgram) !== "string") {
            console.log("No program saved in local storage. Using default.");
            initialProgram = this.getInitialProgram()
        }

        this.state = {
            connected: undefined,
            program: initialProgram,
            result: ""
        };

        this.connect();
    }

    connect() {
        let options = {
            connectionTimeout: 2500
        };

        console.log("Connecting to: " + SocketAddress);

        this.websocket = new ReconnectingWebSocket(SocketAddress, [], options);

        this.websocket.addEventListener("open", event => {
            console.log("Connected to: " + SocketAddress);
            this.setState({connected: true});
        });
        this.websocket.addEventListener("close", event => {
            console.log("Disconnected from: " + SocketAddress);
            console.log(event);
            this.setState({connected: false});
        });
        this.websocket.addEventListener("error", event => {
            console.log("Disconnected from: " + SocketAddress);
            console.log(event);
            this.setState({connected: false});
        });
    }

    runProgram(src, callback) {
        if (!this.state.connected) {
            console.log("Not connected yet");
            return;
        }

        this.websocket.onmessage = event => {
            console.log("Received reply from: " + SocketAddress);
            const data = JSON.parse(event.data);

            console.log(data);
            callback(data);
        };

        this.websocket.send(src);
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
