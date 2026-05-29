// src/App.jsx

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// PUBLIC PAGES

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// COMMON PAGES

import DashboardPage from "./pages/Dashboard";
import CustomersPage from "./pages/CustomersPage";
import ProductsPage from "./pages/ProductsPage";
import BillingPage from "./pages/BillingPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";

// MANAGER PAGES

import InvoicesPage from "./pages/InvoicesPage";
import PaymentsPage from "./pages/PaymentsPage";
import StaffPage from "./pages/StaffPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* COMMON */}

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/customers"
          element={<CustomersPage />}
        />

        <Route
          path="/products"
          element={<ProductsPage />}
        />

        <Route
          path="/billing"
          element={<BillingPage />}
        />

        <Route
          path="/reports"
          element={<ReportsPage />}
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
        />

        {/* MANAGER */}

        <Route
          path="/invoices"
          element={<InvoicesPage />}
        />

        <Route
          path="/payments"
          element={<PaymentsPage />}
        />

        <Route
          path="/staff"
          element={<StaffPage />}
        />

        {/* FALLBACK */}

        <Route
          path="*"
          element={
            <Navigate to="/" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;