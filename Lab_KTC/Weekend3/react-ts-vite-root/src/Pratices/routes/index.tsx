import { LogInPage } from "../pages/LoginPage";
import { OurTasksPage } from "../pages/TaskList";
import { MyTaskPage } from "../pages/AssignedToMe";
import { CreateTaskPage } from "../pages/CreateTask";
import { UpdateTaskPage } from "../pages/UpdatePage";
import { AccessDeniedPage } from "../pages/Accessdenied";
import  HomePage  from "../pages/HomePage";
import { PrivateRoute } from "../../PrivateRoute";
import UserPage from "../pages/UserPage";
import RolePage from "../pages/RolePage";

const routes = [ 
  {
    path: '/',
    element: <LogInPage />,
    isPublic: true,
    index: true,
    showOnMenu: false,
    name: 'Login',
    roles: [],
  },
  {
    path: '/login',
    element: <LogInPage />,
    isPublic: true,
    showOnMenu: false,
    name: 'Login',
    index: true,
    roles: [],
  },
  {
    path: "/home",
    showOnMenu: true,
    // isPublic: true,
    name: "Home",
    index: true,
    element: ( 
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
     ),
    roles: [],
  },
  {
    path: '/tasks',
    element: <OurTasksPage />,
    roles: ['Managers', 'Leaders'],
    showOnMenu: true,
    name: 'Our Tasks',
  },
  {
    path: '/assignee-me',
    element: <MyTaskPage />,
    roles: ['Users', 'Managers', 'Leaders'],
    showOnMenu: true,
    name: 'My Tasks',
  },
  {
    path: '/create-task',
    element: <CreateTaskPage />,
    roles: ['Managers', 'Leaders'],
    showOnMenu: true,
    name: 'Create Task',
  },
  {
    path: '/update-task/:id',
    element: <UpdateTaskPage />,
    roles: ['Managers', 'Leaders'],
    showOnMenu: false,
    name: 'Update Task',
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
    path: '/*',
    element: <AccessDeniedPage />,
    isPublic: true,
    showOnMenu: false,
    name: 'Not Found',
  },
];

export default routes;
