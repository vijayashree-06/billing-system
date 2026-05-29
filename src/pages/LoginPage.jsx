// src/pages/LoginPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  // STATES

  const [role, setRole] =
    useState("manager");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  // LOGIN FUNCTION

  const handleLogin = (e) => {
    e.preventDefault();

    // SAVE ROLE

    localStorage.setItem(
      "role",
      role
    );

    console.log(
      "Saved Role:",
      role
    );

    // NAVIGATE

    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* TITLE */}

        <h1 style={styles.title}>
          BillFlow
        </h1>

        <p style={styles.subtitle}>
          Login as Manager or Cashier
        </p>

        {/* ROLE BUTTONS */}

        <div style={styles.roleContainer}>
          {/* MANAGER */}

          <button
            type="button"
            onClick={() =>
              setRole("manager")
            }
            style={{
              ...styles.roleButton,

              background:
                role === "manager"
                  ? "#4f46e5"
                  : "#e5e7eb",

              color:
                role === "manager"
                  ? "white"
                  : "#111827",
            }}
          >
            Manager
          </button>

          {/* CASHIER */}

          <button
            type="button"
            onClick={() =>
              setRole("cashier")
            }
            style={{
              ...styles.roleButton,

              background:
                role === "cashier"
                  ? "#10b981"
                  : "#e5e7eb",

              color:
                role === "cashier"
                  ? "white"
                  : "#111827",
            }}
          >
            Cashier
          </button>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleLogin}
        >
          {/* EMAIL */}

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            style={styles.input}
            required
          />

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            style={styles.input}
            required
          />

          {/* LOGIN */}

          <button
            type="submit"
            style={{
              ...styles.loginButton,

              background:
                role === "manager"
                  ? "#4f46e5"
                  : "#10b981",
            }}
          >
            Login as{" "}
            {role === "manager"
              ? "Manager"
              : "Cashier"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    background: "#f3f4f6",

    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",

    background: "white",

    padding: "40px",

    borderRadius: "24px",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.08)",
  },

  title: {
    textAlign: "center",

    fontSize: "40px",

    fontWeight: "800",

    color: "#4f46e5",

    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",

    color: "#6b7280",

    marginBottom: "30px",
  },

  roleContainer: {
    display: "flex",

    gap: "15px",

    marginBottom: "25px",
  },

  roleButton: {
    flex: 1,

    padding: "14px",

    border: "none",

    borderRadius: "14px",

    cursor: "pointer",

    fontWeight: "700",

    fontSize: "15px",
  },

  input: {
    width: "100%",

    padding: "15px",

    marginBottom: "20px",

    borderRadius: "14px",

    border:
      "1px solid #d1d5db",

    outline: "none",

    fontSize: "15px",

    boxSizing: "border-box",
  },

  loginButton: {
    width: "100%",

    padding: "15px",

    border: "none",

    borderRadius: "14px",

    color: "white",

    fontWeight: "700",

    fontSize: "16px",

    cursor: "pointer",
  },
};

export default LoginPage;