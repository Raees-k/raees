import { useContext, useEffect, useState } from "react";
import {
  Row,
  Col,
  Avatar,
  Button,
  Menu,
  Dropdown,
  Popconfirm,
  Input,
} from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { CONST } from "../../constant/index";
import { useRouter } from "next/router";
import { useHistory, useLocation } from "react-router-dom";
//css
import styles from "./header.module.sass";

import { AppContext } from "../../App";

const { Search } = Input;

function getMyPictureUrl(accountName, size) {
  return (
    CONST.BASE_URL +
    "/_layouts/15/userphoto.aspx?size=" +
    size +
    "&accountname=" +
    accountName
  );
}

function Header({
  menuIcon,
  logo,
  setDrawerVisbility,
  userLogedIn,
  setUserLogedIn,
  setSearchValue,
}) {
  const history = useHistory();
  const location = useLocation();

  const [searchFor, setSearchFor] = useState("");

  // const [displayPop, setDisplayPop] = useState(false);
  // const [inputValue, setInputValue] = useState("hello");
  // console.log(location.pathname);

  useEffect(() => {
    let urlSplit = window.location.href.split("/").pop();
    setSearchFor(urlSplit);
    console.log("test-->", urlSplit);
  }, [location.pathname]);

  const onSearch = (value) => {
    if (value && value.length > 0) {
      // if (location.pathname === "/search") {
      //   setSearchValue(value);
      // } else {
      //   history.push({
      //     pathname: "/search",
      //     //search: '?update=true',  // query string
      //     state: {
      //       // location state
      //       data: value,
      //     },
      //   });
      // }
      if (searchFor === "activities") {
        history.push(
          searchFor === "activities" ? `/search?type=activities&${value}` : ""
        );
      } else {
        window.open(
          `https://resembleae.sharepoint.com/sites/powerbi/IDBSocialClub/Pages/Search.aspx?k=${value}`,

          "_blank"
        );
      }
      // setDisplayPop(true);
      // setRemoveVal("");
    }
  };
  const title = () => {
    return (
      <Search
        placeholder="Search"
        allowClear
        onSearch={onSearch}
        enterButton="Search"
      />

      // <Input
      //   placeholder={`Search here...`}
      //   allowClear
      //   size="large"
      //   type={`text`}
      //   name={`search`}
      //   onChange={onSearch}
      // />
    );
  };
  const { user } = useContext(AppContext);
  const router = useRouter();
  const ddmenu = (
    <Menu>
      <Menu.Item>
        <p className={`${styles.dispName}`}>
          {user ? user.data.DisplayName : ""}
        </p>
        {/* <p className={`${styles.dispName}`}>{user ? user.data.UserProfileProperties[11].Value : ""}</p> */}
        <p className={`${styles.dispData}`}>{user ? user.data.Email : ""}</p>
      </Menu.Item>
      <Menu.Item>
        <div className="d-flex justify-content-center">
          <a
            href="https://isdb.sharepoint.com/sites/ssc-uat/_layouts/15/SignOut.aspx?ru=https%3A%2F%2Fisdb.sharepoint.com%2Fsites%2Fssc-uat%2F_layouts%2F15%2Fviewlsts.aspx%3Fview%3D14"
            className={`ant-btn ant-btn-text ${styles.sign_in_btn} d-flex justify-content-center align-items-center`}
          >
            <span>{`Logout`}</span>
          </a>
        </div>
      </Menu.Item>
    </Menu>
  );

  console.log("ddmenuHeader-->", ddmenu);
  return (
    <header className={styles.header_container}>
      <Row>
        {/* desktop view */}
        <Col xs={0} sm={0} md={0} lg={24} xl={24}>
          <div className={styles.header}>
            <Row>
              <Col xs={8} sm={8} md={6} lg={8} xl={8}>
                <div className={`${styles.header_contain}`}>
                  <Button
                    type="text"
                    icon={
                      <img src={menuIcon} alt="logo" width="33" height="26" />
                    }
                    onClick={() => setDrawerVisbility(true)}
                  />
                  <Button
                    type="text"
                    className={`${styles.menu_btn} px-4`}
                    onClick={() => setDrawerVisbility(true)}
                  >
                    Menu
                  </Button>
                </div>
              </Col>
              <Col xs={8} sm={8} md={11} lg={8} xl={8}>
                <div
                  className={`${styles.header_contain} ${styles.logo}`}
                  onClick={() => history.push("/")}
                >
                  <img src={logo[0]} alt="logo" width="180" height="100" />
                  <span className={`${styles.vertical_hr}`} />
                  <img src={logo[1]} alt="logo" width="180" height="100" />
                </div>
              </Col>
              <Col xs={8} sm={8} md={7} lg={8} xl={8}>
                <div className={`${styles.header_contain} justify-content-end`}>
                  {/* <Popconfirm title={title} okText="" cancelText={""}>
                    {
                      <Button
                        type="text"
                        icon={<SearchOutlined className={styles.search_icon} />}
                        className={`${styles.search_btn} mb-2`}
                      />
                    }
                  </Popconfirm> */}
                  <div>
                    {!user ? (
                      <>
                        <Button
                          type="text"
                          className={`${styles.sign_up_btn}`}
                          onClick={() => history.push("/registration")}
                        >
                          {`Sign up`}
                        </Button>
                        <Button
                          type="text"
                          className={`${styles.sign_in_btn}`}
                          onClick={() => {}}
                        >{`Sign in`}</Button>
                      </>
                    ) : (
                      <Dropdown overlay={ddmenu}>
                        <Avatar
                          size={72}
                          src={
                            user?.data?.UserProfileProperties[18].Value ? (
                              <img
                                src={getMyPictureUrl(user?.data?.Email, "M")}
                                alt="user"
                                width="150"
                                height="150"
                              ></img>
                            ) : (
                              <UserOutlined
                                className={`${styles.avatar_img}`}
                              />
                            )
                          }
                          className={`ml-5`}
                        ></Avatar>
                      </Dropdown>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={0} sm={0} md={24} lg={0} xl={0}>
          <div className={styles.header}>
            <Row>
              <Col xs={8} sm={8} md={6} lg={8} xl={8}>
                <div className={`${styles.header_contain}`}>
                  <Button
                    type="text"
                    icon={
                      <img src={menuIcon} alt="logo" width="33" height="26" />
                    }
                    onClick={() => setDrawerVisbility(true)}
                  />
                </div>
              </Col>
              <Col xs={8} sm={8} md={11} lg={8} xl={8}>
                <div
                  className={`${styles.header_contain} ${styles.logo}`}
                  onClick={() => history.push("/")}
                >
                  <img src={logo[0]} alt="logo" width="180" height="100" />
                  <span className={`${styles.vertical_hr}`} />
                  <img src={logo[1]} alt="logo" width="180" height="100" />
                </div>
              </Col>
              <Col xs={8} sm={8} md={7} lg={8} xl={8}>
                <div className={`${styles.header_contain} justify-content-end`}>
                  {/* <Popconfirm title={title} okText="" cancelText="">
                    <Button
                      type="text"
                      icon={<SearchOutlined className={styles.search_icon} />}
                      className={`${styles.search_btn} mb-2`}
                    />
                  </Popconfirm> */}
                  {/* <Button
                    type="text"
                    icon={<SearchOutlined className={styles.search_icon} />}
                    className={`${styles.search_btn} mb-2`}
                  /> */}
                  <div>
                    {!user ? (
                      <>
                        <Button
                          type="text"
                          className={`${styles.sign_up_btn}`}
                          onClick={() => router.push("/registration")}
                        >
                          {`Sign up`}
                        </Button>
                        <Button
                          type="text"
                          className={`${styles.sign_in_btn}`}
                          onClick={() => setUserLogedIn(true)}
                        >{`Sign in`}</Button>
                      </>
                    ) : (
                      <Dropdown overlay={ddmenu}>
                        <Avatar
                          size={72}
                          src={
                            user.data.UserProfileProperties[18].Value ? (
                              <img
                                src={user.data.UserProfileProperties[18].Value}
                                alt="user"
                                width="150"
                                height="150"
                              ></img>
                            ) : (
                              <UserOutlined
                                className={`${styles.avatar_img}`}
                              />
                            )
                          }
                          className={`ml-4`}
                        ></Avatar>
                      </Dropdown>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        {/* mobile view */}
        <Col xs={24} sm={24} md={0} lg={0} xl={0}>
          <div className={styles.header}>
            <Row>
              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                <div className={`${styles.header_contain}`}>
                  <Button
                    type="text"
                    icon={
                      <img src={menuIcon} alt="logo" width="33" height="26" />
                    }
                    onClick={() => setDrawerVisbility(true)}
                  />
                </div>
              </Col>
              <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                <div
                  className={`${styles.header_contain} ${styles.logo}`}
                  onClick={() => history.push("/")}
                >
                  <img src={logo[0]} alt="logo" width="80" height="60" />
                  <span className={`${styles.vertical_hr}`} />
                  <img src={logo[1]} alt="logo" width="80" height="60" />
                </div>
              </Col>
              {/* <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                <div className={`${styles.header_contain} justify-content-end`}>
                  <div>
                    <Popconfirm
                      title={title}
                      okText=""
                      cancelText=""
                      placement="bottomRight"
                    >
                      <Button
                        type="text"
                        icon={<SearchOutlined className={styles.search_icon} />}
                        className={`${styles.search_btn} mb-2`}
                      />
                    </Popconfirm>
                  </div>
                </div>
              </Col> */}
            </Row>
          </div>
        </Col>
      </Row>
    </header>
  );
}

export default Header;
