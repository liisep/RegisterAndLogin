const nameRegex = /^[a-zA-ZäõöüßÄÕÖÜ]{2,}$/;
const emailRegex = /^\w+([.-[^a-zA-Z0-9äõöüÄÕÖÜß]]?\w+)*@\w+([.-[^a-zA-Z0-9äõöüÄÕÖÜß]]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^[a-zA-Z0-9]{7,}$/;

export const handleFirstNameErr = (name: string, value: string) => {
  let firstNameErr: string = "";

  if(name === "firstName") {
    if(value !== "") {
      nameRegex.test(value) === false ? firstNameErr = "First name must contain at least 2 characters!" : firstNameErr = "";
    } 
    else {
      firstNameErr = "First name field is required!";
    }
  };
  return firstNameErr;
};

export const handleLastNameErr = (name: string, value: string) => {
  let lastNameErr: string = "";

  if(name === "lastName") {
    if(value !== "") {
      nameRegex.test(value) === false ? lastNameErr = "Last name must contain at least 2 characters!" : lastNameErr = "";
    } 
    else {
      lastNameErr = "Last name field is required!";
    }
    
  };
  return lastNameErr;
};

export const handleEmailErr = (name: string, value: string) => {
  let emailErr: string = "";

  if(name === "email") {
    if(value !== "") {
      emailRegex.test(value) === false ? emailErr = "Invalid email format!" : emailErr = "";
    }
    else {
      emailErr = "Email field is required!";
    }
  };
  
  return emailErr;
};

export const handlePasswordErr = (name: string, value: string) => {
  let passwordErr: string = "";
  
  if(name === "password") {
    if(value !== "") {
      passwordRegex.test(value) === false ? passwordErr = "Password must contain at least 7 characters!" : passwordErr = "";  
    } 
    else {
      passwordErr = "Password field is required!";
    }
  };
 
  return passwordErr;
};