import { loginBtnStyle } from "../../helpers/btnStyle";
import FrontError from "../errors/FrontError";

type Props = {
  handleInputs: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (e: React.FormEvent) => void;
  email: string | undefined,
  emailErr: string,
  password: string | undefined,
  passwordErr: string,
}

const LoginForm: React.FC<Props> = ({handleSubmit, handleInputs, email, emailErr, password, passwordErr }) => {
  return(
    <form method="POST" onSubmit={handleSubmit} data-testid="form-submit">
      <input type="email" className="form-control mt-4" data-testid="email" name="email" placeholder="Email" value={email} onChange={handleInputs} />
      <FrontError dataId="email-err" error={emailErr} />
      <input type="password" className="form-control custom-mt-3" data-testid="password" name="password" placeholder="Password" value={password} onChange={handleInputs} />
      <FrontError dataId="password-err" error={passwordErr} />
      <div className="d-grid gap-2 mt-4 pt-2">
        <button className={loginBtnStyle(emailErr, passwordErr)} type="submit" data-testid="login-submit">Login</button>
      </div>
    </form>
  )
};

export default LoginForm;