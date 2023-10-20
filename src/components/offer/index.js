import React, { useEffect, useState } from "react";
import { Col, Row, Skeleton } from "antd";

import axios from "axios";
import { CONST } from "../../constant/index";
import styles from "./index.module.sass";

export default function OfferComp() {
  const [OffersData, setOffersData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${CONST.BASE_URL}${CONST.API.LIST("Rewards")}${CONST.API.QUERY(
          "Title,Priority,AttachmentFiles"
        )} ${CONST.API.ATTACHMENT}`
      )
      .then((res) => {
        let sortedOfferData = res.data.value.sort(function (x, y) {
          return x.Priority - y.Priority;
        });
        setOffersData(sortedOfferData);
        // console.log("Offer Data", res.data.value);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log("OFFER", OffersData);

  return (
    <>
      <Row className={`h-100 `}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className={`${styles.offers_container}`}>
            <div
              className={`d-flex justify-content-center align-items-center flex-column`}
            >
              {OffersData && OffersData?.length > 0 ? (
                OffersData?.map((data, index) => (
                  <div className={`mb-4`} key={index}>
                    <img
                      src={data?.AttachmentFiles[0]?.ServerRelativeUrl}
                      alt={"Reward Application Demo"}
                      className={`${styles.image}`}
                    />
                  </div>
                ))
              ) : (
                <Skeleton.Input style={{ width: 1000, height: 400 }} active />
              )}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
