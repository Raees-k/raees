import { useContext, useEffect, useState } from "react";
import { Row, Col, Button, Skeleton } from "antd";

import { useHistory } from "react-router-dom";

//service
import { mapTypeToRoutePath } from "../../services/serviceActivitieService";
//css
import styles from "./services-activities-card.module.sass";
import { AppContext } from "../../App";

export default function ServicesActivitiesCard({ data }) {
  const { serviceLogoData } = useContext(AppContext);
  const [logo, setLogo] = useState(null);

  const history = useHistory();

  // useEffect(() => {
  //   if (data && Object.keys(data)?.length > 0) {
  //     axios
  //       .get(
  //         `${CONST.BASE_URL}${CONST.API.LIST("ServicesLogo")}${CONST.API.QUERY(
  //           "Title,AttachmentFiles"
  //         )} ${CONST.API.ATTACHMENT}`
  //       )
  //       .then((res) => {
  //         let logos = res.data.value.find(
  //           (logo) => logo.Title === data.ID.toString()
  //         );
  //         setLogo(logos?.AttachmentFiles[0]?.ServerRelativeUrl);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [data]);

  useEffect(() => {
    if (data && Object.keys(data)?.length > 0) {
      let logos = serviceLogoData?.find(
        (logo) => logo.Title === data.ID.toString()
      );
      setLogo(logos?.AttachmentFiles[0]?.ServerRelativeUrl);
    }
  }, [serviceLogoData, data]);
  console.log("cardData-->", data);
  return (
    <div
      className={`${styles.services_card}`}
      onClick={() => history.push(`/activities/${mapTypeToRoutePath(data)}`)}
    >
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className={`${styles.card_text_container} pl-2`}>
            <div>
              <h4 className={`${styles.services_card_text} mb-5`}>
                {data && data.Title ? (
                  data.Title
                ) : (
                  <Skeleton.Input
                    style={{ width: 150 }}
                    size={"small"}
                    rows={1}
                    active={true}
                  />
                )}
              </h4>
              {data && data.Title ? (
                <Button className={`${styles.services_know_more_btn}`}>
                  <h6 className={`${styles.services_know_more} m-0`}>
                    Know More
                  </h6>
                </Button>
              ) : (
                <Skeleton.Button active />
              )}
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className={`${styles.card_avatar_container} pr-2`}>
            {data && logo && logo.length > 0 ? (
              <>
                <img src={logo} alt="Logo" width="140" height="140" />
              </>
            ) : (
              <Skeleton.Image />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
