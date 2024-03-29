import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "./Spinner";
import Notification from "./Notification";
import Router from "next/router";

export default function Header() {
  const { user, logout, loading, error } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      Router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-gray-800 text-xl font-bold">
              Tinder Clone
            </Link>
          </div>
          <div className="flex items-center">
            {loading && <Spinner />}
            {error && <Notification message={error} variant="error" />}
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="text-gray-800 hover:text-gray-600 mx-4"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="text-gray-800 hover:text-gray-600 mx-4"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-800 hover:text-gray-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-800 hover:text-gray-600 mx-4"
                >
                  Login
                </Link>
                <Link
                  href="/registration"
                  className="text-gray-800 hover:text-gray-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
