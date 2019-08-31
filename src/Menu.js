import React from 'react';
import {Button} from "reactstrap";
import FontAwesome from 'react-fontawesome';

class Menu extends React.Component {

    getRunButton() {
        if (this.props.connected === undefined) {
            return <Button disabled color="secondary"> Connecting... </Button>
        } else if (this.props.connected === true) {
            return (
                <Button color="success" onClick={this.props.notifyRun}>
                    Run <FontAwesome name="play" className="ml-1"/>
                </Button>
            )
        } else {
            return <Button disabled color="danger"> Disconnected! Try to refresh the page... </Button>
        }
    }

    render() {
        return (
            <div className="menu">

                {this.getRunButton()}

                <a href="https://flix.dev/">
                    <Button color="info" className="float-right ml-3">
                        Website
                    </Button>
                </a>

                <a href="https://flix.dev/programming-flix/">
                    <Button color="info" className="float-right ml-3">
                        Documentation
                    </Button>
                </a>

                <a href="https://flix.dev/api/">
                    <Button color="info" className="float-right ml-3">
                        Standard Library
                    </Button>
                </a>

            </div>
        )
    }

}

export default Menu;
