import { Row, Col } from "antd";
//css
import styles from "./inner-page-title-section.module.sass";

export default function InnerPageTitleSection({ title }) {
  return (
    <Row>
      <Col>
        <div /* className={`${styles.title_container}`} */ className="mt-5">
          <div className={`${styles.title}`}>{title}</div>
        </div>
      </Col>
    </Row>
  );
}
