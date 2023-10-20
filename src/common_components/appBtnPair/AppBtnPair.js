import { Button } from "antd";
// css
import styles from "./app-btn-pair.module.sass";

export default function AppBtnPair({
  prevBtn,
  nextBtn,
  onClickPrev,
  onClickNext,
  page,
}) {
  return (
    <div>
      <Button
        type="text"
        className={`${
          prevBtn === "disable"
            ? page === "landing"
              ? styles.slider_btn_disable_landing
              : styles.slider_btn_disable_innerpages
            : page === "landing"
            ? styles.slider_btn_landing
            : styles.slider_btn_innerpages
        } mx-2`}
        icon={
          <i
            className={`fa fa-chevron-left ${
              prevBtn === "disable"
                ? page === "landing"
                  ? styles.slider_btn_icon_disable_landing
                  : styles.slider_btn_icon_disable_innerpages
                : page === "landing"
                ? styles.slider_btn_icon_landing
                : styles.slider_btn_icon_innerpages
            }`}
            aria-hidden="true"
          ></i>
        }
        onClick={onClickPrev}
      />
      <Button
        type="text"
        className={`${
          nextBtn === "disable"
            ? page === "landing"
              ? styles.slider_btn_disable_landing
              : styles.slider_btn_disable_innerpages
            : page === "landing"
            ? styles.slider_btn_landing
            : styles.slider_btn_innerpages
        } mx-2`}
        icon={
          <i
            className={`fa fa-chevron-right ${
              nextBtn === "disable"
                ? page === "landing"
                  ? styles.slider_btn_icon_disable_landing
                  : styles.slider_btn_icon_disable_innerpages
                : page === "landing"
                ? styles.slider_btn_icon_landing
                : styles.slider_btn_icon_innerpages
            }`}
            aria-hidden="true"
          ></i>
        }
        onClick={onClickNext}
      />
    </div>
  );
}
