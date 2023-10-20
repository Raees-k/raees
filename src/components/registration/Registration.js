import { useState } from "react";
import { Row, Col } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

// Common Components
import AppRoundedBtn from "../../common_components/appRoundedBtn/AppRoundedBtn";
import InputElement from "../../common_components/formElement/Input";
import DropdownElement from "../../common_components/formElement/Dropdown";
import UseRegForm from "../../common_components/appForm/NewRegistrations";
import img1 from "../../assets/registration/image.svg";
import img2 from "../../assets/registration/IsDB _ EN _ logo _ primary _ colour.png";

//css
import styles from "./registration.module.sass";

function onCancel(setErrors, setInputs, fromObject, errorObj) {
  setErrors(errorObj);
  setInputs(fromObject);
}

function onCancelHandler(
  //setVisiblety,
  setErrors,
  setInputs,
  setRegisterDone,
  fromObject,
  errorObj
) {
  console.log("==Set1", setRegisterDone);
  setErrors(errorObj);
  setInputs(fromObject);
  setRegisterDone(false);
  //setVisiblety(false);
}

export default function RegistrationForm({ eventId, setVisiblety }) {
  const [loading, setLoaderTime] = useState(false);
  const [registerDone, setRegisterDone] = useState(false);
  // Form Initial Objects
  const fromObject = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    employeeId: "",
    location: "",
    department: "",
    gender: [],
    user: [],
    // location: [],
  };
  // Error Initial Object
  const errorObj = {
    firstName: null,
    lastName: null,
    email: null,
    user: null,
    phoneNumber: null,
  };

  const {
    handleSubmit,
    handleInputChange,
    handleGender,
    handleUser,
    handlelocation,
    inputs,
    errors,
    setErrors,
    setInputs,
  } = UseRegForm(fromObject, errorObj, setLoaderTime, setRegisterDone, eventId);

  return (
    <div
      className={`${styles.bg}`}
      style={{
        backgroundImage: `url(${img1})`,
      }}
    >
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div
            className={`${styles.registration_header} d-flex align-items-center justify-content-end px-5`}
          >
            <img src={img2} alt="logo" width="100" height="50" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className={`${styles.container}`}>
            <Row>
              <Col xs={0} sm={0} md={0} lg={6} xl={6}></Col>
              <Col xs={24} sm={24} md={24} lg={18} xl={18}>
                <div className={`${styles.reg_container}`}>
                  {/* If register is done */}
                  {registerDone && (
                    <div
                      className={`d-flex align-items-center justify-content-center flex-column ${styles.done_container}`}
                    >
                      <div>
                        <CheckCircleOutlined
                          className={`${styles.registration_success} text-success mb-4`}
                        />
                      </div>
                      <h3 className={`${styles.reg_title} text-success`}>
                        Thank you.
                      </h3>

                      <AppRoundedBtn
                        text={"Done"}
                        prefix={""}
                        suffix={""}
                        bg={"white"}
                        outline={"dark"}
                        long={false}
                        href={"none"}
                        disabled={loading}
                        btnStyle={{ width: "200px", height: "50px" }}
                        onClickHandler={() =>
                          onCancelHandler(
                            //setVisiblety,
                            setErrors,
                            setInputs,
                            setRegisterDone,
                            fromObject,
                            errorObj
                          )
                        }
                      />
                    </div>
                  )}
                  <Row gutter={[16, 16]}>
                    {/* Loading part */}
                    {loading && (
                      <div span={24} className={`${styles.loader_container}`}>
                        <div
                          className={`spinner-grow ${styles.loader}`}
                          role="status"
                        >
                          <span className={`sr-only `}>Loading...</span>
                        </div>
                      </div>
                    )}
                    {/* If registration is not done */}
                    {!registerDone && (
                      <>
                        <Col span={24}>
                          <h3 className={`${styles.reg_title}`}>
                            Registration
                          </h3>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          {/* {console.log("===>>>>", inputs)} */}
                          <InputElement
                            label={`First Name`}
                            mandatory={true}
                            placeholder={`Enter First Name`}
                            name="firstName"
                            disabled={loading}
                            onChange={handleInputChange}
                            value={inputs.firstName}
                            error={errors.firstName}
                          />
                          {errors.firstName !== null && !errors.firstName && (
                            <p className={`text-danger mt-2 mb-0 pl-4`}>
                              {"Please enter the field properly."}
                            </p>
                          )}
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <InputElement
                            label={`Last Name`}
                            mandatory={true}
                            placeholder={`Enter Last Name`}
                            name="lastName"
                            disabled={loading}
                            onChange={handleInputChange}
                            value={inputs.lastName}
                            error={errors.lastName}
                          />
                          {errors.lastName !== null && !errors.lastName && (
                            <p className={`text-danger mt-2 mb-0 pl-4`}>
                              {"Please enter the field properly."}
                            </p>
                          )}
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <InputElement
                            label={`Email Address`}
                            mandatory={true}
                            placeholder={`Enter Email Address`}
                            name="email"
                            disabled={loading}
                            onChange={handleInputChange}
                            value={inputs.email}
                            error={errors.email}
                          />
                          {errors.email !== null && !errors.email && (
                            <p className={`text-danger mt-2 mb-0 pl-4`}>
                              {"Please enter a valid email."}
                            </p>
                          )}
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <InputElement
                            label={`Phone Number`}
                            mandatory={false}
                            placeholder={`Enter Phone Number`}
                            name="phoneNumber"
                            disabled={loading}
                            onChange={handleInputChange}
                            value={inputs.phoneNumber}
                            error={errors.phoneNumber}
                          />
                          {errors.phoneNumber !== null &&
                            !errors.phoneNumber && (
                              <p className={`text-danger mt-2 mb-0 pl-4`}>
                                {
                                  "Enter a valid phone number or try adding your country code."
                                }
                              </p>
                            )}
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <DropdownElement
                            label={`Gender`}
                            mandatory={false}
                            placeholder={`Select`}
                            options={[
                              "Male",
                              "Female",
                              "Transgender",
                              "Others",
                            ]}
                            onChange={handleGender}
                            name="gender"
                            disabled={loading}
                            value={inputs.gender}
                            error={null}
                          />
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <DropdownElement
                            label={`Type of user`}
                            mandatory={true}
                            placeholder={`Select`}
                            options={[
                              "Employees",
                              "Employees family",
                              "Retirees",
                              "Retirees family",
                            ]}
                            onChange={handleUser}
                            name="user"
                            disabled={loading}
                            value={inputs.user}
                            error={errors.user}
                          />
                          {errors.user !== null && !errors.user && (
                            <p className={`text-danger mt-2 mb-0 pl-4`}>
                              {"Please select a user type."}
                            </p>
                          )}
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <InputElement
                            label={`Employee ID`}
                            mandatory={false}
                            placeholder={`Enter Employee ID`}
                            name="employeeId"
                            disabled={loading}
                            onChange={handleInputChange}
                            value={inputs.employeeId}
                            error={null}
                          />
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <DropdownElement
                            label={`Location`}
                            mandatory={false}
                            placeholder={`Select`}
                            name="location"
                            options={["Dubai", "Kuwait", "Qatar", "KSA"]}
                            disabled={loading}
                            onChange={handlelocation}
                            value={inputs.location}
                            error={null}
                          />
                        </Col>
                        {/* For Large screen size */}
                        <Col xs={0} sm={0} md={0} lg={24} xl={24}>
                          <div className={`d-flex justify-content-end mt-3`}>
                            <div className={`mx-3`}>
                              <AppRoundedBtn
                                text={"Cancel"}
                                prefix={""}
                                suffix={""}
                                bg={"white"}
                                outline={"dark"}
                                long={true}
                                href={"none"}
                                disabled={loading}
                                btnStyle={{ width: "235px", height: "60px" }}
                                onClickHandler={() =>
                                  onCancel(
                                    setErrors,
                                    setInputs,
                                    fromObject,
                                    errorObj
                                  )
                                }
                              />
                            </div>
                            <div className={`mx-3`}>
                              <AppRoundedBtn
                                text={"Register Now"}
                                prefix={""}
                                suffix={""}
                                bg={"blue"}
                                outline={"dark"}
                                long={true}
                                href={"none"}
                                disabled={loading}
                                btnStyle={{ width: "235px", height: "60px" }}
                                onClickHandler={() => {
                                  handleSubmit(inputs);
                                }}
                              />
                            </div>
                          </div>
                        </Col>

                        {/* For small screens */}
                        <Col xs={24} sm={24} md={12} lg={0} xl={0}>
                          <div className={`d-flex justify-content-center mt-3`}>
                            <div className={`mx-3`}>
                              <AppRoundedBtn
                                text={"Cancel"}
                                prefix={""}
                                suffix={""}
                                bg={"white"}
                                outline={"dark"}
                                long={true}
                                href={"none"}
                                disabled={loading}
                                btnStyle={{ width: "235px", height: "60px" }}
                                onClickHandler={() =>
                                  onCancel(
                                    setErrors,
                                    setInputs,
                                    fromObject,
                                    errorObj
                                  )
                                }
                              />
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={0} xl={0}>
                          <div className={`d-flex justify-content-center mt-3`}>
                            <div className={`mx-3`}>
                              <AppRoundedBtn
                                text={"Register Now"}
                                prefix={""}
                                suffix={""}
                                bg={"blue"}
                                outline={"dark"}
                                long={true}
                                href={"none"}
                                disabled={loading}
                                btnStyle={{ width: "235px", height: "60px" }}
                                onClickHandler={() => {
                                  handleSubmit(inputs);
                                }}
                              />
                            </div>
                          </div>
                        </Col>
                      </>
                    )}
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}
