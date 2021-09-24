import { Box } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppBar from "./AppBar";
import AppDrawer from "./AppDrawer";
import { ServiceProvider } from "./Service";
import { useLocalStorageSync } from "./useLocalStorageSync";
import Viewport from "./Viewport";

const DashboardService = React.lazy(() => import("dashboard/DashboardService"));
const OrderService = React.lazy(() => import("order/OrderService"));
const ProfilePage = React.lazy(() => import("profile/ProfilePage"));

function useDrawer() {
  const { value, setItem } = useLocalStorageSync(
    "@shared-routing/appdrawer/open"
  );

  return {
    open: value,
    closeDrawer() {
      setItem(false);
    },
    openDrawer() {
      setItem(true);
    },
  };
}

export default function Shell() {
  const drawer = useDrawer();

  return (
    <ServiceProvider>
      <BrowserRouter>
        <Viewport>
          <Box display="flex" flex={1}>
            <AppBar drawer={drawer} />
            <AppDrawer drawer={drawer} />
            <React.Suspense fallback={"Loading"}>
              <Routes>
                <Route path="dashboard/*" element={<DashboardService />} />
                <Route path="orders/*" element={<OrderService />} />
                <Route path="profile/*" element={<ProfilePage />} />
                <Route
                  path="*"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Routes>
            </React.Suspense>
          </Box>
        </Viewport>
      </BrowserRouter>
    </ServiceProvider>
  );
}
