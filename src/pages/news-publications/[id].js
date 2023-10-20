import { useContext } from "react";
import { AppContext } from "../../App";
import { Helmet } from "react-helmet";
//Components
import NewsDetails from "../../container/newsPublications/NewsDetails";
//Logo
import Logo from "../../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";

export default function NewsTypes({ routePath }) {
  const { news } = useContext(AppContext);
  let data = window.location.href.split("/");
  let itemId = data[data.length - 1];

  return (
    <>
      <Helmet>
        <title>News</title>
        <meta property="og:title" content="IsDB - News Details" />
        <meta property="og:image" content={Logo} />
      </Helmet>
      <NewsDetails routePath={{ id: itemId }} newsDetails={news} news={news} />
    </>
  );
}
