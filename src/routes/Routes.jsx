import TaskModules from "@/components/pages/project/TaskModules";
import MainLayout from "@/layouts/MainLayout";
import Finance from "@/pages/Finance";
import Login from "@/pages/Login";
import Project from "@/pages/Project";
import Projects from "@/pages/Projects";
import Register from "@/pages/Register";
import VerifyOTP from "@/pages/VerifyOTP";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/project",
        element: <Project />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      // {
      //   path: "/register",
      //   element: <Register />,
      // },
      {
        path: "/verifyotp",
        element: <VerifyOTP />,
      },
      {
        path: "/finance",
        element: <Register />,
      },
      {
        path: "/taskmodules",
        element: <TaskModules />,
      },
    ],
  },
]);