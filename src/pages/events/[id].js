import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { useLocation } from "react-router-dom";

//component
import EventsDetails from "../../container/eventsActivities/EventsDetails";
//Logo
import Logo from "../../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";

export default function ServiceTypes() {
  // const history = useHistory();
  const location = useLocation();
  const [itemId, setItemID] = useState(null);

  useEffect(() => {
    let data = window.location.href.split("/");
    let itemId = data[data.length - 1];
    setItemID(itemId);
  }, [/* history. */ location.pathname]);

  return (
    <>
      <Helmet>
        <title>Events</title>
        <meta property="og:title" content="IsDB - Events Details" />
        <meta property="og:image" content={Logo} />
      </Helmet>
      {itemId && itemId.length > 0 && (
        <EventsDetails routePath={{ id: itemId }} />
      )}
    </>
  );
}
