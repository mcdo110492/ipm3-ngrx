

export interface Login {
    username    :   string;
    password    :   string;
}

export interface LoginResponse {
    token           : string;
    profileName     : string;
    profileImage    : string;
    role            : number;
    status          : number;
  }