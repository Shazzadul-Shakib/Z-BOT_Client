import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/Login";
import Project from "@/pages/Project";
import Projects from "@/pages/Projects";
import Register from "@/pages/Register";
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
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);