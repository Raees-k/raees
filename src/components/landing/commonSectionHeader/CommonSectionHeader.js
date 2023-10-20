import { Row, Col } from "antd";
//component
import AppBtnPair from "../../../common_components/appBtnPair/AppBtnPair";
// css
import styles from "./common-section-header.module.sass";

export default function CommonSectionHeader({
  title,
  sliderSection,
  prevBtn,
  nextBtn,
  onClickPrev,
  onClickNext,
}) {
  return (
    <Row className="mb-3">
      <Col xs={24} sm={24} md={12} lg={12} xl={12} className={`${styles.title}`}>
        {title}
      </Col>
      <Col
        xs={0}
        sm={0}
        md={12}
        lg={12}
        xl={12}
        className={`d-flex justify-content-end ${styles.App_Btn_Container}`}
      >
        {sliderSection ? (
          <AppBtnPair
            prevBtn={prevBtn}
            nextBtn={nextBtn}
            onClickPrev={onClickPrev}
            onClickNext={onClickNext}
            page={"landing"}
          />
        ) : (
          ""
        )}
      </Col>
    </Row>
  );
}
