import { LoginFormData } from "./types";

const API_BASE_URL = "http://localhost:8888";

export const login = async (formData: LoginFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/server/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const body = await response.json();
  
    if (!response.ok) {
      throw new Error(body.message);
    }
    return body;
  };

