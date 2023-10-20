import { Helmet } from "react-helmet";
//component
import Landing from "../container/landing/Landing";
//Logo
import Logo from "../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";

export default function Home() {
  return (
    // <h1>Hello</h1>
    <>
      <Helmet>
        <title>IsDB</title>
        <meta
          property="og:title"
          content="IsDB - The Islamic Development Bank"
        />
        <meta property="og:image" content={Logo} />
      </Helmet>
      <Landing />
    </>
  );
}
