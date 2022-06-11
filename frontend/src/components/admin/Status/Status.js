import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {useHistory} from 'react-router-dom'

const Status = () => {
    const [action, setAction] = useState('');
    const history = useHistory();
    const handleChange = (event) => {
      setAction(event.target.value);
      history.push('/admindashboard')
    };
    const saveAction = () => {
      alert('Action has been posted')
    }


  return (
    <div className="container">
      <div className="login">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Action</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={action}
            label="Action"
            onChange={handleChange}
          >
            <MenuItem value="Accept">Accept</MenuItem>
            <MenuItem value="Decline">Decline</MenuItem>
          </Select>
        </FormControl>
        <button className="btn btn-primary" onClick={saveAction} >Submit</button>
      </Box>
      </div>
    </div>
  );
};

export default Status;
