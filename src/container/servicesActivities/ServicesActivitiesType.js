import { useState, useEffect, useContext } from "react";
import axios from "axios";
//component
import Layout from "../layout/Layout";
import InnerPageTitleSection from "../../common_components/innerPageTitleSection/InnerPageTitleSection";

import ServicesActivitiesTypeIntro from "../../components/servicesActivities/servicesActivitiesTypeIntro/ServicesActivitiesTypeIntro";
import ConceptGallery from "../../components/servicesActivities/conceptGallery/ConceptGallery";
import RelatedEvents from "../../components/servicesActivities/relatedEvents/RelatedEvents";
import { AppContext } from "../../App";
//BG
import Hero from "../../assets/general/hero.svg";
import DottedLine from "../../assets/general/Dotted-line-path-301.svg";

//css
import styles from "./services-activities-type.module.sass";
//
import { mapRoutePathToType } from "../../services/serviceActivitieService";
//constant
import { CONST } from "../../constant";

export default function ServicesActivitiesType({ routePath }) {
  const { events, services } = useContext(AppContext);
  const [cardsData, setcardsData] = useState(null);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    if (
      routePath &&
      Object.keys(routePath)?.length > 0 &&
      events &&
      events?.length > 0 &&
      services &&
      services?.length > 0
    ) {
      let temp = mapRoutePathToType(routePath.type, services);
      axios
        .get(
          `${CONST.BASE_URL}${CONST.API.LIST("Service")}${CONST.API.QUERY(
            "Title,Author0,CreatedDate,ServiceType,Description,AttachmentFiles"
          )} ${CONST.API.ATTACHMENT} ${CONST.API.FILTER("ServiceType", temp)}`
        )
        .then((res) => {
          if (res.data.value[0] !== undefined) setcardsData(res.data.value[0]);
        })
        .catch((err) => console.log(err));
    }

    setEventData(events);
  }, [routePath, events, services]);

  return (
    <>
      {cardsData &&
        Object.keys(cardsData).length > 0 &&
        services &&
        services.length > 0 && (
          <Layout>
            <div className={`position-relative`}>
              <div className={`${styles.bg_color}`}></div>
              <div
                className={`${styles.bg_pattern}`}
                style={{
                  backgroundImage: `url(${Hero}),url(${DottedLine})`,
                }}
              ></div>
              <div className="container">
                <InnerPageTitleSection title={"Activities"} />
              </div>
              <ServicesActivitiesTypeIntro serviceActivity={cardsData} />
            </div>
            <ConceptGallery
              galleryTitle={cardsData.Title}
              finalData={cardsData.AttachmentFiles}
            />
            {eventData && eventData?.length > 0 && (
              <RelatedEvents
                title={cardsData.Title}
                eventsData={eventData}
                services={services}
                path={routePath.type}
              />
            )}
          </Layout>
        )}
    </>
  );
}
