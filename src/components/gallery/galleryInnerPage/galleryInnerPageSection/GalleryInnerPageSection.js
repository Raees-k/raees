import { useState, useEffect } from "react";
import { Row, Col, Empty } from "antd";
// CSS
import styles from "./gallery-inner-section.module.sass";
// Components
import GalleryTitle from "../galleryTitle/GalleryTitle";
import GalleryImageCard from "../galleryImageCard/GalleryImageCard";
//Bg
import GalleryBg from "../../../../assets/gallery/gallery.svg";

export default function GalleryInnerPageSection({
  eventData,
  titleData,
  routePath,
}) {
  const [category, setCategory] = useState("All");
  const [filteredcardData, setFilteredCardData] = useState([]);
  const [AllData, setAllData] = useState([]);
  // Conditional Rendering
  useEffect(() => {
    if (eventData && eventData.length > 0) {
      let data = eventData.filter(
        (data) =>
          data.ContentType0.toLowerCase() === category.toLowerCase() &&
          data.Title === routePath.id
      );
      setFilteredCardData(data);
    }
  }, [eventData, category, routePath]);

  useEffect(() => {
    if (eventData && eventData.length > 0) {
      let data = eventData.filter((data) => data.Title === routePath.id);
      setAllData(data);
    }
  }, [eventData, category, routePath]);

  return (
    <div
      className={`${styles.gallery_inner_section_bg}`}
      style={{
        backgroundImage: `url(${GalleryBg})`,
      }}
    >
      <div className={`${styles.gallery_inner_section_container}`}>
        {setCategory && (
          <GalleryTitle titleData={titleData} setCategory={setCategory} />
        )}
        {/*  */}
        {(filteredcardData && filteredcardData.length > 0) ||
        (eventData && eventData.length > 0) ? (
          <GalleryImageCard
            filteredcardData={filteredcardData}
            category={category}
            AllData={AllData}
          />
        ) : (
          <Row>
            <Col span={24}>
              <Empty className={`mb-4`} />
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
}
