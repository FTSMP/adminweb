import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./Login.jsx";
import Dashboard from "./route/Dashboard.jsx";
import { useAuth } from "./AuthContext";
import { Sidebar } from "./components/Sidebar.jsx";
import { AdminList } from "./route/AdminList.jsx";
import AccountList from "./route/AccountList.jsx";
import AccountDetails from "./route/AccountDetail.jsx";
import BankTransaction from "./route/BankTransaction.jsx";
import BankAccounts from "./route/BankAccounts.jsx";
import PlayerVehicles from "./route/PlayerVehicles.jsx";

// Protected layout for authenticated users
const ProtectedLayout = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/" />;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#081028" }}>
        <Outlet />
      </div>
    </div>
  );
};

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Public route
  },
  {
    path: "/",
    element: <ProtectedLayout />, // Protected layout
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "admins", element: <AdminList /> },
      { path: "accounts", element: <AccountList /> },
      { path: "account/:id", element: <AccountDetails /> },
      { path: "banktransaction", element: <BankTransaction /> },
      { path: "bankaccounts", element: <BankAccounts /> },
      { path: "playervehicles", element: <PlayerVehicles /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
