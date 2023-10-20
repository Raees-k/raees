import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { Drawer, Row, Col, Avatar } from "antd";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import { AppContext } from "../../App";
import { CONST } from "../../constant/index";
import { mapTypeToRoutePath } from "../../services/serviceActivitieService";
//
import styles from "./drawer.module.sass";

function getMyPictureUrl(accountName, size) {
  return (
    CONST.BASE_URL +
    "/_layouts/15/userphoto.aspx?size=" +
    size +
    "&accountname=" +
    accountName
  );
}

export default function AppDrawer({
  visbility,
  setVisbility,
  userLogedIn,
  setUserLogedIn,
}) {
  const history = useHistory();
  const { user, services } = useContext(AppContext);
  // const [otResource, setOtResource] = useState(null);

  // useEffect(() => {
  //   // API Call Other resources
  //   axios
  //     .get(
  //       CONST.BASE_URL +
  //         CONST.API.LIST("OtherResources") +
  //         CONST.API.QUERY("Link, Title")
  //     )
  //     .then((res) => {
  //       setOtResource(res.data.value);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  let menuLists = [
    {
      header: "Discover",
      links: [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Gallery",
          link: "/gallery",
        },
        {
          name: "About Us",
          link: "/about-us",
        },
        {
          name: "Events",
          link: "/events",
        },
        {
          name: "Publications",
          link: "/news-publications",
        },
        {
          name: "Activities",
          link: "/activities",
        },
        {
          name: "Offers",
          link: "/offers",
        },
      ],
    },
    //Service and Activities Route
    services &&
      services.length > 0 && {
        header: "Services",
        links:
          services &&
          services.length > 0 &&
          services.map((data) => {
            return {
              name: data.Title,
              link: `/activities/${mapTypeToRoutePath(data)}`,
            };
          }),
      },
    //Other Resources Route
    // otResource &&
    //   otResource.length > 0 && {
    //     header: "Other Resources",
    //     links:
    //       otResource &&
    //       otResource.length > 0 &&
    //       otResource.map(data => {
    //         return { name: data.Title, link: data.Link };
    //       }),
    //   },
  ];
  return (
    <>
      <Drawer
        placement={"left"}
        closable={false}
        height={"100vh"}
        width={"450px"}
        onClose={() => setVisbility(false)}
        open={visbility}
        key={"top"}
        // className={`${styles.drawer_bg}`}
        bodyStyle={{ background: "#000000FA", color: "#fff" }}
      >
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setVisbility(false)}
              className={`d-flex mb-3`}
            >
              <CloseOutlined className={`${styles.close_Icon_btn}`} />
              <p
                className={`d-flex ml-4 m-0 align-items-center ${styles.close_btn}`}
              >
                Close
              </p>
            </span>
          </Col>
          <Col xs={16} sm={16} md={0} lg={0} xl={0}>
            <>
              {user && Object.keys(user).length > 0 && (
                <div
                  className={
                    "d-flex justify-content-center align-items-center flex-column"
                  }
                >
                  <Avatar
                    size={80}
                    src={
                      user.data.UserProfileProperties[18].Value ? (
                        <img
                          src={getMyPictureUrl(user.data.Email, "M")}
                          width="150"
                          height="150"
                          alt="Avatar"
                        ></img>
                      ) : (
                        <UserOutlined className={`${styles.avatar_img}`} />
                      )
                    }
                  ></Avatar>
                  <p className={`mt-2`}>
                    {user && Object.keys(user).length > 0
                      ? user.data.DisplayName
                      : ""}
                  </p>
                  <p className={`${styles.dispData}`}>
                    {user && Object.keys(user).length > 0
                      ? user.data.Email
                      : ""}
                  </p>
                  <a
                    href="https://isdb.sharepoint.com/sites/ssc-uat/_layouts/15/SignOut.aspx?ru=https%3A%2F%2Fisdb.sharepoint.com%2Fsites%2Fssc-uat%2F_layouts%2F15%2Fviewlsts.aspx%3Fview%3D14"
                    className={`ant-btn ant-btn-text ${styles.sign_in_btn} d-flex justify-content-center align-items-center`}
                    // onClick={() => {
                    //   // setUser(false);
                    //   history.push(
                    //     "https://isdb.sharepoint.com/sites/ssc-uat/_layouts/15/SignOut.aspx?ru=https%3A%2F%2Fisdb.sharepoint.com%2Fsites%2Fssc-uat%2F_layouts%2F15%2Fviewlsts.aspx%3Fview%3D14",
                    //   );
                    // }}
                  >
                    <span>{`Logout`}</span>
                  </a>
                </div>
              )}
            </>

            {/* <Button
              type="text"
              icon={<SearchOutlined className={styles.search_icon} />}
              className={`${styles.search_btn} mb-2`}
            /> */}
          </Col>
          {menuLists &&
            menuLists.length > 0 &&
            menuLists.map((listItem, index) => (
              <Col
                xs={0}
                sm={0}
                md={24}
                lg={24}
                xl={24}
                className={`d-flex justify-content-center`}
                key={index}
              >
                <div className={`${styles.list_header}`}>
                  {listItem &&
                    listItem.links &&
                    listItem.links.length > 0 &&
                    listItem.header}
                  <ul className={`${styles.list_items} mt-4 pl-4`}>
                    {/* <Scrollbars style={{ width: "290px", height: "436px" }}> */}
                    {listItem &&
                      listItem.links &&
                      listItem.links.length > 0 &&
                      listItem.links.map((list, index) => (
                        <li className={`mb-4`} key={index}>
                          <a
                            onClick={() => {
                              setVisbility(false);
                              history.push(list.link);
                            }}
                          >
                            {list.name}
                          </a>
                        </li>
                      ))}
                    {/* </Scrollbars> */}
                  </ul>
                </div>
              </Col>
            ))}
          <Col xs={24} sm={24} md={0} lg={0} xl={0}>
            {/* {!userLogedIn ? (
              <>
                <Button
                  type="text"
                  className={`${styles.sign_up_btn}`}
                  onClick={() => history.push("/registration")}
                >{`Sign up`}</Button>
                <Button
                  type="text"
                  className={`${styles.sign_in_btn}`}
                  onClick={() => setUserLogedIn(true)}
                >{`Sign in`}</Button>
              </>
            ) : (
              <Button
                type="text"
                className={`${styles.sign_in_btn}`}
                onClick={() => setUserLogedIn(false)}
              >{`Logout`}</Button>
            )} */}
          </Col>
        </Row>
      </Drawer>
    </>
  );
}
