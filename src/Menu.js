import React from 'react';
import {Alert, Badge, Button, Spinner} from "reactstrap";

class Menu extends React.Component {

    getConnectionStatus() {
        if (this.props.connected === undefined) {
            return <Badge color="secondary" className="float-right"> Connecting </Badge>
        } else if (this.props.connected === true) {
            return <Badge color="success" className="float-right"> Connected! </Badge>
        } else {
            return <Badge color="danger" className="float-right"> Disconnected! </Badge>
        }
    }

    render() {
        return (
            <div className="menu">
                <Button outline color="primary" size="lg" onClick={this.props.notifyRun}>Run</Button>

                <Spinner type="grow" color="primary"/>

                {this.getConnectionStatus()}
            </div>
        )
    }

}

export default Menu;
