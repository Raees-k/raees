import { useEffect, useState } from "react";
import { notification, Empty } from "antd";
import { WarningOutlined } from "@ant-design/icons";
// Components
import GalleryHeader from "../galleryLayout/galleryHeader/GalleryHeader";
import GalleryList from "../galleryList/GalleryList";
import GalleryFooter from "../galleryLayout/galleryFooter/GalleryFooter";
// CSS
import styles from "./gallery-section.module.sass";
//Bg
import GalleryBg from "../../../../assets/gallery/gallery.svg";

const openNotification = (setToDate) => {
  notification.error({
    message: "Wrong Date Selection",
    description: "Date(To) should be ahead Date(From)",
    onClose: () => {
      setToDate(null);
    },
    icon: <WarningOutlined className={`text-danger`} />,
  });
};

export default function GallerySection({ galleryData }) {
  const [listSize, setListSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [galleryList, setGalleryList] = useState([]);
  const [filteredGalleryList, setFilteredGalleryList] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    let listData = galleryData;

    setGalleryList(listData);
    let list = [];
    if (toDate && new Date(fromDate).getTime() > new Date(toDate).getTime()) {
      openNotification(setToDate);
      setFilteredGalleryList(listData);
    } else {
      if (new Date(fromDate).getTime() && new Date(toDate).getTime()) {
        if (new Date(fromDate).getTime() === new Date(toDate).getTime())
          list = listData.filter(
            (listItem) =>
              new Date(fromDate).getTime() <
                new Date(listItem.EventOccurDate).getTime() &&
              new Date(fromDate).getTime() + 86400000 >
                new Date(listItem.EventOccurDate).getTime()
          );
        else
          list = listData.filter(
            (listItem) =>
              new Date(fromDate).getTime() <
                new Date(listItem.EventOccurDate).getTime() &&
              new Date(toDate).getTime() + 86400000 >
                new Date(listItem.EventOccurDate).getTime()
          );
      }
    }

    if (category) {
      if (category === "all") {
        if (list.length > 0) {
          list = list;
        } else {
          if (!fromDate && !toDate) list = listData;
        }
      } else {
        if (list.length > 0) {
          list = list.filter(
            (listItem) =>
              listItem.EventType.toLowerCase() === category.toLowerCase()
          );
        } else {
          if (!fromDate && !toDate)
            list = listData.filter(
              (listItem) =>
                listItem.EventType.toLowerCase() === category.toLowerCase()
            );
        }
      }
    }
    setFilteredGalleryList(list);
  }, [galleryData, category, toDate, fromDate]);

  return (
    <div
      className={`${styles.gallery_section_bg}`}
      style={{
        backgroundImage: `url(${GalleryBg})`,
      }}
    >
      <div className={`${styles.bg_shade}`}></div>
      <div className={`${styles.gallery_section_container}`}>
        <GalleryHeader
          toDate={toDate}
          setToDate={setToDate}
          fromDate={fromDate}
          setFromDate={setFromDate}
          setCategory={setCategory}
        />
        {filteredGalleryList && filteredGalleryList.length > 0 ? (
          <>
            <GalleryList
              listData={filteredGalleryList}
              listSize={listSize}
              pageNumber={pageNumber}
            />
            <GalleryFooter
              listData={filteredGalleryList}
              listSize={listSize}
              pageNumber={pageNumber}
              setListSize={setListSize}
              setPageNumber={setPageNumber}
            />
          </>
        ) : (
          <Empty className={`mb-4`} />
        )}
      </div>
    </div>
  );
}
