import { Row, Col } from "antd";
import useInView from "react-cool-inview";
//animation
import { slideInLeft } from "react-animations";
import { StyleSheet, css } from "aphrodite";
import { useEffect, useState, useContext } from "react";
//component
import AppSlider from "../appSlider/AppSlider";
import ServicesActivitiesCard from "../servicesActivitiesCard/ServicesActivitiesCard";
import { AppContext } from "../../App";
const animationStyles = StyleSheet.create({
  slideInLeft: {
    animationName: slideInLeft,
    animationDuration: "1s",
  },
});

export default function ServicesActivitiesCardSection() {
  const { services } = useContext(AppContext);
  const [cardsData, setcardsData] = useState(null);
  useEffect(() => {
    if (services && services?.length > 0) {
      setcardsData(services);
    }
  }, [services]);

  const { observe, inView } = useInView({
    threshold: 0.25, // Default is 0
    onChange: ({ inView, scrollDirection, entry, observe, unobserve }) => {
      // Triggered whenever the target meets a threshold, e.g. [0.25, 0.5, ...]

      // unobserve(); // To stop observing the current target element
      observe(); // To re-start observing the current target element
    },
    onEnter: ({ scrollDirection, entry, observe, unobserve }) => {
      // Triggered when the target enters the viewport
    },
    onLeave: ({ scrollDirection, entry, observe, unobserve }) => {
      // Triggered when the target leaves the viewport
    },
    // More useful options...
  });
  let scletonData = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
  console.log("services-->", services);
  return (
    <Row ref={observe}>
      <Col xs={0} sm={0} md={0} lg={24} xl={24}>
        <Row gutter={[16, 16]}>
          {cardsData && cardsData?.length > 0
            ? cardsData.map((cardData, index) => (
                <Col span={8} key={index}>
                  <div
                    className={inView ? css(animationStyles.slideInLeft) : ""}
                  >
                    <ServicesActivitiesCard data={cardData} />
                  </div>
                </Col>
              ))
            : scletonData.map((sData, index) => (
                <Col span={8} key={index}>
                  <ServicesActivitiesCard data={sData} />
                </Col>
              ))}
        </Row>
      </Col>
      <Col xs={0} sm={0} md={24} lg={0} xl={0}>
        <div className={inView ? css(animationStyles.slideInLeft) : ""}>
          <Row gutter={[16, 16]} className={`w-100 pl-3`}>
            {cardsData && cardsData?.length > 0
              ? cardsData?.map((cardData, index) => (
                  <Col
                    span={12}
                    className={`d-flex justify-content-center`}
                    key={index}
                  >
                    <ServicesActivitiesCard data={cardData} />
                  </Col>
                ))
              : scletonData.map((sData, index) => (
                  <Col span={12} key={index}>
                    <ServicesActivitiesCard data={sData} />
                  </Col>
                ))}
          </Row>
        </div>
      </Col>
      <Col xs={24} sm={24} md={0} lg={0} xl={0}>
        <div>
          <AppSlider
            btnIcon={`/context/slider_btn_icon_dark.svg`}
            showIndicators={false}
            autoPlay={true}
            setAutoPlay={() => {}}
          >
            {cardsData && cardsData?.length > 0
              ? cardsData.map((cardData, index) => (
                  <Row gutter={[16, 16]} className={`w-100 pl-3`} key={index}>
                    <Col
                      span={24}
                      className={`d-flex justify-content-center mb-2`}
                    >
                      <ServicesActivitiesCard data={cardData} />
                    </Col>
                  </Row>
                ))
              : scletonData.map((sData, index) => (
                  <Col span={24} className={"p-2 "} key={index}>
                    <ServicesActivitiesCard data={sData} />
                  </Col>
                ))}
          </AppSlider>
        </div>
      </Col>
    </Row>
  );
}
