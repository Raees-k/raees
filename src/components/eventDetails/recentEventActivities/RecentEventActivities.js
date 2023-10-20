import { Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
//component
import EventsCard from "../../../common_components/eventsCard/EventsCard";
import AppBtn from "../../../common_components/appBtn/AppBtn";
//css
import styles from "./recent-event-activities.module.sass";
//service
import { setBackground } from "../../../services/eventService";
//Bg
import EventBg from "../../../assets/eventsActivities/allEventsSectionBg.svg";

function ResponsiveView({ eventsData, services, span, gutter }) {
  return (
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
  );
}

export default function RecentEventActivities({ eventsData, services }) {
  let filteredEventsData = eventsData.filter(
    (eventData) =>
      new Date(eventData.StartDate).getTime() <= new Date().getTime() &&
      new Date(eventData.EndDate).getTime() >= new Date().getTime()
  );

  return filteredEventsData &&
    filteredEventsData?.length > 0 &&
    services &&
    services?.length > 0 ? (
    <div
      className={`${styles.recent_event_bg}`}
      style={{
        backgroundImage: `url(${EventBg})`,
      }}
    >
      <div className={`${styles.container} py-5`}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <h3
              className={`${styles.recent_events_title} mb-5`}
            >{`Recent Events & Activities`}</h3>
          </Col>

          <Col xs={0} sm={0} md={0} lg={24} xl={24}>
            <ResponsiveView
              eventsData={filteredEventsData}
              services={services}
              span={8}
              gutter={[48, 40]}
            />
          </Col>
          <Col xs={0} sm={0} md={24} lg={0} xl={0}>
            <ResponsiveView
              eventsData={filteredEventsData}
              services={services}
              span={12}
              gutter={[0, 40]}
            />
          </Col>
          <Col xs={24} sm={24} md={0} lg={0} xl={0}>
            <ResponsiveView
              eventsData={filteredEventsData}
              services={services}
              span={24}
              gutter={[0, 40]}
            />
          </Col>
        </Row>
        <div className={`d-flex w-100 justify-content-end`}>
          <AppBtn
            text={`See All`}
            prefix={""}
            suffix={<ArrowRightOutlined className={`ml-2 pt-1`} />}
            mode={"dark"}
            href={"/events"}
          />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
