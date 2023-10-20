import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "antd";
import { AppContext } from "../../App";
// component
import AppCalendar from "./AppCalender";
import Indicators from "../indicator/Indicators";
import EventViewer from "./EventViewer";
import CommonSectionHeader from "../../components/landing/commonSectionHeader/CommonSectionHeader";
import CalendarBg from "../../assets/background/calender.svg";
//css
import styles from "./calendar.module.sass";

export default function Calendar(eventsData) {
  const { events, services } = useContext(AppContext);
  const [displayEvent, setDisplayEvent] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [event, setEvents] = useState(null);
  useEffect(() => {
    if (events && events.length > 0) {
      setEvents(events);
    }
  }, [events]);
  return (
    <div
      className={`${styles.calender_bg}`}
      style={{
        backgroundImage: `url(${CalendarBg})`,
      }}
    >
      <div className={`${styles.calender_container} pt-5`}>
        <CommonSectionHeader title={"Events Calendar"} sliderSection={false} />
        <div className={`${styles.calender_subcontainer}`}>
          <Row>
            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <div className={`${styles.main}`}>
                    {event &&
                      event.length > 0 &&
                      services &&
                      services.length > 0 && (
                        <AppCalendar
                          eventsData={event}
                          servicesData={services}
                          setDisplayEvent={setDisplayEvent}
                          setSelectedDay={setSelectedDay}
                        />
                      )}
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Indicators onColorIndicatorClick={() => {}} />
                </Col>
              </Row>
            </Col>
            <Col xs={0} sm={0} md={6} lg={6} xl={6}>
              <div className={`${styles.slider}`}>
                {/* <Scrollbars style={{ width: "100%", height: "100%" }}> */}
                <EventViewer
                  displayEvent={displayEvent}
                  selectedDay={selectedDay}
                />
                {/* </Scrollbars> */}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
