import { useState } from "react";
import { NavLink } from "react-router";
import { useAuthStore } from "../useAuthStore";
// import AuthContext from "../context";

const menuItems = [
  { label: "Home", path: "/home" },
  { label: "Our Tasks", path: "/tasks" },
  { label: "My Tasks", path: "/assignee-me" },
  { label: "Create Task", path: "/create-task" },
  { label: "Users", path: "/users" },
  // { label: "Roles", path: "/roles" },
];

export const Nav = () => {
  // const { user, setUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const { loggedInUser, logOut } = useAuthStore((state) => state);

  const handleLogout = () => {
    logOut();
    window.location.href = "/login";
  };

  return (
    <nav className="bg-sky-200 text-black px-5 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-2xl font-semibold">
          <img
            src="/images/tick.png"
            alt="Logo"
            className="w-12 h-12 object-cover rounded-full"
          />
          <span>Task Manager</span>
        </div>

        {/* Desktop Menu + Auth Buttons */}
        {loggedInUser && (
        <ul className="hidden md:flex items-center space-x-2 ml-auto">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                 ${
                   isActive
                     ? "bg-white text-amber-200 shadow-md"
                     : "hover:bg-white hover:text-amber-200 hover:shadow"
                 }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        )}
          
          <div className="hidden md:block">
          {loggedInUser ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-sky-300 text-gray-900 shadow-md hover:shadow-sm hover:bg-sky-100"
            >
              Log Out
            </button>
          ) : (
            <button
              onClick={() => (window.location.href = "/login")}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-sky-300 text-gray-900 shadow-md hover:shadow-sm hover:bg-sky-100"
            >
              Log In
            </button>
          )}
        </div>

        

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mt-4 md:hidden space-y-2">
          {loggedInUser &&
            menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block w-full px-4 py-2 rounded-full text-base font-medium transition-all duration-300
                 ${
                   isActive
                     ? "bg-white text-amber-200  shadow-md"
                     : "hover:bg-white hover:text-amber-200  hover:shadow"
                 }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          
          {loggedInUser ? (
            <button
              onClick={handleLogout}
              className="w-full bg-white text-amber-200  px-4 py-2 rounded-full font-semibold hover:bg-blue-100 transition"
            >
              Log Out
            </button>
          ) : (
            <button
              onClick={() => (window.location.href = "/login")}
              className="w-full bg-white text-text-amber-200  px-4 py-2 rounded-full font-semibold hover:bg-blue-100 transition"
            >
              Log In
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
