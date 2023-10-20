import React, { useState } from "react";
import { Row, Col } from "antd";
// Moment
import moment from "moment";
// Css
import styles from "./gallery-title.module.sass";
// Components
import AppRoundedBtn from "../../../../common_components/appRoundedBtn/AppRoundedBtn";

export default function GalleryTitle({ titleData, setCategory }) {
  const [active, setActive] = useState("All");

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h3 className={`mb-4 ${styles.gallery_inner_title}`}>
            {titleData && titleData.length > 0 && titleData[0].Title}
          </h3>
        </Col>
      </Row>
      <Row className={`mb-4`}>
        {/* For Large Screens */}
        <Col xs={0} sm={0} md={0} lg={6} xl={6}>
          <p className={`${styles.gallery_inner_date}`}>
            {titleData && moment(titleData.EventOccurDate).format("Do MMM YY")}
          </p>
          <p className={`${styles.gallery_inner_location}`}>
            {titleData && titleData.length > 0 && titleData[0].Location}
          </p>
        </Col>
        {/* For Small Screen */}
        <Col xs={6} sm={6} md={6} lg={0} xl={0}>
          <p className={`${styles.gallery_inner_date}`}>
            {titleData && moment(titleData.EventOccurDate).format("Do MMM YY")}
          </p>
          <p className={`${styles.gallery_inner_location}`}>
            {titleData && titleData.length > 0 && titleData[0].Location}
          </p>
        </Col>
        {/* For Large Screens */}
        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <div className={`pr-3`}>
                <AppRoundedBtn
                  text={"All"}
                  prefix={""}
                  suffix={""}
                  bg={active === "All" ? "blue" : "white"}
                  outline={"dark"}
                  long={false}
                  href={"none"}
                  btnStyle={{
                    width: "100%",
                    height: "55px",
                  }}
                  onClickHandler={() => {
                    setActive("All");
                    setCategory("All");
                  }}
                  dropDown={false}
                />
              </div>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <div className={`pr-3`}>
                <AppRoundedBtn
                  text={"Photos"}
                  prefix={""}
                  suffix={""}
                  bg={active === "Image" ? "blue" : "white"}
                  outline={"dark"}
                  long={false}
                  href={"none"}
                  btnStyle={{
                    width: "100%",
                    height: "55px",
                  }}
                  onClickHandler={() => {
                    setActive("Image");
                    setCategory("Image");
                  }}
                  dropDown={false}
                />
              </div>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <div className={`pr-3`}>
                <AppRoundedBtn
                  text={"Videos"}
                  type={"text"}
                  prefix={""}
                  suffix={""}
                  bg={active === "Video" ? "blue" : "white"}
                  outline={"dark"}
                  long={false}
                  href={"none"}
                  btnStyle={{ width: "100%", height: "55px" }}
                  onClickHandler={() => {
                    setActive("Video");
                    setCategory("Video");
                  }}
                  dropDown={false}
                />
              </div>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <div className={`pr-3`}>
                <AppRoundedBtn
                  text={"Documents"}
                  prefix={""}
                  suffix={""}
                  bg={active === "Document" ? "blue" : "white"}
                  outline={"dark"}
                  long={false}
                  href={"none"}
                  btnStyle={{ width: "100%", height: "55px" }}
                  onClickHandler={() => {
                    setActive("Document");
                    setCategory("Document");
                  }}
                  dropDown={false}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
