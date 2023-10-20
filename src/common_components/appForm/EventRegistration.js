import { useState } from "react";
import axios from "axios";

import getDigest from "../../services/GetDigest/GetDigest";
//constant
import { CONST } from "../../constant";
// Validator
import {
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  dropDownValidator,
  phoneNumberValidator,
} from "../../services/validationService";

const UseForm = (
  initialValues,
  errorObj,
  setLoaderTime,
  setRegisterDone,
  eventId
) => {
  //State Setting
  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState(errorObj);

  // Submit Handling
  const handleSubmit = async () => {
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
      const url = CONST.BASE_URL + CONST.API.LIST("EventRegistration");
      const stringifyPostData = JSON.stringify({
        __metadata: {
          type: "SP.Data.EventRegistrationListItem",
        },
        Title: inputs.firstName,
        LastName: inputs.lastName,
        Gender: inputs.gender,
        UserType: inputs.user,
        EmployeeID: inputs.employeeId,
        Location: inputs.location,
        DepartmentEntity: inputs.department,
        Email: inputs.email,
        Phone: inputs.phoneNumber,
        EventId: eventId.toString(),
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
          // alert(`Success ${response.Email}`);
          setRegisterDone(true);
          setInputs(initialValues);
          setErrors(errorObj);
        })
        .catch((err) => {
          setLoaderTime(false);
          console.log("err==>", err);
          alert("Oops! Something went wrong.");
        });
    }
  };

  // Validator Function
  const validator = (name, value) => {
    switch (name) {
      case "firstName":
        return firstNameValidator(value);
      case "lastName":
        return lastNameValidator(value);
      case "email":
        return emailValidator(value);
      case "user":
        return dropDownValidator(value);
      case "location":
        return firstNameValidator(value);
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

  // Gender Handling
  const handleGender = (e) => {
    setInputs((inputs) => ({
      ...inputs,
      ["gender"]: e,
    }));
  };

  // User Handling
  const handleUser = (e) => {
    let error = validator("user", e);
    setErrors({
      ...errors,
      ["user"]: error,
    });
    setInputs((inputs) => ({
      ...inputs,
      ["user"]: e,
    }));
  };

  return {
    handleSubmit,
    handleInputChange,
    handleUser,
    handleGender,
    inputs,
    errors,
    setErrors,
    setInputs,
  };
};

export default UseForm;
