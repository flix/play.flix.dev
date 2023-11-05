import React, {Component} from 'react';
import AceEditor from 'react-ace'

import "ace-builds/src-noconflict/mode-scala";
import "ace-builds/src-noconflict/theme-xcode";

class Editor extends Component {
    onChange = input => {
        this.props.notifyOnChange(input)
    };

    render() {
        return (
            <div>
                <div>
                    <div>
                        <AceEditor
                            mode='scala'
                            theme='xcode'
                            ref="aceEditor"
                            fontSize={14}
                            showGutter={true}
                            showPrintMargin={true}
                            highlightActiveLine={true}
                            highlightSelectedWord={true}
                            onChange={this.onChange}
                            value={this.props.code}
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
