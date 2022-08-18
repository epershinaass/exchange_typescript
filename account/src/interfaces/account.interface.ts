
export interface ICredentials {
  login: string;
  password: string;
}

export interface IAuthToken {
  token: string;
}

export interface IMessage {
  message: string;
}

export interface IAuthResponse {
  sub: string;
  username: string;
}
