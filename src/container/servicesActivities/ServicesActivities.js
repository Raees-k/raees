//component
import Layout from "../layout/Layout";
import InnerPageTitleSection from "../../common_components/innerPageTitleSection/InnerPageTitleSection";

import ServicesActivitiesIntro from "../../components/servicesActivities/servicesActivitiesIntro/ServicesActivitiesIntro";
import VideoSection from "../../common_components/videoSection/VideoSection";
//css
import styles from "./services-activities.module.sass";
//BG
import hero from "../../assets/general/hero.svg";
import { useHistory, useLocation } from "react-router-dom";
import DottedLine from "../../assets/general/Dotted-line-path-301.svg";
import { Button, Input, Popconfirm } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
const { Search } = Input;

export default function ServicesActivities() {
  const history = useHistory();
  const [searchFor, setSearchFor] = useState("");
  const location = useLocation();

  useEffect(() => {
    let urlSplit = window.location.href.split("/").pop();
    setSearchFor(urlSplit);
    console.log("test-->", urlSplit);
  }, [location.pathname]);

  const title = () => {
    return (
      <Search
        placeholder="Search activities"
        allowClear
        onSearch={onSearch}
        enterButton="Search"
      />
    );
  };

  const onSearch = (value) => {
    if (value && value.length > 0) {
      history.push(
        searchFor === "activities" ? `/search?type=activities&${value}` : ""
      );
    }
    // setDisplayPop(true);
    // setRemoveVal("");
  };

  return (
    <>
      <Layout>
        <div className={`position-relative`}>
          <div className={`${styles.bg_color}`}></div>
          <div
            className={`${styles.bg_pattern}`}
            style={{
              backgroundImage: `url(${hero}),url(${DottedLine})`,
            }}
          ></div>
          <div className="d-flex container">
            <InnerPageTitleSection title={"Activities"} />
            <div className="mt-5 mx-2">
              <Popconfirm title={title} okText="" cancelText="">
                <Button
                  type="text"
                  icon={<SearchOutlined className={styles.search_icon} />}
                  className={`${styles.search_btn}`}
                />
              </Popconfirm>
            </div>
          </div>
          <ServicesActivitiesIntro />
        </div>
        <VideoSection />
      </Layout>
    </>
  );
}
