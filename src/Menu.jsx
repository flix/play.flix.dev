import React from 'react'
import { Button, Form } from 'reactstrap'
import FontAwesome from 'react-fontawesome'
import SamplesData from './data/Samples'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      choice: undefined,
      samples: SamplesData,
    }
  }

  getRunButton() {
    if (this.props.connected === undefined) {
      return (
        <Button disabled color="secondary" className="ml-2">
          Connecting...
        </Button>
      )
    } else if (this.props.connected === true) {
      return (
        <Button color="primary" onClick={this.props.notifyRun}>
          Compile & Run <FontAwesome name="play" className="ml-2" />
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

  getDropDown() {
    return (
      <select
        defaultValue={'placeholder'}
        value={this.state.choice}
        onChange={this.onDropdownChoice.bind(this)}
        style={{ textOverflow: 'ellipsis' }}
        className="ml-2 w-75"
      >
        <option disabled value="placeholder">
          -- select example --
        </option>

        {this.state.samples.map((sample, index) => (
          <option key={index} value={index}>
            {sample.name}
          </option>
        ))}
      </select>
    )
  }

  onDropdownChoice(event) {
    let newChoice = Number(event.target.value)
    this.setState({
      choice: newChoice,
    })
    this.props.notifySampleChange(this.state.samples[newChoice].code)
  }

  updateLinkUrl() {
    window.history.pushState(undefined, undefined, this.props.url)
  }

  render() {
    return (
      <div className="menu">
        <Form>
          {this.getRunButton()}
          {this.getDropDown()}
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

          <Button color="light" className="ml-3" onClick={this.updateLinkUrl.bind(this)}>
            Shareable Link <FontAwesome name="clipboard" className="ml-2" />
          </Button>
        </div>
      </div>
    )
  }
}

export default Menu
