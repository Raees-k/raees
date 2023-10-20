import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import { useContext } from "react";

//css
import styles from "./footer.module.sass";
import { AppContext } from "../../App";

export default function ResponsiveView({ view, logo }) {
  const { otherResourcesData } = useContext(AppContext);

  // const [sMedia, setSocialMedia] = useState(null);
  // useEffect(() => {
  //   // API Call Other resources
  //   axios
  //     .get(
  //       CONST.BASE_URL +
  //         CONST.API.LIST("FooterLink") +
  //         CONST.API.QUERY("Link, Title")
  //     )
  //     .then((res) => {
  //       setFooterLink(res.data.value);
  //     })
  //     .catch((err) => console.log(err));

  //   // API Call Other resources

  //   axios
  //     .get(
  //       `${CONST.BASE_URL}${CONST.API.LIST("SocialMedia")}${CONST.API.QUERY(
  //         "Title,Link,AttachmentFiles",
  //       )} ${CONST.API.ATTACHMENT}`,
  //     )
  //     .then(res => {
  //       setSocialMedia(res.data.value);
  //     })
  //     .catch(err => console.log(err));

  //   // API Call Other resources
  // }, []);

  // useEffect(() => {
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

  // socialMediaIcon = socialMediaIcon.slice(0, 4);
  return (
    <div className={`${styles.navigation_container_bg} pt-5`}>
      <div
        className={`${styles.navigation_container} ${
          view === "tablet" ? "px-2" : "px-5"
        } `}
      >
        <div>
          <Row>
            <Col
              xs={24}
              sm={24}
              md={7}
              lg={5}
              xl={5}
              className={`d-flex justify-content-center align-items-center flex-column ${
                view === "mobile" ? styles.p_FooterLogo : ""
              } `}
            >
              {/* <Image src={logo} alt="logo" width="200" height="116" /> */}
              <img src={logo} alt="Logo" width="200px" height="116px"></img>
              {/* <div
                className={`mt-4 d-flex justify-content-center w-100 flex-wrap px-2`}
              >
                {sMedia && sMedia.length > 0
                  ? sMedia.map(data => (
                      <span
                        className={`mx-2 ${styles.footer_list_cursor_pointer} `}
                        key={data.id}
                        onClick={() => {
                          window.open(data.Link);
                        }}
                      >
                        <img
                          src={
                            data.AttachmentFiles[0].ServerRelativeUrl
                              ? data.AttachmentFiles[0].ServerRelativeUrl
                              : ""
                          }
                          alt="Media Icons"
                          width="22px"
                          height="18px"
                        ></img>
                      </span>
                    ))
                  : ""}
              </div> */}
            </Col>
            <Col xs={24} sm={24} md={6} lg={7} xl={7}>
              <ul className={`${styles.footer_list} `}>
                <li
                  className={`${styles.footer_list_header} ${styles.footer_list_cursor_auto} `}
                >
                  IsDB Group
                </li>
                <li
                  className={`${styles.footer_list_address} ${styles.footer_list_cursor_auto} `}
                >
                  {`IsDB Group Staff Social Club`}
                  <br />
                  {`8111 King Khalid St.Al Nuzlah Al yamania Dist.`}
                  <br />
                  {`Unit No.1, Jeddah 22332 - 2444 `}
                  <br />
                  {`Kingdom of Saudi Arabia`}
                  <br />
                </li>
                <li className={`${styles.footer_list_cursor_auto} `}>
                  Tel: +966 (12) 636 1264
                </li>
                {/* <li className={`${ styles.footer_list_cursor_auto } `}>
                  Fax: +966 (12) 636 1264
                </li> */}
              </ul>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <ul className={`${styles.footer_list} `}>
                <li
                  className={`${styles.footer_list_header} ${styles.footer_list_cursor_auto} `}
                >
                  Quick Links
                </li>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/gallery"}>Gallery</Link>
                </li>
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
                <li>
                  <Link to={"/events"}>Events</Link>
                </li>
                <li>
                  <Link to={"/news-publications"}>Publications</Link>
                </li>
                <li>
                  <Link to={"/activities"}>Activities</Link>
                </li>

                {/* {fLinks && fLinks.length > 0
                  ? fLinks.map(data => (
                      <li>
                        <a href={data.Link}>{data.Title}</a>
                      </li>
                    ))
                  : ""} */}
              </ul>
            </Col>
            <Col xs={24} sm={24} md={5} lg={6} xl={6}>
              <ul className={`${styles.footer_list} `}>
                <li
                  className={`${styles.footer_list_header} ${styles.footer_list_cursor_auto} `}
                >
                  Other Resources
                </li>
                {otherResourcesData && otherResourcesData?.length > 0
                  ? otherResourcesData?.map((data, index) => (
                      <li key={index}>
                        <a href={data.Link} target="_blank" rel="noreferrer">
                          {data.Title}
                        </a>
                      </li>
                    ))
                  : ""}
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
