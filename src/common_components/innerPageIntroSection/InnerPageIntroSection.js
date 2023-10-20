import { Row, Col, Button, Avatar } from "antd";
//css
import styles from "./inner-page-intro-section.module.sass";

export default function InnerPageIntroSection() {
  return (
    <div className={`${styles.introduction_bg}`}>
      <div className={`${styles.introduction_container} py-5`}>
        <Row>
          <Col xs={0} sm={0} md={24} lg={24} xl={24}>
            <h3>Our Objective</h3>
          </Col>
          <Col xs={0} sm={0} md={8} lg={8} xl={8}>
            <div className={`${styles.image}`}></div>
          </Col>
          <Col xs={0} sm={0} md={16} lg={16} xl={16}>
            <ul>
              <li className={`mb-4`}>
                {
                  "The main objective of the IsDB Group Staff Social Club (SSC) is to enhance interaction between IsDB Group staff members and their families, thus fostering understanding between people and cultures. More interactions between staff members and their families requires first and foremost finding a suitable environment,  i.e. occasions to which staff members will be invited to share, exchange and learn about each other."
                }
              </li>
              <li>{`SSC was established as a voluntary association of all IsDB Group staff  members comprising of the Islamic Development Bank (IsDB) and members of  the IsDB Group (IRTI, ICIEC, ICD, ITFC and ISFD). The main purpose of the SSC is to organise social activities and events for the beneﬁt of all IsDB Group staff and their families.`}</li>
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
}
