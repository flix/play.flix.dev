import { useState } from 'react'
import { Button, Form } from 'reactstrap'
import SamplesData from './data/Samples'
import { compressToURL } from './compression'

export default function Menu({ connected, notifyRun, notifySampleChange, program }) {
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
    const groups = new Map()
    SamplesData.forEach((sample, index) => {
      const slashIndex = sample.name.indexOf('/')
      const group = slashIndex !== -1 ? sample.name.slice(0, slashIndex) : ''
      const displayName = slashIndex !== -1 ? sample.name.slice(slashIndex + 1) : sample.name
      if (!groups.has(group)) {
        groups.set(group, [])
      }
      groups.get(group).push({ index, displayName })
    })

    function formatGroupLabel(key) {
      if (!key) return 'Other'
      return key
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }

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

        {[...groups.entries()].map(([group, samples]) => (
          <optgroup key={group} label={formatGroupLabel(group)}>
            {samples.map(({ index, displayName }) => (
              <option key={index} value={index}>
                {displayName}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    )
  }

  function onDropdownChoice(event) {
    let newChoice = Number(event.target.value)
    setChoice(newChoice)
    notifySampleChange(SamplesData[newChoice].code)
  }

  async function updateLinkUrl() {
    const url = await compressToURL(program)
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
