import { Navigate } from "react-router";
import { useAuthStore } from "./useAuthorStore";
import type { JSX } from "react";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { loggedInUser } = useAuthStore();
  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}