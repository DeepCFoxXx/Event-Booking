import React, { Component } from "react";

import "./Events.css";

class EventsPage extends Component {
  render() {
    return (
      <div className="events-control">
        <p>Create Your Own Events</p>
        <button className="btn">Create Event</button>
      </div>
    );
  }
}

export default EventsPage;
