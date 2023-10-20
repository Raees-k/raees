import { Dropdown, Button } from "antd";
//css
import styles from "./app-rounded-btn.module.sass";

let menu;

function setDropDownData(dropDownData) {
  menu = dropDownData;
}

function getBtnStyle(bg, outline) {
  if (bg.toLowerCase() === "none" && outline.toLowerCase() === "lite") {
    return styles.btn_none_lite;
  }
  if (bg.toLowerCase() === "white" && outline.toLowerCase() === "dark") {
    return styles.btn_white_dark;
  }
  if (bg.toLowerCase() === "blue" && outline.toLowerCase() === "dark") {
    return styles.btn_blue_dark;
  }
  if (bg.toLowerCase() === "yellow" && outline.toLowerCase() === "none") {
    return styles.btn_yellow_none;
  }
  return "";
}

export default function AppRoundedBtn({
  text,
  prefix,
  suffix,
  bg,
  outline,
  long,
  href,
  onClickHandler,
  btnStyle,
  dropDown,
  dropDownData,
  disabled,
}) {
  const btnCls = getBtnStyle(bg, outline);
  setDropDownData(dropDownData);

  return (
    <>
      {dropDown ? (
        <Dropdown overlay={menu} placement="bottomRight" trigger="hover">
          <Button
            type="text"
            shape="round"
            size={"large"}
            style={btnStyle}
            className={`${btnCls} ${long ? "px-5" : ""}`}
          >
            <span className={`d-flex justify-content-center`}>
              {prefix} {text} {suffix}
            </span>
          </Button>
        </Dropdown>
      ) : (
        <Button
          disabled={disabled}
          type={disabled ? "primary" : "text"}
          shape="round"
          size={"large"}
          style={btnStyle}
          className={`${btnCls} ${long ? "px-5" : ""}`}
          onClick={
            href !== "none" ? () => window.open(href, "_blank") : onClickHandler
          }
        >
          <span className={`d-flex justify-content-center`}>
            {prefix} {text} {suffix}
          </span>
        </Button>
      )}
    </>
  );
}
