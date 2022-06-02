import './App.css'
import Homepage from "./components/user/homepage/homepage"
import Login from "./components/user/login/login"
import Register from "./components/user/register/register"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';
import AdminLogin from "./components/admin/login/AdminLogin";
import Dashboard from './components/admin/Dashboard/Dashboard';


function App() {
  const [ user, setLoginUser] = useState({})
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
