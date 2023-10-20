import { useEffect, useState } from "react";
import AppRoundedBtn from "../../common_components/appRoundedBtn/AppRoundedBtn";
import { Row, Col, Empty } from "antd";
import styles from "./search.module.sass";
import { useHistory, useLocation } from "react-router-dom";
import SearchCard from "./SearchCard";
import axios from "axios";
import { CONST } from "../../constant/index";

export default function SearchComponent({ searchvalue }) {
  const history = useHistory();
  const location = useLocation();
  const [filterData, setFilterData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${CONST.MELLI_URL.MELLI_BASE_URL}/api/search/${
          searchvalue || location.state.data
        }`,
        {
          crossDomain: true,
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "access-control-allow-origin": "*",
          },
        }
      )
      .then((res) => {
        // console.log(res.data.hits);
        setFilterData(res.data.hits);
      });
  }, [searchvalue, location.state.data]);

  return (
    <>
      <div className={`${styles.buysellsetion_section_bg}`}>
        <div className={`${styles.buysellsetion_section_container}`}>
          <Row className={"mb-4"}>
            <Col xs={24} sm={24} md={16} lg={18} xl={18} className={"mb-4"}>
              <h3
                className={`${styles.buysellsection_section_tilte} mb-0 d-flex h-100 align-items-center`}
              >
                Search for "{searchvalue || location.state.data}"
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
            {filterData && filterData.length > 0 ? (
              filterData.map((data, index) => (
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={8}
                  xl={8}
                  className={"pb-3"}
                  key={index}
                >
                  <SearchCard cardData={data} />
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
    </>
  );
}
