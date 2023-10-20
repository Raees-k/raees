import React from "react";
import { Helmet } from "react-helmet";
import Logo from "../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";
import OfferContainer from "../container/offers/offers";

function Offers() {
  return (
    <>
      <Helmet>
        <title>Offers</title>
        <meta property="og:title" content="IsDB - Offers" />
        <meta property="og:image" content={Logo} />
      </Helmet>
      <OfferContainer />
    </>
  );
}

export default Offers;
