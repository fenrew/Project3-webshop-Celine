import React, { Component } from "react";
import CurrentEvents from "./CurrentEvents";
import SpecificEvent from "./SpecificEventInfo";
import CreateEvent from "./event-create/CreateEvent";
import api from "../utils/api";

class events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      siteSpecific: false,
      singelEvent: "",
      admin: false,
      events: []
    };

    this._clickHandler = this._clickHandler.bind(this);
    this._clickGoBack = this._clickGoBack.bind(this);
  }

  componentDidMount() {
    api.get("/api/user/admin").then(result => {
      let response = result.response;
      if (response) {
        this.setState({
          admin: true
        });
      } else return;
    });

    api.get("/api/all/events").then(response => {
      let newEvents = response.events;
      this.setState({
        events: newEvents
      });
    });
  }

  render() {
    if (this.state.siteSpecific) {
      let newEvent = this.state.events[this.state.singelEvent];
      return (
        <SpecificEvent
          clickGoBack={this._clickGoBack}
          header={newEvent.header}
          oneliner={newEvent.oneliner}
          info={newEvent.info}
          img={newEvent.img}
          toTime={newEvent.toTime}
          fromTime={newEvent.fromTime}
        />
      );
    }

    let mappedEvents = this.state.events.map((el, index) => (
      <CurrentEvents
        clickHandler={this._clickHandler}
        header={el.header}
        oneliner={el.oneliner}
        info={el.info}
        img={el.img}
        toTime={el.toTime}
        fromTime={el.fromTime}
        index={index}
        key={index}
      />
    ));

    if (this.state.admin) {
      return (
        <div>
          <div className="navigation-fix" />
          <div className="whole-container-for-create-events">
            <CreateEvent />
          </div>
          <div className="whole-container-for-events">
            <div className="shadow-container-events">{mappedEvents}</div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="navigation-fix" />
        <div className="whole-container-for-events">{mappedEvents}</div>
      </div>
    );
  }

  _clickHandler(index) {
    this.setState({
      siteSpecific: true,
      singelEvent: index
    });
  }

  _clickGoBack() {
      this.setState({
        siteSpecific: false,
        singelEvent: ""
      })
  }
}

export default events;
