import React from 'react';
import {Alert, Badge, Button, Spinner} from "reactstrap";

class Menu extends React.Component {

    getAlert() {
        if (this.props.connected) {
            return <Alert color="primary"> Connected! </Alert>
        } else {
            return <Alert color="primary"> Disconnected! </Alert>
        }
    }

    render() {
        return (
            <div className="menu">
                <Button outline color="primary" size="lg" onClick={this.props.notifyRun}>Run</Button>



                <Spinner type="grow" color="primary"/>

                <Badge color="primary" pill className="float-right">Primary</Badge>


                {this.getAlert()}

            </div>
        )
    }

}

export default Menu;
