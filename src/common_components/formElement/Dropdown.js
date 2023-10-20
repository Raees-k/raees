import { Row, Col, Select } from "antd";
//css
import styles from "./form-element.module.sass";

const { Option } = Select;

export default function DropdownElement({
  label,
  mandatory,
  placeholder,
  options,
  onChange,
  value,
  name,
  error,
  disabled,
  style,
  labelLite,
  thickBorder
}) {
  let children = [];
  if (options && options.length > 0) {
    options.forEach((option, i) => {
      children.push(
        <Option value={option} key={i.toString(36) + i}>
          {option}
        </Option>
      );
    });
  }
  return (
    <Row>
      <Col span={24}>
        <label className={`${!labelLite ? styles.label : styles.label_lite}`}>
          {label}
          {mandatory && <span className={`text-danger mx-2`}>*</span>}
        </label>
      </Col>
      <Col span={24}>
        <div
          style={style}
          className={`${
            !thickBorder
              ? styles.dropDown_container
              : styles.dropDown_container_thick_border
          } ${error === null ? "" : !error ? "border border-danger" : ""}`}
        >
          <Select
            style={{ width: "100%" }}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            name={name}
            bordered={false}
            size={`large`}
            disabled={disabled}
          >
            {children}
          </Select>
        </div>
      </Col>
    </Row>
  );
}
