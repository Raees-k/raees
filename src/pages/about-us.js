import { Helmet } from "react-helmet";
//component
import AboutUs from "../container/aboutUs/AboutUs";
//Logo
import Logo from "../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";

export default function AboutUsPage() {
  return (
    <>
      <Helmet>
        <title>About Us</title>
        <meta property="og:title" content="IsDB - About Us" />
        <meta property="og:image" content={Logo} />
      </Helmet>
      <AboutUs />
    </>
  );
}
