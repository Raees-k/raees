import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import useInView from "react-cool-inview";
import axios from "axios";
import { CONST } from "../../constant/index";
import videoImg from "../../assets/video/Video.svg";
//animation
import { zoomIn } from "react-animations";
import { StyleSheet, css } from "aphrodite";
//css
import styles from "./video-section.module.sass";

const animationStyles = StyleSheet.create({
  zoomIn: {
    animationName: zoomIn,
    animationDuration: "1s",
  },
});

export default function VideoSection() {
  const [backgroundVideo, setBackgroundVideo] = useState(true);
  const [clickedOutside, setClickedOutside] = useState(false);
  const [video, setVideo] = useState(null);
  useEffect(() => {
    axios
      .get(
        CONST.BASE_URL +
          CONST.API.LIST("SiteVideo") +
          CONST.API.QUERY("Title,VideoLink,Created")
      )
      .then((res) => {
        let videoArray = res.data.value.sort(
          (a, b) =>
            new Date(b.Created).getTime() - new Date(a.Created).getTime()
        );
        setVideo(videoArray);
      })
      .catch((err) => console.log(err));
  }, []);

  const { observe, inView } = useInView({
    threshold: 0.25, // Default is 0
    onChange: ({ inView, scrollDirection, entry, observe, unobserve }) => {
      // Triggered whenever the target meets a threshold, e.g. [0.25, 0.5, ...]

      // unobserve(); // To stop observing the current target element
      observe(); // To re-start observing the current target element
    },
    onEnter: ({ scrollDirection, entry, observe, unobserve }) => {
      // Triggered when the target enters the viewport
    },
    onLeave: ({ scrollDirection, entry, observe, unobserve }) => {
      // Triggered when the target leaves the viewport
    },
    // More useful options...
  });
  const videoRef = useRef();

  const handleClickOutside = (e) => {
    if (!videoRef.current.contains(e.target)) {
      setClickedOutside(true);
      setBackgroundVideo(true);
    }
  };

  // const handleClickInside = () => setClickedOutside(false);

  useEffect(() => {
    setBackgroundVideo(true);
  }, [inView]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div
      className={`${styles.video}`}
      // style={{ marginTop: "200px" }}
      ref={videoRef}
    >
      <div className={`${styles.viewPort_container}`} ref={observe}>
        {video && video.length > 0 ? (
          backgroundVideo ? (
            <div className={inView ? css(animationStyles.zoomIn) : ""}>
              <div
                className={`${styles.image_container} `}
                onClick={() => setBackgroundVideo(false)}
              >
                <div
                  className={`position-absolute w-100 ${styles.video_title_container}`}
                >
                  <h3 className={`${styles.video_title}`}>{video[0].Title}</h3>
                </div>
                <div
                  className={`w-100 h-100 position-absolute ${styles.vimage_container}`}
                >
                  <img
                    className={`${styles.image}`}
                    src={videoImg}
                    alt=""
                  ></img>
                </div>
                <ReactPlayer
                  url={video[0].VideoLink}
                  width={"100%"}
                  height={`100%`}
                  volume={0}
                  muted
                  loop
                  controls={false}
                  playing={true}
                  // controls={true}
                />
              </div>
            </div>
          ) : (
            <ReactPlayer
              url={video[0].VideoLink}
              width={"100%"}
              height={`100%`}
              volume={100}
              muted
              loop
              // controls={false}
              playing={true}
              controls={true}
            />
          )
        ) : null}
      </div>
    </div>
  );
}
