import Head from "next/head";

import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "../components/events/event-list";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Nextjs Events</title>
        <meta name="description" content="Find a lot of events" />
      </Head>
      <EventList items={props.featuredEvents} />
    </div>
  );
}

export default HomePage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}
