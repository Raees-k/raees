import { useState, useEffect } from "react";
import axios from "axios";
import { CONST } from "../../constant/index";
// Common Components
import Layout from "../layout/Layout";
import InnerPageTitleSection from "../../common_components/innerPageTitleSection/InnerPageTitleSection";

// Components
import GamingBannerImage from "../../components/entertainment&Games/gamingBanner/GamingBannerImage";
import OnlineGames from "../../components/entertainment&Games/gamingCardSection/OnlineGames";
import Tournament from "../../components/entertainment&Games/gamingCardSection/Tournament";
import TopGroups from "../../components/entertainment&Games/gamingCardSection/TopGroups";
//css
import styles from "./entertainment.module.sass";
//BG
import Hero from "../../assets/general/hero.svg";
import DottedLine from "../../assets/general/Dotted-line-path-301.svg";
import EventSection from "../../assets/eventsActivities/allEventsSectionBg.svg";

export default function Entertainment() {
  const [onlineGames, setOnlineGames] = useState(null);
  const [groupData, setGroupData] = useState(null);
  const [tournaments, setTournaments] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${CONST.BASE_URL}${CONST.API.LIST("Entertainment")}${CONST.API.QUERY(
          "Title,Date,Link,Category,Status,AttachmentFiles"
        )} ${CONST.API.ATTACHMENT}`
      )
      .then((res) => {
        let onlineGames = res.data.value.filter(
          (data) => data.Category.toLowerCase() === "OnlineGames".toLowerCase()
        );
        setOnlineGames(onlineGames);
        let groupData = res.data.value.filter(
          (data) => data.Category.toLowerCase() === "TopGroups".toLowerCase()
        );
        setGroupData(groupData);
        let tournaments = res.data.value.filter(
          (data) => data.Category.toLowerCase() === "Tournaments".toLowerCase()
        );
        setTournaments(tournaments);
      })
      .catch((err) => console.log(err));
  }, []);
  let skeletonData = [{}, {}, {}];

  return (
    <>
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
            <InnerPageTitleSection title={"Online Games"} />
          </div>
          <GamingBannerImage />
          {onlineGames && onlineGames.length > 0 ? (
            <OnlineGames cardData={onlineGames} />
          ) : (
            <OnlineGames cardData={skeletonData} />
          )}
        </div>
        <div
          className={`${styles.gamecard_section_bg}`}
          style={{
            backgroundImage: `url(${EventSection})`,
          }}
        >
          {groupData && groupData.length > 0 ? (
            <TopGroups groupData={groupData} />
          ) : (
            <TopGroups groupData={skeletonData} />
          )}
          {tournaments && tournaments.length > 0 ? (
            <Tournament cardData={tournaments} />
          ) : (
            <Tournament cardData={skeletonData} />
          )}
        </div>
      </Layout>
    </>
  );
}
