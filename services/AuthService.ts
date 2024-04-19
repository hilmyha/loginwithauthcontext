import axios from "../utils/axios";
import { deleteToken, setToken } from "./TokenService";

export async function register(credentials: {
  name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  const response = await axios.post("/register", credentials);
  await setToken(response.data.data.token);
}

export async function login(credentials: {
  username: string;
  password: string;
}) {
  const response = await axios.post("/login", credentials);
  console.log("response", response.data);
  await setToken(response.data.data.token);
}

export async function loadUser() {
  const response = await axios.get("/user");
  return response.data;
}

export async function logout() {
  await axios.post("/logout", {});
  await deleteToken();
}
