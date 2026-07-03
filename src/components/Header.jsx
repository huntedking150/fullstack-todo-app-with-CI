import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext.jsx";
import { User } from "./User.jsx";

export function Header() {
  const [token, setToken] = useAuth();

  if (token) {
    const { sub } = jwtDecode(token);
    return (
      <div className="flex gap-x-6">
        <div className="py-3 transition-all duration-300 hover:shadow-lg ">
          Logged in as <User id={sub} />
        </div>

        <div className="rounded-xl p-3 bg-white shadow-md border border-red-200 transition-all duration-300 hover:shadow-lg dark:bg-red-900 dark:border-red-700">
          <button onClick={() => setToken(null)} className="cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-x-6">
      <div className="rounded-xl p-3 bg-white shadow-md border border-slate-200 transition-all duration-300 hover:shadow-lg dark:bg-slate-800 dark:border-slate-700">
        <Link to="/login">Log In</Link>
      </div>

      <div className="rounded-xl p-3 bg-white shadow-md border border-slate-200 transition-all duration-300 hover:shadow-lg dark:bg-slate-800 dark:border-slate-700">
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
