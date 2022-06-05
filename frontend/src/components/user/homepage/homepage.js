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

const Homepage = ({ setLoginUser }) => {
  return (
    <div>
      <AppBar style={{
          borderBottomRightRadius: "20px",
          borderBottomLeftRadius: "20px",
        }} position="static">
        <Toolbar>
        <img src={Logo} alt="" srcset="" />
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
            onClick={() => setLoginUser()}
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
        <hr />
        <section className = "posts" id="posts">
          <Post />
        </section>
      </div>
    </div>
  );
};

export default Homepage;
