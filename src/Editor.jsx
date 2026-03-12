import { useState, useEffect } from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-flix'
import 'ace-builds/src-noconflict/theme-xcode'
import 'ace-builds/src-noconflict/theme-tomorrow_night'

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = e => setMatches(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])
  return matches
}

export default function Editor({ code, notifyOnChange, isDark }) {
  const isSmallScreen = useMediaQuery('(max-width: 1400px)')
  const editorHeight = isSmallScreen ? 'calc(50vh - 3.5rem)' : 'calc(100vh - 5.8rem)'

  return (
    <div>
      <div>
        <div>
          <AceEditor
            mode="flix"
            theme={isDark ? 'tomorrow_night' : 'xcode'}
            fontSize={14}
            showGutter={true}
            showPrintMargin={true}
            highlightActiveLine={true}
            highlightSelectedWord={true}
            onChange={notifyOnChange}
            value={code}
            autoScrollEditorIntoView={true}
            width={'100%'}
            height={editorHeight}
            editorProps={{
              $blockScrolling: true,
            }}
          />
        </div>
      </div>
    </div>
  )
}
