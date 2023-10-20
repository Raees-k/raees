import React, { useState, useEffect } from "react";
// component
import AppMultiSlider from "../../../common_components/appMultiSlider/AppMultiSlider";
import AppBtnPair from "../../../common_components/appBtnPair/AppBtnPair";
// css
import styles from "./slider.module.sass";

const responsive = {
  0: { items: 1 },
  568: { items: 1 },
  1000: { items: 1 },
  1024: { items: 1 },
  1440: { items: 1 },
};

export default function Slider({ items, news }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevBtn, setPrevBtn] = useState("disable");
  const [nextBtn, setNextBtn] = useState("enable");
  let finalIndex = parseInt(news.length);

  useEffect(() => {
    if (activeIndex === 0) setPrevBtn("disable");
    else setPrevBtn("enable");
    if (activeIndex === finalIndex - 1) setNextBtn("disable");
    else setNextBtn("enable");
  }, [activeIndex]);

  const slidePrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const slideNext = () => {
    if (activeIndex < finalIndex - 1) setActiveIndex(activeIndex + 1);
  };

  const onSlideChanged = ({ item }) => setActiveIndex(item);
  return (
    <div>
      <div className={`position-relative ${styles.container}`}>
        <div className={`d-flex justify-content-end w-100 position-absolute`}>
          <AppMultiSlider
            responsive={responsive}
            items={items}
            activeIndex={activeIndex}
            onSlideChanged={onSlideChanged}
            paddingLeft={0}
            paddingRight={0}
            animationType={"slide"}
          />
        </div>
        <div
          className={`d-flex justify-content-end w-100 position-absolute ${styles.btn_pair_container}`}
        >
          <AppBtnPair
            prevBtn={prevBtn}
            nextBtn={nextBtn}
            onClickPrev={slidePrev}
            onClickNext={slideNext}
            page={"events"}
          />
        </div>
      </div>
    </div>
  );
}
