//component
import Layout from "../layout/Layout";
import BuysellSection from "../../components/buySell/buySellSection/BuysellSection";
import InnerPageTitleSection from "../../common_components/innerPageTitleSection/InnerPageTitleSection";
//css
import styles from "./buy-sell.module.sass";
//Bg
import Hero from "../../assets/general/hero.svg";
import Dotted from "../../assets/general/Dotted-line-path-301.svg";

export default function BuySell() {
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
          <div className="container mb-5">
            <InnerPageTitleSection title={"Buy & Sell"} />
          </div>
          <BuysellSection />
        </div>
      </Layout>
    </>
  );
}
