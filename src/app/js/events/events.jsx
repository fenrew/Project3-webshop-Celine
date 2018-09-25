import React, { Component } from "react";
import CurrentEvents from "./CurrentEvents";
import CreateEvent from "./event-create/CreateEvent";
import api from "../utils/api";

class events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      admin: false,
      events: ""
    };
  }

  componentDidMount() {
    api.get("/api/user/admin").then(result => {
      let response = result.response;
      console.log(result);
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
    console.log("EVENTS", this.state.events);

    if (this.state.admin) {
      return (
        <div>
          <div className="navigation-fix" />
          <CreateEvent />
          <CurrentEvents />
        </div>
      );
    }

    let mappedEvents = this.state.events.map((el, index) => (
      <CurrentEvents
        header={el.header}
        oneliner={el.oneliner}
        info={el.info}
        img={el.img}
        toTime={el.toTime}
        fromTime={el.fromTime}
        key={index}
      />
    ));

    return (
      <div>
        <div className="navigation-fix" />
        {mappedEvents}
      </div>
    );
  }
}

export default events;
