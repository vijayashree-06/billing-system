// src/pages/SettingsPage.jsx

import { useEffect, useState, useRef } from "react";
import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";

import {
  FaUser,
  FaLock,
  FaBell,
  FaMoon,
  FaEye,
  FaEyeSlash,
  FaSave,
  FaCamera,
} from "react-icons/fa";

function SettingsPage() {
  const fileInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const [settings, setSettings] = useState({
    name: "Vijayashree",
    email: "vijayashree@gmail.com",
    phone: "+91 9876543210",
    password: "12345678",
    darkMode: false,
    notifications: true,
    avatar: null, // Stores the uploaded image data URL
  });

  // Apply Dark Mode Class / Body Background
  useEffect(() => {
    document.body.style.background = settings.darkMode ? "#0b0f19" : "#f8fafc";
    document.body.style.transition = "background 0.3s ease";
  }, [settings.darkMode]);

  // Handle Standard Controlled Form Inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Photo Uploading & FileReader Processing
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    // Implement API save pipeline here
    alert("Settings Saved Successfully!");
  };

  // Dynamic Theme Styling Variables
  const primaryColor = "linear-gradient(135deg, #4f46e5, #6366f1)";
  const bgColor = settings.darkMode ? "#0b0f19" : "#f8fafc";
  const cardBg = settings.darkMode ? "#111827" : "#ffffff";
  const cardBorder = settings.darkMode ? "1px solid #1f2937" : "1px solid #e2e8f0";
  const inputBg = settings.darkMode ? "#1f2937" : "#f1f5f9";
  const inputBorder = settings.darkMode ? "1px solid #374151" : "1px solid #cbd5e1";
  const textColor = settings.darkMode ? "#f9fafb" : "#0f172a";
  const labelColor = settings.darkMode ? "#9ca3af" : "#475569";
  const subText = settings.darkMode ? "#9ca3af" : "#64748b";
  const innerCardBg = settings.darkMode ? "#1f2937" : "#f8fafc";

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: bgColor,
        overflowX: "hidden",
        transition: "all 0.3s ease",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <TopNav title="Settings" />

        <div style={{ padding: "40px 30px", maxWidth: "1200px", margin: "0 auto" }}>
          
          {/* HEADER HERO */}
          <div
            style={{
              background: primaryColor,
              borderRadius: "20px",
              padding: "40px",
              color: "white",
              marginBottom: "32px",
              boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.2)",
            }}
          >
            <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "8px", margin: 0 }}>
              Control Panel
            </h1>
            <p style={{ opacity: 0.85, fontSize: "16px", margin: 0 }}>
              Update your account credentials, adjust preferences, and monitor workspace security.
            </p>
          </div>

          {/* HIDDEN FILE INPUT FOR PHOTO UPLOADS */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoChange}
            accept="image/*"
            style={{ display: "none" }}
          />

          {/* SETTINGS GRID CONFIGURATION */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
              gap: "32px",
            }}
          >
            {/* PROFILE SECTION */}
            <div style={{ ...cardStyle, background: cardBg, border: cardBorder }}>
              <div style={{ ...sectionTitle, color: textColor }}>
                <FaUser style={{ color: "#4f46e5" }} />
                Account Profile
              </div>

              {/* AVATAR UPLOAD COMPONENT */}
              <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "32px" }}>
                <div
                  style={{
                    width: "96px",
                    height: "96px",
                    borderRadius: "50%",
                    background: settings.avatar ? "none" : primaryColor,
                    backgroundImage: settings.avatar ? `url(${settings.avatar})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "32px",
                    fontWeight: "600",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    border: `3px solid ${cardBg}`,
                    flexShrink: 0,
                  }}
                >
                  {!settings.avatar && settings.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <button onClick={triggerFileInput} style={secondaryButtonStyle}>
                    <FaCamera />
                    Change Photo
                  </button>
                  <p style={{ margin: "6px 0 0 0", fontSize: "13px", color: subText }}>
                    JPG, GIF or PNG. Max size of 2MB.
                  </p>
                </div>
              </div>

              {/* PROFILE FORM FIELD BLOCKS */}
              <div style={formGroupStyle}>
                <label style={{ ...labelStyle, color: labelColor }}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={settings.name}
                  onChange={handleChange}
                  style={{ ...inputStyle, background: inputBg, border: inputBorder, color: textColor }}
                />
              </div>

              <div style={formGroupStyle}>
                <label style={{ ...labelStyle, color: labelColor }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  style={{ ...inputStyle, background: inputBg, border: inputBorder, color: textColor }}
                />
              </div>

              <div style={formGroupStyle}>
                <label style={{ ...labelStyle, color: labelColor }}>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  style={{ ...inputStyle, background: inputBg, border: inputBorder, color: textColor }}
                />
              </div>
            </div>

            {/* SECURITY & PREFERENCES SECTION */}
            <div style={{ ...cardStyle, background: cardBg, border: cardBorder }}>
              <div style={{ ...sectionTitle, color: textColor }}>
                <FaLock style={{ color: "#4f46e5" }} />
                Security & Preferences
              </div>

              {/* PASSWORD COMPONENT BLOCK */}
              <div style={formGroupStyle}>
                <label style={{ ...labelStyle, color: labelColor }}>Account Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={settings.password}
                    onChange={handleChange}
                    style={{ ...inputStyle, background: inputBg, border: inputBorder, color: textColor, paddingRight: "45px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "16px",
                      transform: "translateY(-50%)",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      color: subText,
                      fontSize: "16px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* PREFERENCE TOGGLES */}
              <div style={{ ...toggleCard, background: innerCardBg }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={toggleIconWrapperStyle}><FaMoon style={{ color: "#4f46e5" }} /></div>
                  <div>
                    <h4 style={{ margin: 0, color: textColor, fontSize: "15px", fontWeight: "600" }}>Dark Mode Display</h4>
                    <p style={{ margin: "4px 0 0 0", color: subText, fontSize: "13px" }}>Optimize display properties for night usage</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={settings.darkMode}
                  onChange={handleChange}
                  style={checkboxStyle}
                />
              </div>

              <div style={{ ...toggleCard, background: innerCardBg }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={toggleIconWrapperStyle}><FaBell style={{ color: "#f59e0b" }} /></div>
                  <div>
                    <h4 style={{ margin: 0, color: textColor, fontSize: "15px", fontWeight: "600" }}>Push Notifications</h4>
                    <p style={{ margin: "4px 0 0 0", color: subText, fontSize: "13px" }}>Receive real-time system adjustments</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                  style={checkboxStyle}
                />
              </div>
            </div>
          </div>

          {/* LOWER FORM PERSISTENCE ACTION BAR */}
          <div
            style={{
              marginTop: "32px",
              display: "flex",
              justifyContent: "flex-end",
              borderTop: cardBorder,
              paddingTop: "24px",
            }}
          >
            <button onClick={handleSave} style={{ ...primaryButtonStyle, background: primaryColor }}>
              <FaSave />
              Save Layout Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* STYLES OBJECTS */

const cardStyle = {
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const sectionTitle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "28px",
};

const formGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginBottom: "20px",
  width: "100%",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: "500",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "10px",
  outline: "none",
  fontSize: "15px",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const toggleCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  borderRadius: "12px",
  marginBottom: "16px",
};

const toggleIconWrapperStyle = {
  width: "36px",
  height: "36px",
  borderRadius: "8px",
  background: "rgba(79, 70, 229, 0.08)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  flexShrink: 0,
};

const checkboxStyle = {
  width: "40px",
  height: "20px",
  cursor: "pointer",
  accentColor: "#4f46e5",
};

const primaryButtonStyle = {
  border: "none",
  padding: "14px 28px",
  borderRadius: "10px",
  color: "white",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  boxShadow: "0 4px 12px rgba(79, 70, 229, 0.15)",
  transition: "opacity 0.2s ease",
};

const secondaryButtonStyle = {
  border: "1px solid #e2e8f0",
  padding: "10px 16px",
  borderRadius: "8px",
  background: "#ffffff",
  color: "#334155",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontWeight: "600",
  fontSize: "14px",
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
};

export default SettingsPage;