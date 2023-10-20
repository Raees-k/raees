import { Row, Col, DatePicker } from "antd";
import moment from "moment";
//css
import styles from "./form-element.module.sass";

// const { Option } = Select;
function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24),
    disabledMinutes: () => range(0, 60),
    disabledSeconds: () => range(0, 60),
  };
}

export default function DatePickerElement({
  label,
  mandatory,
  placeholder,
  onChange,
  value,
  name,
  error,
  disabled,
  style,
  labelLite,
  thickBorder,
}) {
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
          <DatePicker
            style={{ width: "100%" }}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            name={name}
            bordered={false}
            size={`large`}
            disabled={disabled}
            format={'DD/MM/YYYY'}
            showNow={false}
            disabledTime={disabledDateTime}
            showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
          />
        </div>
      </Col>
    </Row>
  );
}
