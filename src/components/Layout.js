import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { ROOT } from "../lib/routes";
import { useAuth } from "../hooks/auth";

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    if (pathname.startsWith("/protected") && !user) {
      navigate(ROOT);
    }
  }, [pathname]);

  return (
    <>
      <Outlet />
    </>
  );
}
