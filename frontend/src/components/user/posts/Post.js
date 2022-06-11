import './Post.css'
import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import moment from 'moment'
import { NavLink } from 'react-router-dom';
import axios from 'axios';


const Post = () => {
  const [getuserdata, setUserdata] = useState([]);
//   const [post, setPost] = useState(0)
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

  const deletePost = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`)
  }


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
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Notes</th>
              <th scope="col">Status</th>
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
                    <td> {moment(value.date).format("MM/DD/YYYY")}  </td>
                    <td> {moment(value.time).format("HH:MM")}  </td>
                    <td> {value.notes} </td>
                    <td> {value.status} </td>
                    <td className="d-flex justify-content-between">
                    <NavLink to={`post/${value._id}`}>  <button className="btn btn-primary"><CreateIcon /></button></NavLink>
                      <button
                        className="btn btn-danger" onClick={() =>deletePost(value._id)}
                      >
                        <DeleteOutlineIcon />
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

export default Post;
