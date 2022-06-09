import React, { useEffect, useState } from "react";
import moment from "moment";
// import axios from "axios";
import CreateIcon from '@mui/icons-material/Create';
import { NavLink } from 'react-router-dom';

const TableDetails = () => {
  const [getuserdata, setUserdata] = useState([]);



  const getdata = async () => {
    const res = await fetch("http://localhost:5000/getposts", {
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

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // const { status } = this.state;
  //   axios
  //     .post(
  //       "http://localhost:5000/update-status/" +
  //         this.props.match.params.id,
  //       {
  //         status: status,
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       // this.props.history.push("/");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const updateStatus = (id) => {
  //   const status = prompt('Status: ')
  //   axios.post("http://localhost:5000/update", {
  //     status: status,
  //     id: id
  //   }).then(() => {

  //   })
  // }
  return (
    <>
      <div className="table-container">
        <div className="contains">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Reason</th>
                <th scope="col">Room Booked</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Urgency Level</th>
                <th scope="col">Comments</th>
                <th scope="col">Post</th>
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
                      <td> {moment(value.date).format("MM/DD/YYYY")} </td>
                      <td> {moment(value.time).format("HH:MM")} </td>
                      <td> {value.urgency} </td>
                      <td> {value.notes} </td>
                      <td> {value.status} </td>
                      <td className="d-flex justify-content-around">
                      <NavLink to={`edit/${value._id}`}>  <button className="btn btn-primary"><CreateIcon /></button></NavLink>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableDetails;
