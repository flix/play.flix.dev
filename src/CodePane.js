import React from 'react';
import Editor from "./util/Editor";

class CodePane extends React.Component {
    render() {
        return (
            <div className="code-pane">
                <Editor code={this.props.initial} notifyOnChange={this.props.notifyOnChange}/>
            </div>
        )
    }

}

export default CodePane;
