import axios from 'axios';

import { BASE_API_URL } from './../config';
import { AuthService } from './';

const ApiCaller = axios.create({
  baseURL: BASE_API_URL,
});

ApiCaller.interceptors.request.use(config => {
  const { jwt } = AuthService.getTokens();
  // if (jwt) config.headers = {
  //   'x-access-token': jwt,
  // }
  return config;
})

ApiCaller.interceptors.response.use(
  response => {
    console.log('response -->> ', response);
    return Promise.resolve({ response: response.data })
  },
  error => {
    const { response: { data } } = error;
    return Promise.resolve({ error: data });
  }
);

export { ApiCaller };
