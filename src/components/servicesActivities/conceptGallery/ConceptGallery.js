import { Col, Row } from "antd";
//Component
import MultiImageView from "../../../common_components/multiImageView/MultiImageView";
import AppSlider from "../../../common_components/appSlider/AppSlider";
//css
import styles from "./concept-gallery.module.sass";
//BG
import Background from "../../../assets/serviceActivities/pinkRec.svg";

export default function ConpceptGallery({ galleryTitle, finalData }) {
  return (
    <div
      className={`${styles.gallery_bg}`}
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <Row>
        <Col xs={24} sm={24} md={0} lg={0} xl={0}>
          <Col xs={24} sm={24} md={0} lg={0} xl={0}>
            <h3
              className={`${styles.miv_title}`}
            >{`${galleryTitle} Concept Gallery`}</h3>
          </Col>
          <div className={`mt-05`}>
            <AppSlider
              showIndicators={false}
              autoPlay={true}
              setAutoPlay={() => {}}
              stopOnHover={false}
              // fade={true}
              swipeable={false}
            >
              {finalData &&
                finalData.map((img, index) => (
                  <>
                    <Col
                      className={`d-flex align-items-center flex-column mt-5`}
                      key={index}
                    >
                      <div className={`${styles.miv_image_box} mb-5`}>
                        <div
                          className={`d-flex justify-content-center align-items-center overflow-hidden w-100 h-100`}
                        >
                          <img
                            src={img.ServerRelativeUrl}
                            alt={img.hash}
                            // width="250"
                            // height="250"
                          />
                        </div>
                      </div>
                    </Col>
                  </>
                ))}
            </AppSlider>
          </div>
        </Col>
        <Col xs={0} sm={0} md={24} lg={24} xl={24}>
          <MultiImageView
            title={`${galleryTitle} Concept Gallery`}
            //subTitle={`Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.`}
            finalData={finalData}
            page={`serviceActivities`}
          />
        </Col>
      </Row>
    </div>
  );
}
