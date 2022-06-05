import React, { useEffect, useState } from "react";

const TableDetails = () => {
  const [getuserdata, setUserdata] = useState([]);
  const getdata = async () => {
    const res = await fetch("http://localhost:9002/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setUserdata(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="table-container">
      <div className="contains">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Reason</th>
              <th scope="col">Room Booked</th>
              <th scope="col">Urgency Level</th>
              <th scope="col">Comments</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getuserdata.map((value, key) => {
              return (
                <>
                  <tr>
                    <th scope="row"> {key + 1} </th>
                    <td> {value.reason} </td>
                    <td> {value.room} </td>
                    <td> {value.urgency} </td>
                    <td> {value.notes} </td>
                    <td className="d-flex justify-content-between">
                        <button className="btn btn-success">
                          Accept
                        </button>
                        <button className="btn btn-primary">
                            Decline
                        </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDetails;
