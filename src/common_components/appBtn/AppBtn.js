import { Button } from "antd";
import { useHistory } from "react-router-dom";
//css
import styles from "./app-btn.module.sass";

export default function AppBtn({ text, prefix, suffix, mode, href, onClick }) {
  const history = useHistory();

  return (
    <Button
      className={`my-4 ${styles.app_btn} ${
        mode === "dark" ? styles.app_btn_dark : styles.app_btn_light
      }`}
      onClick={
        href && typeof href === "string" && href.length > 0
          ? () => history.push(href)
          : () => onClick()
      }
    >
      <span className={`d-flex justify-content-center`}>
        {prefix} {text} {suffix}
      </span>
    </Button>
  );
}
