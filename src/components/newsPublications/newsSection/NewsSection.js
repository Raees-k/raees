import { useState, useEffect, useContext } from "react";
import { Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { AppContext } from "../../../App";
// component
import AppBtn from "../../../common_components/appBtn/AppBtn";
import NewsPublicationsCard from "../../../common_components/newsPublicationsCard/NewsPublicationsCard";
// css
import styles from "./news-section.module.sass";
import SearchBar from "../../../common_components/searchBar/SearchBar";

export default function NewsSection() {
  const { news } = useContext(AppContext);
  const [seeAll, setSeeAll] = useState(false);
  const [newsData, setNewsData] = useState(null);
  const [dispalyData, setDisplayData] = useState(null);

  useEffect(() => {
    if (news && news.length > 0) {
      setNewsData(news);
      setDisplayData(news.slice(0, 3));
    }
  }, [news]);

  useEffect(() => {
    if (newsData && newsData.length > 0) {
      if (seeAll) {
        setDisplayData(newsData);
      } else {
        setDisplayData(newsData.slice(0, 3));
      }
    }
  }, [seeAll]);

  return (
    <div className={`${styles.news_bg}`}>
      <div className={`${styles.news_container} pb-5`}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div className="d-flex justify-content-between mb-5">
              <div>
                <h3 className={`${styles.news_tilte} `}>News</h3>
              </div>
              <div>
                <SearchBar styleApply={false} search={"news"} />
              </div>
            </div>
          </Col>
          {dispalyData &&
            dispalyData.length > 0 &&
            dispalyData.map((newsObject, index) => (
              <Col xs={24} sm={24} md={8} lg={8} xl={8} key={index}>
                <NewsPublicationsCard data={newsObject} />
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
