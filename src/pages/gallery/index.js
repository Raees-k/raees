import { Helmet } from "react-helmet";
// Component
import GalleryPage from "../../container/gallery/Gallery";
//Logo
import Logo from "../../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";

export default function Gallery() {
  return (
    <>
      <Helmet>
        <title>Gallery</title>
        <meta property="og:title" content="IsDB - Gallery" />
        <meta property="og:image" content={Logo} />
      </Helmet>
      <GalleryPage />
    </>
  );
}
