/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./Pratices/routes";
import { useAuthStore } from "./Pratices/useAuthStore";
import  MainLayout  from "./Pratices/Layout/MainLayout";
import { AccessDeniedPage } from "./Pratices/pages/Accessdenied";
import React from "react";

export default function ZustandAndSecurity() {
  const { loggedInUser } = useAuthStore((state) => state);

  const userRoles: string[] =
    loggedInUser?.roles?.map((role: any) => role.code?.toLowerCase()) || [];
  console.log("userRoles", userRoles);
  const generatedRoutes: any[] = routes
    .map((route) => {
      const routeRoles: string[] =
        route.roles?.map((role: string) => role?.toLowerCase()) || [];
      const hasAccess = userRoles.some((role: string) => {
        return (
          role?.toLowerCase() === "administrators" ||
          routeRoles.includes(role?.toLowerCase())
        );
      });
      return hasAccess
        ? {
            path: route.path,
            element: route.element,
            index: route.index,
          }
        : null;
    })
    .filter(Boolean);
  routes.forEach((route) => {
    if (route.isPublic) {
      generatedRoutes.push({
        path: route.path,
        element: route.element,
        index: route.index,
      });
    }
  });
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: generatedRoutes,
    },
    {
      path: "*",
      element: <AccessDeniedPage />,
    },
  ]);

  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </React.Suspense>
    </div>
  );
}