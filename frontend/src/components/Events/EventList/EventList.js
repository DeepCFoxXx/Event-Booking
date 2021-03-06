import React from "react";

import EventItem from "./EventItem/EventItem";
import "./EventList.css";

const eventList = props => {
  const events = props.eventsmap(event => {
    return <EventItem eventId={event._id} title={event.title} />;
  });
  return <ul className="event__list">{events}</ul>;
};

export default eventList;
