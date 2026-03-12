import Ansi from 'ansi-to-react'
import GridLoader from 'react-spinners/GridLoader'
import prettyms from 'pretty-ms'

export default function RightPane({ result, version, compilationTime, evaluationTime }) {
  function getResult() {
    if (result !== undefined) {
      return (
        <code>
          <pre><Ansi>{result}</Ansi></pre>
        </code>
      )
    } else {
      return (
        <div className="spinner">
          <GridLoader sizeUnit={'px'} size={50} color={'#28a745'} loading={true} />
        </div>
      )
    }
  }

  function getCompilationTime() {
    if (compilationTime === undefined) return undefined
    else return <span>, compile: {prettyms(compilationTime / (1000 * 1000))}, </span>
  }

  function getEvaluationTime() {
    if (evaluationTime === undefined) return undefined
    else return <span>evaluate: {prettyms(evaluationTime / (1000 * 1000))}</span>
  }

  function getStatistics() {
    if (version !== undefined) {
      return (
        <div className="statistics">
          ({version}
          {getCompilationTime()}
          {getEvaluationTime()})
        </div>
      )
    }
  }

  return (
    <div className="right-pane">
      <div className="right-pane-top">
        <h3>Standard Output</h3>
        {getResult()}
      </div>
      <div className="right-pane-bot">{getStatistics()}</div>
    </div>
  )
}
