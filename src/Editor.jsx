import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-flix'
import 'ace-builds/src-noconflict/theme-xcode'

export default function Editor({ code, notifyOnChange }) {
  return (
    <div>
      <div>
        <div>
          <AceEditor
            mode="flix"
            theme="xcode"
            fontSize={14}
            showGutter={true}
            showPrintMargin={true}
            highlightActiveLine={true}
            highlightSelectedWord={true}
            onChange={notifyOnChange}
            value={code}
            autoScrollEditorIntoView={true}
            width={'100%'}
            height={'calc(100vh - 5.8rem)'}
            editorProps={{
              $blockScrolling: true,
            }}
          />
        </div>
      </div>
    </div>
  )
}
