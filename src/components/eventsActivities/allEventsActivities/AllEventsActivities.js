import { useState } from "react";
import { Menu, Row, Col, Empty } from "antd";
//component
import AppRoundedBtn from "../../../common_components/appRoundedBtn/AppRoundedBtn";
import Indicatores from "../../../common_components/indicator/Indicators";
import EventsCard from "../../../common_components/eventsCard/EventsCard";
import filterImg from "../../../assets/eventsActivities/filter.svg";
//css
import styles from "./all-events-activities.module.sass";
//service
import { setBackground } from "../../../services/eventService";
//BG
import EventBg from "../../../assets/eventsActivities/allEventsSectionBg.svg";

function ResponsiveView({ eventsData, serviceData, span, gutter }) {
  return (
    <Row gutter={gutter}>
      {eventsData && eventsData.length > 0 ? (
        eventsData.map((event, index) => {
          let [bg, bgImage, boxShadow] = setBackground(event, serviceData);
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
        })
      ) : (
        <Empty
          className={`${styles.empty_card} d-flex justify-content-center align-items-center`}
        />
      )}
    </Row>
  );
}

function setDDMenu(dropDownData, eventsData, setFilteredEventsData, setTitle) {
  return (
    <Menu>
      {dropDownData && dropDownData.length > 0
        ? dropDownData.map((data, i) => (
            <>
              <Menu.Item>
                <a
                  className={`${styles.dropDownList} py-3`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    menuChangeHandler(
                      eventsData,
                      data.ddType,
                      setFilteredEventsData,
                      setTitle,
                      dropDownData
                    )
                  }
                >
                  {data.serviceName}
                </a>
              </Menu.Item>
              {i !== dropDownData.length - 1 && <Menu.Divider />}
            </>
          ))
        : null}
    </Menu>
  );
}

function menuChangeHandler(
  eventsData,
  ddType,
  setFilteredEventsData,
  setTitle,
  dropDownData
) {
  let ddSelectedData = dropDownData.find((data) => ddType === data.ddType);
  let title = ddSelectedData.serviceName.split(" ")[0];
  switch (ddType) {
    case "all":
      setTitle(title);

      setFilteredEventsData(eventsData);
      break;
    case "pastEvents":
      setTitle(title);
      let pastEvents = eventsData.filter(
        (data) => new Date(data.EndDate).getTime() < new Date().getTime()
      );
      setFilteredEventsData(pastEvents);
      break;
    case "ongoingEvents":
      setTitle(title);
      let ongoingEvents = eventsData.filter(
        (data) =>
          new Date(data.StartDate).getTime() < new Date().getTime() &&
          new Date(data.EndDate).getTime() > new Date().getTime()
      );
      setFilteredEventsData(ongoingEvents);
      break;
    case "upcommingEvents":
      setTitle(title);
      let upcommingEvents = eventsData.filter(
        (data) => new Date(data.StartDate).getTime() > new Date().getTime()
      );
      setFilteredEventsData(upcommingEvents);
      break;
    default:
      break;
  }
}

export default function AllEventsActivities({ eventsData, serviceData }) {
  const [filteredEventsData, setFilteredEventsData] = useState(eventsData);
  // const [serviceType, setServiceType] = useState("");
  const [title, setTitle] = useState("All");

  let dropDownData = [
    { serviceName: "All", ddType: "all" },
    { serviceName: "Past Events", ddType: "pastEvents" },
    { serviceName: "Ongoing Events", ddType: "ongoingEvents" },
    { serviceName: "Upcoming Events", ddType: "upcommingEvents" },
  ];
  let dropDownMenu = setDDMenu(
    dropDownData,
    eventsData,
    setFilteredEventsData,
    setTitle
  );

  const onColorIndicatorClick = (serviceType) => {
    let filteredData = eventsData.filter(
      (data) => data.EventType === serviceType
    );
    setFilteredEventsData(filteredData);
  };

  return (
    <div
      className={`${styles.all_events_bg} py-5`}
      style={{
        backgroundImage: `url(${EventBg})`,
      }}
    >
      <div className={`${styles.container} pb-5`}>
        <Row>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <h3
              className={`${styles.all_events_title} mb-5`}
            >{`${title} Events & Activities`}</h3>
          </Col>
          <Col
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            className={`d-flex justify-content-end`}
          >
            <div className={`${styles.filter_btn}`}>
              <AppRoundedBtn
                text={""}
                prefix={
                  <img
                    src={filterImg}
                    alt={"fliter-icon"}
                    width={20}
                    height={20}
                  />
                }
                suffix={""}
                bg={"blue"}
                outline={"dark"}
                long={false}
                href={"none"}
                onClickHandler={() => {}}
                dropDown={true}
                dropDownData={dropDownMenu}
              />
            </div>
          </Col>
          <Col xs={0} sm={0} md={24} lg={24} xl={24}>
            <div className={`${styles.indicatores_container} pl-5 mb-5`}>
              <Indicatores onColorIndicatorClick={onColorIndicatorClick} />
            </div>
          </Col>
          {/* For small screen size */}
          <Col xs={24} sm={24} md={0} lg={0} xl={0}>
            <div className={`${styles.indicatores_container} pl-5 mt-4 mb-5`}>
              <Indicatores onColorIndicatorClick={onColorIndicatorClick} />
            </div>
          </Col>
          <Col xs={0} sm={0} md={0} lg={24} xl={24}>
            <ResponsiveView
              eventsData={filteredEventsData}
              serviceData={serviceData}
              span={8}
              gutter={[48, 40]}
            />
          </Col>
          <Col xs={0} sm={0} md={24} lg={0} xl={0}>
            <ResponsiveView
              eventsData={filteredEventsData}
              serviceData={serviceData}
              span={12}
              gutter={[0, 40]}
            />
          </Col>
          <Col xs={24} sm={24} md={0} lg={0} xl={0}>
            <ResponsiveView
              eventsData={filteredEventsData}
              serviceData={serviceData}
              span={24}
              gutter={[0, 40]}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}
