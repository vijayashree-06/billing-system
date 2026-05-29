// src/components/layout/Sidebar.jsx

import { Link } from "react-router-dom";

import {
  FaChartPie,
  FaUsers,
  FaBoxOpen,
  FaFileInvoiceDollar,
  FaChartBar,
  FaCog,
  FaMoneyBillWave,
  FaClipboardList,
  FaUserTie,
} from "react-icons/fa";

function Sidebar() {
  const role =
    localStorage.getItem("role");

  return (
    <div
      style={{
        width: "260px",
        background: "#111827",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
      }}
    >
      <h2
        style={{
          color: "#4f46e5",
          marginBottom: "30px",
        }}
      >
        BillFlow
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <SidebarItem
          to="/dashboard"
          text="Dashboard"
          icon={<FaChartPie />}
        />

        <SidebarItem
          to="/customers"
          text="Customers"
          icon={<FaUsers />}
        />

        <SidebarItem
          to="/products"
          text="Products"
          icon={<FaBoxOpen />}
        />

        <SidebarItem
          to="/billing"
          text="Billing"
          icon={
            <FaFileInvoiceDollar />
          }
        />

        <SidebarItem
          to="/reports"
          text="Reports"
          icon={<FaChartBar />}
        />

        <SidebarItem
          to="/settings"
          text="Settings"
          icon={<FaCog />}
        />

        {/* MANAGER ONLY */}

        {role === "manager" && (
          <>
            <SidebarItem
              to="/invoices"
              text="Invoices"
              icon={
                <FaClipboardList />
              }
            />

            <SidebarItem
              to="/payments"
              text="Payments"
              icon={
                <FaMoneyBillWave />
              }
            />

            <SidebarItem
              to="/staff"
              text="Staff"
              icon={<FaUserTie />}
            />
          </>
        )}
      </div>
    </div>
  );
}

function SidebarItem({
  to,
  text,
  icon,
}) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "white",
        background:
          "rgba(255,255,255,0.05)",
        padding: "14px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontWeight: "600",
      }}
    >
      {icon}
      {text}
    </Link>
  );
}

export default Sidebar;