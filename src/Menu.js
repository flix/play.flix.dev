import React from 'react';
import {Button, CustomInput, Form, FormGroup, Input, Label} from "reactstrap";
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
                        id="xallowredundancies"
                        type="checkbox"
                        inline={true}
                        label="Allow Unused Code"
                        checked={this.props.options.xallowredundancies}
                        onChange={() => this.props.notifyOptionsChange("xallowredundancies")}
                        className="ml-3"/>

                    <CustomInput
                        id="xcore"
                        type="checkbox"
                        inline={true}
                        label="Std Library"
                        checked={!this.props.options.xcore}
                        onChange={() => this.props.notifyOptionsChange("xcore")}/>

                    <CustomInput
                        id="xnoeffects"
                        type="checkbox"
                        inline={true}
                        label="  Effects"
                        checked={!this.props.options.xnoeffects}
                        onChange={() => this.props.notifyOptionsChange("xnoeffects")}/>

                    <CustomInput
                        id="xnostratifier"
                        type="checkbox"
                        inline={true}
                        label="Stratifier"
                        checked={!this.props.options.xnostratifier}
                        onChange={() => this.props.notifyOptionsChange("xnostratifier")}/>
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
