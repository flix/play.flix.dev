import Editor from './Editor'

export default function LeftPane({ initial, notifyOnChange }) {
  return (
    <div className="left-pane">
      <Editor code={initial} notifyOnChange={notifyOnChange} />
    </div>
  )
}
