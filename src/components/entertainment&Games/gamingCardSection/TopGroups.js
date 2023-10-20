import { Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
// component
import AppBtn from "../../../common_components/appBtn/AppBtn";
import GroupCard from "../gamingCard/GroupCard";
// Css
import styles from "./gaming-card-section.module.sass";

export default function TopGroups({ groupData }) {
  const [seeAll, setSeeAll] = useState(false);
  const [viewData, setViewData] = useState(groupData.slice(0, 3));
  useEffect(() => {
    if (seeAll) {
      setViewData(groupData);
    } else {
      setViewData(groupData.slice(0, 3));
    }
  }, [seeAll, groupData]);
  return (
    <div className={`${styles.gamecard_section_bg}`}>
      <div className={`${styles.gamecard_section_container}`}>
        <h3 className={`${styles.gamecard_section_tilte} mb-`}>Top Groups</h3>
        <Row gutter={[16, 16]}>
          {viewData.map((data, index) => (
            <Col xs={24} sm={24} md={8} lg={8} xl={8} key={index}>
              <GroupCard groupData={data} />
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
