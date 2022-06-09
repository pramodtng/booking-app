import React from 'react';
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Logo from "../../../assets/booking.gif";
import TableDetails from '../Table/Table'


const Dashboard = () => {
    return (
        <><AppBar  style={{
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
          <Button color="inherit" className="button">Logout</Button>
        </Toolbar>
      </AppBar>
      <TableDetails />
      {/* <TabledDemo /> */}
      </>
    )
}   

export default Dashboard;