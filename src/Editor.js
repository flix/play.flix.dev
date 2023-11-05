import React, {Component} from 'react';
import AceEditor from 'react-ace'

import "ace-builds/src-noconflict/mode-flix";
import "ace-builds/src-noconflict/theme-xcode";

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {input: this.props.code}
    }

    onChange = input => {
        this.setState({input: input});
        this.props.notifyOnChange(input)
    };

    render() {
        return (
            <div>
                <div>
                    <div>
                        <AceEditor
                            mode='flix'
                            theme='xcode'
                            ref="aceEditor"
                            fontSize={14}
                            showGutter={true}
                            showPrintMargin={true}
                            highlightActiveLine={true}
                            highlightSelectedWord={true}
                            onChange={this.onChange}
                            value={this.state.input}
                            autoScrollEditorIntoView={true}
                            width={"100%"}
                            height={"calc(100vh - 5.8rem)"}
                            editorProps={{
                                $blockScrolling: true
                            }}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Editor
