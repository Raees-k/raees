//component
import CommonSection from "../commonSection/CommonSection"
//css
import styles from "./news-intro-section.module.sass";

export default function NewsIntroSection({
  news,
  section,
  imageWidth,
  imageHeight,
}) {
  return (
    <div className={`${styles.news_bg}`}>
      <div className={`${styles.news_container} py-5`}>
        <CommonSection  news={news}
          section={section}
          imageWidth={imageWidth}
          imageHeight={imageHeight}/>
      </div>
    </div>
  );
}
