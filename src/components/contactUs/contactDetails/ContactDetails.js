import { Row, Col } from "antd";
// CSS
import styles from "./contact-details.module.sass";

export default function ContactDetails() {
  // const [sMedia, setSocialMedia] = useState(null);
  // let socialMediaIcon;
  // useEffect(() => {
  //   axios
  //     .get(
  //       `${CONST.BASE_URL}${CONST.API.LIST("SocialMedia")}${CONST.API.QUERY(
  //         "Title,Link,AttachmentFiles",
  //       )} ${CONST.API.ATTACHMENT}`,
  //     )
  //     .then(res => {
  //       socialMediaIcon = res.data.value.slice(0, 4);
  //       setSocialMedia(socialMediaIcon);
  //     })
  //     .catch(err => console.log(err));
  // }, []);
  return (
    <>
      <div></div>
      <div className={`${styles.contact_details_container}`}>
        <Row className={`mt-5`}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Row className={`mb-5`}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <div className={`${styles.contact_details_number}`}>
                  <h3 className={`${styles.contact_details_title_main}`}>
                    Call Us On +966 (12) 636 1264
                  </h3>
                  <h3 className={`${styles.contact_details_title_sub}`}>
                    Our office hours are Sunday – Thrusday, 9am-6pm
                  </h3>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <h3 className={`${styles.contact_details_title_main}`}>
                  Email Us Directly
                </h3>
                <div className={`mb-4`}>
                  <Col>
                    <h5 className={`${styles.contact_client_enquiry}`}>
                      Client Enquiries
                    </h5>
                  </Col>
                  <Col>
                    <h5>SSC@isdb.org</h5>
                  </Col>
                </div>
                <div className={`mb-4`}>
                  <Col>
                    <h5 className={`${styles.contact_client_enquiry}`}>
                      Vendor Enquiries
                    </h5>
                  </Col>
                  <Col>
                    <h5>SSC@isdb.org</h5>
                  </Col>
                </div>
                {/* <div className={`mb-4`}>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={24}
                    className={`d-flex flex-column`}
                  >
                    <div
                      className={`mt-3 d-flex justify-content-start align-items-start`}
                    >
                      <Row>
                        <Col span={10}>
                          <h4 className={`mr-2`}>Follow us on </h4>
                        </Col>
                        <Col span={14}>
                          <div
                            className={`d-flex justify-content-center align-items-center`}
                          >
                            {sMedia &&
                              sMedia.length > 0 &&
                              sMedia.map(icon => (
                                <div
                                  className={`mx-2 d-flex justify-content-center align-items-center ${styles.socialmedia_icon}`}
                                  key={icon.id}
                                  onClick={() => {
                                    window.open(icon.Link);
                                  }}
                                >
                                  <a href={icon.Link}>
                                    <img
                                      src={
                                        icon.AttachmentFiles[0]
                                          .ServerRelativeUrl
                                      }
                                      alt={`${icon.toString()}`}
                                      width="18"
                                      height="18"
                                    />
                                  </a>
                                </div>
                              ))}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </div> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}
