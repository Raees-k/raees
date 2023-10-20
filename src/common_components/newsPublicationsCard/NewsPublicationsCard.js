import { Button, Skeleton } from "antd";
import useInView from "react-cool-inview";
import { useHistory } from "react-router-dom";
//animation
import { fadeIn } from "react-animations";
import { StyleSheet, css } from "aphrodite";
//css
import styles from "./news-publications-card.module.sass";

const animationStyles = StyleSheet.create({
  fadeIn: {
    animationName: fadeIn,
    animationDuration: "2s",
  },
});

export default function NewsPublicationsCard({ data }) {
  const history = useHistory();

  const { observe, inView } = useInView({
    threshold: 0.25, // Default is 0
    onChange: ({ inView, scrollDirection, entry, observe, unobserve }) => {
      // Triggered whenever the target meets a threshold, e.g. [0.25, 0.5, ...]

      unobserve(); // To stop observing the current target element
      observe(); // To re-start observing the current target element
    },
    onEnter: ({ scrollDirection, entry, observe, unobserve }) => {
      // Triggered when the target enters the viewport
    },
    onLeave: ({ scrollDirection, entry, observe, unobserve }) => {
      // Triggered when the target leaves the viewport
    },
    // More useful options...
  });

  return (
    <div ref={observe} className={inView ? css(animationStyles.fadeIn) : ""}>
      <div className={`${styles.whats_new_card} p-4`}>
        <div
          className={`${styles.whats_new_card_image} d-flex justify-content-center align-items-center overflow-hidden position-relative mb-3`}
        >
          {data &&
          data.AttachmentFiles &&
          data.AttachmentFiles.length > 0 &&
          data.AttachmentFiles[0].ServerRelativeUrl ? (
            <img
              src={data?.AttachmentFiles[0]?.ServerRelativeUrl}
              alt="card-img"
              width="100%"
              // height="100%"
            />
          ) : (
            <Skeleton.Image className={`${styles.skeleton_Img}`} />
          )}
        </div>
        <div className={`${styles.whats_new_card_text}`}>
          <h3>{data && data.Title ? data.Title : <Skeleton.Input />}</h3>
          <div className={`${styles.news_des}`}>
            {data.Description ? data.Description : <Skeleton />}
          </div>
        </div>
        {data && data.Title ? (
          <Button
            className={`${styles.whats_new_card_btn}`}
            onClick={() => history.push(`/news-publications/${data.Id}`)}
          >
            <h6 className={`m-0`}>READ MORE</h6>
          </Button>
        ) : (
          <Skeleton.Button active />
        )}
      </div>
    </div>
  );
}
