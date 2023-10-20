import Banner from "../../../../assets/gallery/banner.PNG";
import { Row, Col } from "antd";
// CSS
import styles from "./gallery-banner.module.sass";

export default function GalleryBannerImage() {
  return (
    <div className={`${styles.container}`}>
      <Row className={`w-100`}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className={`${styles.gallery_banner_container}`}>
            <img
              className={`${styles.gallery_image}`}
              src={Banner}
              alt="Gallery Tournament"
              height="100%"
              width="100%"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
