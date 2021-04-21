import React, { useState, useEffect, useCallback } from "react";
import Logout from "../components/Logout";
import { fetchGetData } from "../helpers/fetchCalls";
import ErrorMessage from "../components/errors/GeneralError";


type Props = {
  setAuth: Function;
}

const Dashboard: React.FC<Props> = ({setAuth}) => {

  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const getProfile = useCallback(async () => {
    fetchGetData("http://localhost:5000/dashbrd/", "GET", {jwt_token: localStorage.jwt_token})
    .then(user => { setName(`${user.firstName} ${user.lastName}`);})
    .catch(err => setError(err.message));
  }, []);

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwt_token");
      setAuth(false);
    } 
    catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return(
    <div className="mt-3"> 
      <ErrorMessage error={error} />
      <div className="d-flex mt-3 justify-content-between">
        <h3 data-testid="dashboard-title">Yay, you’re logged in as {name}</h3>
        <Logout handleLogout={handleLogout}/>
      </div>   
    </div>
  )
}

export default Dashboard;