import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LoginState } from '../interfaces/Interfaces';
import ErrorMessage from '../components/errors/GeneralError';
import { handleEmailErr, handlePasswordErr } from "../helpers/formErrors";
import LoginForm from '../components/forms/LoginForm';
import { fetchPostData } from '../helpers/fetchCalls';

export type Props = {
  setAuth: Function,
}

const Login: React.FC<Props> = ({ setAuth }) => {
  const [inputs, setInputs] = useState<Partial<LoginState>>({
    email: "",
    password: ""
  });

  const [error, setError] = useState<string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [passwordErr, setPasswordErr] = useState<string>("");

  const { email, password } = inputs;

  const errorHandler = (name: string, value: string) => {
    if(name === "email") {
      setEmailErr(handleEmailErr(name, value));
    };
    if(name === "password") {
      setPasswordErr(handlePasswordErr(name, value));
    }
  };

  useEffect(() => {
    errorHandler("email", "");
    errorHandler("password", "");
    // cleaned up 
    return () => {};
  }, [])

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    errorHandler(e.target.name, e.target.value);
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const body = { email, password };
    fetchPostData("http://localhost:5000/auth/login", body)
    .then(login => {
      if(login.jwt_token) {
        localStorage.setItem("jwt_token", login.jwt_token);
        setAuth(true);
        setError("");
      } else {
        setError(login);
      }
    })
    .catch(err => setError(err.message));
  };

  return(
    <div className="form-container my-3" data-testid="login">
      <h2 className="text-center mt-3" data-testid="login-title">Login</h2>
      <ErrorMessage error={error} />
      <LoginForm
        handleInputs={handleInputs}
        handleSubmit={handleSubmit}
        email={email}
        emailErr={emailErr}
        password={password}
        passwordErr={passwordErr}
      />
      <div className="my-3 text-center">Don't have an account yet, <Link to="/register" data-testid="register-link" className="custom-link">register here</Link></div>
    </div>
  )
};

export default Login;