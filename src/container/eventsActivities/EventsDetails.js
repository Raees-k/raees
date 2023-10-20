import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CONST } from "../../constant/index";
import { AppContext } from "../../App";
//component
import Layout from "../layout/Layout";
import InnerPageTitleSection from "../../common_components/innerPageTitleSection/InnerPageTitleSection";
import EventDetailsIntro from "../../components/eventDetails/eventDetailsIntro/EventDetailsIntro";
import RecentEventActivities from "../../components/eventDetails/recentEventActivities/RecentEventActivities";
//css
import styles from "./events-details.module.sass";
//Bg
import Hero from "../../assets/general/hero.svg";
import Dotted from "../../assets/general/Dotted-line-path-301.svg";

export default function EventsDetails({ routePath }) {
  const { events, services } = useContext(AppContext);
  const [allData, setAllData] = useState(null);
  const [eventsData, setEventsData] = useState(null);

  useEffect(() => {
    if (
      routePath &&
      Object.keys(routePath).length > 0 &&
      events &&
      events.length > 0
    ) {
      console.log("EVENTS", events);
      if (!window.location.hash) {
        window.location = window.location + "#loaded";
        window.location.reload();
      }
      // For single data
      axios
        .get(
          `${CONST.BASE_URL}${CONST.API.LIST("Event")}${CONST.API.QUERY(
            "Title,Id,CreatedDate,StartDate,EndDate,RegistrationLink,Speaker,Location,EventType,Author0,Description,AttachmentFiles"
          )} ${CONST.API.ATTACHMENT} ${CONST.API.FILTER("Id", routePath.id)}`
        )
        .then((res) => {
          setEventsData(res.data.value);
        })
        .catch((err) => console.log(err));
      // For all data
      setAllData(events);
    }
  }, [routePath, events]);
  console.log("EventsData-->", allData, events, services);
  return (
    <>
      {
        <Layout>
          <div className={`position-relative`}>
            <div className={`${styles.bg_color}`}></div>
            <div
              className={`${styles.bg_pattern}`}
              style={{
                backgroundImage: `url(${Hero}),url(${Dotted})`,
              }}
            ></div>
            <div className="container">
              <InnerPageTitleSection title={"Event Details"} />
            </div>
            {eventsData && eventsData?.length > 0 && (
              <EventDetailsIntro eventData={eventsData} />
            )}
          </div>
          {allData &&
            allData?.length > 0 &&
            services &&
            services?.length > 0 && (
              <RecentEventActivities eventsData={allData} services={services} />
            )}
        </Layout>
      }
    </>
  );
}
