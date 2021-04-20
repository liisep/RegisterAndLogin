/* istanbul ignore file */
export interface RegisterState {
  firstName: string | undefined,
  lastName: string | undefined,
  email:  string | undefined,
  password: string | undefined
};

export interface UserInfo {
  id: number,
  firstName: string,
  lastName: string,
  email:  string,
};

export interface LoginState {
  email:  string,
  password: string
};

export interface HeaderToken {
  jwt_token: string,
}

export interface RegObj {
  name: string | undefined,
  email: string | undefined,
  password: string | undefined
}

export interface LoginObj {
  email: string | undefined,
  password: string | undefined
}