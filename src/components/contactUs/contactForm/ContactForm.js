import { useState } from "react";
import { Row, Col } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

// Common Components
import AppRoundedBtn from "../../../common_components/appRoundedBtn/AppRoundedBtn";
import InputElement from "../../../common_components/formElement/Input";
import TextArea from "../../../common_components/formElement/TextArea";
import UseContactForm from "../../../common_components/appForm/ContactRegistration";
// Css
import styles from "./contact-form.module.sass";

// Cancel Handler
function onCancelHandler(
  setErrors,
  setInputs,
  setRegisterDone,
  fromObject,
  errorObj
) {
  setInputs(fromObject);
  setErrors(errorObj);
  setRegisterDone(false);
}

export default function ContactForm() {
  const [loading, setLoaderTime] = useState(false);
  const [registerDone, setRegisterDone] = useState(false);
  //Initial Object
  const fromObject = { firstName: "", lastName: "", email: "", textarea: "" };
  // Error Initial Object
  const errorObj = {
    firstName: null,
    email: null,
    textarea: null,
    phoneNumber: null,
  };
  // Custom Hook
  const {
    handleSubmit,
    handleInputChange,
    inputs,
    errors,
    setErrors,
    setInputs,
  } = UseContactForm(fromObject, errorObj, setLoaderTime, setRegisterDone);

  return (
    <>
      <div className={`${styles.contact_form_container}`}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
                  Thanks for your feedback.
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
                  <Row>
                    <Col span={24}>
                      <div
                        className={`d-flex justify-content-start align-items-start`}
                      >
                        <div className={`mb-3 ${styles.contact_form_title}`}>
                          We’re Here To Help.
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div
                    className={`d-flex justify-content-center align-items-center flex-column`}
                  >
                    <div className={`${styles.contact_form_card}`}>
                      <Row className={`p-5`} gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
                            mandatory={false}
                            placeholder={`Enter Last Name`}
                            name="lastName"
                            disabled={loading}
                            onChange={handleInputChange}
                            value={inputs.lastName}
                            error={null}
                          />
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
                        <Col span={24}>
                          <TextArea
                            label={`Message`}
                            mandatory={true}
                            placeholder={`Type your message`}
                            styles={{ height: "50px" }}
                            name="textarea"
                            disabled={loading}
                            onChange={handleInputChange}
                            value={inputs.textarea}
                            error={errors.textarea}
                          />
                          {errors.textarea !== null && !errors.textarea && (
                            <p className={`text-danger mt-2 mb-0 pl-4`}>
                              {"Please provide a message."}
                            </p>
                          )}
                        </Col>
                        <Col span={24}>
                          <div className={`d-flex justify-content-end`}>
                            <div className={`mt-5`}>
                              <AppRoundedBtn
                                text={"Send Message"}
                                prefix={""}
                                suffix={""}
                                bg={"blue"}
                                outline={"dark"}
                                long={true}
                                href={"none"}
                                disabled={loading}
                                btnStyle={{
                                  width: "235px",
                                  height: "60px",
                                }}
                                onClickHandler={() => {
                                  handleSubmit(inputs);
                                  // inputs
                                }}
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </>
              )}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}
