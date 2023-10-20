import { Helmet } from "react-helmet";
//Components
import BuysellSection from "../../container/buySell/BuySell";
//Logo
import Logo from "../../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";

export default function BuySell() {
  return (
    <>
      <Helmet>
        <title>Buy & Sell</title>
        <meta property="og:title" content="IsDB - Buy & Sell" />
        <meta property="og:image" content={Logo} />
      </Helmet>
      <BuysellSection />
    </>
  );
}
