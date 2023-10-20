import { useEffect, useState } from "react";
import axios from "axios";
import { CONST } from "../../constant/index";
// Common Components
import Layout from "../layout/Layout";
import InnerPageTitleSection from "../../common_components/innerPageTitleSection/InnerPageTitleSection";
// Component
import GalleryInnerPageSection from "../../components/gallery/galleryInnerPage/galleryInnerPageSection/GalleryInnerPageSection";
//css
import styles from "./media.module.sass";
//Bg
import Hero from "../../assets/general/hero.svg";

export default function Media({ routePath }) {
  const [eventData, setEventData] = useState(null);
  const [titleData, setTitleData] = useState(null);
  useEffect(() => {
    // debugger;
    if (routePath && routePath.id) {
      axios
        .get(
          `${CONST.BASE_URL}${CONST.API.LIST("Gallery")}${CONST.API.QUERY(
            "Title,EventOccurDate,EventType,Id,Location"
          )} ${CONST.API.FILTER("Id", routePath.id)}`
        )
        .then((res) => {
          setTitleData(res.data.value);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get(
          `${CONST.BASE_URL}${CONST.API.LIST(
            "GalleryContent"
          )}${CONST.API.QUERY(
            "Title,VideoImage,ContentType0,Id,AttachmentFiles"
          )} ${CONST.API.ATTACHMENT}`
        )
        .then((res2) => {
          setEventData(res2.data.value);
        })
        .catch((err) => console.log(err));
    }
  }, [routePath]);

  return (
    <>
      <Layout>
        <div className={`position - relative`}>
          <div className={`${styles.bg_color} `}></div>
          <div
            className={`${styles.bg_pattern} `}
            style={{
              backgroundImage: `url(${Hero})`,
            }}
          ></div>
          <div className="container">
            <InnerPageTitleSection title={"Media Gallery"} />
          </div>
          {eventData &&
            eventData.length > 0 &&
            titleData &&
            titleData.length > 0 &&
            routePath &&
            routePath.id.length > 0 && (
              <GalleryInnerPageSection
                eventData={eventData}
                titleData={titleData}
                routePath={routePath}
              />
            )}
        </div>
      </Layout>
    </>
  );
}
