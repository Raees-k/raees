import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
// component
import AppBtn from "../../../common_components/appBtn/AppBtn";
import CommonSection from "../commonSection/CommonSection";
// css
import styles from "./publications-section.module.sass";
//BG
import PublicBg from "../../../assets/newsPublications/publicationSectionBg.svg";

export default function PublicationsSection({ news }) {
  const [seeAll, setSeeAll] = useState(false);
  const [publicationData, setPublicationData] = useState(news.slice(0, 9));

  useEffect(() => {
    if (seeAll) {
      setPublicationData(news);
    } else {
      setPublicationData(news.slice(0, 6));
    }
  }, [seeAll, news]);
  return (
    <div
      className={`${styles.news_bg}`}
      style={{
        backgroundImage: `url(${PublicBg})`,
      }}
    >
      <div className={`${styles.news_container} pb-5 mt-5`}>
        <h3 className={`${styles.publication_title} mb-5`}>Publications</h3>
        <Row gutter={[16, 16]}>
          {publicationData &&
            publicationData?.length > 0 &&
            publicationData?.map((newsObject, index) => (
              <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <CommonSection
                  news={newsObject}
                  section={"publication"}
                  imageWidth={"160"}
                  imageHeight={"240"}
                  key={index}
                />
              </Col>
            ))}
          <div className={`d-flex w-100 justify-content-end`}>
            <AppBtn
              text={seeAll ? `See Less` : `See All`}
              prefix={""}
              suffix={<ArrowRightOutlined className={`ml-2 pt-1`} />}
              mode={"dark"}
              // href={"/news-publications"}
              onClick={seeAll ? () => setSeeAll(false) : () => setSeeAll(true)}
            />
          </div>
        </Row>
      </div>
    </div>
  );
}
