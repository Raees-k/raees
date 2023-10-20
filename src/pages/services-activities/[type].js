import { Helmet } from "react-helmet";
//component
import ServicesActivitiesType from "../../container/servicesActivities/ServicesActivitiesType";
//Logo
import Logo from "../../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ServiceTypes() {
  const location = useLocation();
  const [itemId, setItemId] = useState(null);

  useEffect(() => {
    let data = location.pathname.split("/");
    let itemId = data[data.length - 1];
    setItemId(itemId);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Services</title>
        <meta property="og:title" content="IsDB - Services Details" />
        <meta property="og:image" content={Logo} />
      </Helmet>
      {itemId?.length > 0 && (
        <ServicesActivitiesType routePath={{ type: itemId }} />
      )}
    </>
  );
}
