import React, { useState } from "react";

import Head from "../../common_components/head/Head";
import Header from "../../common_components/header/Header";
import Footer from "../../common_components/footer/Footer";
import flogo1 from "../../assets/Image/footer/StaffSocialClub-Logo_footer.png";
import hlogo from "../../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";
import menulogo from "../../assets/Image/header/hambergurIcon.svg";
import SSClogo from "../../assets/Image/header/SSCLOGO.png";
import Favicon from "../../assets/Image/header/favicon.ico";
import AppDrawer from "../../common_components/appDrawer/AppDrawer";
import { ArrowUpOutlined } from "@ant-design/icons";

//css
import style from "./layout.module.sass";

export default function Layout({ children, setSearchValue }) {
  const [visbility, setVisbility] = useState(false);
  const [visible, setVisible] = useState(false);

  //Scroll
  window.onscroll = function () {
    scrollFunction();
  };
  //Scroll Function
  function scrollFunction() {
    if (
      document.body.scrollTop > 1000 ||
      document.documentElement.scrollTop > 1000
    ) {
      setVisible(true);
      // mybutton.style.display = "block";
    } else {
      setVisible(false);
      // mybutton.style.display = "none";
    }
  }

  // To top
  function topFunction() {
    // console.log("TOPFUNCTION");
    document.body.scrollTop = 0;
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      {visible && (
        <button
          onClick={topFunction}
          className={`${style.goToTop} justify-content-center align-items-center`}
        >
          <ArrowUpOutlined />
        </button>
      )}
      <Head logo={Favicon} />
      <Header
        menuIcon={menulogo}
        logo={[hlogo, SSClogo]}
        setDrawerVisbility={setVisbility}
        setSearchValue={setSearchValue}
      />

      {children}
      <Footer logo={flogo1} />
      <AppDrawer visbility={visbility} setVisbility={setVisbility} />
    </>
  );
}
