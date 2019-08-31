import React from 'react';
import {Badge, Button} from "reactstrap";
import FontAwesome from 'react-fontawesome';

class Menu extends React.Component {

    getConnectionStatus() {
        if (this.props.connected === undefined) {
            return <Badge color="secondary" className="float-right mt-2"> Connecting </Badge>
        } else if (this.props.connected === true) {
            return <Badge color="success" className="float-right mt-2"> Connected! </Badge>
        } else {
            return <Badge color="danger" className="float-right mt-2"> Disconnected! </Badge>
        }
    }

    render() {
        return (
            <div className="menu">
                <Button color="success" onClick={this.props.notifyRun}>
                    Run <FontAwesome name="play" className="ml-1"/>
                </Button>

                {this.getConnectionStatus()}
            </div>
        )
    }

}

export default Menu;
