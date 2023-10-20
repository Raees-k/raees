import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import axios from "axios";
import { CONST } from "../../../constant/index";
//component
import MultiImageView from "../../../common_components/multiImageView/MultiImageView";
import AppSlider from "../../../common_components/appSlider/AppSlider";
//css
import styles from "./staff-social-club.module.sass";
//BG
import Ssc from "../../../assets/aboutUs/sscbg.svg";

export default function StaffSocialClub() {
  const [sscMemberData, setSscMemberData] = useState(null);
  useEffect(() => {
    axios
      .get(
        `${CONST.BASE_URL}${CONST.API.LIST("Member")}${CONST.API.QUERY(
          "Title,Designation,AttachmentFiles"
        )} ${CONST.API.ATTACHMENT}`
      )
      .then((res) => {
        setSscMemberData(res.data.value);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div
      className={`${styles.ssc_bg}`}
      style={{
        backgroundImage: `url(${Ssc})`,
      }}
    >
      {/* For small screens */}
      <Row>
        <Col xs={24} sm={24} md={0} lg={0} xl={0}>
          <Col xs={24} sm={24} md={0} lg={0} xl={0}>
            <div className={`d-flex justify-content-center align-items-center`}>
              <h3 className={`${styles.mission_title} pl-4 mt - 4 mb - 5`}>
                Meet Our Staff Social Club (SSC) Executive Team
              </h3>
            </div>
          </Col>
          <AppSlider
            showIndicators={false}
            autoPlay={true}
            setAutoPlay={() => {}}
            stopOnHover={false}
            swipeable={false}
          >
            {sscMemberData &&
              sscMemberData.map((img, index) => (
                <div className={`px-5 my-4`} key={index}>
                  <img
                    src={img.AttachmentFiles[0].ServerRelativeUrl}
                    alt="Isdb"
                    width="250px"
                    height="250px"
                  />
                  <h5 className={`${styles.member_name} mt - 3`}>{img.Name}</h5>
                  <p className={`${styles.member_degisnation}`}>
                    {img.Designation}
                  </p>
                </div>
              ))}
          </AppSlider>
        </Col>
      </Row>
      {/* For large screen */}
      <Row>
        <Col xs={0} sm={0} md={24} lg={24} xl={24}>
          <MultiImageView
            title={`Meet Our Staff Social Club(SSC) Executive Team`}
            subTitle={`The SSC Executive Team shall comprise of a Chairperson, Deputy Chairperson, Treasurer and Members.It will be supported by a full - time coordinator`}
            finalData={sscMemberData}
            page={`ssc`}
          />
        </Col>
      </Row>
    </div>
  );
}
