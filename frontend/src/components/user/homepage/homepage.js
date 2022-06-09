/* eslint-disable no-unused-vars */
import React from "react";
import "./homepage.css";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Calendar from "../calendar/Calendar";
import Post from "../posts/Post";
import Logo from "../../../assets/booking.gif";
import { ReactSession } from 'react-client-session';
import { useHistory } from "react-router-dom";

const Homepage = ({ setLoginUser }) => {
  const history = useHistory();

  const logOut = () => {
    console.log("inside logout")
    ReactSession.setStoreType("localStorage");
    ReactSession.remove("userFromStorage");
    history.go('./login')
  }

  return (
    <div>
      <AppBar style={{
          borderBottomRightRadius: "20px",
          borderBottomLeftRadius: "20px",
        }} position="static">
        <Toolbar>
        <img src={Logo} alt="logo"  />
          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
            }}
          >
            Booking App
          </Typography>
          <Button
            color="inherit"
            className="button"
            href = "#posts"
          >
            Appointments
          </Button>
          <Button
            color="inherit"
            className="button"
            onClick={() => logOut()}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div className="body">
        <div className="homepage">
          <Calendar />
        </div>
        <br /><br /><br />
        <hr class="hr-15"/>
        <section className = "posts" id="posts">
          <Post />
        </section>
      </div>
    </div>
  );
};

export default Homepage;
