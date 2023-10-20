import { Helmet } from "react-helmet";
// Components
import ContactUs from "../container/contactUs/ContactUs";
//Logo
import Logo from "../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";

export default function ContactUsDetails() {
  return (
    <>
      <Helmet>
        <title>Contact Us</title>
        <meta property="og:title" content="IsDB - Contact Us" />
        <meta property="og:image" content={Logo} />
      </Helmet>
      <ContactUs />
    </>
  );
}
