import React, { useState, useEffect } from "react";
import axios from "axios";
import { CONST } from "../../constant/index";
//component
import Layout from "../layout/Layout";
import InnerPageTitleSection from "../../common_components/innerPageTitleSection/InnerPageTitleSection";
import NewsIntroSection from "../../components/newsPublications/newsIntroSection/NewsIntroSection";
import Slider from "../../components/newsPublications/slider/Slider";
import PublicationsSection from "../../components/newsPublications/publicationsSection/PublicationsSection";
import NewsSection from "../../components/newsPublications/newsSection/NewsSection";

//css
import styles from "./news-publications.module.sass";
//Bg
import Hero from "../../assets/general/hero.svg";
import Dotted from "../../assets/general/Dotted-line-path-301.svg";

const items = [];

function setSliderData(news) {
  news.forEach((newsObject, i) => {
    items.push(
      <div data-value={i.toString()}>
        <NewsIntroSection
          news={newsObject}
          section={"intro"}
          imageWidth={"350"}
          imageHeight={"430"}
        />
      </div>
    );
  });
}

export default function NewsPublications({
  news,
  socialMediaIcon,
  footerLink,
}) {
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${CONST.BASE_URL}${CONST.API.LIST("Publication")}${CONST.API.QUERY(
          "Title,AuthorName,Link,Created,Id,TextArea,Expirydate,AttachmentFiles"
        )} ${CONST.API.ATTACHMENT}`
      )
      .then((res) => {
        setSliderData(res.data.value);
        setNewsData(res.data.value);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {newsData && newsData.length > 0 && (
        <Layout socialMediaIcon={socialMediaIcon} footerLink={footerLink}>
          <div className={`position-relative`}>
            <div className={`${styles.bg_color}`}></div>
            <div
              className={`${styles.bg_pattern}`}
              style={{
                backgroundImage: `url(${Hero}),url(${Dotted})`,
              }}
            ></div>
            <div className="container">
              <InnerPageTitleSection title={"News & Publications"} />
            </div>
            <Slider items={items} news={newsData} />
          </div>
          <PublicationsSection news={newsData} />
          <NewsSection />
        </Layout>
      )}
    </>
  );
}
