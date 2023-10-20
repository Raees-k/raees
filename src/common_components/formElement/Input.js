import { Row, Col, Input } from "antd";
//css
import styles from "./form-element.module.sass";

export default function InputElement({
  label,
  mandatory,
  placeholder,
  onChange,
  name,
  value,
  error,
  disabled
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
          className={`${styles.input_container} ${
            error === null ? "" : !error ? "border border-danger" : ""
          }`}
        >
          <Input
            placeholder={placeholder}
            bordered={false}
            name={name}
            value={value}
            onChange={onChange}
            size={`large`}
            disabled={disabled}
            className={`${styles.input}`}
          />
        </div>
      </Col>
    </Row>
  );
}
