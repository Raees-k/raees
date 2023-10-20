import { useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import AppRoundedBtn from "../../common_components/appRoundedBtn/AppRoundedBtn";
//css
import styles from "./search.module.sass";

export default function SearchCard({ cardData, type }) {
  const history = useHistory();
  //process.env.BASE_URL +
  //const [eventId, setEventId] = useState("");
  console.log("cardData", cardData);
  return (
    <>
      <div className={`${styles.buysell_card} my-2`}>
        <div className={`${styles.buysell_mainImgConatiner}`}>
          <h6 className={`${styles.title_text} text-capitalize p-3`}>
            {cardData?.Type?.split("-")?.join(" & ")}
          </h6>

          <h2 className={`${styles.title_text} px-4`}>{cardData?.Title}</h2>
        </div>
        <div className={"p-4"}>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className={`${styles.buysell_text}`}>
                {cardData?.Description}
              </div>
            </Col>
            <div
              className={`${styles.button} d-flex h-100 align-items-center w-100 justify-content-center mt-4`}
            >
              <AppRoundedBtn
                text={"View"}
                suffix={""}
                bg={"blue"}
                outline={"dark"}
                long={false}
                href={"none"}
                onClickHandler={(e) => {
                  // history.push(
                  //   `${cardData?.Type}/${cardData?.SharePoint_path}`
                  // );

                  history.push(
                    type === "events"
                      ? `/${type}/${cardData.Id}`
                      : type === "news"
                      ? `/news-publications/${cardData.Id}`
                      : type === "activities"
                      ? `/activities/${cardData.Title.toLowerCase()
                          .split(" ")
                          .join("-")}`
                      : ""
                  );
                }}
              />
            </div>
          </Row>
        </div>
      </div>
    </>
  );
}
