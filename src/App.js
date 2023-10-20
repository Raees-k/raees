import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import "./App.css";
import "antd/dist/antd.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/index";
import AboutUS from "./pages/about-us";
import Registration from "./pages/registration";
import ContactUs from "./pages/contact-us";
import GalleryMain from "./pages/gallery/index";
import GalleryInner from "./pages/gallery/[id]";
import ServiceActivity from "./pages/services-activities/index";
import NewsPublication from "./pages/news-publications/index";
import Service from "./pages/services-activities/[type]";
import BuySell from "./pages/services-activities/buy-sell";
import EnterainmentGames from "./pages/entertainment-games";
import EventsActivity from "./pages/events/index";
import Event from "./pages/events/[id]";
import NewsDetails from "./pages/news-publications/[id]";
import Offers from "./pages/offers";
import { CONST } from "./constant/index";
import SearchEvents from "./pages/searchEvents/[search]";
export const AppContext = createContext();

function App() {
  //State setting
  const [user, setUser] = useState(null);
  const [news, setNewsData] = useState(null);
  const [services, setServicesData] = useState(null);
  const [events, setEventsData] = useState(null);
  const [serviceLogoData, setSeviceLogoData] = useState(null);
  const [otherResourcesData, setOtherResourcesData] = useState(null);
  console.log("USER", user);
  console.log("NEWS", news);
  console.log("SERVICES", services);
  console.log("EVENTS", events);

  let userApi = `${CONST.BASE_URL}${CONST.API.USER}`;
  let newsApi = `${CONST.BASE_URL}${CONST.API.LIST("News")}${CONST.API.QUERY(
    "Title,Description,Id,AttachmentFiles"
  )} ${CONST.API.ATTACHMENT}`;
  let serviceApi = `${CONST.BASE_URL}${CONST.API.LIST(
    "Service"
  )}${CONST.API.QUERY(
    "Title,Author0,Id,CreatedDate,ServiceType,Color,IsEvent,Description,AttachmentFiles"
  )} ${CONST.API.ATTACHMENT}`;
  let eventsApi = `${CONST.BASE_URL}${CONST.API.LIST("Event")}${CONST.API.QUERY(
    "Title,Author0,CreatedDate,StartDate,EndDate,Id,RegistrationLink,Speaker,Location,EventType,Description,AttachmentFiles"
  )} ${CONST.API.ATTACHMENT}`;
  let servicesLogoApi = `${CONST.BASE_URL}${CONST.API.LIST(
    "ServicesLogo"
  )}${CONST.API.QUERY("Title,AttachmentFiles")} ${CONST.API.ATTACHMENT}`;

  let otherResourcesApi =
    CONST.BASE_URL +
    CONST.API.LIST("OtherResources") +
    CONST.API.QUERY("Link, Title");

  useEffect(() => {
    const requestUser = axios.get(userApi);
    const requestNews = axios.get(newsApi);
    const requestService = axios.get(serviceApi);
    const requestEvent = axios.get(eventsApi);
    const requestServiceLogo = axios.get(servicesLogoApi);
    const requestOtherResources = axios.get(otherResourcesApi);
    axios
      .all([
        requestUser,
        requestNews,
        requestService,
        requestEvent,
        requestServiceLogo,
        requestOtherResources,
      ])
      .then(
        axios.spread((...responses) => {
          console.log("responses[4]", responses[4]);
          const responseUser = responses[0];
          const responseNews = responses[1].data.value;
          const responseService = responses[2].data.value;
          const responseEvent = responses[3].data.value;
          const responseServiceLogo = responses[4].data.value;
          const responseOtherResources = responses[5].data.value;
          console.log("resServices-->", responseService);
          setUser(responseUser);
          setNewsData(responseNews);
          setServicesData(responseService);
          setEventsData(responseEvent);
          setSeviceLogoData(responseServiceLogo);
          setOtherResourcesData(responseOtherResources);
        })
      )
      .catch((errors) => {
        console.log("=====================>", errors);
      });
  }, [
    userApi,
    newsApi,
    serviceApi,
    eventsApi,
    otherResourcesApi,
    servicesLogoApi,
  ]);

  return (
    <AppContext.Provider
      value={{
        user,
        news,
        services,
        events,
        serviceLogoData,
        otherResourcesData,
      }}
    >
      <Router>
        <Switch>
          <Route exact path="/about-us">
            <AboutUS />
          </Route>
          <Route exact path="/contact-us">
            <ContactUs />
          </Route>
          <Route exact path="/registration">
            <Registration />
          </Route>
          <Route exact path="/activities">
            <ServiceActivity />
          </Route>
          <Route exact path="/news-publications">
            <NewsPublication />
          </Route>
          <Route exact path="/news-publications/:id">
            <NewsDetails />
          </Route>
          <Route exact path="/gallery">
            <GalleryMain />
          </Route>
          <Route exact path="/gallery/:id">
            <GalleryInner />;
          </Route>
          <Route exact path="/activities/buy-and-sell">
            <BuySell />
          </Route>
          <Route exact path="/activities/entertainment-&-online-game">
            <EnterainmentGames />
          </Route>
          <Route exact path="/events">
            <EventsActivity />
          </Route>
          <Route exact path="/events/:id">
            <Event />
          </Route>
          <Route exact path="/search">
            <SearchEvents />
          </Route>
          <Route exact path="/activities/:type">
            <Service />
          </Route>
          {/* <Route exact path="/search">
            <SearchPage />
          </Route> */}
          <Route exact path="/offers">
            <Offers />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
