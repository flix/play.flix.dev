import Editor from './Editor'

export default function LeftPane({ initial, notifyOnChange, isDark }) {
  return (
    <div className="left-pane">
      <Editor code={initial} notifyOnChange={notifyOnChange} isDark={isDark} />
    </div>
  )
}
