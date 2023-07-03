import React from "react";
import { Table } from "antd";

const Response = ({ survey }) => {
  const dataSource = survey.response;
  const columns = [
    {
      title: "QUESTION",
      dataIndex: "question",
      key: "Question",
    },
    {
      title: "ANSWER",
      dataIndex: "answer",
      key: "Answer",
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "Date",
    },
  ];
  return <Table dataSource={dataSource} columns={columns}/>
};

export default Response;
