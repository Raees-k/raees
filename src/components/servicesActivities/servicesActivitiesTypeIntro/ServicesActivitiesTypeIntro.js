import React from "react";
import ReactPlayer from "react-player";
import { Row, Col } from "antd";
import isImage from "is-image";
import { Scrollbars } from "react-custom-scrollbars";
// css
import styles from "./services-activities-type-intro.module.sass";

export default function ServicesActivitiesTypeIntro({ serviceActivity }) {
  return (
    <div className={`${styles.service_type_bg}`}>
      <div className={`${styles.service_type_container} py-5`}>
        <Row>
          <Col xs={0} sm={0} md={0} lg={10} xl={12}>
            <div>
              <h3 className={`${styles.service_type_title} mb-5`}>
                {serviceActivity.Title}
              </h3>
              <p className={`${styles.service_type_des} pr-4`}>
                <Scrollbars style={{ height: "400px" }}>
                  {serviceActivity.Description}
                </Scrollbars>
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={0} xl={0}>
            <div className={` px-5 `}>
              <h3 className={`${styles.service_type_title} mb-5`}>
                {serviceActivity.Title}
              </h3>
              <p className={`${styles.service_type_des} pr-4`}>
                {serviceActivity.Description}
              </p>
            </div>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={14}
            xl={12}
            className="d-flex justify-content-center align-items-center"
          >
            <div className={`${styles.service_type_image_box} mb-5`}>
              {isImage(
                serviceActivity.AttachmentFiles[
                  serviceActivity.AttachmentFiles?.length - 1
                ].ServerRelativeUrl
              ) ? (
                <div
                  className={`d-flex justify-content-center align-items-center overflow-hidden h-100 w-100`}
                >
                  <img
                    src={
                      serviceActivity.AttachmentFiles[
                        serviceActivity.AttachmentFiles?.length - 1
                      ].ServerRelativeUrl
                    }
                    alt="ssc"
                    // width="530"
                    // height="444"
                    className={`${styles.service_type_image}`}
                  />
                </div>
              ) : (
                <ReactPlayer
                  url={
                    serviceActivity.AttachmentFiles[
                      serviceActivity.AttachmentFiles?.length - 1
                    ].ServerRelativeUrl
                  }
                  // width={"450px"}
                  // height={`450px`}
                  className={`${styles.service_type_video}`}
                  controls={true}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
