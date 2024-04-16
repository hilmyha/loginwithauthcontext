import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as ScureStore from "expo-secure-store";
import { router, useSegments } from "expo-router";

interface AuthProps {
  authState?: {
    user: User | null;
    token: string | null;
    authenticated: boolean | null;
  };
  onUser?: () => Promise<any>;
  onRegister?: (
    username: string,
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => Promise<any>;
  onLogin?: (username: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  checkToken?: () => void;
}

interface User {
  id: number;
  username: string;
  email: string;
}

const TOKEN_KEY = "token";
export const API_URL = "http://10.0.2.2:8000/api/";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    user: User | null;
    token: string | null;
    authenticated: boolean | null;
  }>({ user: null, token: null, authenticated: null });

  const segments = useSegments();

  useEffect(() => {
    const getToken = async () => {
      const token = await ScureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({ user: null, token, authenticated: true });
      } else {
        setAuthState({ user: null, token: null, authenticated: false });
      }
    };
    getToken();
  }, []);

  // register function
  const register = async (
    name: string,
    username: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    try {
      const response = await axios.post(`${API_URL}register`, {
        name,
        username,
        email,
        password,
        password_confirmation,
      });
      const token = response.data.data.token;
      await ScureStore.setItemAsync(TOKEN_KEY, token);
      console.log("response", response.data);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAuthState({
        token,
        authenticated: true,
        user: response.data.data.user,
      });
    } catch (error: any) {
      if (error.response) {
        console.log("error", error.response.data);
        return error.response.data;
      }
    }
  };

  // login function
  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}login`, {
        username,
        password,
      });
      const token = response.data.data.token;
      await ScureStore.setItemAsync(TOKEN_KEY, token);
      console.log("response", response.data.data.token);
      console.log("response", response.data.data);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAuthState({
        token,
        authenticated: true,
        user: response.data.data.user,
      });
    } catch (error: any) {
      if (error.response) {
        console.log("error", error.response.data);
        return error.response.data;
      }
    }
  };

  // load user function
  const user = async () => {
    try {
      const response = await axios.get(`${API_URL}user`);
      // Simpan informasi pengguna yang sedang login
      setAuthState((prevState) => ({
        ...prevState,
        user: response.data,
      }));
    } catch (error: any) {
      console.log("error", error);
    }
  };

  // logout function
  const logout = async () => {
    await ScureStore.deleteItemAsync(TOKEN_KEY);
    delete axios.defaults.headers.common["Authorization"];
    setAuthState({ user: null, token: null, authenticated: false });
  };

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!authState.authenticated && !inAuthGroup) {
      // Redirect to the sign-in page.
      router.replace("/(auth)/login");
    } else if (authState.authenticated && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/(tabs)/home");
    }
  }, [authState, segments]);

  const value: AuthProps = {
    authState,
    onUser: user,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
