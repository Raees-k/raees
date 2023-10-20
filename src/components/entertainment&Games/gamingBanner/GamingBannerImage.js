import { Row, Col } from "antd";
import gameImg from "../../../assets/entertainment/GamingBanner.PNG";
// CSS
import styles from "./gaming-banner.module.sass";

export default function GamingBannerImage() {
  return (
    <div className={`${styles.container}`}>
      <Row className={`w-100`}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className={`${styles.game_banner_container}`}>
            <img
              className={`${styles.gaming_image}`}
              src={gameImg}
              alt="Gaming Tournament Banner"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
