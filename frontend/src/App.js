import './App.css'
import Homepage from "./components/user/homepage/homepage"
import Login from "./components/user/login/login"
import Register from "./components/user/register/register"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';
import { ReactSession } from 'react-client-session';
import AdminLogin from "./components/admin/login/AdminLogin";
import Dashboard from './components/admin/Dashboard/Dashboard';
import Status from "./components/admin/Status/Status";
import UpdatePost from './components/user/Update/UpdatePost'


function App() {
  ReactSession.setStoreType("localStorage");
  const users = ReactSession.get("userFromStorage"); 

  // const userStorage = {"user":{"email":"psingay96@gmail.com","password":"pramod"}}; 
  console.log("here")
  console.log(users);
  const [ user, setLoginUser] = useState(users)
  // const [ isloggedIn, setLoginUser] = useState(isLoggedIn)

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>
              // isloggedIn ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>

            }
          </Route>
          <Route path="/login">
            <Login setLoginUser={setLoginUser}/>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/adminlogin">
            <AdminLogin />
          </Route>
          <Route path="/admindashboard">
            <Dashboard />
          </Route>
          <Route exact path="/edit/:id" component={Status} />
          <Route exact path="/post/:id" component={UpdatePost} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
