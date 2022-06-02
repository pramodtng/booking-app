import React, {useState} from "react";
import "./Login.css";
import axios from "axios";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Logo from "../../../assets/booking.gif";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useHistory } from "react-router-dom";


const AdminLogin = () => {
  const history = useHistory();
  const [admin, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...admin,
      [name]: value,
    });
  };

  const loginAdmin = () => {
    axios.post("http://localhost:9002/adminlogin", admin).then((res) => {
      alert(res.data.message);
      // setAdminLoginUser(res.data.admin);
      history.push("/admindashboard");
    });
  };
  return (
    <div>
      <AppBar style={{
          borderBottomRightRadius: "20px",
          borderBottomLeftRadius: "20px",
        }} position="static">
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
            onClick={() => history.push("/login")}
          >
            User
          </Button>
        </Toolbar>
      </AppBar>
      <div className="container">
        <div className="login">
          <h1>Login</h1>
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
              label="Username"
              variant="outlined"
              type="text"
              name="username"
              value={admin.username}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={admin.password}
              onChange={handleChange}
            />
            <div className="buttons">  
            <Stack spacing={6} direction="row">
              <Button color="primary" variant="contained" onClick={loginAdmin}>
                Login
              </Button>
            </Stack>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
