import { useState } from "react";
import { Modal, Row, Col } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

// Common Components
import AppRoundedBtn from "../../appRoundedBtn/AppRoundedBtn";
import InputElement from "../../formElement/Input";
import DropdownElement from "../../formElement/Dropdown";
import useForm from "../../appForm/EventRegistration";

// css
import styles from "./event-registration-modal.module.sass";

// onCancel Handler
function onCancelHandler(
  setVisiblety,
  setErrors,
  setInputs,
  setRegisterDone,
  fromObject,
  errorObj
) {
  setVisiblety(false);
  setErrors(errorObj);
  setInputs(fromObject);
  setRegisterDone(false);
}

export default function EventRegistrationModal({
  eventId,
  title,
  visible,
  setVisiblety,
}) {
  //console.log("eventId", eventId);
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
  };
  // Error Initial Object
  const errorObj = {
    firstName: null,
    lastName: null,
    email: null,
    user: null,
    location: null,
    phoneNumber: null,
  };

  const {
    handleSubmit,
    handleInputChange,
    handleGender,
    handleUser,
    inputs,
    errors,
    setErrors,
    setInputs,
  } = useForm(fromObject, errorObj, setLoaderTime, setRegisterDone, eventId);

  return (
    <Modal
      // title={`Event Registration`}
      centered
      onCancel={() => setVisiblety(false)}
      open={visible}
      closable={false}
      footer={null}
      width={800}
      bodyStyle={{ padding: "50px" }}
      wrapClassName={`${styles.event_reg_modal}`}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          {/* If registration done */}
          {registerDone && (
            <div
              className={`d-flex align-items-center justify-content-center flex-column ${styles.done_container}`}
            >
              <div>
                <CheckCircleOutlined
                  className={`${styles.registration_success} text-success mb-4`}
                />
              </div>
              <div
                className={`d-flex align-items-center justify-content-center`}
              >
                <h3 className={`${styles.reg_title}  text-success`}>
                  Thank you.
                </h3>
              </div>

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
                    setVisiblety,
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
        </Col>
        {/* Loading section */}
        {loading && (
          <div span={24} className={`${styles.loader_container}`}>
            <div className={`spinner-grow ${styles.loader}`} role="status">
              <span className={`sr-only `}>Loading...</span>
            </div>
          </div>
        )}
        {/* If registration is not done */}
        {!registerDone && (
          <>
            <Col span={24}>
              <h3 className={`${styles.modal_title}`}>Event Registration</h3>
            </Col>
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
              {errors.phoneNumber !== null && !errors.phoneNumber && (
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
                options={["Male", "Female", "Transgender", "Others"]}
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
              <InputElement
                label={`Location`}
                mandatory={true}
                placeholder={`Enter Location`}
                name="location"
                disabled={loading}
                onChange={handleInputChange}
                value={inputs.location}
                error={errors.location}
              />
              {errors.location !== null && !errors.location && (
                <p className={`text-danger mt-2 mb-0 pl-4`}>
                  {"Please enter enter the field properly."}
                </p>
              )}
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <InputElement
                label={`Department / Entity`}
                mandatory={false}
                placeholder={`Enter Department / Entity`}
                name="department"
                disabled={loading}
                onChange={handleInputChange}
                value={inputs.department}
                error={null}
              />
            </Col>
            <Col span={12}></Col>
            {/* For large screen size */}
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
                      onCancelHandler(
                        setVisiblety,
                        setErrors,
                        setInputs,
                        setRegisterDone,
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
                      setVisiblety(true);
                      handleSubmit();
                    }}
                  />
                </div>
              </div>
            </Col>
            {/* For small screen size */}
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
                      onCancelHandler(
                        setVisiblety,
                        setErrors,
                        setInputs,
                        setRegisterDone,
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
                      setVisiblety(true);
                      handleSubmit();
                    }}
                  />
                </div>
              </div>
            </Col>
          </>
        )}
      </Row>
    </Modal>
  );
}
