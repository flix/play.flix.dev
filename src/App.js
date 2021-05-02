import React from 'react';
import './App.css';

import ReconnectingWebSocket from 'reconnecting-websocket';

import LZString from "lz-string";

import Menu from "./Menu";
import LeftPane from "./LeftPane";
import RightPane from "./RightPane";

const SocketAddress = 'wss://evaluator.flix.dev/ws';

class App extends React.Component {

    constructor(props) {
        super(props);

        // Determine the initial program to put in the editor.
        let initialProgram = undefined

        // Decode the initial program from the query param (if available).
        let urlParams = new URLSearchParams(window.location.search);
        let qparam = urlParams.get('q')
        if (typeof qparam === "string" && qparam.length > 0) {
            console.log("Using initial program from query parameter.")
            initialProgram = LZString.decompressFromEncodedURIComponent(qparam)
        }

        // Otherwise, retrieve the initial program from local storage (if available).
        if (initialProgram === undefined) {
            let storedProgram = localStorage.getItem("program");
            if (typeof storedProgram === "string") {
                console.log("Using initial program from local storage.")
                initialProgram = storedProgram
            }
        }

        // Otherwise use the default program.
        if (initialProgram === undefined) {
            console.log("Using default initial program.");
            initialProgram = this.getInitialProgram()
        }

        this.state = {
            connected: undefined,
            program: initialProgram,
            options: {
                enableUnusedCode: true,
                enableLibrary: true,
            },
            result: "",
            version: undefined,
            compilationTime: undefined,
            evaluationTime: undefined,
            url: LZString.compressToEncodedURIComponent(initialProgram)
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

        let options = this.state.options;

        let data = {
            src: src,
            "xallowredundancies": options.enableUnusedCode,
            "xcore": !options.enableLibrary
        };

        this.websocket.send(JSON.stringify(data));
    };

    notifyRun() {
        let t = new Date();
        this.setState({result: undefined, version: undefined, compilationTime: undefined, evaluationTime: undefined});
        this.runProgram(this.state.program, data => {
            let e = new Date() - t;
            console.log("Elapsed: " + e + "ms.");
            this.setState({
                result: data.result,
                version: data.version,
                compilationTime: data.compilationTime,
                evaluationTime: data.evaluationTime
            })
        })
    }

    notifyOnChange(src) {
        localStorage.setItem("program", src);
        let qparam = LZString.compressToEncodedURIComponent(src)
        let url = "?q=" + qparam
        this.setState({program: src, url: url});
    }

    notifyOptionsChange(key) {
        let opts = this.state.options;
        opts[key] = !opts[key];
        this.setState({options: opts})
    }

    render() {
        return (
            <div>
                <Menu connected={this.state.connected}
                      options={this.state.options}
                      notifyRun={this.notifyRun.bind(this)}
                      notifyOptionsChange={this.notifyOptionsChange.bind(this)}
                      url={this.state.url}/>
                <div className="page">
                    <LeftPane initial={this.state.program} notifyOnChange={this.notifyOnChange.bind(this)}/>
                    <RightPane
                        result={this.state.result}
                        version={this.state.version}
                        compilationTime={this.state.compilationTime}
                        evaluationTime={this.state.evaluationTime}/>
                </div>
            </div>
        );
    }

    getInitialProgram() {
        return `/// An algebraic data type for shapes.
enum Shape {
    case Circle(Int),        // circle radius
    case Square(Int),        // side length
    case Rectangle(Int, Int) // height and width
}

/// Computes the area of the given shape using 
/// pattern matching and basic arithmetic.
def area(s: Shape): Int = match s {
    case Circle(r)       => 3 * (r * r)
    case Square(w)       => w * w
    case Rectangle(h, w) => h * w
}

// Computes the area of a 2 by 4.
def main(): Int = area(Rectangle(2, 4))
`
    }
}


export default App;
