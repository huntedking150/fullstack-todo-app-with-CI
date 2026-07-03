import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";

import { login } from "../api/users";
import { useAuth } from "../contexts/AuthContext";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setToken] = useAuth();

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      setToken(data.token);
      navigate("/");
    },
    onError: () => alert("failed to login!"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-xl p-6 sm:p-8 transition-all duration-300"
      >
        <Link
          to="/"
          className="inline-block text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          ← Back to main page
        </Link>
        <hr className="my-5 border-slate-300 dark:border-slate-700" />
        {/* <br /> */}
        <div className="space-y-5">
          <div className="">
            <label
              htmlFor="create-username"
              className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Username:{" "}
            </label>
            <input
              type="text"
              name="create-username"
              id="create-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md px-4 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label
              htmlFor="create-password"
              className="block mb-2 text-sm font-medium
                     text-slate-700 dark:text-slate-300"
            >
              Password:{" "}
            </label>
            <input
              type="password"
              name="create-password"
              id="create-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl
                     border border-slate-300 dark:border-slate-700
                     bg-white/60 dark:bg-slate-800/60
                     backdrop-blur-md
                     px-4 py-3
                     text-slate-900 dark:text-slate-100
                     placeholder:text-slate-400
                     focus:outline-none
                     focus:ring-2 focus:ring-slate-500
                     focus:border-transparent
                     transition-all"
            />
          </div>
          <input
            type="submit"
            value={loginMutation.isPending ? "Logging in..." : "Log In"}
            disabled={!username || !password || loginMutation.isPending}
            className="w-full cursor-pointer
                   rounded-xl
                   bg-slate-800 dark:bg-slate-200
                   px-4 py-3
                   font-semibold
                   text-white dark:text-slate-900
                   shadow-md
                   transition-all duration-300
                   hover:-translate-y-0.5
                   hover:bg-slate-700
                   dark:hover:bg-white
                   active:scale-[0.98]
                   disabled:cursor-not-allowed
                   disabled:bg-slate-400
                   dark:disabled:bg-slate-700
                   disabled:text-slate-200
                   dark:disabled:text-slate-400"
          />
          <hr className="my-5 border-slate-300 dark:border-slate-700" />
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
