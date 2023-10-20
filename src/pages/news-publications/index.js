import { Helmet } from "react-helmet";
//component
import NewsPublications from "../../container/newsPublications/NewsPublications";
//Logo
import Logo from "../../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";

export default function NewsPublicationsPage({ news }) {
  return (
    <>
      <Helmet>
        <title>News</title>
        <meta property="og:title" content="IsDB - News & Publications" />
        <meta property="og:image" content={Logo} />
      </Helmet>
      <NewsPublications news={news} />
    </>
  );
}
