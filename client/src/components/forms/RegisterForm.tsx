import { registerBtnStyle } from "../../helpers/btnStyle";
import FrontError from "../errors/FrontError";

type Props = {
  handleInputs: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (e: React.FormEvent) => void;
  firstName: string | undefined,
  firstNameErr: string,
  lastName: string | undefined,
  lastNameErr: string,
  email: string | undefined,
  emailErr: string,
  password: string | undefined,
  passwordErr: string,
}


const RegisterForm: React.FC<Props> = ({ handleInputs, handleSubmit, firstName, firstNameErr, lastName, lastNameErr, email, emailErr, password, passwordErr}) => {
  return (
    <form method="POST" onSubmit={handleSubmit} data-testid="form-submit">
      <input type="text" className="form-control mt-4" data-testid="firstName" name="firstName" placeholder="First name" value={firstName} onChange={handleInputs} />
      <FrontError dataId="first-name-err" error={firstNameErr} />
      <input type="text" className="form-control mt-4" data-testid="lastName" name="lastName" placeholder="Last name" value={lastName} onChange={handleInputs} />
      <FrontError dataId="last-name-err" error={lastNameErr} />
      <input type="text" className="form-control custom-mt-3" data-testid="email" name="email" placeholder="Email" value={email} onChange={handleInputs} />
      <FrontError dataId="email-err" error={emailErr} />
      <input type="password" className="form-control custom-mt-3" data-testid="password" name="password" placeholder="Password" value={password} onChange={handleInputs} />
      <FrontError dataId="password-err" error={passwordErr} />
      <div className="d-grid gap-2 mt-4 pt-2">
        <button className={registerBtnStyle(firstNameErr, lastNameErr, emailErr, passwordErr)} type="submit" data-testid="register-submit">Submit</button>
      </div>
    </form>
  )
}; 

export default RegisterForm