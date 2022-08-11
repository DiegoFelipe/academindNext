import React from "react";
import EventItem from "./event-item";
import styles from "./event-list.module.css";

export default function EventList(props) {
  const { events } = props;
  return (
    <ul className={styles.list}>
      {events.map((item) => (
        <EventItem
          key={item.id}
          id={item.id}
          title={item.title}
          location={item.location}
          date={item.date}
          image={item.image}
        />
      ))}
    </ul>
  );
}
