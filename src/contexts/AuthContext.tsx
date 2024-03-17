import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types";
import * as api from "@/lib/api";

type AuthContextType = {
  user: User | null;
  login: (data: { email: string; password: string }) => Promise<string>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
  }) => Promise<string>;
  logout: () => Promise<void>;
  updateUser: (data: {
    name: string;
    bio: string;
    age: number;
    gender: string;
  }) => Promise<void>;
  updatePassword: (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
};

const initialAuth: AuthContextType = {
  user: null,
  login: async () => "",
  register: async () => "",
  logout: async () => {},
  updateUser: async () => {},
  updatePassword: async () => {},
};

export const AuthContext = createContext<AuthContextType>(initialAuth);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromLocalStorage() {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await api.getProfile();
        setUser(data);
      }
      setLoading(false);
    }
    loadUserFromLocalStorage();
  }, []);

  async function login(data: {
    email: string;
    password: string;
  }): Promise<string> {
    const token = await api.login(data);
    localStorage.setItem("token", token);
    const user = await api.getProfile();
    setUser(user);
    return token;
  }

  async function register(data: {
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
  }): Promise<string> {
    const token = await api.register(data);
    localStorage.setItem("token", token);
    const user = await api.getProfile();
    setUser(user);
    return token;
  }

  async function logout() {
    await api.logout();
    localStorage.removeItem("token");
    setUser(null);
  }

  async function updateUser(data: {
    name: string;
    bio: string;
    age: number;
    gender: string;
  }) {
    const user = await api.updateProfile(data);
    setUser(user);
  }

  async function updatePassword(data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    await api.updatePassword(data);
  }

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
