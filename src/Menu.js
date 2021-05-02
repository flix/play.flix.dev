import React from 'react';
import {Button, CustomInput, Form} from "reactstrap";
import FontAwesome from 'react-fontawesome';

class Menu extends React.Component {

    getRunButton() {
        if (this.props.connected === undefined) {
            return <Button disabled color="secondary" className="ml-2"> Connecting... </Button>
        } else if (this.props.connected === true) {
            return (
                <Button color="success" onClick={this.props.notifyRun}>
                    Compile & Run <FontAwesome name="play" className="ml-2"/>
                </Button>
            )
        } else {
            return <Button disabled color="danger" className="ml-2"> Disconnected! Try to refresh the page... </Button>
        }
    }

    updateLinkUrl() {
        window.history.pushState(undefined, undefined, this.props.url)
    }

    render() {
        return (
            <div className="menu">

                <Form>
                    {this.getRunButton()}

                    <CustomInput
                        id="enableLibrary"
                        type="checkbox"
                        inline={true}
                        label="Library"
                        checked={this.props.options.enableLibrary}
                        onChange={() => this.props.notifyOptionsChange("enableLibrary")}
                        className="ml-3"/>

                    <CustomInput
                        id="enableUnusedCode"
                        type="checkbox"
                        inline={true}
                        label="Unused Code"
                        checked={this.props.options.enableUnusedCode}
                        onChange={() => this.props.notifyOptionsChange("enableUnusedCode")}/>

                </Form>

                <div>
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

                    <Button color="info" className="ml-3" onClick={this.updateLinkUrl.bind(this)}>
                        Shareable Link <FontAwesome name="clipboard" className="ml-2"/>
                    </Button>

                </div>

            </div>
        )
    }

}

export default Menu;
