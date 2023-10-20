// component
import CommonSectionHeader from "../commonSectionHeader/CommonSectionHeader";
import ServicesActivitiesCardSection from "../../../common_components/servicesActivitiesCardSection/ServicesActivitiesCardSection";
import ServiceBg from "../../../assets/background/ServicesActivities.svg";

//css
import styles from "./services-activities.module.sass";

export default function ServicesActivities({ servicesActivities }) {
  return (
    <div
      style={{ backgroundImage: `url(${ServiceBg})` }}
      className={`${styles.service_bg}`}
    >
      <div className={`${styles.service_container} py-5`}>
        <CommonSectionHeader title={"Activities"} sliderSection={false} />
        <ServicesActivitiesCardSection cardsData={servicesActivities} />
      </div>
    </div>
  );
}
