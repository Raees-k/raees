import React, { useState } from "react";
import { Row, Col } from "antd";
// Lib
import moment from "moment";
// Scroll bar
import { Scrollbars } from "react-custom-scrollbars";
//components
import AppRoundedBtn from "../../../common_components/appRoundedBtn/AppRoundedBtn";
import EventRegistrationModal from "../../../common_components/appModal/eventRegistrationModal/EventRegistrationModal";
import AppSlider from "../../../common_components/appSlider/AppSlider";

// css
import styles from "./event-details-intro.module.sass";
import { VAR } from "../../../env";

export default function EventDetailsIntro({ eventData }) {
  // Modal state
  const [eventRegistrationModal, setEventRegistrationModal] = useState(false);
  const [displayedImage, setDisplayedImage] = useState(
    eventData &&
      eventData.length > 0 &&
      eventData[0].AttachmentFiles &&
      eventData[0].AttachmentFiles.length > 0 &&
      eventData[0].AttachmentFiles[0]
      ? eventData[0].AttachmentFiles[0].ServerRelativeUrl
      : null
  );

  return (
    <div className={`${styles.event_details_bg}`}>
      <div className={`${styles.event_details_container} py-5`}>
        <Row>
          {/* For large screen size */}
          <Col xs={0} sm={0} md={0} lg={10} xl={12}>
            <div>
              <h3 className={`${styles.event_details_title} mb-5`}>
                {eventData && eventData[0].Title}
              </h3>
              <p>
                {eventData && eventData[0].Author0 && (
                  <Row>
                    <Col span={6} className={`${styles.event_details_heading}`}>
                      {`Organizer`}
                    </Col>
                    <Col span={1} className={`${styles.event_details_heading}`}>
                      {`:`}
                    </Col>
                    <Col span={17} className={`${styles.event_details_value}`}>
                      {eventData[0].Author0}
                    </Col>
                  </Row>
                )}
              </p>
              <p>
                {eventData && eventData[0].StartDate && (
                  <Row>
                    <Col span={6} className={`${styles.event_details_heading}`}>
                      {`Event Date`}
                    </Col>
                    <Col span={1} className={`${styles.event_details_heading}`}>
                      {`:`}
                    </Col>
                    <Col span={17} className={`${styles.event_details_value}`}>
                      {moment(eventData[0].StartDate).format(
                        "ddd, D MMMM YYYY"
                      )}
                    </Col>
                  </Row>
                )}
              </p>
              <p>
                {eventData && eventData[0].StartDate && (
                  <Row>
                    <Col span={6} className={`${styles.event_details_heading}`}>
                      {`Time`}
                    </Col>
                    <Col span={1} className={`${styles.event_details_heading}`}>
                      {`:`}
                    </Col>
                    <Col span={17} className={`${styles.event_details_value}`}>
                      {moment(eventData[0].StartDate).format(
                        "h:mm a [onwards]"
                      )}
                    </Col>
                  </Row>
                )}
              </p>
              <p className={`mb-4`}>
                {eventData && eventData[0].Location && (
                  <Row>
                    <Col span={6} className={`${styles.event_details_heading}`}>
                      {`Location`}
                    </Col>
                    <Col span={1} className={`${styles.event_details_heading}`}>
                      {`:`}
                    </Col>
                    <Col span={17} className={`${styles.event_details_value}`}>
                      {eventData[0].Location}
                    </Col>
                  </Row>
                )}
              </p>
              {eventData && (
                <p className={`${styles.event_details_des} pr-4`}>
                  <Scrollbars style={{ height: "100%", width: "100p%" }}>
                    {eventData[0].Description}
                  </Scrollbars>
                </p>
              )}
            </div>
            <div className={`d-flex justify-content-center`}>
              {new Date(eventData[0].EndDate).getTime() >
                new Date().getTime() && (
                <AppRoundedBtn
                  text={
                    eventData[0].RegistrationLink ? `Join Now` : `Register Now`
                  }
                  prefix={""}
                  suffix={""}
                  bg={"yellow"}
                  outline={"none"}
                  long={true}
                  href={
                    eventData[0].RegistrationLink
                      ? eventData[0].RegistrationLink
                      : "none"
                  }
                  onClickHandler={
                    eventData[0].RegistrationLink
                      ? () => {}
                      : (e) => {
                          setEventRegistrationModal(true);
                        }
                  }
                  btnStyle={{ width: `210px`, height: "55px" }}
                />
              )}
            </div>
            <EventRegistrationModal
              eventId={eventData[0].Id}
              title={`Event Registration`}
              setVisiblety={setEventRegistrationModal}
              visible={eventRegistrationModal}
            />
          </Col>
          {/* For small screen size */}
          <Col xs={24} sm={24} md={24} lg={0} xl={0}>
            <div className={` px-5 `}>
              <h3 className={`${styles.event_details_title} mb-5`}>
                {eventData && eventData[0].Title}
              </h3>
              <p>
                {eventData && eventData[0].Author0 && (
                  <Row>
                    <Col
                      xs={8}
                      sm={8}
                      md={6}
                      lg={0}
                      xl={0}
                      className={`${styles.event_details_heading}`}
                    >
                      {`Organizer`}
                    </Col>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={0}
                      xl={0}
                      className={`${styles.event_details_heading}`}
                    >
                      {`:`}
                    </Col>
                    <Col
                      xs={15}
                      sm={15}
                      md={17}
                      lg={0}
                      xl={0}
                      className={`${styles.event_details_value}`}
                    >
                      {eventData[0].Author0}
                    </Col>
                  </Row>
                )}
              </p>
              <p>
                {eventData && eventData[0].StartDate && (
                  <Row>
                    <Col
                      xs={8}
                      sm={8}
                      md={6}
                      lg={0}
                      xl={0}
                      className={`${styles.event_details_heading}`}
                    >
                      {`Event Date`}
                    </Col>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={0}
                      xl={0}
                      className={`${styles.event_details_heading}`}
                    >
                      {`:`}
                    </Col>
                    <Col
                      xs={15}
                      sm={15}
                      md={17}
                      lg={0}
                      xl={0}
                      className={`${styles.event_details_value}`}
                    >
                      {moment(eventData[0].StartDate).format(
                        "ddd, D MMMM YYYY"
                      )}
                    </Col>
                  </Row>
                )}
              </p>
              <p>
                {eventData && eventData[0].StartDate && (
                  <Row>
                    <Col
                      xs={8}
                      sm={8}
                      md={6}
                      lg={0}
                      xl={0}
                      className={`${styles.event_details_heading}`}
                    >
                      {`Time`}
                    </Col>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={0}
                      xl={0}
                      className={`${styles.event_details_heading}`}
                    >
                      {`:`}
                    </Col>
                    <Col
                      xs={15}
                      sm={15}
                      md={17}
                      lg={0}
                      xl={0}
                      className={`${styles.event_details_value}`}
                    >
                      {moment(eventData[0].StartDate).format(
                        "h:mm a [onwards]"
                      )}
                    </Col>
                  </Row>
                )}
              </p>
              <p className={`mb-4`}>
                {eventData && eventData[0].Location && (
                  <Row>
                    <Col
                      xs={8}
                      sm={8}
                      md={6}
                      lg={0}
                      xl={0}
                      className={`${styles.event_details_heading}`}
                    >
                      {`Location`}
                    </Col>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={0}
                      xl={0}
                      className={`${styles.event_details_heading}`}
                    >
                      {`:`}
                    </Col>
                    <Col
                      xs={15}
                      sm={15}
                      md={17}
                      lg={0}
                      xl={0}
                      className={`${styles.event_details_value}`}
                    >
                      {eventData[0].Location}
                    </Col>
                  </Row>
                )}
              </p>
              <p className={`${styles.event_details_des} pr-4`}>
                <Scrollbars style={{ height: "100%", width: "100p%" }}>
                  {eventData && eventData[0].Description}
                </Scrollbars>
              </p>
            </div>
            <div className={`d-flex justify-content-center mb-5`}>
              {new Date(eventData[0].EndDate).getTime() >
                new Date().getTime() && (
                <AppRoundedBtn
                  text={
                    eventData[0].RegistrationLink ? `Join Now` : `Register Now`
                  }
                  prefix={""}
                  suffix={""}
                  bg={"yellow"}
                  outline={"none"}
                  long={true}
                  href={
                    eventData[0].RegistrationLink
                      ? eventData[0].RegistrationLink
                      : "none"
                  }
                  onClickHandler={
                    eventData[0].RegistrationLink
                      ? () => {}
                      : (e) => {
                          setEventRegistrationModal(true);
                        }
                  }
                  btnStyle={{ width: `210px`, height: "55px" }}
                />
              )}
            </div>
            <EventRegistrationModal
              eventId={eventData[0].Id}
              title={`Event Registration`}
              setVisiblety={setEventRegistrationModal}
              visible={eventRegistrationModal}
            />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={14}
            xl={12}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div
              className={`${styles.event_details_image_box} d-flex justify-content-center align-items-center overflow-hidden mb-5`}
            >
              <AppSlider
                showIndicators={false}
                autoPlay={true}
                setAutoPlay={() => {}}
                stopOnHover={false}
              >
                {eventData &&
                  eventData[0].AttachmentFiles.map((image, index) =>
                    image.ServerRelativeUrl ? (
                      <img
                        src={image.ServerRelativeUrl}
                        alt="ssc"
                        className={`${styles.event_details_image}`}
                        key={index}
                      />
                    ) : (
                      <img
                        src={`${VAR.BASE_URL}${displayedImage}`}
                        alt="ssc"
                        className={`${styles.event_details_image}`}
                        key={index}
                      />
                    )
                  )}
              </AppSlider>
            </div>
            <div className={`d-flex ${styles.thumbnail_container}`}>
              {eventData &&
                eventData[0].AttachmentFiles.slice(0, 4).map((image, index) => (
                  <div className={`mx-3 `} key={index}>
                    <img
                      src={image.ServerRelativeUrl}
                      alt="ssc"
                      width="70"
                      height="70"
                    />
                  </div>
                ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
