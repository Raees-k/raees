import { useContext } from "react";
import { useHistory } from "react-router-dom";

// Context
import { AppContext } from "../../App";
// ANT
import { Row, Col, Tag } from "antd";
import { Scrollbars } from "react-custom-scrollbars";

//service
import { setBackground } from "../../services/eventService";
//css
import styles from "./calendar.module.sass";

export default function EventViewer({ displayEvent, selectedDay }) {
  // console.log("displayEvent Calendar", displayEvent);
  const { services } = useContext(AppContext);
  const history = useHistory();

  return (
    <Row>
      <Col span={24}>
        <p className={`my-4 mx-auto ${styles.day}`}>{selectedDay}</p>
        <Scrollbars style={{ width: "100%", height: "700px" }}>
          <div className={`d-flex flex-column`}>
            {displayEvent && displayEvent.length > 0 ? (
              displayEvent.map(event => {
                return (
                  <Tag
                    className={`mx-auto my-4 ${styles.tag}`}
                    color={`${setBackground(event, services)[0]}`}
                  >
                    <p
                      onClick={() => history.push(`/events/${event.id}`)}
                      style={{ cursor: "pointer" }}
                      className={`m-0 py-3`}
                    >
                      {event.Title}
                    </p>
                  </Tag>
                );
              })
            ) : (
              <p className={`w-75 m-auto text-primary font-weight-bold`}>
                Select a Date to View Event
              </p>
            )}
          </div>
        </Scrollbars>
      </Col>
    </Row>
  );
}
