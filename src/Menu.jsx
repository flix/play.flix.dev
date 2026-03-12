import { useState } from 'react'
import { Button, Form } from 'reactstrap'
import SamplesData from './data/Samples'

export default function Menu({ connected, notifyRun, notifySampleChange, url }) {
  const [choice, setChoice] = useState(undefined)

  function getRunButton() {
    if (connected === undefined) {
      return (
        <Button disabled color="secondary" className="ml-2">
          Connecting...
        </Button>
      )
    } else if (connected === true) {
      return (
        <Button color="primary" onClick={notifyRun}>
          Compile & Run <i className="fa fa-play ml-2" />
        </Button>
      )
    } else {
      return (
        <Button disabled color="danger" className="ml-2">
          Disconnected!
        </Button>
      )
    }
  }

  function getDropDown() {
    return (
      <select
        defaultValue={'placeholder'}
        value={choice}
        onChange={onDropdownChoice}
        style={{ textOverflow: 'ellipsis' }}
        className="ml-2 w-75"
      >
        <option disabled value="placeholder">
          -- select example --
        </option>

        {SamplesData.map((sample, index) => (
          <option key={index} value={index}>
            {sample.name}
          </option>
        ))}
      </select>
    )
  }

  function onDropdownChoice(event) {
    let newChoice = Number(event.target.value)
    setChoice(newChoice)
    notifySampleChange(SamplesData[newChoice].code)
  }

  function updateLinkUrl() {
    window.history.pushState(undefined, undefined, url)
  }

  return (
    <div className="menu">
      <Form>
        {getRunButton()}
        {getDropDown()}
      </Form>

      <div className="links">
        <a href="https://flix.dev/">
          <Button color="link" className="ml-3">
            Website
          </Button>
        </a>

        <a href="https://doc.flix.dev/">
          <Button color="link" className="ml-3">
            Documentation
          </Button>
        </a>

        <a href="https://api.flix.dev/">
          <Button color="link" className="ml-3">
            Standard Library
          </Button>
        </a>

        <Button color="light" className="ml-3" onClick={updateLinkUrl}>
          Shareable Link <i className="fa fa-clipboard ml-2" />
        </Button>
      </div>
    </div>
  )
}
