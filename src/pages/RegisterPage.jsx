// src/pages/RegisterPage.jsx

import { useState } from "react";

import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "cashier",
    });

  const handleRegister = (e) => {
    e.preventDefault();

    // SAVE USER

    localStorage.setItem(
      "user",
      JSON.stringify(formData)
    );

    alert(
      "Registration Successful!"
    );

    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent:
          "center",
        alignItems: "center",
        background:
          "linear-gradient(to right,#4f46e5,#7c3aed)",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "white",
          padding: "40px",
          borderRadius: "24px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "800",
            textAlign: "center",
            marginBottom: "10px",
            color: "#111827",
          }}
        >
          Register
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginBottom: "30px",
          }}
        >
          Create your account
        </p>

        {/* NAME */}

        <input
          type="text"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          style={inputStyle}
        />

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          style={inputStyle}
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password:
                e.target.value,
            })
          }
          style={inputStyle}
        />

        {/* ROLE */}

        <select
          value={formData.role}
          onChange={(e) =>
            setFormData({
              ...formData,
              role: e.target.value,
            })
          }
          style={inputStyle}
        >
          <option value="cashier">
            Cashier
          </option>

          <option value="manager">
            Manager
          </option>
        </select>

        {/* BUTTON */}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "14px",
            background: "#4f46e5",
            color: "white",
            fontWeight: "700",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Register
        </button>

        {/* LOGIN */}

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#6b7280",
          }}
        >
          Already have an account?{" "}
          <span
            onClick={() =>
              navigate("/login")
            }
            style={{
              color: "#4f46e5",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  border:
    "1px solid #d1d5db",
  borderRadius: "12px",
  marginBottom: "18px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

export default RegisterPage;