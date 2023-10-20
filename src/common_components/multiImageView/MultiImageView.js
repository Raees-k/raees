import { Row, Col } from "antd";
import isImage from "is-image";
import ReactPlayer from "react-player";
import { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
//css
import styles from "./multi-image-view.module.sass";
// Components
import VideoPlayerModal from "../appModal/videoPlayerModal/VideoPlayerModal";
import { VAR } from "../../env";

function ResponsiveView({ finalData, span, page }) {
  const [videoUrl, setVideoUrl] = useState("");
  const [play, setPlay] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [photoUrl, setPhotoUrl] = useState("");
  const [isOpen, setIsopen] = useState(false);

  function viewImage(index) {
    setIsopen(true);
    setPhotoUrl(index);
  }
  function viewVideo(index) {
    setPlay(true);
    setVideoUrl(index);
    setModalVisibility(true);
    setAutoPlay(false);
  }

  return (
    <>
      <Row gutter={[16, 16]} className={`d-flex justify-content-center w-100`}>
        {page === "ssc" &&
          finalData.map((data, index) => (
            <Col
              span={span}
              className={`d-flex align-items-center flex-column px-0`}
              key={index}
            >
              <div className={`${styles.miv_image_box} mb-5`}>
                <img
                  src={data?.AttachmentFiles[0]?.ServerRelativeUrl}
                  alt="ssc"
                  width="200"
                  height="200"
                  className={`${styles.miv_image}`}
                />
              </div>
              {page === "ssc" && (
                <>
                  <h5 className={`${styles.member_name}`}>{data.Title}</h5>
                  <p className={`${styles.member_degisnation}`}>
                    {data.Designation}
                  </p>
                </>
              )}
            </Col>
          ))}
        {page !== "ssc" &&
          finalData.map((data, index) => (
            <Col
              span={span}
              className={`d-flex align-items-center flex-column px-0`}
              key={index}
            >
              <div
                className={`${styles.miv_image_box} mb-5`}
                onClick={() =>
                  isImage(data.ServerRelativeUrl)
                    ? viewImage(data.ServerRelativeUrl)
                    : viewVideo(data.ServerRelativeUrl)
                }
              >
                {isImage(data.ServerRelativeUrl) ? (
                  <img
                    src={data.ServerRelativeUrl}
                    alt="ssc"
                    width="200"
                    height="200"
                    className={`${styles.miv_image}`}
                  />
                ) : (
                  <ReactPlayer
                    url={data.ServerRelativeUrl}
                    width={"200px"}
                    height={`200px`}
                    className={`${styles.service_type_video}`}
                    controls={false}
                  />
                )}
              </div>
            </Col>
          ))}
      </Row>
      {isOpen && photoUrl && (
        <Lightbox
          //${process.env.BASE_URL} before mainSrc
          mainSrc={`${photoUrl}`}
          onCloseRequest={() => setIsopen(false)}
        />
      )}
      {play && videoUrl && (
        <VideoPlayerModal
          url={VAR.BASE_URL + videoUrl}
          setVisiblety={setModalVisibility}
          visible={modalVisibility}
          play={play}
          setPlay={setPlay}
          setAutoPlay={setAutoPlay}
        />
      )}
    </>
  );
}

export default function MultiImageView({ title, subTitle, finalData, page }) {
  return (
    <div className={`${styles.container} `}>
      <h3 className={`${styles.miv_title}`}>{title}</h3>
      <p className={`${styles.miv_subtitle} mb-5`}>{subTitle}</p>
      <Row>
        <Col xs={0} sm={0} md={0} lg={24} xl={24}>
          {finalData && finalData.length > 0 && (
            <ResponsiveView finalData={finalData} span={6} page={page} />
          )}
        </Col>
        <Col xs={24} sm={24} md={24} lg={0} xl={0}>
          {finalData && finalData.length > 0 && (
            <ResponsiveView finalData={finalData} span={12} page={page} />
          )}
        </Col>
      </Row>
    </div>
  );
}
