import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import './Table.css'
const TableDetails= () => {
    const [post, setPost] = useState([])
    useEffect(() =>{
        Axios.get('http://localhost:9002/posts').then((response) =>{
            setPost(response.data);
        })
    },[])
    return (
        <div className="table-container">
         <div className="contains">
         <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">SI.No</th>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Room Booked</th>
                    <th scope="col">Time</th>
                    <th scope="col">Date</th>
                    <th scope="col">Urgency Level</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
              {
                  post.map((value, key) =>{
                      return(
                          <><td> {value.id} </td><td> {value.room} </td></>
                      )
                  })
              }
            </tbody>
        </table>
         </div>
        </div>
    )
}

export default TableDetails;
