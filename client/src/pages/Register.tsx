import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RegisterState } from '../interfaces/Interfaces';
import ErrorMessage from "../components/errors/GeneralError";
import { handleFirstNameErr, handleLastNameErr, handleEmailErr, handlePasswordErr } from "../helpers/formErrors";
import RegisterForm from "../components/forms/RegisterForm";
import { fetchPostData } from "../helpers/fetchCalls";

type Props = {
  setAuth: Function;
};

const Register: React.FC<Props> = ({setAuth}) => {

  const [inputs, setInputs] = useState<Partial<RegisterState>>({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState<string>("");
  const [firstNameErr, setFirstNameErr] = useState<string>("");
  const [lastNameErr, setLastNameErr] = useState<string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [passwordErr, setPasswordErr] = useState<string>("");

  const { firstName, lastName, email, password } = inputs; 

  const errorHandler = (name: string, value: string) => {
    if(name === "firstName") {
      setFirstNameErr(handleFirstNameErr(name, value));
    };
    if(name === "lastName") {
      setLastNameErr(handleLastNameErr(name, value));
    };
    if(name === "email") {
      setEmailErr(handleEmailErr(name, value));
    };
    if(name === "password") {
      setPasswordErr(handlePasswordErr(name, value));
    }
  };

  useEffect(() => {
    errorHandler("firstName", "");
    errorHandler("lastName", "");
    errorHandler("email", "");
    errorHandler("password", "");
    // cleaned up 
    return () => {};
  }, []);

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    errorHandler(e.target.name, e.target.value);
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: RegisterState = { firstName, lastName, email, password };
    fetchPostData("http://localhost:5000/auth/register", body)
    .then(register => {
      if(register.jwt_token) {
        localStorage.setItem("jwt_token", register.jwt_token);
        setAuth(true);
        setError("");
      } 
      else {
        setError(register);
      }
    }).catch(err => {
      setError(err.message);
    });
  };

  return(
    <div className="form-container" data-testid="register">
      <h2 className="text-center mt-3" data-testid="register-title">Register</h2>
      <ErrorMessage error={error} />
      <RegisterForm 
        handleInputs={handleInputs}
        handleSubmit={handleSubmit}
        firstName={firstName}
        firstNameErr={firstNameErr}
        lastName={lastName}
        lastNameErr={lastNameErr}
        email={email}
        emailErr={emailErr}
        password={password}
        passwordErr={passwordErr}
      />
      <div className="my-3">Already register, <Link to="/login" className="custom-link" data-testid="login-link">login here</Link></div>
    </div>
  )
};

export default Register;