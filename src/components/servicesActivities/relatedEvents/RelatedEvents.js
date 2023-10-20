import { Row, Col } from "antd";
//component
import EventsCard from "../../../common_components/eventsCard/EventsCard";
//css
import styles from "./related-events.module.sass";
//service
import { mapRoutePathToType } from "../../../services/serviceActivitieService";
import { setBackground } from "../../../services/eventService";
//Bg
import RecentBg from "../../../assets/serviceActivities/recentEventsBg.svg";

function ResponsiveView({ eventsData, services, span, gutter }) {
  return (
    eventsData &&
    eventsData.length > 0 &&
    services &&
    services.length > 0 && (
      <Row gutter={gutter}>
        {eventsData.slice(0, 3).map((event, index) => {
          let [bg, bgImage, boxShadow] = setBackground(event, services);
          return (
            <Col
              span={span}
              className={`p-0 d-flex align-items-center flex-column`}
              key={index}
            >
              <EventsCard
                bg={bg}
                bgImage={bgImage}
                boxShadow={boxShadow}
                data={event}
                btn={true}
              />
            </Col>
          );
        })}
      </Row>
    )
  );
}

export default function RelatedEvents({ title, eventsData, services, path }) {
  let relatedEvents = eventsData.filter(
    (eventData) =>
      services &&
      services.length > 0 &&
      eventData.EventType.toString() === mapRoutePathToType(path, services)
  );

  let filteredEventsData = relatedEvents.filter(
    (eventData) =>
      new Date(eventData.StartDate).getTime() > new Date().getTime()
  );
  if (filteredEventsData && filteredEventsData.length === 0) {
    filteredEventsData = relatedEvents.filter(
      (eventData) =>
        new Date(eventData.StartDate).getTime() <= new Date().getTime() &&
        new Date(eventData.EndDate).getTime() >= new Date().getTime()
    );
  }
  if (filteredEventsData && filteredEventsData.length === 0) {
    filteredEventsData = relatedEvents.filter(
      (eventData) =>
        new Date(eventData.EndDate).getTime() < new Date().getTime()
    );
  }
  return (
    filteredEventsData &&
    filteredEventsData.length > 0 &&
    services &&
    services.length > 0 && (
      <div
        className={`${styles.related_events_bg}`}
        style={{
          backgroundImage: `url(${RecentBg})`,
        }}
      >
        <div className={`${styles.container} py-5`}>
          <h3
            className={`${styles.related_events_title} mb-5`}
          >{`${title} Related Events & Activities`}</h3>
          <Row>
            <Col xs={0} sm={0} md={0} lg={24} xl={24}>
              <ResponsiveView
                eventsData={filteredEventsData}
                services={services}
                span={8}
                gutter={[48, 40]}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={0} xl={0}>
              <ResponsiveView
                eventsData={filteredEventsData}
                services={services}
                span={24}
                gutter={[0, 40]}
              />
            </Col>
          </Row>
        </div>
      </div>
    )
  );
}
