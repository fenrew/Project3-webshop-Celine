import React, { Component } from 'react';
import CurrentEvents from "./CurrentEvents"
import CreateEvent from "./event-create/CreateEvent"

class events extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    render() {
        return (
            <div>
                <div className="navigation-fix"></div>
                <CurrentEvents />
                <CreateEvent />
            </div>
        );
    }
}

export default events;