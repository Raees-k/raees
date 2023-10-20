import { useState } from "react";
import { Skeleton } from "antd";
import moment from "moment";
import { useHistory } from "react-router-dom";
//component
import AppRoundedBtn from "../../common_components/appRoundedBtn/AppRoundedBtn";
import EventRegistrationModal from "../appModal/eventRegistrationModal/EventRegistrationModal";

//css
import styles from "./events-card.module.sass";

export default function EventsCard({ data, bg, bgImage, boxShadow, btn }) {
  const history = useHistory();
  const [eventRegistrationModal, setEventRegistrationModal] = useState(false);
  const [eventId, setEventId] = useState("");

  return (
    <>
      <div
        className={`${styles.event_card} p-4`}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundColor: bg,
          boxShadow: boxShadow,
        }}
        // onClick={(e) => {
        //   if (e.target.innerText !== "Register Now")
        //     router.push(`/events-activities/${data.id}`);
        // }}
      >
        <div
          className={`${styles.event_card_date} mb-5 py-1`}
          style={{ color: bg }}
        >
          {data && data.StartDate ? (
            <>
              <p className={`${styles.date} mt-2 mb-0`}>
                {moment(data.StartDate).format("D")}
              </p>

              <p className={`${styles.month} m-0`}>
                {moment(data.StartDate).format("MMMM")}
              </p>
            </>
          ) : (
            <div
              className={`d-flex justify-content-center align-items-center h-100`}
            >
              <Skeleton.Input active style={{ width: 100 }} />
            </div>
          )}
        </div>
        {data && data.Title ? (
          <h3 className={`${styles.event_title} pr-4 mb-4`}>{data.Title}</h3>
        ) : (
          <Skeleton.Input active style={{ width: 200 }} className={"mb-3"} />
        )}
        {data && data.StartDate ? (
          <p className={`${styles.event_time}`}>{`${moment(
            data.StartDate
          ).format("MMMM D")} - ${moment(data.EndDate).format("MMMM D")}`}</p>
        ) : (
          <Skeleton.Input active style={{ width: 180 }} className={"mb-5"} />
        )}

        <div className={`d-flex justify-content-center`}>
          {data && data.Title ? (
            btn && (
              <AppRoundedBtn
                text={"View More"}
                prefix={""}
                suffix={""}
                bg={"none"}
                outline={"lite"}
                long={false}
                href={"none"}
                btnStyle={{}}
                // onClickHandler={(e) => {
                //   setEventRegistrationModal(true);
                //   setEventId(data.id);
                // }}
                onClickHandler={(e) => {
                  history.push(`/events/${data.Id}`);
                }}
              />
            )
          ) : (
            <Skeleton.Button active />
          )}
        </div>
      </div>
      <EventRegistrationModal
        setVisiblety={setEventRegistrationModal}
        visible={eventRegistrationModal}
        eventId={eventId}
      />
    </>
  );
}
