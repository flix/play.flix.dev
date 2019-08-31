import React from 'react';
import {Badge, Button} from "reactstrap";
import FontAwesome from 'react-fontawesome';

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
                <Button outline color="secondary" onClick={this.props.notifyRun}>
                    Run <FontAwesome name='play'/>
                </Button>

                {this.getConnectionStatus()}
            </div>
        )
    }

}

export default Menu;
