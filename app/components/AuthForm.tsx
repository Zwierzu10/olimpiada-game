"use client";

import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (mode === "register") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96 flex flex-col gap-5 border border-gray-700/50"
      >
        <h1 className="text-3xl font-extrabold text-center tracking-wide">
          {mode === "login" ? "Logowanie" : "Rejestracja"}
        </h1>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-300">Email</label>
          <input
            type="email"
            placeholder="Wprowadź email"
            className="p-3 rounded-lg bg-gray-700/60 border border-gray-600 focus:border-blue-500 transition outline-none ]"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-300">Hasło</label>
          <input
            type="password"
            placeholder="Wprowadź hasło"
            className="p-3 rounded-lg bg-gray-700/60 border border-gray-600 focus:border-blue-500 transition outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="bg-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md cursor-pointer"
        >
          {mode === "login" ? "Zaloguj się" : "Utwórz konto"}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            {mode === "login" ? "Nie masz konta?" : "Masz już konto?"}
          </p>
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-blue-400 hover:text-blue-300 font-medium mt-1 transition cursor-pointer"
          >
            {mode === "login" ? "Zarejestruj się" : "Zaloguj się"}
          </button>
        </div>
      </form>
    </div>
  );
}