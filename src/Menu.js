import React from 'react';
import {Badge, Button} from "reactstrap";
import FontAwesome from 'react-fontawesome';

class Menu extends React.Component {

    getConnectionStatus() {
        if (this.props.connected === undefined) {
            return <Badge color="secondary" className="mt-2"> Connecting </Badge>
        } else if (this.props.connected === true) {
            return <Badge color="success" className=" mt-2"> Connected! </Badge>
        } else {
            return <Badge color="danger" className=" mt-2"> Disconnected! </Badge>
        }
    }

    render() {
        return (
            <div className="menu">
                <Button color="success" onClick={this.props.notifyRun}>
                    Run <FontAwesome name="play" className="ml-1"/>
                </Button>

                {this.getConnectionStatus()}

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
