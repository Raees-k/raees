import { useEffect, useState, useContext } from "react";
// Context
import { AppContext } from "../../App";
import { Row, Col } from "antd";
//css
import styles from "./indicator.module.sass";

export default function Indicators({ onColorIndicatorClick }) {
  const { services } = useContext(AppContext);
  const [indicatorTexts, setIndicatorTexts] = useState(null);

  useEffect(() => {
    if (services && services.length > 0) {
      let filteredService = services.filter(
        (service) => service.IsEvent === "Yes"
      );
      let indicators = filteredService.map((data) => {
        return {
          text: data.Title,
          serviceType: data?.ServiceType,
          color: data.Color,
        };
      });
      setIndicatorTexts(indicators);
    }
  }, [services]);

  return (
    <div className={`${styles.footer}`}>
      <Row className={`${styles.footer_row}`}>
        {indicatorTexts &&
          indicatorTexts.length > 0 &&
          indicatorTexts.map((indicator, index) => {
            return (
              <Col
                xs={12}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                className={`d-flex align-items-center my-2`}
                keys={index.toString()}
              >
                <div
                  style={{ backgroundColor: indicator.color }}
                  className={`${styles.indicator_box}`}
                  onClick={() => {
                    onColorIndicatorClick(indicator?.serviceType);
                  }}
                ></div>
                <div
                  style={{ color: indicator.color }}
                  className={`${styles.indecator_text}`}
                >
                  {indicator.text}
                </div>
              </Col>
            );
          })}
      </Row>
    </div>
  );
}
