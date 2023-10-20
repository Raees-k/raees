import { useEffect, useState } from "react";
import axios from "axios";
import { CONST } from "../../constant/index";
// Common Components
import Layout from "../layout/Layout";
import InnerPageTitleSection from "../../common_components/innerPageTitleSection/InnerPageTitleSection";

// Components
import GalleryBannerImage from "../../components/gallery/gallertBannerPage/galleryBanner/GalleryBannerImage";
import GallerySection from "../../components/gallery/gallertBannerPage/gallerySection/GallerySection";
//css
import styles from "./gallery.module.sass";
//Bg
import Hero from "../../assets/general/hero.svg";

export default function GalleryPage() {
  const [galleryData, setGalleryData] = useState(null);
  useEffect(() => {
    axios
      .get(
        `${CONST.BASE_URL}${CONST.API.LIST("Gallery")}${CONST.API.QUERY(
          "Title,EventOccurDate,EventType,Id,Location"
        )}`
      )
      .then((res) => {
        setGalleryData(res.data.value);
      })
      .catch((err) => console.log(err));
  }, []);
  let skeletonData = [{}, {}, {}];
  return (
    <>
      <Layout>
        <div
          className={`${styles.gallery_bg}`}
          style={{
            backgroundImage: `url(${Hero})`,
          }}
        >
          <div className="container">
            <InnerPageTitleSection title={"Media Gallery"} />
          </div>
          <div className="mt-5">
            <GalleryBannerImage />
          </div>
        </div>
        {galleryData && galleryData.length > 0 ? (
          <GallerySection galleryData={galleryData} />
        ) : (
          <GallerySection galleryData={skeletonData} />
        )}
      </Layout>
    </>
  );
}
