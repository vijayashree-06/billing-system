// src/pages/SettingsPage.jsx

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  FaUndo,
  FaExclamationTriangle,
} from "react-icons/fa";

const INITIAL_SETTINGS = {
  name: "Vijayashree",
  email: "vijayashree@gmail.com",
  phone: "+91 9876543210",
  password: "12345678",
  darkMode: false,
  notifications: true,
  avatar: null,
};

function SettingsPage() {
  const fileInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Track current settings and clean baseline settings for deep comparison
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [baselineSettings, setBaselineSettings] = useState(INITIAL_SETTINGS);
  const [isFocused, setIsFocused] = useState("");

  // Responsive Viewport Resize Listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Apply Dark Mode Class / Body Background
  useEffect(() => {
    document.body.style.background = settings.darkMode ? "#0b0f19" : "#f8fafc";
    document.body.style.transition = "background 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
  }, [settings.darkMode]);

  // Determine if the form state has been modified
  const hasUnsavedChanges = JSON.stringify(settings) !== JSON.stringify(baselineSettings);

  // Password Strength Calculation Logic
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, text: "Empty", color: "#64748b" };
    if (pwd.length < 6) return { score: 1, text: "Weak", color: "#ef4444" };
    if (pwd.length < 10) return { score: 2, text: "Medium", color: "#f59e0b" };
    return { score: 3, text: "Strong", color: "#10b981" };
  };

  const pwdStrength = getPasswordStrength(settings.password);

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
    setBaselineSettings(settings); // Lock in changes as new baseline
    alert("Settings Saved Successfully!");
  };

  const handleReset = () => {
    setSettings(baselineSettings);
  };

  // Dynamic Theme Styling Variables
  const primaryColor = "linear-gradient(135deg, #4f46e5, #7c3aed)";
  const bgColor = settings.darkMode ? "#0b0f19" : "#f8fafc";
  const cardBg = settings.darkMode ? "#111827" : "#ffffff";
  const cardBorder = settings.darkMode ? "1px solid #1f2937" : "1px solid #e2e8f0";
  const inputBg = settings.darkMode ? "#1f2937" : "#f8fafc";
  const textColor = settings.darkMode ? "#f9fafb" : "#0f172a";
  const labelColor = settings.darkMode ? "#9ca3af" : "#475569";
  const subText = settings.darkMode ? "#9ca3af" : "#64748b";
  const innerCardBg = settings.darkMode ? "#1f2937" : "#f8fafc";

  // Helper for generating dynamic input borders based on real-time focus
  const getInputBorderStyle = (name) => {
    if (isFocused === name) return "1px solid #4f46e5";
    return settings.darkMode ? "1px solid #374151" : "1px solid #e2e8f0";
  };

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: bgColor,
        overflow: "hidden",
        transition: "background 0.4s ease",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* LOCKED SIDEBAR HOUSING WRAPPER */}
      <div style={{ height: "100vh", position: "sticky", top: 0, zIndex: 100, flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* INDEPENDENT SCROLLABLE MAIN CONTENT AREA */}
      <div style={{ flex: 1, height: "100vh", overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column" }}>
        
        {/* TOP NAV GLASSMORPHISM EFFECT */}
        <div style={{ 
          position: "sticky", 
          top: 0, 
          zIndex: 90, 
          background: settings.darkMode ? "rgba(11, 15, 25, 0.8)" : "rgba(248, 250, 252, 0.8)", 
          backdropFilter: "blur(12px)", 
          borderBottom: settings.darkMode ? "1px solid rgba(31, 41, 55, 0.7)" : "1px solid rgba(226, 232, 240, 0.8)",
          transition: "background 0.4s ease, border-bottom 0.4s ease"
        }}>
          <TopNav title="Settings" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ padding: isMobile ? "20px" : "40px", maxWidth: "1200px", width: "100%", boxSizing: "border-box", margin: "0 auto" }}
        >
          
          {/* HEADER BANNER */}
          <motion.div
            variants={itemVariants}
            style={{
              background: primaryColor,
              borderRadius: "24px",
              padding: isMobile ? "24px" : "40px",
              color: "white",
              marginBottom: "32px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.25)",
            }}
          >
            <div style={{ position: "relative", zIndex: 2 }}>
              <h1 style={{ fontSize: isMobile ? "26px" : "38px", fontWeight: "800", marginBottom: "12px", margin: 0, letterSpacing: "-0.02em" }}>
                Control Panel
              </h1>
              <p style={{ opacity: 0.85, fontSize: isMobile ? "14px" : "16px", margin: 0, lineHeight: "1.6", maxWidth: "600px" }}>
                Update your account credentials, adjust preferences, and monitor workspace security.
              </p>
            </div>
            <motion.div 
              animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", top: "-20%", right: "-10%", width: "280px", height: "280px", background: "rgba(255,255,255,0.07)", borderRadius: "50%" }}
            ></motion.div>
          </motion.div>

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
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(480px, 1fr))",
              gap: "32px",
            }}
          >
            {/* PROFILE SECTION */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.06)" }}
              style={{ ...cardStyle, background: cardBg, border: cardBorder, transition: "background 0.4s ease, border 0.4s ease" }}
            >
              <div style={{ ...sectionTitle, color: textColor }}>
                <div style={{ padding: "8px", background: "rgba(79, 70, 229, 0.1)", borderRadius: "10px", display: "flex" }}>
                  <FaUser style={{ color: "#4f46e5" }} />
                </div>
                Account Profile
              </div>

              {/* AVATAR UPLOAD COMPONENT */}
              <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "28px" }}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  style={{
                    width: "88px",
                    height: "88px",
                    borderRadius: "50%",
                    background: settings.avatar ? "none" : primaryColor,
                    backgroundImage: settings.avatar ? `url(${settings.avatar})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "30px",
                    fontWeight: "700",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                    border: `3px solid ${cardBg}`,
                    flexShrink: 0,
                    transition: "border 0.4s ease"
                  }}
                >
                  {!settings.avatar && settings.name.charAt(0).toUpperCase()}
                </motion.div>

                <div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={triggerFileInput} 
                    style={{
                      ...secondaryButtonStyle, 
                      background: settings.darkMode ? "#1f2937" : "#ffffff",
                      border: settings.darkMode ? "1px solid #374151" : "1px solid #e2e8f0",
                      color: textColor,
                      transition: "background 0.4s ease, border 0.4s ease, color 0.4s ease"
                    }}
                  >
                    <FaCamera />
                    Change Photo
                  </motion.button>
                  <p style={{ margin: "8px 0 0 0", fontSize: "13px", color: subText }}>
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
                  onFocus={() => setIsFocused("name")}
                  onBlur={() => setIsFocused("")}
                  style={{ ...inputStyle, background: inputBg, border: getInputBorderStyle("name"), color: textColor }}
                />
              </div>

              <div style={formGroupStyle}>
                <label style={{ ...labelStyle, color: labelColor }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  onFocus={() => setIsFocused("email")}
                  onBlur={() => setIsFocused("")}
                  style={{ ...inputStyle, background: inputBg, border: getInputBorderStyle("email"), color: textColor }}
                />
              </div>

              <div style={formGroupStyle}>
                <label style={{ ...labelStyle, color: labelColor }}>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  onFocus={() => setIsFocused("phone")}
                  onBlur={() => setIsFocused("")}
                  style={{ ...inputStyle, background: inputBg, border: getInputBorderStyle("phone"), color: textColor }}
                />
              </div>
            </motion.div>

            {/* SECURITY & PREFERENCES SECTION */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.06)" }}
              style={{ ...cardStyle, background: cardBg, border: cardBorder, transition: "background 0.4s ease, border 0.4s ease" }}
            >
              <div style={{ ...sectionTitle, color: textColor }}>
                <div style={{ padding: "8px", background: "rgba(124, 58, 237, 0.1)", borderRadius: "10px", display: "flex" }}>
                  <FaLock style={{ color: "#7c3aed" }} />
                </div>
                Security & Preferences
              </div>

              {/* PASSWORD COMPONENT WITH STRENGTH METER */}
              <div style={formGroupStyle}>
                <label style={{ ...labelStyle, color: labelColor }}>Account Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={settings.password}
                    onChange={handleChange}
                    onFocus={() => setIsFocused("password")}
                    onBlur={() => setIsFocused("")}
                    style={{ ...inputStyle, background: inputBg, border: getInputBorderStyle("password"), color: textColor, paddingRight: "45px" }}
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
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
                  </motion.button>
                </div>
                
                {/* Dynamic Password Strength Track */}
                <div style={{ marginTop: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }}>
                    <span style={{ color: subText }}>Password Strength:</span>
                    <span style={{ color: pwdStrength.color }}>{pwdStrength.text}</span>
                  </div>
                  <div style={{ height: "6px", width: "100%", background: settings.darkMode ? "#1f2937" : "#e2e8f0", borderRadius: "10px", overflow: "hidden" }}>
                    <motion.div 
                      animate={{ 
                        width: `${(pwdStrength.score / 3) * 100}%`,
                        backgroundColor: pwdStrength.color 
                      }}
                      transition={{ type: "spring", stiffness: 80 }}
                      style={{ height: "100%" }}
                    />
                  </div>
                </div>
              </div>

              {/* PREFERENCE TOGGLES */}
              <div style={{ ...toggleCard, background: innerCardBg, border: settings.darkMode ? "1px solid #374151" : "1px solid #f1f5f9", transition: "background 0.4s ease, border 0.4s ease" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ ...toggleIconWrapperStyle, background: "rgba(79, 70, 229, 0.1)" }}><FaMoon style={{ color: "#4f46e5" }} /></div>
                  <div>
                    <h4 style={{ margin: 0, color: textColor, fontSize: "15px", fontWeight: "600" }}>Dark Mode Display</h4>
                    <p style={{ margin: "4px 0 0 0", color: subText, fontSize: "13px" }}>Optimize display properties for night usage</p>
                  </div>
                </div>
                <label style={{ position: "relative", display: "inline-block", width: "48px", height: "26px", cursor: "pointer" }}>
                  <input type="checkbox" name="darkMode" checked={settings.darkMode} onChange={handleChange} style={{ opacity: 0, width: 0, height: 0 }} />
                  <motion.span animate={{ backgroundColor: settings.darkMode ? "#10b981" : "#cbd5e1" }} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: "34px" }}>
                    <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 30 }} style={{ position: "absolute", height: "20px", width: "20px", left: settings.darkMode ? "auto" : "3px", right: settings.darkMode ? "3px" : "auto", top: "3px", backgroundColor: "white", borderRadius: "50%" }} />
                  </motion.span>
                </label>
              </div>

              <div style={{ ...toggleCard, background: innerCardBg, border: settings.darkMode ? "1px solid #374151" : "1px solid #f1f5f9", transition: "background 0.4s ease, border 0.4s ease" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ ...toggleIconWrapperStyle, background: "rgba(245, 158, 11, 0.1)" }}><FaBell style={{ color: "#f59e0b" }} /></div>
                  <div>
                    <h4 style={{ margin: 0, color: textColor, fontSize: "15px", fontWeight: "600" }}>Push Notifications</h4>
                    <p style={{ margin: "4px 0 0 0", color: subText, fontSize: "13px" }}>Receive real-time system adjustments</p>
                  </div>
                </div>
                <label style={{ position: "relative", display: "inline-block", width: "48px", height: "26px", cursor: "pointer" }}>
                  <input type="checkbox" name="notifications" checked={settings.notifications} onChange={handleChange} style={{ opacity: 0, width: 0, height: 0 }} />
                  <motion.span animate={{ backgroundColor: settings.notifications ? "#10b981" : "#cbd5e1" }} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: "34px" }}>
                    <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 30 }} style={{ position: "absolute", height: "20px", width: "20px", left: settings.notifications ? "auto" : "3px", right: settings.notifications ? "3px" : "auto", top: "3px", backgroundColor: "white", borderRadius: "50%" }} />
                  </motion.span>
                </label>
              </div>
            </motion.div>
          </div>

          {/* LOWER ACTION BAR CONFIGURATION */}
          <motion.div
            variants={itemVariants}
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "20px",
              borderTop: cardBorder,
              paddingTop: "24px",
              marginBottom: "60px",
              transition: "border-top 0.4s ease"
            }}
          >
            {hasUnsavedChanges && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                style={{ ...secondaryButtonStyle, border: "none", background: "transparent", color: "#ef4444" }}
              >
                <FaUndo />
                Reset Changes
              </motion.button>
            )}

            <motion.button 
              whileHover={{ scale: 1.02, opacity: 0.95 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave} 
              style={{ ...primaryButtonStyle, background: primaryColor }}
            >
              <FaSave />
              Save Layout Changes
            </motion.button>
          </motion.div>

        </motion.div>
      </div>

      {/* FLOATING UNSAVED CHANGES NOTIFICATION TOAST BAR */}
      <AnimatePresence>
        {hasUnsavedChanges && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            style={{
              position: "fixed",
              bottom: "24px",
              left: isMobile ? "20px" : "calc(50% + 130px)", // Offsets centered layout beautifully against sidebar
              transform: isMobile ? "none" : "translateX(-50%)",
              right: isMobile ? "20px" : "auto",
              background: "#1e1b4b",
              border: "1px solid #4338ca",
              padding: "14px 24px",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <FaExclamationTriangle style={{ color: "#f59e0b", fontSize: "16px" }} />
              <span style={{ color: "#e0e7ff", fontSize: "14px", fontWeight: "500" }}>
                Careful! You have unsaved configuration updates.
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              style={{
                background: "#4f46e5",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "13px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)",
              }}
            >
              Save Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* BASE STYLES OBJECTS */

const cardStyle = {
  borderRadius: "24px",
  padding: "32px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.03)",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const sectionTitle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "20px",
  fontWeight: "700",
  marginBottom: "32px",
};

const formGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginBottom: "24px",
  width: "100%",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: "600",
  letterSpacing: "0.01em",
};

const inputStyle = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: "12px",
  outline: "none",
  fontSize: "15px",
  boxSizing: "border-box",
  transition: "all 0.2s ease",
};

const toggleCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  borderRadius: "16px",
  marginBottom: "16px",
};

const toggleIconWrapperStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
  flexShrink: 0,
};

const primaryButtonStyle = {
  border: "none",
  padding: "14px 28px",
  borderRadius: "14px",
  color: "white",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  boxShadow: "0 4px 14px rgba(79, 70, 229, 0.35)",
  transition: "all 0.2s ease",
};

const secondaryButtonStyle = {
  padding: "12px 20px",
  borderRadius: "12px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontWeight: "600",
  fontSize: "14px",
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
};

export default SettingsPage;