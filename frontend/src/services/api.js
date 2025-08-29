import axios from "axios";
export const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export const registerUser = (data) =>
  axios.post(`${API_BASE_URL}/users/register`, data);
export const loginUser = (data) =>
  axios.post(`${API_BASE_URL}/users/login`, data);
// Add more endpoints as needed
