import { Col, Row } from "antd";
import GoogleMapReact from "google-map-react";
import styles from "./contact-map.module.sass";
import { CONST } from "../../../constant/index";

export default function ContactMap() {
  const location = {
    address: "",
    lat: 21.475867102388687,
    lng: 39.201798383801005,
  };
  const LocationPin = ({ text }) => (
    <div className={``}>
      <i className="fa fa-map-marker fa-4x text-danger" aria-hidden="true"></i>

      <p className={``}>{text}</p>
    </div>
  );
  return (
    <>
      <div></div>
      <div className={`${styles.contact_map_container}`}>
        <Row className={`mt-5`}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Row>
              <Col span={24}>
                <div
                  className={`d-flex justify-content-start align-items-start flex-column`}
                >
                  <div className={`mb-4 ${styles.contact_map_title}`}>
                    Come And Visit Us
                  </div>
                </div>
              </Col>
            </Row>

            <Row className={`mt-2`}>
              <Col span={24} className={`mb-3`}>
                <div
                  className={`d-flex justify-content-center align-items-center flex-column flex-column`}
                >
                  <div className={`${styles.map_container}`}>
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: `${CONST.GOOGLE_API_KEY}`,
                      }}
                      defaultCenter={location}
                      defaultZoom={17}
                    >
                      <LocationPin
                        lat={location.lat}
                        lng={location.lng}
                        text={location.address}
                      />
                    </GoogleMapReact>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}
