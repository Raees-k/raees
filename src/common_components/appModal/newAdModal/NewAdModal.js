import { useState, useEffect } from "react";
import { Modal, Row, Col } from "antd";
import $ from "jquery";
import axios from "axios";
import { CheckCircleOutlined } from "@ant-design/icons";
import { CONST } from "../../../constant/index";

// Common Components
import AppRoundedBtn from "../../appRoundedBtn/AppRoundedBtn";
import InputElement from "../../formElement/Input";
import DropdownElement from "../../formElement/Dropdown";
import useForm from "../../appForm/NewAd";
import ImageUpload from "../../formElement/Imageupload";
import TextArea from "../../formElement/TextArea";

// css
import styles from "./new-ad.module.sass";

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
  setInputs(fromObject);
  setErrors(errorObj);
  setRegisterDone(false);
}

export default function NewAdModal({
  visible,
  setVisiblety,
  citems,
  setSelectedCategory,
  subitems,
  selectedCategory,
  setCallApi,
  callApi,
}) {
  console.log(
    "newAdModal",
    visible,
    setVisiblety,
    citems,
    setSelectedCategory,
    subitems,
    selectedCategory,
    setCallApi,
    callApi
  );
  const [loading, setLoaderTime] = useState(false);
  const [registerDone, setRegisterDone] = useState(false);
  // Form Initial Objects
  const fromObject = {
    category: [],
    subcategory: [],
    adTitle: "",
    brand: "",
    price: "",
    country: "",
    city: "",
    email: "",
    phone: "",
    description: "",
  };
  // Error Initial Object
  const errorObj = {
    email: null,
    category: null,
    adTitle: null,
    phone: null,
    subcategory: null,
  };
  const [itemId, setItemId] = useState(null);

  const {
    handleSubmit,
    handleInputChange,
    handleCategory,
    handleSubCategory,
    inputs,
    errors,
    setErrors,
    setInputs,
  } = useForm(fromObject, errorObj, setLoaderTime, setRegisterDone, itemId);

  setSelectedCategory(inputs?.category);

  useEffect(() => {
    if (visible) {
      const url = CONST.BASE_URL + CONST.API.LIST("Advertisement");
      const stringifyPostData = JSON.stringify({
        __metadata: {
          type: "SP.Data.AdvertisementListItem",
        },
        Title: "",
        Description: "",
        Price: "",
        Brand: "",
        Email: "",
        Country: "",
        City: "",
        Category: "",
        SubCategory: "",
        Phone: "",
        Author0: "",
        AuthorImage: "",
        status: "draft",
      });
      const configAxios = {
        headers: {
          accept: "application/json;odata=verbose",
          "content-type": "application/json;odata=verbose",
          "X-RequestDigest": $("#__REQUESTDIGEST").val(),
          "X-HTTP-Method": "POST",
          "IF-MATCH": "*",
        },
      };

      axios
        .post(url, stringifyPostData, configAxios)
        .then((r) => {
          // console.log("Id===", r.data.d.Id);
          setItemId(r.data.d.Id);
        })
        .catch((err) => {});
    }
  }, [visible]);
  console.log("errors", errors);
  return (
    <Modal
      centered
      onCancel={() => {
        setVisiblety(false);
        setInputs(fromObject);
        setErrors(errorObj);
        setRegisterDone(false);
      }}
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
                onClickHandler={() => {
                  onCancelHandler(
                    setVisiblety,
                    setErrors,
                    setInputs,
                    setRegisterDone,
                    fromObject,
                    errorObj
                  );
                  setCallApi(!callApi);
                }}
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
              <h3 className={`${styles.modal_title}`}>Post Your Ad</h3>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <DropdownElement
                label={`Category`}
                mandatory={true}
                placeholder={`Select`}
                options={citems}
                onChange={handleCategory}
                name="category"
                disabled={loading}
                value={inputs.category}
                error={errors.category}
              />
              {errors.category !== null && !errors.category && (
                <p className={`text-danger mt-2 mb-0 pl-4`}>
                  {"Please enter Category."}
                </p>
              )}
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <DropdownElement
                label={`Sub Category`}
                mandatory={
                  typeof selectedCategory === "string"
                    ? selectedCategory.toLowerCase() === "others"
                      ? false
                      : true
                    : true
                }
                placeholder={`Select`}
                options={subitems}
                onChange={handleSubCategory}
                name="subcategory"
                disabled={
                  typeof selectedCategory === "string"
                    ? selectedCategory.toLowerCase() === "others"
                      ? true
                      : loading
                    : loading
                }
                value={inputs.subcategory}
                error={null}
              />
              {errors.subcategory !== null && !errors.subcategory && (
                <p className={`text-danger mt-2 mb-0 pl-4`}>
                  {"Please enter Subcategory."}
                </p>
              )}
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <InputElement
                label={`Ad Title`}
                mandatory={true}
                placeholder={`Enter Ad Title`}
                name="adTitle"
                disabled={loading}
                onChange={handleInputChange}
                value={inputs.adTitle}
                error={errors.adTitle}
              />
              {errors.adTitle !== null && !errors.adTitle && (
                <p className={`text-danger mt-2 mb-0 pl-4`}>
                  {"Please enter a title."}
                </p>
              )}
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <InputElement
                label={`Brand`}
                mandatory={false}
                placeholder={`Enter Brand`}
                name="brand"
                disabled={loading}
                onChange={handleInputChange}
                value={inputs.brand}
                error={null}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <InputElement
                label={`Expected Price`}
                mandatory={false}
                placeholder={`Enter Price`}
                name="price"
                disabled={loading}
                onChange={handleInputChange}
                value={inputs.price}
                error={null}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <InputElement
                label={`Country`}
                mandatory={false}
                placeholder={`Enter Country`}
                onChange={handleInputChange}
                name="country"
                disabled={loading}
                value={inputs.country}
                error={null}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <InputElement
                label={`City`}
                mandatory={false}
                placeholder={`Enter City`}
                name="city"
                disabled={loading}
                onChange={handleInputChange}
                value={inputs.city}
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
                name="phone"
                disabled={loading}
                onChange={handleInputChange}
                value={inputs.phone}
                error={errors.phone}
              />
              {errors.phone !== null && !errors.phone && (
                <p className={`text-danger mt-2 mb-0 pl-4`}>
                  {
                    "Enter a valid phone number or try adding your country code."
                  }
                </p>
              )}
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <TextArea
                label={`Description`}
                mandatory={false}
                placeholder={`Enter Description`}
                name="description"
                disabled={loading}
                onChange={handleInputChange}
                value={inputs.description}
                error={null}
              />
            </Col>
            <Col span={24}>
              <ImageUpload
                itemId={itemId}
                listName={"Advertisement"}
                setLoaderTime={setLoaderTime}
              />
            </Col>
            {/* For large screen */}
            <Col xs={0} sm={0} md={24} lg={24} xl={24}>
              <div className={`d-flex justify-content-end`}>
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
                    onClickHandler={() => {
                      onCancelHandler(
                        setVisiblety,
                        setErrors,
                        setInputs,
                        setRegisterDone,
                        fromObject,
                        errorObj
                      );
                    }}
                  />
                </div>
                <div className={`mx-3`}>
                  <AppRoundedBtn
                    text={"Post Ad"}
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
            {/* For small screen */}
            <Col xs={24} sm={24} md={0} lg={0} xl={0}>
              <div className={`d-flex justify-content-center`}>
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
            <Col xs={24} sm={24} md={0} lg={0} xl={0}>
              <div className={`d-flex justify-content-center mt-3`}>
                <div className={`mx-3`}>
                  <AppRoundedBtn
                    text={"Post Ad"}
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
