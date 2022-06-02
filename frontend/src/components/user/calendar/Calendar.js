import React, { useState } from "react";
import { Modal, Form } from "antd";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Calendar.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


const Calendar = () => {
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSelect = (info) => {
    showModal();
    console.log(info);
  };

  const [post, setPosts] = useState({
    reason: "",
    room: "",
    urgency: "",
    notes: "",
    date: "",
    time: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPosts({
      ...post,
      [name]: value,
    });
  };

  const register = () => {
    const { reason, room, notes, urgency } = post;
    if (reason && room && notes && urgency) {
      axios.post("http://localhost:9002/posts", post).then((res) => {
        alert(res.data.message);
      });
    } else {
      alert("invalid input");
    }
  };

  

  return (
    <>
     <div className="calendar">
     <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={handleSelect}
      />
     </div>
      <Modal
        onEn
        title="Enter the following details for room booking"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "60ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              type="text"
              id="outlined-basic"
              label="Reason"
              name="reason"
              value={post.reason}
              onChange={handleChange}
              variant="outlined"
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Room</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Conference Hall 1"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Conference Hall 1"
                  control={<Radio />}
                  name="room"
                  onChange={handleChange}
                  label="Conference Hall 1"
                  onc
                />
                <FormControlLabel
                  value="Conference Hall 2"
                  control={<Radio />}
                  name="room"
                  onChange={handleChange}
                  label="Conference Hall 2"
                />
                <FormControlLabel
                  value="Conference Hall 3"
                  control={<Radio />}
                  name="room"
                  onChange={handleChange}
                  label="Conference Hall 3"
                />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Urgency Required
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Very Urgent"
                  onChange={handleChange}
                  control={<Radio />}
                  name="urgency"
                  label="Very Urgent"
                />
                <FormControlLabel
                  value="Urgent"
                  name="urgency"
                  onChange={handleChange}
                  control={<Radio />}
                  label="Urgent"
                />
                <FormControlLabel
                  value="Lest Urgent"
                  name="urgency"
                  onChange={handleChange}
                  control={<Radio />}
                  label="Lest Urgent"
                />
              </RadioGroup>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                name="dateTime"
                minDate={new Date()}
                renderInput={(props) => <TextField {...props} />}
                label="Date"
                value={post}
                onChange={(handleChange) => {
                  setPosts(handleChange);
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Time"
                value={post}
                onChange={(handleChange) => {
                  setPosts(handleChange);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Notes"
              name="notes"
              onChange={handleChange}
              value={post.notes}
              style={{ width: 450 }}
            />
          </Box>
          <div className="logout" onClick={register}>
            
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Calendar;
