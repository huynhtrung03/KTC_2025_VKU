import { CreateTaskPage } from "../pages/CreateTaskPage";
import HomePage from "../pages/HomePage";
import { LogInPage } from "../pages/LoginPage";
import { MyTaskPage } from "../pages/MyTasksPage";
import { OurTasksPage } from "../pages/OurTaskPage";
import RolePage from "../pages/RolePage";
import { UpdateTaskPage } from "../pages/UpdateTaskPage";
import UserPage from "../pages/UserPage";

const routes = [
  {
    path: "/login",
    showOnMenu: false,
    isPublic: true,
    name: "Login",
    index: true,
    element: <LogInPage />,
    roles: [],
  },
  {
    path: "/home",
    showOnMenu: true,
    isPublic: true,
    name: "Home",
    index: true,
    element: <HomePage />,
    roles: [],
  },
  {
    path: "/tasks",
    showOnMenu: true,
    name: "Our Tasks",
    index: false,
    element: <OurTasksPage />,
    roles: ["Managers"],
  },
  {
    path: "/assignee-me",
    showOnMenu: true,
    name: "My Tasks",
    index: false,
    element: <MyTaskPage />,
    roles: ["Users", "Managers"],
  },
  {
    path: "create-task",
    showOnMenu: true,
    name: "Create Task",
    index: false,
    element: <CreateTaskPage />,
    roles: ["Managers"],
  },
  {
    path: "users",
    showOnMenu: true,
    name: "Users",
    index: false,
    element: <UserPage />,
    roles: ["Administrators"],
  },
  {
    path: "roles",
    showOnMenu: true,
    name: "Roles",
    index: false,
    element: <RolePage />,
    roles: ["Administrators"],
  },
  {
    path: "update-task/:id",
    showOnMenu: false,
    element: <UpdateTaskPage />,
    roles: ["Managers"],
    name: "Update Task",
    index: false,
  },
];

export default routes;