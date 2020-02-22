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
                        id="enableEffects"
                        type="checkbox"
                        inline={true}
                        label="Effects"
                        checked={this.props.options.enableEffects}
                        onChange={() => this.props.notifyOptionsChange("enableEffects")}/>

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

                    <a href="https://flix.dev/programming-flix/">
                        <Button color="link" className="ml-3">
                            Documentation
                        </Button>
                    </a>

                    <a href="https://flix.dev/api/">
                        <Button color="link" className="ml-3">
                            Standard Library
                        </Button>
                    </a>
                </div>

            </div>
        )
    }

}

export default Menu;
