import { Helmet } from "react-helmet";
// Component
import MediaPage from "../../container/gallery/Media";
//Logo
import Logo from "../../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";

export default function Media() {
  let data = window.location.href.split("/");
  let itemId = data[data.length - 1];

  return (
    <>
      <Helmet>
        <title>Gallery</title>
        <meta property="og:title" content="IsDB - Gallery" />
        <meta property="og:image" content={Logo} />
      </Helmet>
      <MediaPage routePath={{ id: itemId }} />
    </>
  );
}
