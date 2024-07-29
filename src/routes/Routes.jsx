import MainLayout from "@/layouts/MainLayout";
import Project from "@/pages/Project";
import Projects from "@/pages/Projects";
import { createBrowserRouter } from "react-router-dom";

export const router=createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                path:'/projects',
                element:<Projects/>
            },
            {
                path:'/project',
                element:<Project/>
            },
        ]
    }
])