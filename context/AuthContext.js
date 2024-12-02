"use client";

import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  const registerUser = async ({ name, email, password }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, passwor}),
      });

      const data = await response.json();


      if (data?.user) {
        router.push("/");
        toast.success("Registration successful");
      }
    } catch (error) {

      setError(error?.response?.data?.message || error.message);
      toast.error("Registration failed. Try again.");
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        setUser,
        registerUser,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;