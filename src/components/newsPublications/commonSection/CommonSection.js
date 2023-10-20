import { Row, Col } from "antd";
import moment from "moment";
//component
import AppRoundedBtn from "../../../common_components/appRoundedBtn/AppRoundedBtn";
//css
import styles from "./common-section.module.sass";

export default function CommonSection({
  news,
  section,
  imageWidth,
  imageHeight,
}) {
  return (
    <Row>
      {section === "intro" && (
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h3 className={`${styles.intro_title} mb-5`}>Most Viewed</h3>
        </Col>
      )}
      {section === "intro" ? (
        <Col xs={24} sm={24} md={12} lg={10} xl={10}>
          <img
            src={news.AttachmentFiles[0].ServerRelativeUrl}
            alt={"publications"}
            width={imageWidth}
            height={imageHeight}
            className={`${styles.image}`}
          />
        </Col>
      ) : (
        <Col xs={12} sm={12} md={12} lg={10} xl={10}>
          <img
            src={news.AttachmentFiles[0].ServerRelativeUrl}
            alt={"publications"}
            width={imageWidth}
            height={imageHeight}
            className={`${styles.image}`}
          />
        </Col>
      )}

      <Col xs={12} sm={12} md={12} lg={14} xl={14}>
        <div className={`d-flex justify-content-center flex-column h-100 pl-4`}>
          <div className={`${styles.spacing_style}`}>
            <h3
              className={`${
                section === "intro"
                  ? styles.intro_news_title
                  : styles.section_news_title
              }`}
            >
              {news.Title.length > 25
                ? news.Title.substring(0, 25)
                : news.Title}
            </h3>
            <p
              className={`${
                section === "intro"
                  ? styles.intro_news_created_date
                  : styles.section_news_created_date
              } mb-5`}
            >
              {moment(news.Created).format("D MMMM YYYY")}
            </p>
            {section === "intro" && (
              <p className={`${styles.intro_news_description} mb-5`}>
                {news && news.TextArea && news.TextArea.length && news.TextArea}
              </p>
            )}
            <div
              className={`w-100 ${
                section === "intro" ? styles.button_spacing : ""
              }`}
            >
              <AppRoundedBtn
                text={"Read More"}
                prefix={""}
                suffix={""}
                bg={"blue"}
                outline={"dark"}
                long={false}
                href={news.Link}
                btnStyle={{}}
                onClickHandler={() => {}}
                dropDown={false}
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
