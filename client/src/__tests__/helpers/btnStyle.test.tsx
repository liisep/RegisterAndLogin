import { loginBtnStyle, registerBtnStyle } from "../../helpers/btnStyle";

describe("btnStyle", () => {
  describe("loginBtnStyle:", () => {
    it("return disabled, if email error exist", () => {
      const emailErr = "Email field is required!";
      const passwordErr = "";
      expect(loginBtnStyle(emailErr, passwordErr)).toMatch(/(disabled)/i)
    });
    it("return disabled, if email and password error exist", () => {
      const emailErr = "Invalid email format";
      const passwordErr = "Password must contain at least 7 characters!";
      expect(loginBtnStyle(emailErr, passwordErr)).toMatch(/(disabled)/i)
    });
    it("not contain disabled, if error don't exist", () => {
      const emailErr = "";
      const passwordErr = "";
      expect(loginBtnStyle(emailErr, passwordErr)).toMatch(/(btn custom-btn)/i)
    });
  });

  describe("registerBtnStyle:", () => {
    it("return disabled, if first name error exist", () => {
      const firstNameErr = "First name field is required!";
      const lastNameErr = "";
      const emailErr = "";
      const passwordErr = "";
      expect(registerBtnStyle(firstNameErr, lastNameErr, emailErr, passwordErr)).toMatch(/(disabled)/i)
    });
    it("return disabled, if first name, last name, email and password error exist", () => {
      const firstNameErr = "First name field is required!";
      const lastNameErr = "Last name field is required!";
      const emailErr = "Invalid email format";
      const passwordErr = "Password must contain at least 7 characters!";
      expect(registerBtnStyle(firstNameErr, lastNameErr, emailErr, passwordErr)).toMatch(/(disabled)/i)
    });
    it("not contain disabled, if error don't exist", () => {
      const firstNameErr = "";
      const lastNameErr = "";
      const emailErr = "";
      const passwordErr = "";
      expect(registerBtnStyle(firstNameErr, lastNameErr, emailErr, passwordErr)).toMatch(/(btn custom-btn)/i)
    });
  });
});