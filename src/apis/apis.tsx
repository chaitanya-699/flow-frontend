import axios from 'axios';

export const BaseUrl = 'https://flow-backend-fqaqg4c0g6hrb0aw.southindia-01.azurewebsites.net/api';
export const LoginMe = axios.create({
  baseURL: BaseUrl,
  withCredentials: true,
});

export const Login = axios.create({
  baseURL: BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const AutoLogin = axios.create({
  baseURL: BaseUrl,
  withCredentials: true,
});
