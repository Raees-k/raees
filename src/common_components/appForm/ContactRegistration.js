import { useState } from "react";
import axios from "axios";

import { CONST } from "../../constant/index";
import getDigest from "../../services/GetDigest/GetDigest";

// Validator
import {
  emailValidator,
  firstNameValidator,
  textAreaValidator,
  phoneNumberValidator,
} from "../../services/validationService";

export default function UseContactForm(
  fromObject,
  errorObj,
  setLoaderTime,
  setRegisterDone
) {
  //State Setting
  const [inputs, setInputs] = useState(fromObject);
  const [errors, setErrors] = useState(errorObj);
  // Submit Handling
  const handleSubmit = async (inputs) => {
    let errorObject = {};
    Object.keys(inputs).forEach((input) => {
      let error = validator(input, inputs[input]);
      if (error !== undefined) errorObject[input] = error;
      setErrors((err) => ({
        ...err,
        [input]: error,
      }));
    });
    console.log("errorObject-------->", errorObject);

    if (
      Object.values(errorObject).filter((err) => err === false).length === 0
    ) {
      let resp = await getDigest();
      setLoaderTime(true);

      const url = CONST.BASE_URL + CONST.API.LIST("Contact");
      const stringifyPostData = JSON.stringify({
        __metadata: {
          type: "SP.Data.ContactListItem",
        },
        Title: inputs.firstName,
        LastName: inputs.lastName,
        Email: inputs.email,
        Phone: inputs.phoneNumber,
        Message: inputs.textarea,
      });
      const configAxios = {
        headers: {
          accept: "application/json;odata=verbose",
          "content-type": "application/json;odata=verbose",
          "X-RequestDigest": resp,
          "X-HTTP-Method": "POST",
          "IF-MATCH": "*",
        },
      };

      axios
        .post(url, stringifyPostData, configAxios)
        .then((r) => {
          setLoaderTime(false);
          console.log("Success");
          setRegisterDone(true);
          setInputs(fromObject);
          setErrors(errorObj);
        })
        .catch((err) => {
          setLoaderTime(false);
          console.log("err==>", err);
          alert("Oops! Something went wrong.");
        });
    }

    // setTimeout(() => {
    //   setLoaderTime(false);
    // }, 3000);
  };

  // Validator Function
  const validator = (name, value) => {
    switch (name) {
      case "firstName":
        return firstNameValidator(value);
      case "email":
        return emailValidator(value);
      case "textarea":
        return textAreaValidator(value);
      case "phoneNumber":
        return phoneNumberValidator(value);
      default: // do nothing;
        break;
    }
  };

  // Input Change Handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let error = validator(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    errors,
    setErrors,
    setInputs,
  };
}
