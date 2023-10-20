import React from "react";
import { Modal, Row, Col } from "antd";

import { CloseOutlined } from "@ant-design/icons";
//Library
import moment from "moment";
//css
import styles from "./view-ad.module.sass";
//componet
import AppSlider from "../../../common_components/appSlider/AppSlider";

import location from "../../../assets/buySell/map-pin.svg";
import mail from "../../../assets/buySell/mail.svg";
import phone from "../../../assets/buySell/phone.svg";
import noimg from "../../../assets/buySell/No_Image_Available.jpg";

function getDisplayImage(image) {
  let result = [];
  if (image.length % 2 === 0) {
    image.forEach((element, index) => {
      if ((index + 1) % 2 === 0) {
        result.push({
          img1: image[index - 1].ServerRelativeUrl,
          img2: image[index].ServerRelativeUrl,
        });
      }
    });
  } else {
    if (image.length === 1) {
      result.push({ img1: image[0].ServerRelativeUrl, img2: null });
    }
    if (image.length !== 1 && image.length % 2 !== 0) {
      image.forEach((element, index) => {
        if ((index + 1) % 2 === 0) {
          result.push({
            img1: image[index - 1].ServerRelativeUrl,
            img2: image[index].ServerRelativeUrl,
          });
        }
      });
      result.push({
        img1: image[image.length - 1].ServerRelativeUrl,
        img2: null,
      });
    }
  }
  return result;
}

export default function ViewAdModal({ cardData, visible, setVisiblety }) {
  let displayImage = getDisplayImage(cardData.AttachmentFiles);
  return (
    <Modal
      // title={`Event Registration`}
      centered
      onCancel={() => setVisiblety(false)}
      open={visible}
      closable={false}
      footer={null}
      width={800}
      bodyStyle={{ padding: "50px" }}
      wrapClassName={`${styles.event_reg_modal}`}
    >
      <Row>
        <Col span={24}>
          <div className={`d-flex justify-content-end`}>
            <CloseOutlined
              className={`${styles.buysell_iconBig}`}
              onClick={() => setVisiblety(false)}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={0} sm={0} md={0} lg={19} xl={19}>
          <div className={`${styles.buysell_Titletext} pt-2 pb-2`}>
            {cardData.Title}
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={5} xl={5}>
          <div className={`${styles.buysell_TitletextPrice} pt-2 pb-2`}>
            {cardData.Price}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={0} sm={0} md={0} lg={24} xl={24}>
          <div className={`${styles.buysell_dateMain} pt-2 pb-2`}>
            {moment(cardData.Created).format("D MMM YYYY")}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={0} sm={0} md={0} lg={24} xl={24}>
          <div className={`${styles.buysell_text} pt-2 pb-3`}>
            {cardData.Description}
          </div>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          {displayImage.length > 0 ? (
            <AppSlider
              showIndicators={false}
              stopOnHover={false}
              autoPlay={true}
            >
              {displayImage.map((data, index) => (
                <Row gutter={[16, 16]} key={index}>
                  <Col xs={0} sm={0} md={12} lg={12} xl={12}>
                    <div className={`${styles.buysell_mainImgConatiner}`}>
                      <img
                        src={data.img1}
                        alt="card-img"
                        layout={`fill`}
                        height="100%"
                        width="100%"
                      />
                    </div>
                  </Col>
                  <Col xs={0} sm={0} md={12} lg={12} xl={12}>
                    <div className={`${styles.buysell_mainImgConatiner}`}>
                      {data.img2 && (
                        <img
                          src={data.img2}
                          alt="card-img"
                          layout={`fill`}
                          height="100%"
                          width="100%"
                        />
                      )}
                    </div>
                  </Col>
                </Row>
              ))}
            </AppSlider>
          ) : (
            <div className="d-flex justify-content-center ">
              <img src={noimg} alt="card-img" height="211px" width="280px" />
            </div>
          )}
        </Col>
      </Row>
      <Row className={"pt-3 pb-2"}>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Row>
            <Col
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              className={`${styles.buysell_HText}`}
            >
              Category
            </Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}>
              :
            </Col>
            <Col
              xs={18}
              sm={18}
              md={18}
              lg={18}
              xl={18}
              className={`${styles.buysell_valText}`}
            >
              {cardData.Category}
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Row>
            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
              <img
                src={location}
                alt={"videoAD modal img"}
                width="22"
                height="22"
              />
              {/* <i class={`${styles.buysell_iconBig} fa fa-map-marker`} aria-hidden="true" ></i> */}
            </Col>
            <Col className={`${styles.buysell_col}`}>
              {cardData.City ? cardData.City : "N/A"}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={"pt-2 pb-2"}>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Row>
            <Col
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              className={`${styles.buysell_HText}`}
            >
              Brand
            </Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}>
              :
            </Col>
            <Col
              xs={18}
              sm={18}
              md={18}
              lg={18}
              xl={18}
              className={`${styles.buysell_valText}`}
            >
              {cardData.Brand ? cardData.Brand : "N/A"}
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Row>
            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
              <img
                src={mail}
                alt={"videoAD modal img"}
                width="22"
                height="22"
              />
              {/* <i class={`${styles.buysell_iconBig} fa fa-envelope-o`} aria-hidden="true" ></i> */}
            </Col>
            <Col className={`${styles.buysell_col}`}>{cardData.Email}</Col>
          </Row>
        </Col>
      </Row>
      <Row className={"pt-2 pb-2"}>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Row>
            <Col
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              className={`${styles.buysell_HText}`}
            >
              Price
            </Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}>
              :
            </Col>
            <Col
              xs={18}
              sm={18}
              md={18}
              lg={18}
              xl={18}
              className={`${styles.buysell_valText}`}
            >
              {cardData.Price ? cardData.Price : "N/A"}
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Row>
            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
              <img
                src={phone}
                alt={"videoAD modal img"}
                width="22"
                height="22"
              />
              {/* <i class={`${styles.buysell_iconBig} fa fa-phone`} aria-hidden="true" ></i> */}
            </Col>
            <Col className={`${styles.buysell_col}`}>
              {cardData.Phone ? cardData.Phone : "N/A"}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={"mt-5 mb-2"}>
        <Col xs={0} sm={0} md={24} lg={24} xl={24}>
          <div className={`${styles.buysell_HText}`}>Posted By :</div>
        </Col>
      </Row>
      <Row>
        <Col
          xs={0}
          sm={0}
          md={2}
          lg={2}
          xl={2}
          className={`${styles.buysell_card_bottomimage_container}`}
        >
          {cardData && cardData.AuthorImage && (
            <img
              src={cardData.AuthorImage}
              alt="card-img"
              layout={`fill`}
              className={`${styles.buysell_card_bottomimage_round}`}
            />
          )}
        </Col>
        <Col xs={0} sm={0} md={14} lg={14} xl={14}>
          <div
            className={`${styles.buysell_UserName} d-flex align-items-center h-100`}
          >
            {cardData.Author0}
          </div>
        </Col>
      </Row>
    </Modal>
  );
}
