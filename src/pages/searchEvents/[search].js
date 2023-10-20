import React, { useContext, useEffect, useState } from "react";
import Layout from "../../container/layout/Layout";
import { AppContext } from "../../App";
import { useLocation, useHistory } from "react-router-dom";
import { Row, Col, Empty } from "antd";
import AppRoundedBtn from "../../common_components/appRoundedBtn/AppRoundedBtn";
import styles from "../../components/search/search.module.sass";
import SearchCard from "../../components/search/SearchCard";

const SearchEvents = () => {
  const { events, services, news } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const [searchVal, setSearchVal] = useState(null);
  const [type, setType] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(null);

  useEffect(() => {
    let urlSplit = window.location.href.split("?").pop();
    let whatType = urlSplit.split("&")[0].split("=").pop();
    let searchValue = urlSplit.split("&").pop();
    console.log("searchVal", urlSplit.split("&")[0].split("=").pop());
    setSearchVal(decodeURIComponent(searchValue));
    setType(whatType);
    console.log("test-->", searchValue);
  }, [location.pathname]);

  useEffect(() => {
    let filterSearch;
    if (searchVal && type === "events" && events?.length > 0) {
      filterSearch = events?.filter(
        (data, index) =>
          data.Author0.toLowerCase().includes(searchVal.toLowerCase()) ||
          data.Description.toLowerCase().includes(searchVal.toLowerCase()) ||
          data.EventType.toLowerCase().includes(searchVal.toLowerCase()) ||
          //   data.Speaker.toLowerCase().includes(searchVal.toLowerCase()) ||
          data.Title?.toLowerCase().includes(searchVal.toLowerCase())
      );
      setFilteredEvents(filterSearch);
    }
    if (searchVal && type === "news" && news?.length > 0) {
      filterSearch = news?.filter(
        (data, index) =>
          data.Description.toLowerCase().includes(searchVal.toLowerCase()) ||
          data.Title?.toLowerCase().includes(searchVal.toLowerCase())
      );
      setFilteredEvents(filterSearch);
    }
    if (searchVal && type === "activities" && news?.length > 0) {
      filterSearch = services?.filter(
        (data, index) =>
          data.Description.toLowerCase().includes(searchVal.toLowerCase()) ||
          data.Title?.toLowerCase().includes(searchVal.toLowerCase())
      );
      setFilteredEvents(filterSearch);
    }
  }, [searchVal, events]);
  console.log("searchVal", searchVal);
  return (
    <Layout>
      <div className={`${styles.buysellsetion_section_bg}`}>
        <div className={`${styles.buysellsetion_section_container}`}>
          <Row className={"mb-4"}>
            <Col xs={24} sm={24} md={16} lg={18} xl={18} className={"mb-4"}>
              <h3
                className={`${styles.buysellsection_section_tilte} mb-0 d-flex h-100 align-items-center`}
              >
                Search for "{searchVal /* || location.state.data */}"
              </h3>
            </Col>
            <Col xs={16} sm={16} md={8} lg={6} xl={6}>
              <div
                className={`d-flex h-100 align-items-center w-100 justify-content-end`}
              >
                <AppRoundedBtn
                  text={"Cancel"}
                  suffix={""}
                  bg={"yellow"}
                  outline={"none"}
                  long={false}
                  href={"none"}
                  onClickHandler={(e) => {
                    history.goBack();
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            {filteredEvents && filteredEvents?.length > 0 ? (
              filteredEvents?.map((data, index) => (
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={8}
                  xl={8}
                  className={"pb-3"}
                  key={index}
                >
                  <SearchCard cardData={data} type={type} />
                </Col>
              ))
            ) : (
              <Col span={24}>
                <div
                  className={`${styles.no_data_height} d-flex justify-content-center align-items-center`}
                >
                  <Empty className={`mb-4`} />
                </div>
              </Col>
            )}
          </Row>
        </div>
      </div>
    </Layout>
  );
};

export default SearchEvents;
