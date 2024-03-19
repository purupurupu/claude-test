import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types";
import {
  getProfile,
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  updateProfile,
  updatePassword as apiUpdatePassword,
} from "@/lib/api";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
  }) => Promise<void>;
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

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: "",
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  updateUser: async () => {},
  updatePassword: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUserFromLocalStorage() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const data = await getProfile();
          setUser(data);
        } catch (error) {
          console.error("Failed to load user from localStorage:", error);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    }
    loadUserFromLocalStorage();
  }, []);

  async function login(data: {
    email: string;
    password: string;
  }): Promise<void> {
    setLoading(true);
    setError("");

    try {
      const response = await apiLogin(data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      const user = await getProfile();
      setUser(user);
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occurred during login.");
      }
    }

    setLoading(false);
  }

  async function register(data: {
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
  }): Promise<void> {
    setLoading(true);
    setError("");

    try {
      const response = await apiRegister(data);
      const responseData = JSON.parse(response);
      const token = responseData.data.token;
      localStorage.setItem("token", token);
      const user = await getProfile();
      setUser(user);
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occurred during registration.");
      }
    }

    setLoading(false);
  }

  async function logout() {
    setLoading(true);
    setError("");

    try {
      await apiLogout();
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      setError("An unexpected error occurred during logout.");
    }

    setLoading(false);
  }

  async function updateUser(data: {
    name: string;
    bio: string;
    age: number;
    gender: string;
  }) {
    setLoading(true);
    setError("");

    try {
      const user = await updateProfile(data);
      setUser(user);
    } catch (error) {
      console.error("Update user failed:", error);
      setError("An unexpected error occurred while updating user profile.");
    }

    setLoading(false);
  }

  async function updatePassword(data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    setLoading(true);
    setError("");

    try {
      await apiUpdatePassword(data);
    } catch (error) {
      console.error("Update password failed:", error);
      setError("An unexpected error occurred while updating password.");
    }

    setLoading(false);
  }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
