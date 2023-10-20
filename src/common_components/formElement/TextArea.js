import { Row, Col, Input } from "antd";
//css
import styles from "./form-element.module.sass";

const { TextArea } = Input;

export default function TextAreaElement({
  label,
  mandatory,
  placeholder,
  onChange,
  name,
  value,
  error,
  disabled,
}) {
  return (
    <Row>
      <Col span={24}>
        <label className={`${styles.label}`}>
          {label}
          {mandatory && <span className={`text-danger mx-2`}>*</span>}
        </label>
      </Col>
      <Col span={24}>
        <div
          className={`${styles.text_container} ${
            error === null ? "" : !error ? "border border-danger" : ""
          }`}
        >
          <TextArea
            placeholder={placeholder}
            bordered={false}
            name={name}
            value={value}
            onChange={onChange}
            size={`large`}
            disabled={disabled}
            className={`${styles.input}`}
            rows={4}
          />
        </div>
      </Col>
    </Row>
  );
}
