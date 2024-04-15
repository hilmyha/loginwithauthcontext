import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as ScureStore from "expo-secure-store";
import { router, useSegments } from "expo-router";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (username: string, password: string) => Promise<any>;
  onLogin?: (username: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "token";
export const API_URL = "http://10.0.2.2:8000/api/";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({ token: null, authenticated: null });

  const segments = useSegments();

  useEffect(() => {
    const getToken = async () => {
      const token = await ScureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({ token, authenticated: true });
      } else {
        setAuthState({ token: null, authenticated: false });
      }
    };
    getToken();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}login`, {
        username,
        password,
      });
      const token = response.data.token;
      await ScureStore.setItemAsync(TOKEN_KEY, token);
      console.log("response", response.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAuthState({ token, authenticated: true });
    } catch (error) {
      console.log("error", error);
      
    }
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

  const value = {
    authState,
    onLogin: login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
