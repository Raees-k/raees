import React, { useState, useEffect, useContext } from "react";
//component
import Layout from "../layout/Layout";
import InnerPageTitleSection from "../../common_components/innerPageTitleSection/InnerPageTitleSection";
import EventsIntroSection from "../../components/eventsActivities/eventsIntroSection/EventsIntroSection";
import AllEventsActivities from "../../components/eventsActivities/allEventsActivities/AllEventsActivities";
import Slider from "../../components/eventsActivities/slider/Slider";
import Calendar from "../../common_components/calendar/Calendar";

import { AppContext } from "../../App";
//services
import { setBackground } from "../../services/eventService";
//css
import styles from "./events-activities.module.sass";
//Bg
import Hero from "../../assets/general/hero.svg";
import DottedLine from "../../assets/general/Dotted-line-path-301.svg";
import SearchBar from "../../common_components/searchBar/SearchBar";
import { Button, Popconfirm } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const items = [];

function setSliderData(eventsData, serviceData) {
  let title = "Upcoming Events";
  let filteredEventsData = eventsData.filter(
    (eventData) =>
      new Date(eventData.StartDate).getTime() > new Date().getTime()
  );
  if (filteredEventsData && filteredEventsData.length === 0) {
    title = "Recent Events";
    filteredEventsData = eventsData.filter(
      (eventData) =>
        new Date(eventData.StartDate).getTime() <= new Date().getTime() &&
        new Date(eventData.EndDate).getTime() >= new Date().getTime()
    );
  }
  if (filteredEventsData && filteredEventsData.length === 0) {
    title = "Past Events";
    filteredEventsData = eventsData.filter(
      (eventData) =>
        new Date(eventData.EndDate).getTime() < new Date().getTime()
    );
  }

  filteredEventsData.forEach((event, i) => {
    let [bg, bgImage, boxShadow] = setBackground(event, serviceData);
    items.push(
      <div data-value={i.toString()}>
        <EventsIntroSection
          title={title}
          event={event}
          bg={bg}
          bgImage={bgImage}
          boxShadow={boxShadow}
        />
      </div>
    );
  });
}

export default function EventsActivities() {
  const { events, services } = useContext(AppContext);
  const [eventsData, setEventsData] = useState(null);
  const [serviceData, setServiceData] = useState(null);

  useEffect(() => {
    if (events && events.length > 0 && services && services.length > 0) {
      setSliderData(events, services);
      setEventsData(events);
      setServiceData(services);
    }
  }, [events, services]);

  const title = () => {
    return <SearchBar search={"events"} styleApply={true} />;
  };

  return (
    <>
      {eventsData &&
        eventsData.length > 0 &&
        serviceData &&
        serviceData.length > 0 && (
          <Layout>
            <div /* className={`position-relative`} */>
              <div className={`${styles.bg_color}`}></div>
              <div
                className={`${styles.bg_pattern}`}
                style={{
                  backgroundImage: `url(${Hero}),url(${DottedLine})`,
                }}
              ></div>
              <div className="d-flex container">
                <InnerPageTitleSection title={"events & activities"} />
                <div className="mt-5 mx-2">
                  <Popconfirm title={title} okText="" cancelText="">
                    <Button
                      type="text"
                      icon={<SearchOutlined className={styles.search_icon} />}
                      className={`${styles.search_btn}`}
                    />
                  </Popconfirm>
                </div>
              </div>
              {/* <SearchBar search={"events"} styleApply={true} /> */}
              <Slider items={items} eventsData={eventsData} />
            </div>
            <Calendar />
            <AllEventsActivities
              eventsData={eventsData}
              serviceData={serviceData}
            />
          </Layout>
        )}
    </>
  );
}
