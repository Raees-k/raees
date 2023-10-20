import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { FileTextOutlined, DownloadOutlined } from "@ant-design/icons";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
// CSS
import styles from "./gallery-image-card.module.sass";
// Components
import AppBtn from "../../../../common_components/appBtn/AppBtn";
import VideoPlayerModal from "../../../../common_components/appModal/videoPlayerModal/VideoPlayerModal";

export default function GalleryImageCard({
  filteredcardData,
  category,
  AllData,
}) {
  // console.log("filteredcardData", filteredcardData);
  // console.log("category", category);
  console.log("EVENTDATA", AllData);

  const [autoPlay, setAutoPlay] = useState(true);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [play, setPlay] = useState(false);
  const [seeAll, setSeeAll] = useState(false);
  const [cardData, setCardData] = useState(filteredcardData.slice(0, 9));
  const [seeAllImg, setSeeAllImg] = useState(false);

  const [photoUrl, setPhotoUrl] = useState("");
  const [isOpen, setIsopen] = useState(false);
  const [filteredImgData, setFilteredImgData] = useState([]);
  const [filteredVideoData, setFilteredVideoData] = useState([]);
  const [filteredDocData, setFilteredDocData] = useState([]);
  const [imgCardData, setImgCardData] = useState(filteredImgData.slice(0, 9));

  useEffect(() => {
    if (seeAll) {
      setCardData(filteredcardData);
    } else {
      setCardData(filteredcardData.slice(0, 9));
    }
  }, [seeAll, filteredcardData]);

  useEffect(() => {
    if (seeAllImg) {
      setImgCardData(filteredImgData);
    } else {
      setImgCardData(filteredImgData.slice(0, 9));
    }
  }, [seeAllImg, filteredImgData]);

  useEffect(() => {
    let mappedDataImage = AllData.filter(
      (data) => data.ContentType0.toLowerCase() === "image"
    );
    let mappedDataVideo = AllData.filter(
      (data) => data.ContentType0.toLowerCase() === "video"
    );
    let mappedDataDoc = AllData.filter(
      (data) => data.ContentType0.toLowerCase() === "document"
    );
    console.log("mappedDataImage", mappedDataImage);
    // console.log("mappedDataVideo", mappedDataVideo);
    // console.log("mappedDataDoc", mappedDataDoc);

    if (mappedDataImage) {
      setFilteredImgData(mappedDataImage);
    }
    if (mappedDataVideo) {
      setFilteredVideoData(mappedDataVideo);
    }
    if (mappedDataDoc) {
      setFilteredDocData(mappedDataDoc);
    }
  }, [AllData]);

  function viewImage(index) {
    setIsopen(true);
    setPhotoUrl(index);
  }
  console.log(cardData);

  return (
    <>
      <Row className={`mb-4`}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Row className={`w-100`}>
            {/*All Data*/}
            {category.toLowerCase() === "all" && (
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
                // className={`px-2 mt-3`}
              >
                <h3 className={`${styles.media_subtitle}`}>
                  {filteredImgData && filteredImgData.length > 0
                    ? `Photos`
                    : ``}
                </h3>
              </Col>
            )}
            {category.toLowerCase() === "all" &&
              imgCardData &&
              imgCardData.length > 0 &&
              imgCardData.map((data) => (
                <>
                  <Col
                    xs={24}
                    sm={24}
                    md={8}
                    lg={8}
                    xl={8}
                    className={`px-2 mt-3`}
                  >
                    <div
                      className={`d-flex justify-content-center align-items-center w-100`}
                    >
                      <div
                        className={`${styles.gallery_image_card}`}
                        onClick={() =>
                          viewImage(data.AttachmentFiles[0].ServerRelativeUrl)
                        }
                      >
                        <img
                          alt="Media Data"
                          src={data.AttachmentFiles[0].ServerRelativeUrl}
                          height="100%"
                          width="100%"
                        />
                      </div>
                    </div>
                  </Col>
                </>
              ))}
            {category.toLowerCase() === "all" &&
              filteredImgData &&
              filteredImgData.length > 0 &&
              filteredImgData.length > 9 && (
                <Row
                  className={`d-flex justify-content-center align-items-center w-100`}
                >
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div
                      className={`d-flex justify-content-center align-items-center`}
                    >
                      <AppBtn
                        text={seeAllImg ? `Load Less` : `Load More`}
                        prefix={""}
                        suffix={""}
                        mode={"dark"}
                        onClick={
                          seeAllImg
                            ? () => setSeeAllImg(false)
                            : () => setSeeAllImg(true)
                        }
                      />
                    </div>
                  </Col>
                </Row>
              )}

            {/*Image Modal*/}
            {isOpen && photoUrl && (
              <Lightbox
                mainSrc={`${photoUrl}`}
                onCloseRequest={() => setIsopen(false)}
              />
            )}
            {category.toLowerCase() === "all" && (
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
                className={`px-2 mt-3`}
              >
                <h3 className={`${styles.media_subtitle}`}>
                  {filteredVideoData && filteredVideoData.length > 0
                    ? `Video`
                    : ``}
                </h3>
              </Col>
            )}
            {category.toLowerCase() === "all" &&
              filteredVideoData &&
              filteredVideoData.length > 0 &&
              filteredVideoData.map((data) => (
                <>
                  <Col
                    xs={24}
                    sm={24}
                    md={8}
                    lg={8}
                    xl={8}
                    className={`px-2 mt-3`}
                  >
                    <div
                      className={`d-flex justify-content-center align-items-center w-100`}
                    >
                      <div className={`${styles.gallery_image_card}`}>
                        <div
                          className={`${styles.video_play_btn}`}
                          onClick={() => {
                            setVideoUrl(
                              `${data.AttachmentFiles[0].ServerRelativeUrl}`
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
                          src={`${data.VideoImage}`}
                          layout={`fill`}
                          height="100%"
                        />
                      </div>
                    </div>
                  </Col>
                </>
              ))}
            {/*Video Modal*/}
            {play && (
              <VideoPlayerModal
                url={videoUrl}
                setVisiblety={setModalVisibility}
                visible={modalVisibility}
                play={play}
                setPlay={setPlay}
                setAutoPlay={setAutoPlay}
              />
            )}
            {category.toLowerCase() === "all" && (
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
                className={`px-2 mt-3`}
              >
                <h3 className={`${styles.media_subtitle}`}>
                  {filteredDocData && filteredDocData.length > 0
                    ? `Document`
                    : ``}
                </h3>
              </Col>
            )}

            {category.toLowerCase() === "all" &&
              filteredDocData &&
              filteredDocData.length > 0 &&
              filteredDocData.map((data, index) => (
                <>
                  <Col
                    xs={24}
                    sm={24}
                    md={8}
                    lg={8}
                    xl={8}
                    className={`px-2 mt-3`}
                    key={index}
                  >
                    {/* <h3 className={`${styles.media_subtitle}`}>Document</h3> */}
                    <div
                      className={`d-flex justify-content-center align-items-center w-100`}
                    >
                      <div
                        className={`${styles.gallery_image_card} d-flex justify-content-center align-items-center flex-column`}
                      >
                        <div
                          className={`d-flex justify-content-center align-items-center flex-column`}
                        >
                          <FileTextOutlined
                            style={{ color: "#ffffff", fontSize: "300%" }}
                          />
                          <h3 className={`mt-3`}>
                            <a
                              href={data.AttachmentFiles[0].ServerRelativeUrl}
                              target="_blank"
                              className={`${styles.document_text}`}
                              download
                              rel="noreferrer"
                            >
                              {data.AttachmentFiles[0].FileName}
                            </a>
                          </h3>
                          <a
                            href={data.AttachmentFiles[0].ServerRelativeUrl}
                            target="_blank"
                            download
                            rel="noreferrer"
                          >
                            <DownloadOutlined
                              style={{
                                color: "#ffffff",
                                fontSize: "200%",
                              }}
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </Col>
                </>
              ))}

            {/* Image Data */}
            {cardData &&
              cardData.length > 0 &&
              category.toLowerCase() === "Image".toLowerCase() &&
              cardData.map((data) => (
                <>
                  {data.ContentType0.toLowerCase() === "image" && (
                    <Col
                      xs={24}
                      sm={24}
                      md={8}
                      lg={8}
                      xl={8}
                      className={`px-2 mt-3`}
                    >
                      <div
                        className={`d-flex justify-content-center align-items-center w-100`}
                      >
                        <div
                          className={`${styles.gallery_image_card}`}
                          onClick={() =>
                            viewImage(data.AttachmentFiles[0].ServerRelativeUrl)
                          }
                        >
                          <img
                            alt="Media Data"
                            src={data.AttachmentFiles[0].ServerRelativeUrl}
                            height="100%"
                            width="100%"
                          />
                        </div>
                      </div>
                    </Col>
                  )}
                </>
              ))}

            {isOpen && photoUrl && (
              <Lightbox
                mainSrc={`${photoUrl}`}
                onCloseRequest={() => setIsopen(false)}
              />
            )}

            {/* Video Data */}
            {cardData &&
              cardData.length > 0 &&
              category.toLowerCase() === "Video".toLowerCase() &&
              cardData.map((data) => (
                <>
                  {data && data.ContentType0.toLowerCase() === "video" && (
                    <Col
                      xs={24}
                      sm={24}
                      md={8}
                      lg={8}
                      xl={8}
                      className={`px-2 mt-3`}
                    >
                      <div
                        className={`d-flex justify-content-center align-items-center w-100`}
                      >
                        <div className={`${styles.gallery_image_card}`}>
                          <div
                            className={`${styles.video_play_btn}`}
                            onClick={() => {
                              setVideoUrl(
                                `${data.AttachmentFiles[0].ServerRelativeUrl}`
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
                            src={`${data.VideoImage}`}
                            layout={`fill`}
                            height="100%"
                          />
                        </div>
                      </div>
                    </Col>
                  )}
                </>
              ))}
            {play && (
              <VideoPlayerModal
                url={videoUrl}
                setVisiblety={setModalVisibility}
                visible={modalVisibility}
                play={play}
                setPlay={setPlay}
                setAutoPlay={setAutoPlay}
              />
            )}

            {/* Document Data */}
            {cardData &&
              cardData.length > 0 &&
              category.toLowerCase() === "Document".toLowerCase() &&
              cardData.map((data) => (
                <>
                  {data && data.ContentType0.toLowerCase() === "document" && (
                    <Col
                      xs={24}
                      sm={24}
                      md={8}
                      lg={8}
                      xl={8}
                      className={`px-2 mt-3`}
                    >
                      <div
                        className={`d-flex justify-content-center align-items-center w-100`}
                      >
                        <div
                          className={`${styles.gallery_image_card} d-flex justify-content-center align-items-center flex-column`}
                        >
                          <div
                            className={`d-flex justify-content-center align-items-center flex-column`}
                          >
                            <FileTextOutlined
                              style={{ color: "#ffffff", fontSize: "300%" }}
                            />
                            <h3 className={`mt-3`}>
                              <a
                                href={data.AttachmentFiles[0].ServerRelativeUrl}
                                target="_blank"
                                className={`${styles.document_text}`}
                                download
                                rel="noreferrer"
                              >
                                {data.AttachmentFiles[0].FileName}
                              </a>
                            </h3>
                            <a
                              href={data.AttachmentFiles[0].ServerRelativeUrl}
                              target="_blank"
                              download
                              rel="noreferrer"
                            >
                              <DownloadOutlined
                                style={{ color: "#ffffff", fontSize: "200%" }}
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </Col>
                  )}
                </>
              ))}
          </Row>
        </Col>
      </Row>
      {filteredcardData && filteredcardData.length > 9 && (
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className={`d-flex justify-content-center align-items-center`}>
              <AppBtn
                text={seeAll ? `Load Less` : `Load More`}
                prefix={""}
                suffix={""}
                mode={"dark"}
                onClick={
                  seeAll ? () => setSeeAll(false) : () => setSeeAll(true)
                }
              />
            </div>
          </Col>
        </Row>
      )}
    </>
  );
}
