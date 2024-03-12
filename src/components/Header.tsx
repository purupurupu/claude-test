import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-gray-800 text-xl font-bold">Tinder Clone</a>
            </Link>
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <Link href="/profile">
                  <a className="text-gray-800 hover:text-gray-600 mx-4">
                    Profile
                  </a>
                </Link>
                <Link href="/settings">
                  <a className="text-gray-800 hover:text-gray-600 mx-4">
                    Settings
                  </a>
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-800 hover:text-gray-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <a className="text-gray-800 hover:text-gray-600 mx-4">
                    Login
                  </a>
                </Link>
                <Link href="/register">
                  <a className="text-gray-800 hover:text-gray-600">Register</a>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
