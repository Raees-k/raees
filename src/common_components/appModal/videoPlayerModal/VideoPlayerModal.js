import { Modal, Row, Col } from "antd";
import ReactPlayer from "react-player";
// css
import styles from "./video-player-modal.module.sass";

export default function VideoPlayerModal({
  url,
  setVisiblety,
  visible,
  play,
  setPlay,
  setAutoPlay,
}) {
  return (
    <Modal
      centered
      onCancel={() => {
        setPlay(false);
        setAutoPlay(true);
        setVisiblety(false);
      }}
      open={visible}
      closable={false}
      footer={null}
      width={1200}
      bodyStyle={{ padding: "0", height: "80vh" }}
      wrapClassName={`${styles.video_modal}`}
    >
      <Row>
        <Col span={24}>
          <div className={`${styles.video_player}`}>
            <ReactPlayer
              url={url}
              width={"100%"}
              height={`80vh`}
              volume={play ? 1 : 0}
              controls={true}
              playing={play}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  );
}
