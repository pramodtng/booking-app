import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Logo from "../../../assets/booking.gif";
import Button from "@material-ui/core/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";

const Login = ({ setLoginUser }) => {
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios.post("http://localhost:9002/login", user).then((res) => {
      alert(res.data.message);
      setLoginUser(res.data.user);
      history.push("/");
    });
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
        <div className="login">
          <h4>Login</h4>
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
            <div className="buttons">  
            <Stack spacing={6} direction="row">
              <Button color="primary" variant="contained" onClick={login}>
                Login
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={() => history.push("/register")}
              >
                Register
              </Button>
            </Stack>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Login;
