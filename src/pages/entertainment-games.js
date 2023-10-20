import { Helmet } from "react-helmet";
// Component
import Entertainment from "../container/entertainment&Games/Entertainment&Games";
//Logo
import Logo from "../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";

export default function EntertainmentPage() {
  return (
    <>
      <Helmet>
        <title>Games</title>
        <meta property="og:title" content="IsDB - Online Entertainments" />
        <meta property="og:image" content={Logo} />
      </Helmet>
      <Entertainment />
    </>
  );
}
