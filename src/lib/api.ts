import axios from "axios";
import { User } from "@/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export async function getUsers() {
  const response = await api.get<
    {
      id: string;
      name: string;
      age: number;
      bio: string;
      pictures: string[];
    }[]
  >("/users");
  return response.data;
}

export async function getUser(id: string) {
  const response = await api.get<{
    name: string;
    bio: string;
    pictures: string[];
  }>("users/" + id);
  return response.data;
}

export async function createMatch(data: {
  userId: string;
  matchedUserId: string;
}) {
  const response = await api.post("/matches", data);
  return response.data;
}

export async function getMatches(userId: string) {
  const response = await api.get<
    {
      id: string;
      name: string;
      pictures: string[];
    }[]
  >("matches/" + userId);
  return response.data;
}

export async function getChat(id: string) {
  const response = await api.get<{
    id: string;
    messages: {
      id: string;
      senderId: string;
      content: string;
    }[];
  }>("chats/" + id);
  return response.data;
}

export async function sendMessage(data: {
  chatId: string;
  senderId: string;
  content: string;
}) {
  const response = await api.post("/messages", data);
  return response.data;
}

export async function login(data: { email: string; password: string }) {
  try {
    const response = await api.post<{ token: string }>("/login", data);
    return response.data.token;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error("Invalid email or password");
    }
    throw new Error("An unexpected error occurred during login.");
  }
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
}) {
  try {
    const response = await api.post<{ token: string }>("/users", data);
    return response.data.token;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      throw new Error("Invalid registration data");
    }
    throw new Error("An unexpected error occurred during registration.");
  }
}

export async function logout() {
  await api.post("/logout");
}

export async function getProfile() {
  const response = await api.get<User>("/profile");
  return response.data;
}

export async function updateProfile(data: {
  name: string;
  bio: string;
  age: number;
  gender: string;
}) {
  const response = await api.put<User>("/profile", data);
  return response.data;
}

export async function updatePassword(data: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    await api.put("/password", data);
  } catch (error) {
    throw new Error("An unexpected error occurred while updating password.");
  }
}
