import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

const Date = ({ disabled, handleAnswer, answer, setError }) => {
  return (
    <div className="date">
      <DatePicker
        onFocus={() => setError("")}
        disabled={disabled}
        onChange={(date) => handleAnswer(date.format("DD-MM-YYYY"))}
      />
    </div>
  );
};

export default Date;
