import { useState } from "react";
import { Row, Col } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import { useHistory } from "react-router-dom";
//component
import EventsCard from "../../../common_components/eventsCard/EventsCard";
import AppRoundedBtn from "../../../common_components/appRoundedBtn/AppRoundedBtn";
import EventRegistrationModal from "../../../common_components/appModal/eventRegistrationModal/EventRegistrationModal";
//css
import styles from "./events-intro-section.module.sass";

export default function EventsIntroSection({
  title,
  event,
  bg,
  bgImage,
  boxShadow,
}) {
  const [eventRegistrationModal, setEventRegistrationModal] = useState(false);
  const history = useHistory();

  return (
    <div className={`${styles.events_bg}`}>
      <div className={`${styles.events_container} py-5`}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <h3 className={`${styles.upcoming_events_title} mb-5`}>{title}</h3>
          </Col>
          <Col xs={24} sm={24} md={10} lg={8} xl={8}>
            <EventsCard
              bg={bg}
              bgImage={bgImage}
              boxShadow={boxShadow}
              data={event}
              btn={false}
            />
          </Col>
          <Col xs={24} sm={24} md={14} lg={16} xl={16}>
            <div
              className={`d-flex justify-content-center flex-column h-100 pl-4`}
            >
              <h3 className={`${styles.event_title}`}>{event.Title}</h3>
              <p className={`${styles.event_author}`}>{event.Author0}</p>
              <p className={`${styles.event_description} mb-3`}>
                <Scrollbars style={{ height: "136px" }}>
                  {event.Description}
                </Scrollbars>
              </p>
              <div className={`mt-1`}>
                <AppRoundedBtn
                  text={"View More"}
                  prefix={""}
                  suffix={""}
                  bg={"blue"}
                  outline={"dark"}
                  long={true}
                  href={"none"}
                  btnStyle={{}}
                  onClickHandler={(e) => {
                    history.push(`/events/${event.Id}`);
                  }}
                />
                <EventRegistrationModal
                  setVisiblety={setEventRegistrationModal}
                  visible={eventRegistrationModal}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
