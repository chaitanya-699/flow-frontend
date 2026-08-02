import axios from 'axios';

export const BaseUrl = 'http://localhost:5218/api';
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
