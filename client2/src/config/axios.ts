import axios from "axios";

export const AxiosAPIInstance = () => {
  return axios.create({
    baseURL: process.env.API_URL,
  });
};

export const AxiosClientInstance = () => {
  return axios.create({
    baseURL: process.env.CLIENT_URL,
  });
};
