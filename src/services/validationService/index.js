import { CONST } from "../../constant";

export const emailValidator = value => {
  if (CONST.REGEX.EMAIL.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const phoneNumberValidator = value => {
  if (
    CONST.REGEX.PHONENUMBER.test(value) ||
    (typeof value === "string" && value.length === 0)
  ) {
    return true;
  } else {
    return false;
  }
};

export const firstNameValidator = value => {
  if (
    value &&
    value.length > 2 &&
    CONST.REGEX.ALL_ALBHABET.test(value.trim())
  ) {
    return true;
  } else {
    return false;
  }
};

export const textAreaValidator = value => {
  if (value && value.length > 2) {
    return true;
  } else {
    return false;
  }
};

export const lastNameValidator = value => {
  if (value && CONST.REGEX.ALL_ALBHABET.test(value.trim())) {
    return true;
  } else {
    return false;
  }
};

export const dropDownValidator = value => {
  if (value && value.length !== 0) {
    return true;
  } else {
    return false;
  }
};
