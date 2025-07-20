import type { JSX } from "react";
import { useAuthStore } from "../useAuthStore";

export function RoleAction({ children }: { children: JSX.Element }) {
  const { loggedInUser } = useAuthStore();

  const isAdmin = loggedInUser?.roles?.some(
    (role) => role.name === "Administrators"
  );

  if (!isAdmin) {
    return null;
  }
  return children;
}