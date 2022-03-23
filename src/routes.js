import { Navigate, useRoutes } from "react-router-dom";
import Home from "./components/home";
import Layout from "./components/layout";
import Search from "./components/search";
import Table from "./components/table";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Navigate to='/home' replace /> },
        { path: "home", element: <Home /> },
        { path: "restaurants", element: <Table /> },
      ],
    },
    { path: "/search", element: <Search /> },
  ]);
}
