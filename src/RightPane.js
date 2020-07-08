import React from 'react';
import CircleLoader from 'react-spinners/CircleLoader';
import GridLoader from 'react-spinners/GridLoader';
import HashLoader from 'react-spinners/HashLoader';
import prettyms from 'pretty-ms';

class RightPane extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "spinner": Math.floor(3 * Math.random())
        }
    }

    getResult() {
        if (this.props.result !== undefined) {
            return <code>
                    <pre>
                    {this.props.result}
                    </pre>
            </code>
        } else {
            if (this.state.spinner === 0) {
                return <div className="spinner">
                    <CircleLoader
                        sizeUnit={"px"}
                        size={150}
                        color={'#28a745'}
                        loading={true}
                    />
                </div>
            } else if (this.state.spinner === 2) {
                return <div className="spinner">
                    <HashLoader
                        sizeUnit={"px"}
                        size={150}
                        color={'#28a745'}
                        loading={true}
                    />
                </div>
            } else {
                return <div className="spinner">
                    <GridLoader
                        sizeUnit={"px"}
                        size={50}
                        color={'#28a745'}
                        loading={true}
                    />
                </div>
            }
        }
    }

    getStatistics() {
        if (this.props.version !== undefined) {
            return <div className="statistics">
                (
                {this.props.version}
                {this.getCompilationTime()}
                {this.getEvaluationTime()}
                )
            </div>
        }
    }

    getCompilationTime() {
        if (this.props.compilationTime === undefined)
            return undefined;
        else
            return <span>, compile: {prettyms(this.props.compilationTime / (1000 * 1000))}, </span>;
    }

    getEvaluationTime() {
        if (this.props.evaluationTime === undefined)
            return undefined;
        else
            return <span>evaluate: {prettyms(this.props.evaluationTime / (1000 * 1000))}</span>;
    }

    render() {
        return (
            <div className="right-pane">
                <div className="right-pane-top">
                    <h3>Standard Output</h3>
                    {this.getResult()}
                </div>
                <div className="right-pane-bot">
                    {this.getStatistics()}
                </div>
            </div>
        )
    }
}

export default RightPane;
