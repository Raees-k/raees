import { useState, useContext, useEffect } from "react";
import { Row, Col } from "antd";
import { AppContext } from "../../../../../App";
// Components
import DropDown from "../../../../../common_components/formElement/Dropdown";
import DatePicker from "../../../../../common_components/formElement/DatePicker";
// CSS
import styles from "./gallery-header.module.sass";

function setSelectedCategory(value, categoryData, setCategory) {
  setCategory(categoryData[value]);
}

export default function GalleryHeader({
  toDate,
  setToDate,
  fromDate,
  setFromDate,
  selectedcategory,
  setCategory,
}) {
  //Context API
  const { services } = useContext(AppContext);
  //State
  const [categoryData, setCategoryData] = useState({});
  useEffect(() => {
    if (services && services.length > 0) {
      let cate = { All: "all" };
      services.forEach((data) => {
        cate[data.Title] = data?.ServiceType;
      });
      setCategoryData(cate);
    }
  }, [services]);
  return (
    <Row className={`mb-5`}>
      <Col xs={24} sm={24} md={9} lg={9} xl={9}>
        <h3
          className={`${styles.gallery_header_title} m-0 h-100 d-flex align-items-center`}
        >
          Multimedia Gallery
        </h3>
      </Col>
      <Col className={`px-2`} xs={8} sm={8} md={5} lg={5} xl={5}>
        <DatePicker
          label={`Date(From)`}
          mandatory={false}
          placeholder={`Select`}
          error={null}
          style={{ width: "100%", height: "45px" }}
          labelLite={true}
          thickBorder={true}
          value={fromDate}
          onChange={(e) => {
            setFromDate(e);
            setToDate(e);
          }}
        />
      </Col>
      <Col className={`px-2`} xs={8} sm={8} md={5} lg={5} xl={5}>
        <DatePicker
          label={`Date(To)`}
          mandatory={false}
          placeholder={`Select`}
          error={null}
          style={{ width: "100%", height: "45px" }}
          labelLite={true}
          thickBorder={true}
          value={toDate}
          onChange={(e) => {
            setToDate(e);
          }}
        />
      </Col>
      <Col className={`px-2`} xs={8} sm={8} md={5} lg={5} xl={5}>
        <DropDown
          label={`Category`}
          mandatory={false}
          placeholder={`Select`}
          options={Object.keys(categoryData)}
          error={null}
          style={{ width: "100%", height: "45px" }}
          labelLite={true}
          thickBorder={true}
          onChange={(value) =>
            setSelectedCategory(value, categoryData, setCategory)
          }
        />
      </Col>
    </Row>
  );
}
