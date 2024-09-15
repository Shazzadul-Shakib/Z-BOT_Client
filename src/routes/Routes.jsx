import InitialPage from "@/components/pages/auth/InitialPage";
import TaskModules from "@/components/pages/project/TaskModules";
import MainLayout from "@/layouts/MainLayout";
import Finance from "@/pages/Finance";
import Login from "@/pages/Login";
import Projects from "@/pages/Projects";
import Register from "@/pages/Register";
import VerifyOTP from "@/pages/VerifyOTP";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Project from "@/pages/Project";

export const router = createBrowserRouter([
  {
    path: "/home",
    element: <InitialPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "verifyotp",
    element: <VerifyOTP />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/:projectId",
        element: <Project />,
      },
      {
        path: "projects/:projectId/taskmodules",
        element: <TaskModules />,
      },
      {
        path: "finance",
        element: <Finance />,
      },
      
    ],
  },
]);
