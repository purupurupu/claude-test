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
    try {
      const token = await apiLogin(data);
      localStorage.setItem("token", token);
      const user = await getProfile();
      setUser(user);
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred during login.");
      }
    }
  }

  async function register(data: {
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
  }): Promise<void> {
    try {
      const token = await apiRegister(data);
      localStorage.setItem("token", token);
      const user = await getProfile();
      setUser(user);
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred during registration.");
      }
    }
  }

  async function logout() {
    try {
      await apiLogout();
      localStorage.removeItem("token");
      setUser(null);
      setError("");
    } catch (error) {
      console.error("Logout failed:", error);
      setError("An unexpected error occurred during logout.");
    }
  }

  async function updateUser(data: {
    name: string;
    bio: string;
    age: number;
    gender: string;
  }) {
    try {
      const user = await updateProfile(data);
      setUser(user);
      setError("");
    } catch (error) {
      console.error("Update user failed:", error);
      setError("An unexpected error occurred while updating user profile.");
    }
  }

  async function updatePassword(data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    try {
      await apiUpdatePassword(data);
      setError("");
    } catch (error) {
      console.error("Update password failed:", error);
      setError("An unexpected error occurred while updating password.");
    }
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
