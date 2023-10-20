import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "antd";
import axios from "axios";
import { Scrollbars } from "react-custom-scrollbars";
import { AppContext } from "../../../App";
import { CONST } from "../../../constant/index";

//components
import AppSlider from "../../../common_components/appSlider/AppSlider";

// css
import styles from "./news-intro-details.module.sass";

export default function EventDetailsIntro({ routePath }) {
  const { newsd } = useContext(AppContext);
  const [news, setNews] = useState(null);
  useEffect(() => {
    if (newsd && newsd.length > 0) {
      let data = newsd.filter((item) => item.Id.toString() === routePath.id);
      setNews(data);
    } else {
      axios
        .get(
          `${CONST.BASE_URL}${CONST.API.LIST("News")}${CONST.API.QUERY(
            "Title,Id,Author0,Description,AttachmentFiles"
          )} ${CONST.API.ATTACHMENT}${CONST.API.FILTER("Id", routePath.id)}`
        )
        .then((res) => {
          setNews(res.data.value);
        })
        .catch((err) => console.log(err));
    }
  }, [routePath]);

  return (
    <div className={`${styles.event_details_bg}`}>
      <div className={`${styles.event_details_container} py-5`}>
        <Row>
          {/* For Large screens */}
          <Col xs={0} sm={0} md={0} lg={12} xl={12}>
            <div>
              <h3 className={`${styles.event_details_title} mb-5`}>
                {news && news[0].Title}
              </h3>
              <p>
                {news && news[0].Author0 && (
                  <Row>
                    <Col span={3} className={`${styles.event_details_heading}`}>
                      {`Author`}
                    </Col>
                    <Col span={1} className={`${styles.event_details_heading}`}>
                      {`:`}
                    </Col>
                    <Col span={20} className={`${styles.event_details_value}`}>
                      {news[0].Author0}
                    </Col>
                  </Row>
                )}
              </p>
              {news && (
                <p className={`${styles.event_details_des}`}>
                  <Scrollbars style={{ height: "360px" }}>
                    {news[0].Description}
                  </Scrollbars>
                </p>
              )}
            </div>
          </Col>
          {/* For small screens */}
          <Col xs={24} sm={24} md={24} lg={0} xl={0}>
            <div className={` px-5 `}>
              <h3 className={`${styles.event_details_title} mt-3 mb-4`}>
                {news && news[0].Title}
              </h3>
              <p>
                {news && news[0].Author0 && (
                  <Row>
                    <Col
                      xs={5}
                      sm={5}
                      md={3}
                      lg={0}
                      xl={0}
                      className={`${styles.event_details_heading}`}
                    >
                      {`Author`}
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
                      xs={18}
                      sm={18}
                      md={20}
                      lg={0}
                      xl={0}
                      className={`${styles.event_details_value}`}
                    >
                      {news[0].Author0}
                    </Col>
                  </Row>
                )}
              </p>
              {news && (
                <p className={`${styles.event_details_des} pr-4`}>
                  <Scrollbars style={{ height: "360px" }}>
                    {news[0].Description}
                  </Scrollbars>
                </p>
              )}
            </div>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div
              className={`${styles.event_details_image_box} d-flex justify-content-center align-items-center overflow-hidden mt-3 mb-5`}
            >
              <AppSlider
                showIndicators={false}
                autoPlay={true}
                setAutoPlay={() => {}}
                stopOnHover={false}
                dynamicHeight={true}
              >
                {news &&
                  news[0].AttachmentFiles.map((image, index) =>
                    image.ServerRelativeUrl ? (
                      <img
                        src={`${image.ServerRelativeUrl}`}
                        alt="ssc"
                        className={`${styles.event_details_image}`}
                        key={index}
                      />
                    ) : (
                      <img
                        src={`${image.ServerRelativeUrl}`}
                        alt="ssc"
                        className={`${styles.event_details_image}`}
                        key={index}
                      />
                    )
                  )}
              </AppSlider>
            </div>
            <div className={`d-flex ${styles.thumbnail_container}`}>
              {news &&
                news[0].AttachmentFiles.length > 0 &&
                news[0].AttachmentFiles.slice(0, 4).map((image, index) => (
                  <div
                    className={`mx-3 `}
                    key={index}
                    // onClick={() => setDisplayedImage(image.url)}
                  >
                    <img
                      src={`${image.ServerRelativeUrl}`}
                      alt="ssc"
                      width="80"
                      height="80"
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
