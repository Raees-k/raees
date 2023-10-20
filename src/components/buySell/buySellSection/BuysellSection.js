import React from "react";
import { Row, Col, Menu, Empty } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { PlusSquareOutlined } from "@ant-design/icons";

import AppRoundedBtn from "../../../common_components/appRoundedBtn/AppRoundedBtn";

import BuySellCard from "../buySellCard/BuySellCard";
import NewAdModal from "../../../common_components/appModal/newAdModal/NewAdModal";
import { CONST } from "../../../constant/index";
//css
import styles from "./buysell-section.module.sass";
import filterimg from "../../../assets/eventsActivities/filter.svg";

const { SubMenu } = Menu;

let ddmenu;
function setDDMenu(setSubMenu, adCategories, subCategoryList) {
  ddmenu = (
    <Menu>
      <Menu.Item>
        <a
          className={`${styles.dropDownList} py-3`}
          onClick={() => setSubMenu("All")}
        >
          All
        </a>
      </Menu.Item>
      {adCategories &&
        subCategoryList &&
        adCategories.length > 0 &&
        subCategoryList.length > 0 &&
        adCategories.map((data) => (
          <>
            <Menu.Divider />
            <SubMenu
              title={data.Title}
              className={`${styles.dropDownList} py-3`}
            >
              {subCategoryList
                .filter((subData) => subData.CategoryId === data.ID.toString())
                .map((finalData) => (
                  <>
                    <Menu.Item>
                      <a
                        className={`${styles.dropDownList} py-3`}
                        onClick={() => setSubMenu(finalData.Title)}
                      >
                        {finalData.Title}
                      </a>
                    </Menu.Item>
                    <Menu.Divider />
                  </>
                ))}
            </SubMenu>
          </>
        ))}
      <Menu.Divider />
      <Menu.Item>
        <a
          className={`${styles.dropDownList} py-3`}
          onClick={() => setSubMenu("Others")}
        >
          Others
        </a>
      </Menu.Item>
    </Menu>
  );
}

export default function BuysellSection() {
  const [subMenu, setSubMenu] = useState("All");
  const [newAdModal, setNewAdModal] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [adCategories, setAdCategories] = useState([]);

  const [cItems, setCitems] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const [subitems, setsubitems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cardsData, setcardsData] = useState(null);
  const [callApi, setCallApi] = useState(null);

  useEffect(() => {
    //advertisement api call
    axios
      .get(
        `${CONST.BASE_URL}${CONST.API.LIST("Advertisement")}${CONST.API.QUERY(
          "Title,Description,Author0,Created,AuthorImage,Price,Brand,Email,Country,City,Category,SubCategory,Phone,AttachmentFiles"
        )} ${CONST.API.ATTACHMENT} ${CONST.API.FILTER("status", "published")}`
      )
      .then((res) => {
        setcardsData(res.data.value);
      })
      .catch((err) => console.log(err));

    //advertisement categories api call
    axios
      .get(
        `${CONST.BASE_URL}${CONST.API.LIST(
          "AdvertisementCategory"
        )}${CONST.API.QUERY("id,Title")}`
      )
      .then((res) => {
        let categoriesList = res.data.value.map((data) => data.Title);
        categoriesList.push("Others");
        setCitems(categoriesList);
        setAdCategories(res.data.value);
      })
      .catch((err) => console.log(err));

    //advertisement sub-categories api call
    axios
      .get(
        `${CONST.BASE_URL}${CONST.API.LIST(
          "AdvertisementSubCategory"
        )}${CONST.API.QUERY("id,Title,CategoryId")}`
      )
      .then((res) => {
        setSubCategoryList(res.data.value);
      })
      .catch((err) => console.log(err));
  }, [callApi]);

  useEffect(() => {
    // switch (selectedCategory) {
    //   case "Electronic":
    //     setsubitems(["Home Appliance", "Gadgets", "Electronic"]);
    //     break;
    //   case "Vehicles":
    //     setsubitems(["Car", "Bike"]);
    //     break;
    //   case "Health and Beauty":
    //     setsubitems(["Health care", " Beauty care"]);
    //     break;
    //   case "House Holds":
    //     setsubitems(["Furniture", "Decorative", "Clocks", "Cleaning"]);
    //     break;
    //   default:
    //     setsubitems([]);
    // }
    adCategories.forEach((data) => {
      if (data.Title === selectedCategory) {
        let selectedSubCategory = subCategoryList.filter(
          (subCategory) => subCategory.CategoryId === data.ID.toString()
        );
        selectedSubCategory = selectedSubCategory.map(
          (subCategory) => subCategory.Title
        );
        if (selectedSubCategory && selectedSubCategory.length > 0)
          setsubitems(selectedSubCategory);
        else setsubitems([]);
      }
    });
  }, [selectedCategory]);

  useEffect(() => {
    if (subMenu.toLowerCase() === "all") {
      setFilterData(cardsData);
    } else if (subMenu.toLowerCase() === "others") {
      let filteredData = cardsData.filter(
        (data) => data.Category.toLowerCase() === subMenu.toLowerCase()
      );
      setFilterData(filteredData);
    } else {
      let filteredData = cardsData.filter(
        (data) =>
          data.SubCategory &&
          data.SubCategory.toLowerCase() === subMenu.toLowerCase()
      );
      setFilterData(filteredData);
    }
    setDDMenu(setSubMenu, adCategories, subCategoryList);
  }, [subMenu, cardsData, adCategories, subCategoryList]);

  return (
    <>
      <div className={`${styles.buysellsetion_section_bg}`}>
        <div className={`${styles.buysellsetion_section_container}`}>
          <Row className={"mb-4"}>
            <Col xs={24} sm={24} md={16} lg={18} xl={18} className={"mb-4"}>
              <h3
                className={`${styles.buysellsection_section_tilte} mb-0 d-flex h-100 align-items-center`}
              >
                All Items for Sale
              </h3>
            </Col>
            <Col xs={16} sm={16} md={8} lg={6} xl={6}>
              <div
                className={`d-flex h-100 align-items-center w-75 justify-content-between`}
              >
                <AppRoundedBtn
                  text={"Sell"}
                  prefix={<PlusSquareOutlined className={`ml-2 pt-1 mx-1`} />}
                  suffix={""}
                  bg={"yellow"}
                  outline={"none"}
                  long={false}
                  href={"none"}
                  onClickHandler={(e) => {
                    setNewAdModal(true);
                    // setEventId(1);
                  }}
                />
                <AppRoundedBtn
                  text={" "}
                  prefix={
                    <img
                      src={filterimg}
                      alt={"fliter-icon"}
                      width={20}
                      height={20}
                    />
                  }
                  suffix={""}
                  bg={"blue"}
                  outline={"dark"}
                  long={false}
                  href={"none"}
                  onClickHandler={() => {}}
                  dropDown={true}
                  dropDownData={ddmenu}
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
                  <BuySellCard cardData={data} />
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
      {newAdModal && (
        <NewAdModal
          setVisiblety={setNewAdModal}
          visible={newAdModal}
          citems={cItems}
          setSelectedCategory={setSelectedCategory}
          subitems={subitems}
          selectedCategory={selectedCategory}
          setCallApi={setCallApi}
          callApi={callApi}
        />
      )}
    </>
  );
}
