import { BrowserRouter, Route, Routes } from "react-router";
import { NavBar } from "./components/HeaderNav";
import { LogInPage } from "./pages/Login";
import { AccessDeniedPage } from "./pages/Accessdenied";
import { OurTasksPage } from "./pages/TaskList";
// import React, { useEffect } from "react";
// import type { User } from "./types/types";
import { MyTaskPage } from "./pages/AssignedToMe";
// import AuthContext from "./context";
import { CreateTaskPage } from "./pages/CreateTask";
import { UpdateTaskPage } from "./pages/UpdatePage";
// import LoadingPage from "./pages/LoadingPage";
import { PrivateRoute } from "../PrivateRoute";

function App() {
  return (
    // <AuthContext.Provider value={{ user, setUser }}>
     <div className="bg-white min-h-screen flex flex-col"> 
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route index element={<LogInPage />} />
            <Route path="/login" element={<LogInPage />} />


            <Route path="/tasks"element={
              <PrivateRoute>
                <OurTasksPage />
              </PrivateRoute>
            }
            />
            <Route path="/assignee-me"element={
              <PrivateRoute>
                <MyTaskPage />
              </PrivateRoute>
            }
            />
            
            <Route path="/create-task"element={
              <PrivateRoute>
                <CreateTaskPage />
              </PrivateRoute>
            }
            />
            <Route path="/update-task/:id"element={
              <PrivateRoute>
                <UpdateTaskPage />
              </PrivateRoute>
            }
            />

            {/* Private
            {user && <Route path="/tasks" element={<OurTasksPage />} />}
            {user && <Route path="/assignee-me" element={<MyTaskPage />} />}
            {user && <Route path="/create-task" element={<CreateTaskPage />} />}
            {user && (
              <Route path="/update-task/:id" element={<UpdateTaskPage />} />
            )} */}

            <Route path="/*" element={<AccessDeniedPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    // {/* </AuthContext.Provider> */}
  );
}

export default App;