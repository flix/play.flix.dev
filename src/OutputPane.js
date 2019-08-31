import React from 'react';
import GridLoader from 'react-spinners/GridLoader';

class OutputPane extends React.Component {

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

    render() {
        return (
            <div className="output-pane">
                <h3>Standard Output</h3>
                {this.getResult()}
            </div>
        )
    }
}

export default OutputPane;
