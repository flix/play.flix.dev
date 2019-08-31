import React from 'react';

class OutputPane extends React.Component {

    render() {
        return (
            <div className="output-pane">
                <h3>Standard Output</h3>

                <code>
                    <pre>
                    {this.props.output}
                    </pre>
                </code>
            </div>
        )
    }
}

export default OutputPane;
