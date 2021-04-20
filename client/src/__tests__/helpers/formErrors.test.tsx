import { handleFirstNameErr, handleLastNameErr, handleEmailErr, handlePasswordErr } from "../../helpers/formErrors";

describe("formErrors", () => {
  describe("handleFirstNameErr:", () => {
    it("return error, if value is empty", () => {
      const name = "firstName";
      const value = "";
      expect(handleFirstNameErr(name, value)).toEqual("First name field is required!");
    });
    it("return error, value is not valid", () => {
      const name = "firstName";
      const value = "L";
      expect(handleFirstNameErr(name, value)).toEqual("First name must contain at least 2 characters!");
    });
    it("return empty string, if name field is not valid", () => {
      const name = "lastName";
      const value = "Ly";
      expect(handleFirstNameErr(name, value)).toEqual("");
    });
    it("return empty string, if value is valid", () => {
      const name = "firstName";
      const value = "Ly";
      expect(handleFirstNameErr(name, value)).toEqual("");
    });
  });

  describe("handleLastNameErr:", () => {
    it("return error, if value is empty", () => {
      const name = "lastName";
      const value = "";
      expect(handleLastNameErr(name, value)).toEqual("Last name field is required!");
    });
    it("return error, value is not valid", () => {
      const name = "lastName";
      const value = "U";
      expect(handleLastNameErr(name, value)).toEqual("Last name must contain at least 2 characters!");
    });
    it("return empty string, if name field is not valid", () => {
      const name = "firstName";
      const value = "Uba";
      expect(handleLastNameErr(name, value)).toEqual("");
    });
    it("return empty string, if value is valid", () => {
      const name = "lastName";
      const value = "Uba";
      expect(handleLastNameErr(name, value)).toEqual("");
    });
  });

  describe("handleEmailErr:", () => {
    it("return error, if value is empty", () => {
      const name = "email";
      const value = "";
      expect(handleEmailErr(name, value)).toEqual("Email field is required!");
    });
    it("return error, if value is not valid", () => {
      const name = "email";
      const value = "liina@test.";
      expect(handleEmailErr(name, value)).toEqual("Invalid email format!");
    });
    it("return empty string, if name field is not valid", () => {
      const name = "password";
      const value = "liina@test.ee";
      expect(handleEmailErr(name, value)).toEqual("");
    });
    it("return empty string, if value is valid", () => {
      const name = "email";
      const value = "liina@test.com";
      expect(handleEmailErr(name, value)).toEqual("");
    });
  });

  describe("handlePasswordErr:", () => {
    it("return error, if value is empty", () => {
      const name = "password";
      const value = "";
      expect(handlePasswordErr(name, value)).toEqual("Password field is required!");
    });
    it("return error, if value is not valid", () => {
      const name = "password";
      const value = "12345";
      expect(handlePasswordErr(name, value)).toEqual("Password must contain at least 7 characters!");
    });
    it("return empty string, if name field is not valid", () => {
      const name = "email";
      const value = "123456";
      expect(handlePasswordErr(name, value)).toEqual("");
    });
    it("return empty string, if value is valid", () => {
      const name = "password";
      const value = "1234567";
      expect(handlePasswordErr(name, value)).toEqual("");
    });
  });
});