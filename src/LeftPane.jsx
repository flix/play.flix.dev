import React from 'react'
import Editor from './Editor'

class LeftPane extends React.Component {
  render() {
    return (
      <div className="left-pane">
        <Editor code={this.props.initial} notifyOnChange={this.props.notifyOnChange} />
      </div>
    )
  }
}

export default LeftPane
