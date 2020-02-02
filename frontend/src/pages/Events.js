import React, { Component } from "react";

import Modal from "../components/Modal/Modal";
import "./Events.css";

class EventsPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Modal title="Add Event" canCancel canConfirm>
          <p>Modal Content</p>
        </Modal>
        <div className="events-control">
          <p>Create Your Own Events</p>
          <button className="btn">Create Event</button>
        </div>
      </React.Fragment>
    );
  }
}

export default EventsPage;
