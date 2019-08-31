import React from 'react';
import {Spinner} from "reactstrap";

class OutputPane extends React.Component {

    render() {
        return (
            <div className="output-pane">
                <h3>Standard Output</h3>

                <Spinner type="grow" color="primary"/>

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
