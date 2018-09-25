import React, { Component } from 'react';
import CreateForm from "./CreateForm"
import api from "../../utils/api"

class CreateEvent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            eventCreated: false,
            fromTime: "",
            toTime: "",
            header: "",
            oneliner: "",
            info: "",
            img: "",
        }

        this._handleChange = this._handleChange.bind(this)
        this._createEvent = this._createEvent.bind(this)
    }

    render() {
        if(this.state.eventCreated) return (
            <div className="event-created-success">
                <h1>Eventet er nå lagd!</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>Fra</td>
                            <td>{this.state.fromTime}</td>
                        </tr>
                        <tr>
                            <td>Til</td>
                            <td>{this.state.toTime}</td>
                        </tr>
                        <tr>
                            <td>Eventnavn</td>
                            <td>{this.state.header}</td>
                        </tr>
                        <tr>
                            <td>Oneliner</td>
                            <td>{this.state.oneliner}</td>
                        </tr>
                        <tr>
                            <td>Info</td>
                            <td>{this.state.info}</td>
                        </tr>
                        <tr>
                            <td>Bilde</td>
                            <td>{this.state.img}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
        return (
            <div>
                <CreateForm
                handleChange={this._handleChange}
                header={this.state.header}
                oneliner={this.state.oneliner}
                info={this.state.info}
                img={this.state.img}
                createEvent={this._createEvent}
                />
            </div>
        );
    }

    _handleChange(key, value) {
        this.setState({
            [key]: value,
        })
    }

    _createEvent() {
        const eventInfo = {
            fromTime: this.state.fromTime,
            toTime: this.state.toTime,
            header: this.state.header,
            oneliner: this.state.oneliner,
            info: this.state.info,
            img: this.state.img,
        }
        let response = api.post("/api/events", {eventInfo})
        if (response) {
            this.setState({
                eventCreated:true,
            })
        }
    }
}

export default CreateEvent;