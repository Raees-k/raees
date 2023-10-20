import { Row, Col, Skeleton } from "antd";
// Css
import styles from "./gaming-card.module.sass";
// LIB
import moment from "moment";

// Components
import AppRoundedBtn from "../../../common_components/appRoundedBtn/AppRoundedBtn";

export default function GamingCard({ cardData }) {
  //process.env.BASE_URL +
  return (
    <div className={`${styles.gaming_card}`}>
      <div className={`${styles.gaming_card_image}`}>
        {cardData && cardData.AttachmentFiles && cardData.AttachmentFiles.length > 0 ?
          <img
            src={cardData.AttachmentFiles[0].ServerRelativeUrl}
            alt="card-img"
            height="100%"
            width="100%"
          />
          :
          <Skeleton.Image className={`${styles.skeleton_Img}`} />
        }
      </div>
      <div className={`${styles.text_container_game}`}>
        <Row>
          <Col xs={0} sm={0} md={0} lg={24} xl={24}>
            <div className={`${styles.gaming_card_text} px-4 pt-4 mb-2`}>
              {cardData && cardData.Title ?
                <h3 className={`mb-3`}>{cardData.Title}</h3>
                : <Skeleton.Input style={{ width: 150 }} />
              }
              {cardData && cardData.Date ?
                <p className={`mb-3`}>
                  {moment(cardData.Date).format("D MMM YYYY")}
                </p>
                : <Skeleton />
              }
              {cardData && cardData.Date &&
                <p>
                  Hosted by :{"  "}
                  <span className={`${styles.gaming_class_span}`}>
                    KAFU Games
                </span>
                </p>
              }
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={0} xl={0}>
            <div className={`${styles.gaming_card_text} px-4 pt-4`}>
              {cardData && cardData.Title ?
                <h3 className={`mb-3`}>{cardData.Title}</h3>
                : <Skeleton.Input style={{ width: 150 }} />
              }
              {cardData && cardData.Date ?
                <p className={`mb-3`}>
                  {moment(cardData.Date).format("D MMM YYYY")}
                </p>
                : <Skeleton active />
              }
              {cardData && cardData.Title &&
                <p>
                  <Row>
                    <Col xs={8} sm={8} md={12} lg={12} xl={12}>
                      Hosted by :
                  </Col>
                    <Col xs={8} sm={8} md={12} lg={12} xl={12}>
                      <span className={`${styles.gaming_class_span}`}>
                        KAFU Games
                    </span>
                    </Col>
                  </Row>
                </p>
              }
            </div>
          </Col>
        </Row>
      </div>
      <Row className={`w-100`}>

        <Col xs={0} sm={0} md={0} lg={24} xl={24}>
          <div
            className={`d-flex justify-content-center align-items-center h-100 py-4`}
          >
            {cardData && cardData.Title ?
              <AppRoundedBtn
                text={"Register Now"}
                prefix={""}
                suffix={""}
                bg={"yellow"}
                outline={"none"}
                long={false}
                href={cardData.Link}
                onClickHandler={() => { }}
              />
              : <Skeleton.Button active />}
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={0} xl={0}>
          <div
            className={`d-flex justify-content-center align-items-center h-100 py-4`}
          >
            {cardData && cardData.Title ?
              <AppRoundedBtn
                text={"Register Now"}
                prefix={""}
                suffix={""}
                bg={"yellow"}
                outline={"none"}
                long={false}
                href={cardData.Link}
                onClickHandler={() => { }}
              />
              : <Skeleton.Button />
            }
          </div>
        </Col>
      </Row>
    </div>
  );
}
