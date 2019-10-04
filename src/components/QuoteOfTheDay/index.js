import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const QuoteOfTheDay = ({ quoteOFDay }) => (
  <div
    className="quote_of_day"
    style={{
      background: "#ECECEC",
      textAlign: "center",
      padding: "30px"
    }}
  >
    <Title level={2}>Quote of the Day</Title>

    <div className="quote">{quoteOFDay}</div>
  </div>
);

export default QuoteOfTheDay;
