import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import Dashboard from "../components/Dashboard";
import Layout from "../components/Layout";

export const ROOT = "/";
export const LANDINGPAGE = "/landingpage";
export const PROTECTED = "/protected";
export const DASHBOARD = "/protected/dashboard";

export const router = createBrowserRouter([
  { path: ROOT, element: <LandingPage /> },
  {
    path: PROTECTED,
    element: <Layout />,
    children: [
      {
        path: DASHBOARD,
        element: <Dashboard />,
      },
    ],
  },
]);
