import React from 'react';
import GridLoader from 'react-spinners/GridLoader';
import prettyms from 'pretty-ms';

class RightPane extends React.Component {

    getResult() {
        if (this.props.result !== undefined) {
            return <code>
                    <pre>
                    {this.props.result}
                    </pre>
            </code>
        } else {
            return <div className="spinner">
                <GridLoader
                    sizeUnit={"px"}
                    size={50}
                    color={'#28a745'}
                    loading={true}
                    className="loader"
                />
            </div>
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
                <h3>Standard Output</h3>
                {this.getResult()}
                {this.getStatistics()}
            </div>
        )
    }
}

export default RightPane;
