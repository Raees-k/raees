import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Skeleton } from "antd";
import { CONST } from "../../constant/index";
//component
import Layout from "../../container/layout/Layout";
import Banner from "../../components/landing/banner/Banner";
import ServicesActivities from "../../components/landing/servicesActivities/ServicesActivities";
import NewsPublications from "../../components/landing/newsPublications/NewsPublications";
import UpcomingEvents from "../../components/landing/upcomingEvents/UpcomingEvents";
import Testimonials from "../../components/landing/testimonials/Testimonials";
import ContactUsSection from "../../components/landing/contactUsSection/ContactUsSection";
import Gallery from "../../components/landing/gallery/Gallery";
import VideoSection from "../../common_components/videoSection/VideoSection";
import Calendar from "../../common_components/calendar/Calendar";
import CommonSectionHeader from "../../components/landing/commonSectionHeader/CommonSectionHeader";

//css
import styles from "./landing.module.sass";
import galleryStyles from "../../components/landing/gallery/gallery.module.sass";
//Bg
import TestiBg from "../../assets/background/newsTestimoni.svg";

export default function Landing() {
  const [gallery, setGallery] = useState(null);
  const [galleryDetails, setGalleryDetails] = useState(null);
  const [galleryContent, setGallerycontent] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${CONST.BASE_URL}${CONST.API.LIST("Gallery")}${CONST.API.QUERY(
          "Title,EventOccurDate,EventType,Id,Location"
        )}`
      )
      .then((res) => {
        setGallery(res.data.value);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        `${CONST.BASE_URL}${CONST.API.LIST("GalleryContent")}${CONST.API.QUERY(
          "Title,VideoImage,ContentType0,Id,AttachmentFiles"
        )} ${CONST.API.ATTACHMENT}`
      )
      .then((res2) => {
        setGalleryDetails(res2.data.value);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (
      gallery &&
      gallery?.length > 0 &&
      galleryDetails &&
      galleryDetails?.length > 0
    ) {
      let galleryArray = [];
      if (gallery && gallery?.length > 0) {
        galleryArray = gallery?.sort(
          (a, b) =>
            new Date(b.EventOccurDate).getTime() -
            new Date(a.EventOccurDate).getTime()
        );
      }

      if (galleryArray && galleryArray?.length > 0) {
        galleryArray = galleryArray?.slice(0, 3);
      }
      if (galleryDetails && galleryDetails?.length > 0) {
        let temp = galleryDetails?.filter((data) =>
          galleryArray.find((event) => event.Id.toString() === data.Title)
        );
        let temp2 = temp?.filter((data) => data.ContentType0 !== "Document");

        setGallerycontent(temp2);
      }
    }
  }, [gallery, galleryDetails]);

  let skeletonData = [{}];

  return (
    <Layout>
      <Banner />
      <ServicesActivities />
      <VideoSection />
      <div
        className={`${styles.new_testimonial_bg}`}
        style={{
          backgroundImage: `url(${TestiBg})`,
        }}
      >
        <NewsPublications />
        <Testimonials />
      </div>
      <Calendar />
      <UpcomingEvents />
      {galleryContent && galleryContent?.length > 0 ? (
        <Gallery galleryContent={galleryContent} />
      ) : (
        <>
          <div className={`${styles.gallery_bg} mt-5`}>
            <Row>
              <div className={`${galleryStyles.gallery_container}`}>
                <CommonSectionHeader title={"Gallery"} sliderSection={true} />
              </div>
              <Col span={24}>
                <Row>
                  {skeletonData &&
                    skeletonData?.length > 0 &&
                    skeletonData?.map((data, index) => (
                      <>
                        <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                          <div
                            className={` p-2 ${galleryStyles.slider_container_single}`}
                          >
                            <div
                              className={`my-2 ${galleryStyles.gallery_card_container}`}
                            >
                              <Skeleton.Image />
                            </div>
                            <div
                              className={`my-2 ${galleryStyles.gallery_card_container}`}
                            >
                              <Skeleton.Image />
                            </div>
                          </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                          <div
                            className={` p-2 ${galleryStyles.slider_container_single}`}
                          >
                            <div
                              className={`my-2 ${galleryStyles.gallery_card_container}`}
                            >
                              <Skeleton.Image />
                            </div>
                          </div>
                        </Col>
                      </>
                    ))}
                </Row>
              </Col>
            </Row>
          </div>
        </>
      )}
      <ContactUsSection />
    </Layout>
    // </h1>
  );
}
