import { Helmet } from "react-helmet";
//component
import RegistrationContainer from "../container/registration/RegistrationContainer";
//Logo
import Logo from "../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";

export default function Registration() {
  return (
    <>
      <Helmet>
        <title>Registration</title>
        <meta property="og:title" content="IsDB - User Registration" />
        <meta property="og:image" content={Logo} />
      </Helmet>
      {/* <Layout> */}
      {/* <div className="d-flex justify-content-center align-items-center m-5"> */}
      <RegistrationContainer />
      {/* </div> */}
      {/* </Layout> */}
    </>
  );
}
