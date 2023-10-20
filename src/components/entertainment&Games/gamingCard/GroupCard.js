import { Row, Col, Skeleton } from "antd";
// Css
import styles from "./gaming-card.module.sass";

// Components
import AppRoundedBtn from "../../../common_components/appRoundedBtn/AppRoundedBtn";

export default function GroupCard({ groupData }) {
  //process.env.BASE_URL +
  return (
    <div className={`${styles.gaming_card}`}>
      <div className={`${styles.gaming_card_image}`}>
        {groupData && groupData.AttachmentFiles && groupData.AttachmentFiles.length > 0 ?
          <img src={groupData.AttachmentFiles[0].ServerRelativeUrl}
            alt="card-img"
            height="100%"
            width="100%"
          />
          :
          <Skeleton.Image className={`${styles.skeleton_Img}`} />
        }
      </div>
      <div className={`${styles.text_container}`}>
        <Row>
          <Col xs={0} sm={0} md={0} lg={24} xl={24}>
            <div className={`${styles.gaming_card_text} px-4 pt-4 mb-2`}>
              {groupData && groupData.Title ?
                <h3 className={`mb-3`}>{groupData.Title}</h3>
                :
                <Skeleton.Input style={{ width: 200 }} active />
              }
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={0} xl={0}>
            <div className={`${styles.gaming_card_text} px-4 pt-4`}>
              {groupData && groupData.Title ?
                <h3 className={`mb-2`}>{groupData.Title}</h3>
                :
                <Skeleton.Input style={{ width: 150 }} active />
              }
            </div>
          </Col>
        </Row>
      </div>
      <Row>
        <Col span={24}>
          <div
            className={`d-flex justify-content-center align-items-center h-100 py-4`}
          >
            {
              groupData && groupData.Title ?

                <AppRoundedBtn
                  text={"Join Now"}
                  prefix={""}
                  suffix={""}
                  bg={"yellow"}
                  outline={"none"}
                  long={true}
                  href={groupData.Link}
                  onClickHandler={() => { }}
                />
                :
                <Skeleton.Button active />
            }
          </div>
        </Col>
      </Row>
    </div>
  );
}
