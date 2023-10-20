import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { CONST } from "../../../constant/index";
//component
import ResponsiveView from "./ResponsiveView";
import AppSlider from "../../../common_components/appSlider/AppSlider";
// css
import styles from "./testimonials.module.sass";
import icon from "../../../assets/context/slider_btn_icon_dark.svg";

export default function Testimonials() {
  const [testimonialsData, setTestimonialsData] = useState(null);
  useEffect(() => {
    axios
      .get(
        `${CONST.BASE_URL}${CONST.API.LIST("Testimonial")}${CONST.API.QUERY(
          "Title,TestimonialsDescription,AttachmentFiles"
        )} ${CONST.API.ATTACHMENT}`
      )
      .then((res) => {
        setTestimonialsData(res.data.value);
      })
      .catch((err) => console.log(err));
  }, []);
  let skeletonData = [{}];
  return (
    <div className={`${styles.testimonial_bg}`}>
      <AppSlider
        btnIcon={icon}
        showIndicators={false}
        autoPlay={true}
        setAutoPlay={() => {}}
        stopOnHover={true}
      >
        {testimonialsData && testimonialsData.length > 0
          ? testimonialsData.map((data, index) => (
              <Row key={index}>
                <Col xs={0} sm={0} md={0} lg={24} xl={24}>
                  <ResponsiveView view={"desktop"} testimonialsData={data} />
                </Col>
                <Col xs={0} sm={0} md={24} lg={0} xl={0}>
                  <ResponsiveView view={"tablet"} testimonialsData={data} />
                </Col>
                <Col xs={24} sm={24} md={0} lg={0} xl={0}>
                  <ResponsiveView view={"mobile"} testimonialsData={data} />
                </Col>
              </Row>
            ))
          : skeletonData.map((data, index) => (
              <Row key={index}>
                <Col xs={0} sm={0} md={0} lg={24} xl={24}>
                  <ResponsiveView view={"desktop"} testimonialsData={data} />
                </Col>
                <Col xs={0} sm={0} md={24} lg={0} xl={0}>
                  <ResponsiveView view={"tablet"} testimonialsData={data} />
                </Col>
                <Col xs={24} sm={24} md={0} lg={0} xl={0}>
                  <ResponsiveView view={"mobile"} testimonialsData={data} />
                </Col>
              </Row>
            ))}
      </AppSlider>
    </div>
  );
}
