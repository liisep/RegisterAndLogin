import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Spinner from './components/Spinner';
import { fetchGetData } from './helpers/fetchCalls';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const setAuth = (boolean: boolean) => {
    setIsAuthenticated(boolean);
  };

  const verifyToken = async() => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      fetchGetData("http://localhost:5000/auth/is-verify", "GET", { jwt_token: localStorage.jwt_token })
      .then(verify => {
        verify === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
        setLoading(false);
      })
      .catch(err => console.error(err.message));
    } 
    else {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div className={!isAuthenticated ? "app content-center" : "app justify-between px-3"} data-testid="app">
      <Router>
      {!loading ?
        <Switch>
          <Route exact path="/">
          {!isAuthenticated ? <Login setAuth={setAuth} /> : <Redirect to="/dashboard"/> }
          </Route>
          <Route exact path="/login">
            {!isAuthenticated ? <Login setAuth={setAuth} /> : <Redirect to="/dashboard"/>}
          </Route>
          <Route exact path="/register">
            {!isAuthenticated ? <Register setAuth={setAuth} /> : <Redirect to="/dashboard"/>}
          </Route>
          <Route exact path="/dashboard">
            {isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Redirect to="/login"/> }
          </Route>
        </Switch> : <Spinner/>
        }
      </Router>
    </div>
  );
}

export default App;
