// import "./App.css";
import { Table } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

function TableDemo() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "reason",
    },
    {
      title: "Name",
      dataIndex: "room",
    },
    {
      title: "Trips",
      dataIndex: "notes",
    },
  ];

  const fetchRecords = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/getposts`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setDataSource(res.data.data);
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
      ></Table>
    </div>
  );
}

export default TableDemo