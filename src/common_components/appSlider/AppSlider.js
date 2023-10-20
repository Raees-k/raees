import React from "react";
import { Carousel } from "react-responsive-carousel";
//css
import styles from "./app-slider.module.sass";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function AppSlider({
  children,
  btnIcon,
  showIndicators,
  // fade,
  swipeable,
  autoPlay,
  setAutoPlay,
  stopOnHover,
  dynamicHeight = false,
}) {
  return (
    <Carousel
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={5000}
      autoPlay={autoPlay}
      stopOnHover={stopOnHover}
      showIndicators={showIndicators}
      dynamicHeight={dynamicHeight ? true : false}
      // fade={fade}
      swipeable={swipeable}
      renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
        hasPrev && (
          <button
            onClick={() => {
              clickHandler();
              setAutoPlay(true);
            }}
            type="button"
            aria-label="next slide / item"
            style={{ backgroundImage: `url(${btnIcon})` }}
            className={`${styles.slide_btn} control-arrow control-prev`}
          ></button>
        )
      }
      renderArrowNext={(clickHandler, hasPrev, labelPrev) =>
        hasPrev && (
          <button
            onClick={() => {
              clickHandler();
              setAutoPlay(true);
            }}
            type="button"
            aria-label="next slide / item"
            style={{ backgroundImage: `url(${btnIcon})` }}
            className={`${styles.slide_btn} ${styles.image_position} control-arrow control-next`}
          ></button>
        )
      }
    >
      {children}
    </Carousel>
  );
}
