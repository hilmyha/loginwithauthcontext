import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as ScureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "token";
export const API_URL = "http://10.0.2.2:8000/api";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({ token: null, authenticated: null });

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      const token = response.data.token;
      await ScureStore.setItemAsync(TOKEN_KEY, token);
      console.log("response", response.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAuthState({ token, authenticated: true });
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    authState,
    onLogin: login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
