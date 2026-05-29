// src/pages/SettingsPage.jsx

import { useEffect, useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";

import {
  FaUser,
  FaLock,
  FaBell,
  FaMoon,
  FaPalette,
  FaEye,
  FaEyeSlash,
  FaSave,
  FaCamera,
} from "react-icons/fa";

function SettingsPage() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [settings, setSettings] =
    useState({
      name: "Vijayashree",
      email: "vijayashree@gmail.com",
      phone: "+91 9876543210",
      password: "12345678",
      darkMode: false,
      notifications: true,
      theme: "Purple",
    });

  // THEME COLORS

  const themeColors = {
    Purple:
      "linear-gradient(to right,#4f46e5,#7c3aed)",

    Blue:
      "linear-gradient(to right,#2563eb,#06b6d4)",

    Green:
      "linear-gradient(to right,#16a34a,#10b981)",

    Orange:
      "linear-gradient(to right,#f97316,#f59e0b)",
  };

  // APPLY DARK MODE

  useEffect(() => {
    document.body.style.background =
      settings.darkMode
        ? "#111827"
        : "#f3f4f6";

    document.body.style.transition =
      "0.3s";
  }, [settings.darkMode]);

  // HANDLE CHANGE

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setSettings({
      ...settings,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  // SAVE

  const handleSave = () => {
    alert(
      "Settings Saved Successfully"
    );
  };

  // COLORS

  const currentTheme =
    themeColors[settings.theme];

  const bgColor =
    settings.darkMode
      ? "#111827"
      : "#f3f4f6";

  const cardBg =
    settings.darkMode
      ? "#1f2937"
      : "white";

  const textColor =
    settings.darkMode
      ? "white"
      : "#111827";

  const subText =
    settings.darkMode
      ? "#9ca3af"
      : "#6b7280";

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: bgColor,
        overflowX: "hidden",
        transition: "0.3s",
      }}
    >
      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <TopNav title="Settings" />

        <div
          style={{
            padding: "20px",
          }}
        >
          {/* HEADER */}

          <div
            style={{
              background:
                currentTheme,
              borderRadius: "24px",
              padding: "30px",
              color: "white",
              marginBottom: "20px",
            }}
          >
            <h1
              style={{
                fontSize:
                  "clamp(28px,5vw,42px)",
                marginBottom: "10px",
              }}
            >
              Settings
            </h1>

            <p
              style={{
                opacity: 0.9,
              }}
            >
              Manage your account,
              preferences and system
              settings
            </p>
          </div>

          {/* GRID */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(320px,1fr))",
              gap: "20px",
            }}
          >
            {/* PROFILE */}

            <div
              style={{
                ...cardStyle,
                background: cardBg,
              }}
            >
              <div
                style={{
                  ...sectionTitle,
                  color: textColor,
                }}
              >
                <FaUser />
                Profile Settings
              </div>

              {/* AVATAR */}

              <div
                style={{
                  display: "flex",
                  flexDirection:
                    "column",
                  alignItems:
                    "center",
                  marginBottom:
                    "25px",
                }}
              >
                <div
                  style={{
                    width: "110px",
                    height: "110px",
                    borderRadius:
                      "50%",
                    background:
                      currentTheme,
                    display: "flex",
                    justifyContent:
                      "center",
                    alignItems:
                      "center",
                    color: "white",
                    fontSize: "36px",
                    fontWeight:
                      "700",
                    marginBottom:
                      "14px",
                  }}
                >
                  V
                </div>

                <button
                  style={{
                    border: "none",
                    padding:
                      "10px 18px",
                    borderRadius:
                      "12px",
                    background:
                      "#eef2ff",
                    color:
                      "#4f46e5",
                    cursor: "pointer",
                    display: "flex",
                    alignItems:
                      "center",
                    gap: "8px",
                    fontWeight:
                      "600",
                  }}
                >
                  <FaCamera />
                  Change Photo
                </button>
              </div>

              <input
                type="text"
                name="name"
                value={settings.name}
                onChange={
                  handleChange
                }
                style={{
                  ...inputStyle,
                  background:
                    settings.darkMode
                      ? "#374151"
                      : "white",
                  color: textColor,
                  border:
                    settings.darkMode
                      ? "1px solid #4b5563"
                      : "1px solid #d1d5db",
                }}
              />

              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={
                  handleChange
                }
                style={{
                  ...inputStyle,
                  background:
                    settings.darkMode
                      ? "#374151"
                      : "white",
                  color: textColor,
                  border:
                    settings.darkMode
                      ? "1px solid #4b5563"
                      : "1px solid #d1d5db",
                }}
              />

              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={
                  handleChange
                }
                style={{
                  ...inputStyle,
                  background:
                    settings.darkMode
                      ? "#374151"
                      : "white",
                  color: textColor,
                  border:
                    settings.darkMode
                      ? "1px solid #4b5563"
                      : "1px solid #d1d5db",
                }}
              />
            </div>

            {/* SECURITY */}

            <div
              style={{
                ...cardStyle,
                background: cardBg,
              }}
            >
              <div
                style={{
                  ...sectionTitle,
                  color: textColor,
                }}
              >
                <FaLock />
                Security
              </div>

              <div
                style={{
                  position:
                    "relative",
                }}
              >
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={
                    settings.password
                  }
                  onChange={
                    handleChange
                  }
                  style={{
                    ...inputStyle,
                    background:
                      settings.darkMode
                        ? "#374151"
                        : "white",
                    color:
                      textColor,
                    border:
                      settings.darkMode
                        ? "1px solid #4b5563"
                        : "1px solid #d1d5db",
                  }}
                />

                <button
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  style={{
                    position:
                      "absolute",
                    top: "50%",
                    right: "14px",
                    transform:
                      "translateY(-50%)",
                    border: "none",
                    background:
                      "transparent",
                    cursor: "pointer",
                    color:
                      subText,
                    fontSize: "18px",
                  }}
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>

              {/* DARK MODE */}

              <div
                style={{
                  ...toggleCard,
                  background:
                    settings.darkMode
                      ? "#374151"
                      : "#f9fafb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    gap: "12px",
                  }}
                >
                  <FaMoon
                    style={{
                      color:
                        "#4f46e5",
                    }}
                  />

                  <div>
                    <h4
                      style={{
                        margin: 0,
                        color:
                          textColor,
                      }}
                    >
                      Dark Mode
                    </h4>

                    <p
                      style={{
                        margin:
                          "6px 0 0 0",
                        color:
                          subText,
                        fontSize:
                          "14px",
                      }}
                    >
                      Enable dark
                      theme
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  name="darkMode"
                  checked={
                    settings.darkMode
                  }
                  onChange={
                    handleChange
                  }
                  style={{
                    width: "22px",
                    height: "22px",
                  }}
                />
              </div>

              {/* NOTIFICATIONS */}

              <div
                style={{
                  ...toggleCard,
                  background:
                    settings.darkMode
                      ? "#374151"
                      : "#f9fafb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    gap: "12px",
                  }}
                >
                  <FaBell
                    style={{
                      color:
                        "#f59e0b",
                    }}
                  />

                  <div>
                    <h4
                      style={{
                        margin: 0,
                        color:
                          textColor,
                      }}
                    >
                      Notifications
                    </h4>

                    <p
                      style={{
                        margin:
                          "6px 0 0 0",
                        color:
                          subText,
                        fontSize:
                          "14px",
                      }}
                    >
                      Receive updates
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  name="notifications"
                  checked={
                    settings.notifications
                  }
                  onChange={
                    handleChange
                  }
                  style={{
                    width: "22px",
                    height: "22px",
                  }}
                />
              </div>
            </div>

            {/* THEME */}

            <div
              style={{
                ...cardStyle,
                background: cardBg,
              }}
            >
              <div
                style={{
                  ...sectionTitle,
                  color: textColor,
                }}
              >
                <FaPalette />
                Theme Settings
              </div>

              <label
                style={{
                  fontWeight: "600",
                  color: textColor,
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                Select Theme
              </label>

              <select
                name="theme"
                value={settings.theme}
                onChange={
                  handleChange
                }
                style={{
                  ...inputStyle,
                  background:
                    settings.darkMode
                      ? "#374151"
                      : "white",
                  color: textColor,
                  border:
                    settings.darkMode
                      ? "1px solid #4b5563"
                      : "1px solid #d1d5db",
                }}
              >
                <option>
                  Purple
                </option>

                <option>
                  Blue
                </option>

                <option>
                  Green
                </option>

                <option>
                  Orange
                </option>
              </select>

              {/* PREVIEW */}

              <div
                style={{
                  marginTop: "25px",
                }}
              >
                <p
                  style={{
                    color:
                      textColor,
                    marginBottom:
                      "12px",
                    fontWeight:
                      "600",
                  }}
                >
                  Theme Preview
                </p>

                <div
                  style={{
                    height: "120px",
                    borderRadius:
                      "20px",
                    background:
                      currentTheme,
                    display: "flex",
                    justifyContent:
                      "center",
                    alignItems:
                      "center",
                    color: "white",
                    fontSize: "24px",
                    fontWeight:
                      "700",
                    boxShadow:
                      "0 10px 25px rgba(0,0,0,0.15)",
                  }}
                >
                  {settings.theme}
                  Theme
                </div>
              </div>
            </div>
          </div>

          {/* SAVE */}

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent:
                "flex-end",
            }}
          >
            <button
              onClick={handleSave}
              style={{
                border: "none",
                padding:
                  "15px 28px",
                borderRadius:
                  "16px",
                background:
                  currentTheme,
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems:
                  "center",
                gap: "10px",
              }}
            >
              <FaSave />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* STYLES */

const cardStyle = {
  borderRadius: "24px",
  padding: "24px",
  boxShadow:
    "0 4px 15px rgba(0,0,0,0.08)",
};

const sectionTitle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "20px",
  fontWeight: "700",
  marginBottom: "24px",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "16px",
  borderRadius: "14px",
  outline: "none",
  fontSize: "15px",
  boxSizing: "border-box",
};

const toggleCard = {
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
  padding: "18px",
  borderRadius: "18px",
  marginBottom: "18px",
};

export default SettingsPage;