import { Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
// component
import AppBtn from "../../../common_components/appBtn/AppBtn";
import GamingCard from "../gamingCard/GamingCard";
// Css
import styles from "./gaming-card-section.module.sass";

export default function OnlineGames({ cardData }) {
  const [seeAll, setSeeAll] = useState(false);
  const [viewData, setViewData] = useState(cardData.slice(0, 3));
  useEffect(() => {
    if (seeAll) {
      setViewData(cardData);
    } else {
      setViewData(cardData.slice(0, 3));
    }
  }, [seeAll, cardData]);

  return (
    <div className={`${styles.gamecard_section_bg}`}>
      <div className={`${styles.gamecard_section_container}`}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <h3 className={`${styles.gamecard_section_tilte} mb-`}>
              Online Games
            </h3>
          </Col>
          {viewData.map((data, index) => (
            <Col xs={24} sm={24} md={8} lg={8} xl={8} key={index}>
              <GamingCard cardData={data} />
            </Col>
          ))}
          <div className={`d-flex w-100 justify-content-end`}>
            <AppBtn
              text={seeAll ? `See Less` : `See All`}
              prefix={""}
              suffix={<ArrowRightOutlined className={`ml-2 pt-1`} />}
              mode={"dark"}
              onClick={seeAll ? () => setSeeAll(false) : () => setSeeAll(true)}
            />
          </div>
        </Row>
      </div>
    </div>
  );
}
