import React, { useState, useRef } from "react";
import { Row } from "antd";
import "react-image-lightbox/style.css";

import { useHistory } from "react-router-dom";
// component
import CommonSectionHeader from "../commonSectionHeader/CommonSectionHeader";
import AppMultiSlider from "../../../common_components/appMultiSlider/AppMultiSlider";
import GalleryBg from "../../../assets/background/gallery.svg";
//css
import styles from "./gallery.module.sass";

let sliderItems = [];

function getSliderItems(
  galleryContent,
  setIsopen,
  setPhotoUrl,
  setPlay,
  setVideoUrl,
  setModalVisibility,
  setAutoPlay,
  history
) {
  if (galleryContent && galleryContent.length > 0) {
    sliderItems = [];
    if (galleryContent.length % 3 === 0) {
      galleryContent.forEach((image, index) => {
        if ((index + 1) % 3 === 0) {
          // if (image && image.Title) {
          sliderItems.push(
            <>
              <div
                className={`item ${styles.slider_container}`}
                data-value={index.toString()}
              >
                <div className={` p-2 ${styles.slider_container_single}`}>
                  <div
                    className={`my-2 ${styles.gallery_card_container}`}
                    onClick={
                      () => history.push(`/gallery`)
                      // isImage(
                      //   galleryContent[index - 2].AttachmentFiles[0]
                      //     .ServerRelativeUrl,
                      // )
                      //   ? viewImage(
                      //       galleryContent[index - 2].AttachmentFiles[0]
                      //         .ServerRelativeUrl,
                      //       setIsopen,
                      //       setPhotoUrl,
                      //     )
                      //   : viewVideo(
                      //       galleryContent[index - 2].AttachmentFiles[0]
                      //         .ServerRelativeUrl,
                      //       setPlay,
                      //       setVideoUrl,
                      //       setModalVisibility,
                      //       setAutoPlay,
                      //     )
                    }
                  >
                    {galleryContent[index - 2].ContentType0.toLowerCase() ===
                    "image" ? (
                      <img
                        className={`${styles.gallery_card}`}
                        src={
                          galleryContent[index - 2].AttachmentFiles[0]
                            .ServerRelativeUrl
                        }
                        alt={"ISDB"}
                        // height="100%"
                        width="100%"
                        // layout="fill"
                      />
                    ) : (
                      // <div className={`${styles.gallery_image_card}`}>
                      <>
                        <div
                          className={`${styles.video_play_btn}`}
                          onClick={() => {
                            setVideoUrl(
                              `${
                                galleryContent[index - 2].AttachmentFiles[0]
                                  .ServerRelativeUrl
                              }`
                            );
                            setPlay(true);
                            setModalVisibility(true);
                            setAutoPlay(false);
                          }}
                        >
                          <i
                            className={`fa fa-play ${styles.play_icon}`}
                            aria-hidden="true"
                          ></i>
                        </div>
                        <img
                          alt={`ISDB`}
                          src={galleryContent[index - 2].VideoImage}
                          height="100%"
                          width="100%"
                        />
                      </>
                      // </div>
                    )}
                  </div>

                  <div
                    className={`my-2 ${styles.gallery_card_container}`}
                    onClick={
                      () => {}
                      // isImage(
                      //   galleryContent[index - 1].AttachmentFiles[0]
                      //     .ServerRelativeUrl,
                      // )
                      //   ? viewImage(
                      //     galleryContent[index - 1].AttachmentFiles[0]
                      //       .ServerRelativeUrl,
                      //     setIsopen,
                      //     setPhotoUrl,
                      //   )
                      //   : viewVideo(
                      //     galleryContent[index - 1].AttachmentFiles[0]
                      //       .ServerRelativeUrl,
                      //     setPlay,
                      //     setVideoUrl,
                      //     setModalVisibility,
                      //     setAutoPlay,
                      //   )
                    }
                  >
                    {galleryContent[index - 1].ContentType0.toLowerCase() ===
                    "image" ? (
                      <img
                        className={`${styles.gallery_card}`}
                        src={
                          galleryContent[index - 1].AttachmentFiles[0]
                            .ServerRelativeUrl
                        }
                        alt={"ISDB"}
                        height="100%"
                        width="100%"
                      />
                    ) : (
                      <div className={`${styles.gallery_image_card}`}>
                        <div
                          className={`${styles.video_play_btn}`}
                          onClick={() => {
                            setVideoUrl(
                              `${
                                galleryContent[index - 1].AttachmentFiles[0]
                                  .ServerRelativeUrl
                              }`
                            );
                            setPlay(true);
                            setModalVisibility(true);
                            setAutoPlay(false);
                          }}
                        >
                          <i
                            className={`fa fa-play ${styles.play_icon}`}
                            aria-hidden="true"
                          ></i>
                        </div>
                        <img
                          alt={`ISDB`}
                          src={galleryContent[index - 1].VideoImage}
                          height="100%"
                          width="100%"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className={` p-2 ${styles.slider_container_single}`}>
                  <div
                    className={`my-2 ${styles.gallery_card_container}`}
                    onClick={
                      () => {}
                      // isImage(
                      //   galleryContent[index].AttachmentFiles[0]
                      //     .ServerRelativeUrl,
                      // )
                      //   ? viewImage(
                      //     galleryContent[index].AttachmentFiles[0]
                      //       .ServerRelativeUrl,
                      //     setIsopen,
                      //     setPhotoUrl,
                      //   )
                      //   : viewVideo(
                      //     galleryContent[index].AttachmentFiles[0]
                      //       .ServerRelativeUrl,
                      //   ),
                      // setPlay,
                      // setVideoUrl,
                      // setModalVisibility,
                      // setAutoPlay)
                    }
                  >
                    {galleryContent[index].ContentType0.toLowerCase() ===
                    "image" ? (
                      <img
                        className={`${styles.gallery_card}`}
                        src={
                          galleryContent[index].AttachmentFiles[0]
                            .ServerRelativeUrl
                        }
                        alt={"ISDB"}
                        height="100%"
                        width="100%"
                      />
                    ) : (
                      <div className={`${styles.gallery_image_card}`}>
                        <div
                          className={`${styles.video_play_btn}`}
                          onClick={() => {
                            setVideoUrl(
                              `${galleryContent[index].AttachmentFiles[0].ServerRelativeUrl}`
                            );
                            setPlay(true);
                            setModalVisibility(true);
                            setAutoPlay(false);
                          }}
                        >
                          <i
                            className={`fa fa-play ${styles.play_icon}`}
                            aria-hidden="true"
                          ></i>
                        </div>
                        <img
                          alt={`ISDB`}
                          src={galleryContent[index].VideoImage}
                          layout={`fill`}
                          height="100%"
                          width="100%"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        }
      });
    } else {
      if (galleryContent.length === 1) {
        sliderItems.push(
          <>
            <div className={`item ${styles.slider_container}`} data-value={"0"}>
              <div className={` p-2 ${styles.slider_container_single}`}>
                <div
                  className={`my-2 ${styles.gallery_card_container}`}
                  onClick={
                    () => history.push(`/gallery`)
                    // isImage(
                    //   galleryContent[0].AttachmentFiles[0]
                    //     .ServerRelativeUrl,
                    // )
                    //   ? viewImage(
                    //       galleryContent[0].AttachmentFiles[0]
                    //         .ServerRelativeUrl,
                    //       setIsopen,
                    //       setPhotoUrl,
                    //     )
                    //   : viewVideo(
                    //       galleryContent[0].AttachmentFiles[0]
                    //         .ServerRelativeUrl,
                    //       setPlay,
                    //       setVideoUrl,
                    //       setModalVisibility,
                    //       setAutoPlay,
                    //     )
                  }
                >
                  {galleryContent[0].ContentType0.toLowerCase() === "image" ? (
                    <img
                      className={`${styles.gallery_card}`}
                      src={
                        galleryContent[0].AttachmentFiles[0].ServerRelativeUrl
                      }
                      alt={"ISDB"}
                      height="100%"
                      width="100%"
                      // layout="fill"
                    />
                  ) : (
                    // <div className={`${styles.gallery_image_card}`}>
                    <>
                      <div
                        className={`${styles.video_play_btn}`}
                        onClick={() => {
                          setVideoUrl(
                            `${galleryContent[0].AttachmentFiles[0].ServerRelativeUrl}`
                          );
                          setPlay(true);
                          setModalVisibility(true);
                          setAutoPlay(false);
                        }}
                      >
                        <i
                          className={`fa fa-play ${styles.play_icon}`}
                          aria-hidden="true"
                        ></i>
                      </div>
                      <img
                        alt={`ISDB`}
                        src={galleryContent[0].VideoImage}
                        height="100%"
                        width="100%"
                      />
                    </>
                    // </div>
                  )}
                </div>

                {/* <div
                  className={`my-2 ${styles.gallery_card_container}`}
                  onClick={
                    () => {}
                    // isImage(
                    //   galleryContent[index - 1].AttachmentFiles[0]
                    //     .ServerRelativeUrl,
                    // )
                    //   ? viewImage(
                    //     galleryContent[index - 1].AttachmentFiles[0]
                    //       .ServerRelativeUrl,
                    //     setIsopen,
                    //     setPhotoUrl,
                    //   )
                    //   : viewVideo(
                    //     galleryContent[index - 1].AttachmentFiles[0]
                    //       .ServerRelativeUrl,
                    //     setPlay,
                    //     setVideoUrl,
                    //     setModalVisibility,
                    //     setAutoPlay,
                    //   )
                  }
                >
                  {galleryContent[index - 1].ContentType0.toLowerCase() ===
                  "image" ? (
                    <img
                      className={`${styles.gallery_card}`}
                      src={
                        galleryContent[index - 1].AttachmentFiles[0]
                          .ServerRelativeUrl
                      }
                      alt={"ISDB"}
                      height="100%"
                      width="100%"
                    />
                  ) : (
                    <div className={`${styles.gallery_image_card}`}>
                      <div
                        className={`${styles.video_play_btn}`}
                        onClick={() => {
                          setVideoUrl(
                            `${
                              galleryContent[index - 1].AttachmentFiles[0]
                                .ServerRelativeUrl
                            }`
                          );
                          setPlay(true);
                          setModalVisibility(true);
                          setAutoPlay(false);
                        }}
                      >
                        <i
                          className={`fa fa-play ${styles.play_icon}`}
                          aria-hidden="true"
                        ></i>
                      </div>
                      <img
                        alt={`ISDB`}
                        src={galleryContent[index - 1].VideoImage}
                        height="100%"
                        width="100%"
                      />
                    </div>
                  )}
                </div> */}
              </div>

              {/* <div className={` p-2 ${styles.slider_container_single}`}>
                <div
                  className={`my-2 ${styles.gallery_card_container}`}
                  onClick={
                    () => {}
                    // isImage(
                    //   galleryContent[index].AttachmentFiles[0]
                    //     .ServerRelativeUrl,
                    // )
                    //   ? viewImage(
                    //     galleryContent[index].AttachmentFiles[0]
                    //       .ServerRelativeUrl,
                    //     setIsopen,
                    //     setPhotoUrl,
                    //   )
                    //   : viewVideo(
                    //     galleryContent[index].AttachmentFiles[0]
                    //       .ServerRelativeUrl,
                    //   ),
                    // setPlay,
                    // setVideoUrl,
                    // setModalVisibility,
                    // setAutoPlay)
                  }
                >
                  {galleryContent[index].ContentType0.toLowerCase() ===
                  "image" ? (
                    <img
                      className={`${styles.gallery_card}`}
                      src={
                        galleryContent[index].AttachmentFiles[0]
                          .ServerRelativeUrl
                      }
                      alt={"ISDB"}
                      height="100%"
                      width="100%"
                    />
                  ) : (
                    <div className={`${styles.gallery_image_card}`}>
                      <div
                        className={`${styles.video_play_btn}`}
                        onClick={() => {
                          setVideoUrl(
                            `${galleryContent[index].AttachmentFiles[0].ServerRelativeUrl}`
                          );
                          setPlay(true);
                          setModalVisibility(true);
                          setAutoPlay(false);
                        }}
                      >
                        <i
                          className={`fa fa-play ${styles.play_icon}`}
                          aria-hidden="true"
                        ></i>
                      </div>
                      <img
                        alt={`ISDB`}
                        src={galleryContent[index].VideoImage}
                        layout={`fill`}
                        height="100%"
                        width="100%"
                      />
                    </div>
                  )}
                </div>
              </div> */}
            </div>
          </>
        );
      }
      if (galleryContent.length === 2) {
        sliderItems.push(
          <>
            <div className={`item ${styles.slider_container}`} data-value={"1"}>
              <div className={` p-2 ${styles.slider_container_single}`}>
                <div
                  className={`my-2 ${styles.gallery_card_container}`}
                  onClick={
                    () => history.push(`/gallery`)
                    // isImage(
                    //   galleryContent[1].AttachmentFiles[0]
                    //     .ServerRelativeUrl,
                    // )
                    //   ? viewImage(
                    //       galleryContent[1].AttachmentFiles[0]
                    //         .ServerRelativeUrl,
                    //       setIsopen,
                    //       setPhotoUrl,
                    //     )
                    //   : viewVideo(
                    //       galleryContent[1].AttachmentFiles[0]
                    //         .ServerRelativeUrl,
                    //       setPlay,
                    //       setVideoUrl,
                    //       setModalVisibility,
                    //       setAutoPlay,
                    //     )
                  }
                >
                  {galleryContent[1].ContentType0.toLowerCase() === "image" ? (
                    <img
                      className={`${styles.gallery_card}`}
                      src={
                        galleryContent[1].AttachmentFiles[0].ServerRelativeUrl
                      }
                      alt={"ISDB"}
                      height="100%"
                      width="100%"
                      // layout="fill"
                    />
                  ) : (
                    // <div className={`${styles.gallery_image_card}`}>
                    <>
                      <div
                        className={`${styles.video_play_btn}`}
                        onClick={() => {
                          setVideoUrl(
                            `${galleryContent[1].AttachmentFiles[0].ServerRelativeUrl}`
                          );
                          setPlay(true);
                          setModalVisibility(true);
                          setAutoPlay(false);
                        }}
                      >
                        <i
                          className={`fa fa-play ${styles.play_icon}`}
                          aria-hidden="true"
                        ></i>
                      </div>
                      <img
                        alt={`ISDB`}
                        src={galleryContent[1].VideoImage}
                        height="100%"
                        width="100%"
                      />
                    </>
                    // </div>
                  )}
                </div>

                <div
                  className={`my-2 ${styles.gallery_card_container}`}
                  onClick={
                    () => {}
                    // isImage(
                    //   galleryContent[0].AttachmentFiles[0]
                    //     .ServerRelativeUrl,
                    // )
                    //   ? viewImage(
                    //     galleryContent[0].AttachmentFiles[0]
                    //       .ServerRelativeUrl,
                    //     setIsopen,
                    //     setPhotoUrl,
                    //   )
                    //   : viewVideo(
                    //     galleryContent[0].AttachmentFiles[0]
                    //       .ServerRelativeUrl,
                    //     setPlay,
                    //     setVideoUrl,
                    //     setModalVisibility,
                    //     setAutoPlay,
                    //   )
                  }
                >
                  {galleryContent[0].ContentType0.toLowerCase() === "image" ? (
                    <img
                      className={`${styles.gallery_card}`}
                      src={
                        galleryContent[0].AttachmentFiles[0].ServerRelativeUrl
                      }
                      alt={"ISDB"}
                      height="100%"
                      width="100%"
                    />
                  ) : (
                    <div className={`${styles.gallery_image_card}`}>
                      <div
                        className={`${styles.video_play_btn}`}
                        onClick={() => {
                          setVideoUrl(
                            `${galleryContent[0].AttachmentFiles[0].ServerRelativeUrl}`
                          );
                          setPlay(true);
                          setModalVisibility(true);
                          setAutoPlay(false);
                        }}
                      >
                        <i
                          className={`fa fa-play ${styles.play_icon}`}
                          aria-hidden="true"
                        ></i>
                      </div>
                      <img
                        alt={`ISDB`}
                        src={galleryContent[0].VideoImage}
                        height="100%"
                        width="100%"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* <div className={` p-2 ${styles.slider_container_single}`}>
                <div
                  className={`my-2 ${styles.gallery_card_container}`}
                  onClick={
                    () => {}
                    // isImage(
                    //   galleryContent[index].AttachmentFiles[0]
                    //     .ServerRelativeUrl,
                    // )
                    //   ? viewImage(
                    //     galleryContent[index].AttachmentFiles[0]
                    //       .ServerRelativeUrl,
                    //     setIsopen,
                    //     setPhotoUrl,
                    //   )
                    //   : viewVideo(
                    //     galleryContent[index].AttachmentFiles[0]
                    //       .ServerRelativeUrl,
                    //   ),
                    // setPlay,
                    // setVideoUrl,
                    // setModalVisibility,
                    // setAutoPlay)
                  }
                >
                  {galleryContent[index].ContentType0.toLowerCase() ===
                  "image" ? (
                    <img
                      className={`${styles.gallery_card}`}
                      src={
                        galleryContent[index].AttachmentFiles[0]
                          .ServerRelativeUrl
                      }
                      alt={"ISDB"}
                      height="100%"
                      width="100%"
                    />
                  ) : (
                    <div className={`${styles.gallery_image_card}`}>
                      <div
                        className={`${styles.video_play_btn}`}
                        onClick={() => {
                          setVideoUrl(
                            `${galleryContent[index].AttachmentFiles[0].ServerRelativeUrl}`
                          );
                          setPlay(true);
                          setModalVisibility(true);
                          setAutoPlay(false);
                        }}
                      >
                        <i
                          className={`fa fa-play ${styles.play_icon}`}
                          aria-hidden="true"
                        ></i>
                      </div>
                      <img
                        alt={`ISDB`}
                        src={galleryContent[index].VideoImage}
                        layout={`fill`}
                        height="100%"
                        width="100%"
                      />
                    </div>
                  )}
                </div>
              </div> */}
            </div>
          </>
        );
      }
      if (
        galleryContent.length !== 1 &&
        galleryContent.length !== 2 &&
        galleryContent.length % 3 !== 0
      ) {
        galleryContent.forEach((image, index) => {
          if ((index + 1) % 3 === 0) {
            sliderItems.push(
              <>
                <div
                  className={`item ${styles.slider_container}`}
                  data-value={index.toString()}
                >
                  <div className={` p-2 ${styles.slider_container_single}`}>
                    <div
                      className={`my-2 ${styles.gallery_card_container}`}
                      onClick={
                        () => history.push(`/gallery`)
                        // isImage(
                        //   galleryContent[index - 2].AttachmentFiles[0]
                        //     .ServerRelativeUrl,
                        // )
                        //   ? viewImage(
                        //       galleryContent[index - 2].AttachmentFiles[0]
                        //         .ServerRelativeUrl,
                        //       setIsopen,
                        //       setPhotoUrl,
                        //     )
                        //   : viewVideo(
                        //       galleryContent[index - 2].AttachmentFiles[0]
                        //         .ServerRelativeUrl,
                        //       setPlay,
                        //       setVideoUrl,
                        //       setModalVisibility,
                        //       setAutoPlay,
                        //     )
                      }
                    >
                      {galleryContent[index - 2].ContentType0.toLowerCase() ===
                      "image" ? (
                        <img
                          className={`${styles.gallery_card}`}
                          src={
                            galleryContent[index - 2].AttachmentFiles[0]
                              .ServerRelativeUrl
                          }
                          alt={"ISDB"}
                          height="100%"
                          width="100%"
                          // layout="fill"
                        />
                      ) : (
                        // <div className={`${styles.gallery_image_card}`}>
                        <>
                          <div
                            className={`${styles.video_play_btn}`}
                            onClick={() => {
                              setVideoUrl(
                                `${
                                  galleryContent[index - 2].AttachmentFiles[0]
                                    .ServerRelativeUrl
                                }`
                              );
                              setPlay(true);
                              setModalVisibility(true);
                              setAutoPlay(false);
                            }}
                          >
                            <i
                              className={`fa fa-play ${styles.play_icon}`}
                              aria-hidden="true"
                            ></i>
                          </div>
                          <img
                            alt={`ISDB`}
                            src={galleryContent[index - 2].VideoImage}
                            height="100%"
                            width="100%"
                          />
                        </>
                        // </div>
                      )}
                    </div>

                    <div
                      className={`my-2 ${styles.gallery_card_container}`}
                      onClick={
                        () => {}
                        // isImage(
                        //   galleryContent[index - 1].AttachmentFiles[0]
                        //     .ServerRelativeUrl,
                        // )
                        //   ? viewImage(
                        //     galleryContent[index - 1].AttachmentFiles[0]
                        //       .ServerRelativeUrl,
                        //     setIsopen,
                        //     setPhotoUrl,
                        //   )
                        //   : viewVideo(
                        //     galleryContent[index - 1].AttachmentFiles[0]
                        //       .ServerRelativeUrl,
                        //     setPlay,
                        //     setVideoUrl,
                        //     setModalVisibility,
                        //     setAutoPlay,
                        //   )
                      }
                    >
                      {galleryContent[index - 1].ContentType0.toLowerCase() ===
                      "image" ? (
                        <img
                          className={`${styles.gallery_card}`}
                          src={
                            galleryContent[index - 1].AttachmentFiles[0]
                              .ServerRelativeUrl
                          }
                          alt={"ISDB"}
                          height="100%"
                          width="100%"
                        />
                      ) : (
                        <div className={`${styles.gallery_image_card}`}>
                          <div
                            className={`${styles.video_play_btn}`}
                            onClick={() => {
                              setVideoUrl(
                                `${
                                  galleryContent[index - 1].AttachmentFiles[0]
                                    .ServerRelativeUrl
                                }`
                              );
                              setPlay(true);
                              setModalVisibility(true);
                              setAutoPlay(false);
                            }}
                          >
                            <i
                              className={`fa fa-play ${styles.play_icon}`}
                              aria-hidden="true"
                            ></i>
                          </div>
                          <img
                            alt={`ISDB`}
                            src={galleryContent[index - 1].VideoImage}
                            height="100%"
                            width="100%"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={` p-2 ${styles.slider_container_single}`}>
                    <div
                      className={`my-2 ${styles.gallery_card_container}`}
                      onClick={
                        () => {}
                        // isImage(
                        //   galleryContent[index].AttachmentFiles[0]
                        //     .ServerRelativeUrl,
                        // )
                        //   ? viewImage(
                        //     galleryContent[index].AttachmentFiles[0]
                        //       .ServerRelativeUrl,
                        //     setIsopen,
                        //     setPhotoUrl,
                        //   )
                        //   : viewVideo(
                        //     galleryContent[index].AttachmentFiles[0]
                        //       .ServerRelativeUrl,
                        //   ),
                        // setPlay,
                        // setVideoUrl,
                        // setModalVisibility,
                        // setAutoPlay)
                      }
                    >
                      {galleryContent[index].ContentType0.toLowerCase() ===
                      "image" ? (
                        <img
                          className={`${styles.gallery_card}`}
                          src={
                            galleryContent[index].AttachmentFiles[0]
                              .ServerRelativeUrl
                          }
                          alt={"ISDB"}
                          height="100%"
                          width="100%"
                        />
                      ) : (
                        <div className={`${styles.gallery_image_card}`}>
                          <div
                            className={`${styles.video_play_btn}`}
                            onClick={() => {
                              setVideoUrl(
                                `${galleryContent[index].AttachmentFiles[0].ServerRelativeUrl}`
                              );
                              setPlay(true);
                              setModalVisibility(true);
                              setAutoPlay(false);
                            }}
                          >
                            <i
                              className={`fa fa-play ${styles.play_icon}`}
                              aria-hidden="true"
                            ></i>
                          </div>
                          <img
                            alt={`ISDB`}
                            src={galleryContent[index].VideoImage}
                            layout={`fill`}
                            height="100%"
                            width="100%"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            );
          }
        });
        sliderItems.push(
          <>
            <div
              className={`item ${styles.slider_container}`}
              data-value={(galleryContent.length - 1).toString()}
            >
              <div className={` p-2 ${styles.slider_container_single}`}>
                {galleryContent.length % 3 === 2 && (
                  <>
                    <div
                      className={`my-2 ${styles.gallery_card_container}`}
                      onClick={
                        () => history.push(`/gallery`)
                        // isImage(
                        //   galleryContent[galleryContent.length - 1].AttachmentFiles[0]
                        //     .ServerRelativeUrl,
                        // )
                        //   ? viewImage(
                        //       galleryContent[galleryContent.length - 1].AttachmentFiles[0]
                        //         .ServerRelativeUrl,
                        //       setIsopen,
                        //       setPhotoUrl,
                        //     )
                        //   : viewVideo(
                        //       galleryContent[galleryContent.length - 1].AttachmentFiles[0]
                        //         .ServerRelativeUrl,
                        //       setPlay,
                        //       setVideoUrl,
                        //       setModalVisibility,
                        //       setAutoPlay,
                        //     )
                      }
                    >
                      {galleryContent[
                        galleryContent.length - 1
                      ].ContentType0.toLowerCase() === "image" ? (
                        <img
                          className={`${styles.gallery_card}`}
                          src={
                            galleryContent[galleryContent.length - 1]
                              .AttachmentFiles[0].ServerRelativeUrl
                          }
                          alt={"ISDB"}
                          height="100%"
                          width="100%"
                          // layout="fill"
                        />
                      ) : (
                        // <div className={`${styles.gallery_image_card}`}>
                        <>
                          <div
                            className={`${styles.video_play_btn}`}
                            onClick={() => {
                              setVideoUrl(
                                `${
                                  galleryContent[galleryContent.length - 1]
                                    .AttachmentFiles[0].ServerRelativeUrl
                                }`
                              );
                              setPlay(true);
                              setModalVisibility(true);
                              setAutoPlay(false);
                            }}
                          >
                            <i
                              className={`fa fa-play ${styles.play_icon}`}
                              aria-hidden="true"
                            ></i>
                          </div>
                          <img
                            alt={`ISDB`}
                            src={
                              galleryContent[galleryContent.length - 1]
                                .VideoImage
                            }
                            height="100%"
                            width="100%"
                          />
                        </>
                        // </div>
                      )}
                    </div>

                    <div
                      className={`my-2 ${styles.gallery_card_container}`}
                      onClick={
                        () => {}
                        // isImage(
                        //   galleryContent[galleryContent.length - 2].AttachmentFiles[0]
                        //     .ServerRelativeUrl,
                        // )
                        //   ? viewImage(
                        //     galleryContent[galleryContent.length - 2].AttachmentFiles[0]
                        //       .ServerRelativeUrl,
                        //     setIsopen,
                        //     setPhotoUrl,
                        //   )
                        //   : viewVideo(
                        //     galleryContent[galleryContent.length - 2].AttachmentFiles[0]
                        //       .ServerRelativeUrl,
                        //     setPlay,
                        //     setVideoUrl,
                        //     setModalVisibility,
                        //     setAutoPlay,
                        //   )
                      }
                    >
                      {galleryContent[
                        galleryContent.length - 2
                      ].ContentType0.toLowerCase() === "image" ? (
                        <img
                          className={`${styles.gallery_card}`}
                          src={
                            galleryContent[galleryContent.length - 2]
                              .AttachmentFiles[0].ServerRelativeUrl
                          }
                          alt={"ISDB"}
                          height="100%"
                          width="100%"
                        />
                      ) : (
                        <div className={`${styles.gallery_image_card}`}>
                          <div
                            className={`${styles.video_play_btn}`}
                            onClick={() => {
                              setVideoUrl(
                                `${
                                  galleryContent[galleryContent.length - 2]
                                    .AttachmentFiles[0].ServerRelativeUrl
                                }`
                              );
                              setPlay(true);
                              setModalVisibility(true);
                              setAutoPlay(false);
                            }}
                          >
                            <i
                              className={`fa fa-play ${styles.play_icon}`}
                              aria-hidden="true"
                            ></i>
                          </div>
                          <img
                            alt={`ISDB`}
                            src={
                              galleryContent[galleryContent.length - 2]
                                .VideoImage
                            }
                            height="100%"
                            width="100%"
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
                {galleryContent.length % 3 === 1 && (
                  <>
                    <div
                      className={`my-2 ${styles.gallery_card_container}`}
                      onClick={
                        () => history.push(`/gallery`)
                        // isImage(
                        //   galleryContent[galleryContent.length - 1].AttachmentFiles[0]
                        //     .ServerRelativeUrl,
                        // )
                        //   ? viewImage(
                        //       galleryContent[galleryContent.length - 1].AttachmentFiles[0]
                        //         .ServerRelativeUrl,
                        //       setIsopen,
                        //       setPhotoUrl,
                        //     )
                        //   : viewVideo(
                        //       galleryContent[galleryContent.length - 1].AttachmentFiles[0]
                        //         .ServerRelativeUrl,
                        //       setPlay,
                        //       setVideoUrl,
                        //       setModalVisibility,
                        //       setAutoPlay,
                        //     )
                      }
                    >
                      {galleryContent[
                        galleryContent.length - 1
                      ].ContentType0.toLowerCase() === "image" ? (
                        <img
                          className={`${styles.gallery_card}`}
                          src={
                            galleryContent[galleryContent.length - 1]
                              .AttachmentFiles[0].ServerRelativeUrl
                          }
                          alt={"ISDB"}
                          height="100%"
                          width="100%"
                          // layout="fill"
                        />
                      ) : (
                        // <div className={`${styles.gallery_image_card}`}>
                        <>
                          <div
                            className={`${styles.video_play_btn}`}
                            onClick={() => {
                              setVideoUrl(
                                `${
                                  galleryContent[galleryContent.length - 1]
                                    .AttachmentFiles[0].ServerRelativeUrl
                                }`
                              );
                              setPlay(true);
                              setModalVisibility(true);
                              setAutoPlay(false);
                            }}
                          >
                            <i
                              className={`fa fa-play ${styles.play_icon}`}
                              aria-hidden="true"
                            ></i>
                          </div>
                          <img
                            alt={`ISDB`}
                            src={
                              galleryContent[galleryContent.length - 1]
                                .VideoImage
                            }
                            height="100%"
                            width="100%"
                          />
                        </>
                        // </div>
                      )}
                    </div>

                    {/* <div
                      className={`my-2 ${styles.gallery_card_container}`}
                      onClick={
                        () => {}
                        // isImage(
                        //   galleryContent[galleryContent.length - 2].AttachmentFiles[0]
                        //     .ServerRelativeUrl,
                        // )
                        //   ? viewImage(
                        //     galleryContent[galleryContent.length - 2].AttachmentFiles[0]
                        //       .ServerRelativeUrl,
                        //     setIsopen,
                        //     setPhotoUrl,
                        //   )
                        //   : viewVideo(
                        //     galleryContent[galleryContent.length - 2].AttachmentFiles[0]
                        //       .ServerRelativeUrl,
                        //     setPlay,
                        //     setVideoUrl,
                        //     setModalVisibility,
                        //     setAutoPlay,
                        //   )
                      }
                    >
                      {galleryContent[
                        galleryContent.length - 2
                      ].ContentType0.toLowerCase() === "image" ? (
                        <img
                          className={`${styles.gallery_card}`}
                          src={
                            galleryContent[galleryContent.length - 2]
                              .AttachmentFiles[0].ServerRelativeUrl
                          }
                          alt={"ISDB"}
                          height="100%"
                          width="100%"
                        />
                      ) : (
                        <div className={`${styles.gallery_image_card}`}>
                          <div
                            className={`${styles.video_play_btn}`}
                            onClick={() => {
                              setVideoUrl(
                                `${
                                  galleryContent[galleryContent.length - 2]
                                    .AttachmentFiles[0].ServerRelativeUrl
                                }`
                              );
                              setPlay(true);
                              setModalVisibility(true);
                              setAutoPlay(false);
                            }}
                          >
                            <i
                              className={`fa fa-play ${styles.play_icon}`}
                              aria-hidden="true"
                            ></i>
                          </div>
                          <img
                            alt={`ISDB`}
                            src={
                              galleryContent[galleryContent.length - 2]
                                .VideoImage
                            }
                            height="100%"
                            width="100%"
                          />
                        </div>
                      )}
                    </div> */}
                  </>
                )}
              </div>

              {/* <div className={` p-2 ${styles.slider_container_single}`}>
                <div
                  className={`my-2 ${styles.gallery_card_container}`}
                  onClick={
                    () => {}
                    // isImage(
                    //   galleryContent[index].AttachmentFiles[0]
                    //     .ServerRelativeUrl,
                    // )
                    //   ? viewImage(
                    //     galleryContent[index].AttachmentFiles[0]
                    //       .ServerRelativeUrl,
                    //     setIsopen,
                    //     setPhotoUrl,
                    //   )
                    //   : viewVideo(
                    //     galleryContent[index].AttachmentFiles[0]
                    //       .ServerRelativeUrl,
                    //   ),
                    // setPlay,
                    // setVideoUrl,
                    // setModalVisibility,
                    // setAutoPlay)
                  }
                >
                  {galleryContent[index].ContentType0.toLowerCase() ===
                  "image" ? (
                    <img
                      className={`${styles.gallery_card}`}
                      src={
                        galleryContent[index].AttachmentFiles[0]
                          .ServerRelativeUrl
                      }
                      alt={"ISDB"}
                      height="100%"
                      width="100%"
                    />
                  ) : (
                    <div className={`${styles.gallery_image_card}`}>
                      <div
                        className={`${styles.video_play_btn}`}
                        onClick={() => {
                          setVideoUrl(
                            `${galleryContent[index].AttachmentFiles[0].ServerRelativeUrl}`
                          );
                          setPlay(true);
                          setModalVisibility(true);
                          setAutoPlay(false);
                        }}
                      >
                        <i
                          className={`fa fa-play ${styles.play_icon}`}
                          aria-hidden="true"
                        ></i>
                      </div>
                      <img
                        alt={`ISDB`}
                        src={galleryContent[index].VideoImage}
                        layout={`fill`}
                        height="100%"
                        width="100%"
                      />
                    </div>
                  )}
                </div>
              </div> */}
            </div>
          </>
        );
      }
    }
  }
}

const responsive = {
  0: { items: 1 },
  568: { items: 2.25 },
  1000: { items: 3.25 },
  1024: { items: 2.5 },
  1440: { items: 9 },
};

// function viewImage(index, setIsopen, setPhotoUrl) {
//   setIsopen(true);
//   setPhotoUrl(index);
// }
// function viewVideo(
//   index,
//   setPlay,
//   setVideoUrl,
//   setModalVisibility,
//   setAutoPlay
// ) {
//   setPlay(true);
//   setVideoUrl(index);
//   setModalVisibility(true);
//   setAutoPlay(false);
// }

export default function Gallery({ galleryContent }) {
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryref = useRef(null);
  const slidePrev = () => {
    galleryref?.current.slidePrev();
  };
  const slideNext = () => {
    galleryref?.current.slideNext();
  };
  const onSlideChanged = ({ item }) => {
    setActiveIndex(item);
  };

  const [videoUrl, setVideoUrl] = useState("");
  const [play, setPlay] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [photoUrl, setPhotoUrl] = useState("");
  const [isOpen, setIsopen] = useState(false);

  getSliderItems(
    galleryContent,
    setIsopen,
    setPhotoUrl,
    setPlay,
    setVideoUrl,
    setModalVisibility,
    setAutoPlay,
    history
  );
  return (
    <>
      <div
        className={`${styles.gallery_bg} mt-5`}
        style={{
          backgroundImage: `url(${GalleryBg})`,
        }}
      >
        <Row>
          <div className={`${styles.gallery_container}`}>
            <CommonSectionHeader
              title={"Gallery"}
              sliderSection={true}
              // prevBtn={}
              // nextBtn={}
              onClickPrev={slidePrev}
              onClickNext={slideNext}
            />
          </div>
          <AppMultiSlider
            responsive={responsive}
            items={sliderItems}
            activeIndex={activeIndex}
            onSlideChanged={onSlideChanged}
            paddingLeft={50}
            paddingRight={50}
            animationType={"slide"}
            disableDotsControls={true}
            infinite={true}
            refVariable={galleryref}
          />
        </Row>
      </div>
      {/* {isOpen && photoUrl && (
        <Lightbox
          mainSrc={`${photoUrl}`}
          onCloseRequest={() => setIsopen(false)}
        />
      )}
      {play && videoUrl && (
        <VideoPlayerModal
          url={videoUrl}
          setVisiblety={setModalVisibility}
          visible={modalVisibility}
          play={play}
          setPlay={setPlay}
          setAutoPlay={setAutoPlay}
        />
      )} */}
    </>
  );
}
