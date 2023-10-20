//component
import Layout from "../layout/Layout";
import InnerPageTitleSection from "../../common_components/innerPageTitleSection/InnerPageTitleSection";
import NewsDetailsIntro from "../../components/newsPubDetails/newsDetailsIntro/NewsDetailsIntro";
import AllNews from "../../components/newsPubDetails/allNews/AllNews";
//css
import styles from "./news-details.module.sass";
//Bg
import Hero from "../../assets/general/hero.svg";
import Dotted from "../../assets/general/Dotted-line-path-301.svg";

export default function NewsDetails({ routePath }) {
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
            <InnerPageTitleSection title={"News Details"} />
          </div>
          <NewsDetailsIntro routePath={routePath} />
        </div>
        <AllNews />
      </Layout>
    </>
  );
}
