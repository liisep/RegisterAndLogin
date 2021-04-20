import { HeaderToken, LoginState, RegisterState, UserInfo } from "./interfaces/Interfaces";

export const fakeToken: HeaderToken = {jwt_token: "fake_token"};

export const fakeUser: RegisterState = {firstName: "Silvi", lastName: "Mets",  email: "silvi@test.net", password: "1234a56"};

export const userData: UserInfo = {id: 3, firstName: "Silvi", lastName: "Mets", email: "silvi@test.net"}

export const fakeUserLogin: LoginState = {email:"silvi@test.net", password:"1234a56"};