import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Logo from '../../../assets/booking.gif';
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      axios.post("http://localhost:5000/register", user).then((res) => {
        alert(res.data.message);
        history.push("/login");
      });
    } else {
      alert("invlid input");
    }
  };

  return (
    <div>
      <AppBar
        position="static"
        style={{
          borderBottomRightRadius: "20px",
          borderBottomLeftRadius: "20px",
        }}
      >
        <Toolbar>
          <img src={Logo} alt="" srcset="" />
          <Typography
            variant="h5"
            style={{
              flexGrow: 1,
            }}
          >
            Booking App
          </Typography>
          <Button
            color="inherit"
            className="button"
            onClick={() => history.push("/adminlogin")}
          >
            Admin
          </Button>
        </Toolbar>
      </AppBar>
      <div className="container">
        <div className="register">
          {console.log("User", user)}
          <h4>Register</h4>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "42ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              name="reEnterPassword"
              value={user.reEnterPassword}
              onChange={handleChange}
            />
            <div className="buttons">
              <Stack spacing={6} direction="row">
                <Button color="primary" variant="contained" onClick={register}>
                  Register
                </Button>
              </Stack>
            </div>
            <p onClick={() => history.push('/login')}>Already Registered? Click Here</p>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Register;
