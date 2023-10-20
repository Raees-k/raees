import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Button, Skeleton } from "antd";
//component
import AppSlider from "../../../common_components/appSlider/AppSlider";
import VideoPlayerModal from "../../../common_components/appModal/videoPlayerModal/VideoPlayerModal";
import { CONST } from "../../../constant/index";
//css
import styles from "./banner.module.sass";
import btnimg from "../../../assets/context/slider_btn_icon_light.svg";

export default function Banner() {
  const [autoPlay, setAutoPlay] = useState(true);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [play, setPlay] = useState(false);

  const [bannerData, setBannerData] = useState(null);
  useEffect(() => {
    axios
      .get(
        `${CONST.BASE_URL}${CONST.API.LIST("Banner")}${CONST.API.QUERY(
          "Title,Author0,CreatedDate,Description,VideoLink,RegistrationLink,BannerType,Expiration,AttachmentFiles"
        )} ${CONST.API.ATTACHMENT}`
      )
      .then((res) => {
        let filteredBannerData = res.data.value.filter(
          (banner) =>
            new Date(banner.Expiration).getTime() > new Date().getTime()
        );
        setBannerData(filteredBannerData);
      })
      .catch((err) => console.log(err));
  }, []);

  //expire date banner should be filtered out

  return (
    <>
      <AppSlider
        btnIcon={btnimg}
        showIndicators={true}
        autoPlay={autoPlay}
        setAutoPlay={setAutoPlay}
        stopOnHover={true}
      >
        {bannerData && bannerData?.length > 0 ? (
          bannerData.map((banner, index) => (
            <div className={`${styles.banner_container}`} key={index}>
              {banner.BannerType.toLowerCase() === "image" ? (
                <>
                  <div className={`${styles.banner_shade}`}></div>
                  <div
                    className={`d-flex justify-content-center align-items-center w-100 h-100`}
                  >
                    <div
                      className={`${styles.banner_container_shade} d-block w-100 h-100`}
                    >
                      <img
                        className={`${styles.image}`}
                        alt={`Banner`}
                        src={
                          banner.AttachmentFiles[0].ServerRelativeUrl
                            ? banner.AttachmentFiles[0].ServerRelativeUrl
                            : ""
                        }
                      ></img>
                    </div>
                  </div>
                </>
              ) : (
                <div className={`${styles.video_thumbnail_container}`}>
                  <div
                    className={`${styles.video_play_btn}`}
                    onClick={() => {
                      setVideoUrl(banner.VideoLink);
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
                    className={`${styles.image}`}
                    alt={`Banner`}
                    src={
                      banner.AttachmentFiles[0].ServerRelativeUrl
                        ? banner.AttachmentFiles[0].ServerRelativeUrl
                        : ""
                    }
                  ></img>
                </div>
              )}
              <p className={`legend ${styles.text}`}>
                <div className={`pl-4`}>
                  <h1 className={`${styles.text_title} mb-4`}>
                    {banner.Title && banner.Title}
                  </h1>
                  <p className={`${styles.text_des} mb-4`}>
                    {banner.Description && banner.Description?.length > 100
                      ? `${banner.Description.substring(0, 100)}...`
                      : banner.Description}
                  </p>
                  <p className={`${styles.text_time}`}>
                    {`${moment(banner.CreatedDate).format(
                      "MMMM DD"
                    )} - ${moment(banner.Expiration).format("MMMM DD")}`}
                  </p>
                  {banner.RegistrationLink && (
                    <Button
                      shape="round"
                      size={"large"}
                      className={`${styles.text_button}`}
                      onClick={() => window.open(banner.RegistrationLink)}
                    >
                      Register Now
                    </Button>
                  )}
                </div>
              </p>
            </div>
          ))
        ) : (
          <div className={`${styles.banner_container}`}>
            <Skeleton.Image className={`${styles.skeleton_image}`} active />
          </div>
        )}
      </AppSlider>
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
    </>
  );
}
