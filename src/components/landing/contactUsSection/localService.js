import axios from "axios";
//service
import { inpuChangeHandler } from "../../../services/inputService";
import { emailValidator } from "../../../services/validationService";
import getDigest from "../../../services/GetDigest/GetDigest";
//constant
import { CONST } from "../../../constant";

export const subscribeChangeHandler = (
  e,
  setEmailValidation,
  setEmailValue
) => {
  let value = inpuChangeHandler(e);
  setEmailValue(value);
  let isCorrectEmail = emailValidator(value);
  setEmailValidation(isCorrectEmail);
};

export const onClickSubscribeHandler = async (
  emailValue,
  setEmailValue,
  setEmailValidation,
  openNotification,
  openSuccessNotification
) => {
  let isCorrectEmail = emailValidator(emailValue);
  if (isCorrectEmail) {
    let resp = await getDigest();
    // let url = process.env.BASE_URL + process.env.PATH.NEWSLETTER;
    // let body = { NewsletterEmail: emailValue };
    const url = CONST.BASE_URL + CONST.API.LIST("Newsletter");
    const stringifyPostData = JSON.stringify({
      __metadata: {
        type: "SP.Data.NewsletterListItem",
      },
      Title: emailValue,
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
        openSuccessNotification({
          title: `Success ${r.data.d.Title}`,
          description: "We will update you at the latest",
        });
        setEmailValue("");
        setEmailValidation(0);
      })
      .catch((err) => {
        openNotification({
          title: "Sorry! Something went wrong.",
          description: "Can you please try it again.",
        });
      });
  } else
    openNotification({
      title: "Enter correct Email Address",
      description: "Formate : abc@xyz.com",
    });
};
