import { Row, Col } from "antd";
import useInView from "react-cool-inview";
//Components
import AppSlider from "../../../common_components/appSlider/AppSlider";
//animation
import { slideInLeft } from "react-animations";
import { StyleSheet, css } from "aphrodite";
//css
import styles from "./exe-team-structure.module.sass";
//Bg
import Exe from "../../../assets/aboutUs/exeBg.svg";

const animationStyles = StyleSheet.create({
  slideInLeft: {
    animationName: slideInLeft,
    animationDuration: "1.5s",
  },
});

export default function ExeTeamStructure() {
  const structureData = [
    {
      para: "The SSC Executive Team shall comprise of a Chairperson Deputy Chairperson, Treasurer and Members. It will be supported by a full-time coordinator",
      color: styles.orange,
    },
    {
      para: "The SSC Executive Team shall carryout its functions as per the IsDBG applicable systems, procedures and policies",
      color: styles.yellow,
    },
    {
      para: "The SSC Executive Team shall be the executive body of the SSC and shall act on its behalf both within the IsDB Group and externally​",
      color: styles.blue,
    },
    {
      para: "The SSC Team member nominees from IsDBG Entities Members (IsDB, IRIT, ICIEC, ICD, ITFC, ISFD)",
      color: styles.purple,
    },
    {
      para: "One staff member may be elected from each regional hub to carry out social events and activities in close coordination with SSC​",
      color: styles.green,
    },
  ];

  const { observe, inView } = useInView({
    threshold: 0.25, // Default is 0
    onChange: ({ inView, scrollDirection, entry, observe, unobserve }) => {
      // Triggered whenever the target meets a threshold, e.g. [0.25, 0.5, ...]

      unobserve(); // To stop observing the current target element
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

  return (
    <div
      className={`${styles.bg}`}
      style={{
        backgroundImage: `url(${Exe})`,
      }}
    >
      <div className={`${styles.mobile_container}`}>
        <Row>
          <Col xs={24} sm={24} md={0} lg={0} xl={0}>
            <h3 className={`${styles.exe_team_title} px-2 mt-5 mb-3`}>
              Executive Team Structure
            </h3>
          </Col>
          <Col xs={24} sm={24} md={0} lg={0} xl={0}>
            <AppSlider
              showIndicators={false}
              autoPlay={true}
              setAutoPlay={() => {}}
              stopOnHover={false}
              // fade={true}
              swipeable={false}
            >
              {structureData &&
                structureData.map((data, index) => (
                  <div className={`${styles.hex_container_r}`} key={index}>
                    <div className={`${styles.hex_border} ${data.color}`}>
                      <div className={`${styles.hex_white_space}`}>
                        <div className={`${styles.hex} ${data.color}`}>
                          <p className={`${styles.hex_text} px-5 m-0`}>
                            {data.para}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </AppSlider>
          </Col>
        </Row>
      </div>
      <div className={`${styles.container}`} ref={observe}>
        <Row>
          <Col xs={0} sm={0} md={24} lg={24} xl={24}>
            <h3 className={`${styles.exe_team_title} px-2 mt-5 mb-5`}>
              Executive Team Structure
            </h3>
          </Col>
          <Col xs={0} sm={0} md={8} lg={8} xl={8}>
            <div className={inView ? css(animationStyles.slideInLeft) : ""}>
              <div className={`${styles.hex_container_r}`}>
                <div className={`${styles.hex_border} ${styles.orange}`}>
                  <div className={`${styles.hex_white_space}`}>
                    <div className={`${styles.hex} ${styles.orange}`}>
                      <p className={`${styles.hex_text} px-5 m-0`}>
                        The SSC Executive Team shall comprise of a Chairperson,
                        Deputy Chairperson, Treasurer and Members. It will be
                        supported by a full-time coordinator
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={inView ? css(animationStyles.slideInLeft) : ""}>
              <div className={`${styles.hex_container_r}`}>
                <div className={`${styles.hex_border} ${styles.blue}`}>
                  <div className={`${styles.hex_white_space}`}>
                    <div className={`${styles.hex} ${styles.blue}`}>
                      <p className={`${styles.hex_text} px-5 m-0`}>
                        The SSC Executive Team shall carryout its functions as
                        per the IsDBG applicable systems, procedures and
                        policies
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col
            xs={0}
            sm={0}
            md={8}
            lg={8}
            xl={8}
            className={`d-flex justify-content-center `}
          >
            <div className={`${styles.hex_container}`}>
              <div className={inView ? css(animationStyles.slideInLeft) : ""}>
                <div className={`${styles.hex_border} ${styles.yellow}`}>
                  <div className={`${styles.hex_white_space}`}>
                    <div className={`${styles.hex} ${styles.yellow}`}>
                      <p className={`${styles.hex_text} px-5 m-0`}>
                        The SSC Executive Team shall be the executive body of
                        the SSC and shall act on its behalf both within the IsDB
                        Group and externally
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={0} sm={0} md={8} lg={8} xl={8}>
            <div className={inView ? css(animationStyles.slideInLeft) : ""}>
              <div className={`${styles.hex_container_l}`}>
                <div className={`${styles.hex_border}  ${styles.purple}`}>
                  <div className={`${styles.hex_white_space}`}>
                    <div className={`${styles.hex} ${styles.purple}`}>
                      <p className={`${styles.hex_text} px-5 m-0`}>
                        The SSC Team member nominees from IsDBG Entities Members
                        (IsDB, IRIT, ICIEC, ICD, ITFC, ISFD)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={inView ? css(animationStyles.slideInLeft) : ""}>
              <div className={`${styles.hex_container_l}`}>
                <div className={`${styles.hex_border}  ${styles.green}`}>
                  <div className={`${styles.hex_white_space}`}>
                    <div className={`${styles.hex} ${styles.green}`}>
                      <p className={`${styles.hex_text} px-5 m-0`}>
                        One staff member may be elected from each regional hub
                        to carry out social events and activities in close
                        coordination with SSC
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
