import { Helmet } from "react-helmet";
//component
import EventsActivities from "../../container/eventsActivities/EventsActivities";
//Logo
import Logo from "../../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";

export default function EventsActivitiesPage() {
  return (
    <>
      <Helmet>
        <title>Events</title>
        <meta property="og:title" content="IsDB - Events" />
        <meta property="og:image" content={Logo} />
      </Helmet>
      <EventsActivities />
    </>
  );
}
