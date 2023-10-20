//component
import Layout from "../layout/Layout";
import InnerPageTitleSection from "../../common_components/innerPageTitleSection/InnerPageTitleSection";
import AboutUsIntroSection from "../../components/aboutUs/aboutUsIntroSection/AboutUsIntroSection";
import OurObjectiveSection from "../../components/aboutUs/ourMission/OurObjective";
import StaffSocialClub from "../../components/aboutUs/staffSocialClub/StaffSocialClub";
import VideoSection from "../../common_components/videoSection/VideoSection";
import ExeTeamStructure from "../../components/aboutUs/exeTeamStructure/ExeTeamStructure";
//css
import styles from "./about-us.module.sass";
//bg
import Hero from "../../assets/general/hero.svg";
import Dotted from "../../assets/general/Dotted-line-path-301.svg";

export default function AboutUs() {
  return (
    <>
      <Layout>
        <div className={`position-relative`}>
          <div className={`${styles.bg_color}`}></div>
          <div
            className={`${styles.bg_pattern}`}
            style={{
              backgroundImage: `url(${Hero}),url(${Dotted})`,
            }}
          ></div>
          <div className="container">
            <InnerPageTitleSection title={"about us"} />
          </div>
          <AboutUsIntroSection />
        </div>
        <OurObjectiveSection />
        <StaffSocialClub />
        <ExeTeamStructure />
        <VideoSection />
      </Layout>
    </>
  );
}
