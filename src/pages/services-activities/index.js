import { Helmet } from "react-helmet";
//component
import ServicesActivities from "../../container/servicesActivities/ServicesActivities";
//Logo
import Logo from "../../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";

export default function ServicesActivitiesPage() {
  return (
    <>
      <Helmet>
        <title>Services</title>
        <meta property="og:title" content="IsDB - Activities" />
        <meta property="og:image" content={Logo} />
      </Helmet>
      <ServicesActivities />
    </>
  );
}
