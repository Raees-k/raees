import { Col, Row } from "antd";
// Components
import ContactForm from "../contactForm/ContactForm";
import ContactDetails from "../contactDetails/ContactDetails";
import ContactMap from "../contactMap/ContactMap";

export default function ContactUsSection({ socialMediaIcon }) {
  return (
    <>
      <Row className={`h-100`}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div
            className={`d-flex justify-content-center align-items-center flex-column`}
          >
            <ContactForm />
            <ContactDetails />
            <ContactMap />
          </div>
        </Col>
      </Row>
    </>
  );
}
