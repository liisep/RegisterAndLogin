export const loginBtnStyle = (emailErr: string, passwordErr: string) => {
  if ((emailErr || passwordErr) || (emailErr && passwordErr)) return "btn custom-btn disabled";
  return "btn custom-btn"
}

export const registerBtnStyle = (firstNameErr: string, lastNameErr: string, emailErr: string, passwordErr: string) => {
  if ((firstNameErr || lastNameErr || emailErr  || passwordErr) ||
   (firstNameErr && lastNameErr && emailErr && passwordErr)) {
    return "btn custom-btn disabled"
  } 
  return "btn custom-btn"
}