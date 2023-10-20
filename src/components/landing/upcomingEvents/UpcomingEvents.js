import React, { useState, useEffect, useContext } from "react";
import img1 from "../../../assets/upcomingEvent/Activities_Icons_Set2.svg";
import { Row, Col } from "antd";
import { AppContext } from "../../../App";
// component
import CommonSectionHeader from "../commonSectionHeader/CommonSectionHeader";
import AppMultiSlider from "../../../common_components/appMultiSlider/AppMultiSlider";
import EventsCard from "../../../common_components/eventsCard/EventsCard";
//service
import { setBackground } from "../../../services/eventService";
//css
import styles from "./upcoming-events.module.sass";

const responsive = {
  0: { items: 1 },
  568: { items: 2.25 },
  1000: { items: 3.25 },
  1024: { items: 4.5 },
  1440: { items: 9 },
};

let items = [];

function setItem(data, services) {
  items = [];
  data.forEach((item, i) => {
    let [bg, bgImage, boxShadow] = setBackground(item, services);
    return items.push(
      <div
        className={`item my-4 ${styles.event_card_container}`}
        data-value={i.toString()}
      >
        <EventsCard
          data={item}
          bg={bg}
          bgImage={bgImage}
          boxShadow={boxShadow}
          btn={true}
        />
      </div>
    );
  });
}

export default function UpcomingEvents() {
  const { events, services } = useContext(AppContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderFinalIndex, setSliderFinalIndex] = useState(3);
  const [prevBtn, setPrevBtn] = useState("disable");
  const [nextBtn, setNextBtn] = useState("enable");
  const [eventsData, setEventsData] = useState(null);
  const [title, setTitle] = useState("");
  let finalIndex;
  useEffect(() => {
    if (events && events?.length > 0 && services && services?.length > 0) {
      let title = "Upcoming Events";
      let displayEventsData = events.filter(
        (eventData) =>
          new Date(eventData.StartDate).getTime() > new Date().getTime()
      );
      if (displayEventsData && displayEventsData.length === 0) {
        title = "Recent Events";
        displayEventsData = events.filter(
          (eventData) =>
            new Date(eventData.StartDate).getTime() <= new Date().getTime() &&
            new Date(eventData.EndDate).getTime() >= new Date().getTime()
        );
      }
      if (displayEventsData && displayEventsData.length === 0) {
        title = "Past Events";
        displayEventsData = events.filter(
          (eventData) =>
            new Date(eventData.EndDate).getTime() < new Date().getTime()
        );
      }

      finalIndex = Math.floor(parseInt(events.length) / 3);
      setTitle(title);
      setItem(displayEventsData, services);
      setEventsData(displayEventsData);
    }
  }, [events, services]);
  //upcomming events

  useEffect(() => {
    if (window.innerWidth < 1440 && window.innerWidth > 1024)
      setSliderFinalIndex(3);

    if (window.innerWidth <= 1024 && window.innerWidth >= 768)
      setSliderFinalIndex(2);

    if (window.innerWidth < 768) setSliderFinalIndex(2);
  }, []);

  useEffect(() => {
    if (activeIndex === 0) setPrevBtn("disable");
    else setPrevBtn("enable");
    if (activeIndex === finalIndex - sliderFinalIndex) setNextBtn("disable");
    else setNextBtn("enable");
  }, [activeIndex]);

  const slidePrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const slideNext = () => {
    if (activeIndex < finalIndex - sliderFinalIndex)
      setActiveIndex(activeIndex + 1);
  };

  const onSlideChanged = ({ item }) => setActiveIndex(item);
  let skeletonData = [
    {
      data: {},
      bg: "#999",
      bgImage: img1,
      boxShadow: "0px 3px 18px #99999940",
    },
  ];

  return eventsData && eventsData.length === 0 ? null : eventsData &&
    eventsData.length > 0 ? (
    <Row className={`pt-5`}>
      <div className={`${styles.events_container}`}>
        <CommonSectionHeader
          title={`${title} & Activities`}
          sliderSection={true}
          prevBtn={prevBtn}
          nextBtn={nextBtn}
          onClickPrev={slidePrev}
          onClickNext={slideNext}
        />
      </div>

      <AppMultiSlider
        responsive={responsive}
        items={items}
        activeIndex={activeIndex}
        onSlideChanged={onSlideChanged}
        paddingLeft={100}
        paddingRight={50}
        animationType={"slide"}
        disableDotsControls={true}
        sliderFrom={"Events"}
      />
    </Row>
  ) : (
    <Row className={`pt-5`}>
      {skeletonData.map((sdata, index) => (
        <Col xs={24} sm={24} md={12} lg={6} xl={6} key={index}>
          <EventsCard
            data={sdata.data}
            bg={sdata.bg}
            bgImage={sdata.bgImage}
            boxShadow={sdata.boxShadow}
            btn={true}
          />
        </Col>
      ))}
    </Row>
  );
}
