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
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useHistory } from "react-router-dom";


const Calendar = () => {
  const history = useHistory();
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

  const [reason, setReason] = useState("");
  const [room, setValue] = useState("Conference 1");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [urgency, setUrgency] = React.useState('Urgent');
  const [notes, setNotes] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleUrgencyChange = (event) => {
    setUrgency(event.target.value);
  };

  const savePost = () => {
    axios
      .post("http://localhost:5000/posts", {
        reason: reason,
        room: room,
        date: date,
        time: time,
        urgency: urgency,
        notes: notes,
        status: "submitted"
      })
      .then((res) => {
        alert(res.data.message);
        history.push('/')
      });
  };

  return (
    <>
      <div className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          select={handleSelect}
          validRange={{
            start: new Date(),
            end: null,
          }}
          events={[
            { title: 'event 1', date: '2022-06-08' },
            { title: 'event 2', date: '2022-06-09' }
          ]}
        />
      </div>
      <Modal
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
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
              }}
              variant="outlined"
            />
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Room
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={room}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Conference 1"
                  control={<Radio />}
                  label="Conference 1"
                />
                <FormControlLabel
                  value="Conference 2"
                  control={<Radio />}
                  label="Conference 2"
                />
                <FormControlLabel
                  value="Conference 3"
                  control={<Radio />}
                  label="Conference 3"
                />
              </RadioGroup>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={date}
                minDate = {new Date()}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Time"
                value={time}
                onChange={(newValue) => {
                  setTime(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Urgency
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={urgency}
                onChange={handleUrgencyChange}
              >
                <FormControlLabel
                  value="Very urgent"
                  control={<Radio />}
                  label="Very Urgent"
                />
                <FormControlLabel
                  value="Urgent"
                  control={<Radio />}
                  label="Urgent"
                />
                <FormControlLabel
                  value="Less urgent"
                  control={<Radio />}
                  label="Less Urgent"
                />
              </RadioGroup>
            </FormControl>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Notes"
              onChange={(e) => {
                setNotes(e.target.value);
              }}
              value={notes}
              minRows={4}
              style={{ width: 450 }}
            /> 
          </Box>
          <div className="logout" onClick={savePost}>
            Post
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Calendar;
