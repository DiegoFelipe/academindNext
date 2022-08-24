import { useRouter } from "next/router";
import React from "react";

import { getEventById } from "../../dummy-data";

export default function EventDetail() {
  const router = useRouter();

  const eventId = router.query.eventId;

  getEventById(eventId);
  return <div>Event Details</div>;
}
