// src/pages/SettingsPage.jsx

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";

import {
  FaUser,
  FaLock,
  FaBell,
  FaEye,
  FaEyeSlash,
  FaSave,
  FaCamera,
  FaUndo,
  FaExclamationTriangle,
  FaSlidersH,
  FaGlobe,
  FaKey,
  FaDesktop,
} from "react-icons/fa";

const INITIAL_SETTINGS = {
  // Identity
  name: "Vijayashree",
  email: "vijayashree@gmail.com",
  phone: "+91 9876543210",
  role: "Lead Product Manager",
  timezone: "GMT+5:30 (IST)",
  avatar: null,
  
  // Security
  password: "12345678",
  twoFactor: false,
  apiKey: "pk_live_51Nx...zM92a",
  
  // Telemetry
  notifications: true,
  emailDigests: true,
  slackIntegration: false,
  
  // Preferences
  theme: "Cyber Glow",
  density: "Comfortable",
  defaultRoute: "Analytics Overview",
};

function SettingsPage() {
  const fileInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [keyVisible, setKeyVisible] = useState(false);
  
  // State Engine Baseline Trackers
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [baselineSettings, setBaselineSettings] = useState(INITIAL_SETTINGS);
  const [isFocused, setIsFocused] = useState("");

  // Responsive Viewport Resize Listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine structural state divergence
  const hasUnsavedChanges = JSON.stringify(settings) !== JSON.stringify(baselineSettings);

  // Cryptographic calculation logic
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, text: "Empty", color: "#64748b" };
    if (pwd.length < 6) return { score: 1, text: "Weak", color: "#ef4444" };
    if (pwd.length < 10) return { score: 2, text: "Medium", color: "#f59e0b" };
    return { score: 3, text: "Strong", color: "#34d399" };
  };

  const pwdStrength = getPasswordStrength(settings.password);

  // Standard Change Mutation Interceptor
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Profile File Reader Streaming
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();
  const handleSave = () => {
    setBaselineSettings(settings);
    alert("System Matrix Configurations Saved Locally!");
  };
  const handleReset = () => setSettings(baselineSettings);

  // Dynamic Hex Design System Palette
  const primaryColor = "linear-gradient(135deg, #6366f1, #a855f7)";
  const pageBgColor = "#0b0c16"; 
  const cardBg = "rgba(22, 23, 43, 0.75)";
  const cardBorder = "1px solid rgba(255, 255, 255, 0.05)";
  const inputBg = "#1d1f3b";
  const textColor = "#ffffff";
  const labelColor = "#9ca3af";
  const subText = "#9ca3af";
  const innerCardBg = "rgba(255, 255, 255, 0.02)";

  const getInputBorderStyle = (name) => {
    if (isFocused === name) return "1px solid #6366f1";
    return "1px solid rgba(255, 255, 255, 0.08)";
  };

  // Animation Framework Declarations
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.08, ease: "easeOut" }
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
        background: pageBgColor,
        overflow: "hidden",
        position: "relative",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* GLOW DECORATORS */}
      <div style={styles.ambientBlob1}></div>
      <div style={styles.ambientBlob2}></div>

      {/* DASHBOARD NAVIGATION COLUMN CONTAINER */}
      <div style={{ height: "100vh", position: "sticky", top: 0, zIndex: 100, flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* MAIN DATA SCROLL CANVAS */}
      <div style={{ flex: 1, height: "100vh", overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
        
        <div style={{ 
          position: "sticky", 
          top: 0, 
          zIndex: 90, 
          background: "rgba(11, 12, 22, 0.7)", 
          backdropFilter: "blur(16px)", 
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}>
          <TopNav title="Settings" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ padding: isMobile ? "20px" : "40px", maxWidth: "1400px", width: "100%", boxSizing: "border-box", margin: "0 auto" }}
        >
          
          {/* HERO PREFERENCES HEADER */}
          <motion.div
            variants={itemVariants}
            style={{
              background: "linear-gradient(135deg, rgba(26, 28, 54, 0.95), rgba(18, 19, 38, 0.95))",
              border: cardBorder,
              borderRadius: "24px",
              padding: isMobile ? "24px" : "40px",
              color: "white",
              marginBottom: "32px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div style={{ position: "relative", zIndex: 2 }}>
              <span style={styles.topBadge}>WORKSPACE CONTROL HUB</span>
              <h1 style={{ fontSize: isMobile ? "26px" : "34px", fontWeight: "800", marginBottom: "12px", margin: 0, letterSpacing: "-0.02em" }}>
                Control Panel & Preferences
              </h1>
              <p style={{ color: "#9ca3af", fontSize: isMobile ? "14px" : "15px", margin: 0, lineHeight: "1.6", maxWidth: "600px" }}>
                Calibrate global deployment metrics, change user telemetry filters, and adjust platform node behaviors.
              </p>
            </div>
            <div style={{ position: "absolute", top: "-20%", right: "-5%", width: "320px", height: "320px", background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", borderRadius: "50%", opacity: 0.2 }}></div>
          </motion.div>

          <input type="file" ref={fileInputRef} onChange={handlePhotoChange} accept="image/*" style={{ display: "none" }} />

          {/* FOUR-CARD GRID LAYOUT MATRIX */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: "32px",
            }}
          >
            {/* MODULE 1: IDENTITY ACCESS */}
            <motion.div variants={itemVariants} style={{ ...cardStyle, background: cardBg, border: cardBorder, backdropFilter: "blur(20px)" }}>
              <img src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80" alt="Workspace Decorator" style={styles.cardDecorativeImage} />
              
              <div style={{ ...sectionTitle, color: textColor }}>
                <div style={{ padding: "8px", background: "rgba(99, 102, 241, 0.15)", borderRadius: "10px", display: "flex" }}><FaUser style={{ color: "#818cf8" }} /></div>
                Account Identity Token
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "24px" }}>
                <div style={{
                  width: "72px", height: "72px", borderRadius: "50%",
                  background: settings.avatar ? "none" : primaryColor,
                  backgroundImage: settings.avatar ? `url(${settings.avatar})` : "none",
                  backgroundSize: "cover", backgroundPosition: "center",
                  display: "flex", justifyContent: "center", alignItems: "center",
                  color: "white", fontSize: "24px", fontWeight: "700", border: "3px solid #16172b", flexShrink: 0
                }}>
                  {!settings.avatar && settings.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <button onClick={triggerFileInput} style={{ ...secondaryButtonStyle, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: textColor }}>
                    <FaCamera style={{ color: "#a5b4fc" }} /> Change Photo
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Identity Alias</label>
                  <input type="text" name="name" value={settings.name} onChange={handleChange} onFocus={() => setIsFocused("name")} onBlur={() => setIsFocused("")} style={{ ...inputStyle, background: inputBg, border: getInputBorderStyle("name"), color: textColor }} />
                </div>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>System Role</label>
                  <input type="text" name="role" value={settings.role} onChange={handleChange} onFocus={() => setIsFocused("role")} onBlur={() => setIsFocused("")} style={{ ...inputStyle, background: inputBg, border: getInputBorderStyle("role"), color: textColor }} />
                </div>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Endpoint Email</label>
                <input type="email" name="email" value={settings.email} onChange={handleChange} onFocus={() => setIsFocused("email")} onBlur={() => setIsFocused("")} style={{ ...inputStyle, background: inputBg, border: getInputBorderStyle("email"), color: textColor }} />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}><FaGlobe style={{ marginRight: "6px" }} /> System Localization Zone</label>
                <select name="timezone" value={settings.timezone} onChange={handleChange} style={{ ...inputStyle, background: inputBg, border: "1px solid rgba(255,255,255,0.08)", color: textColor, cursor: "pointer" }}>
                  <option value="GMT+5:30 (IST)">GMT+5:30 (IST) - New Delhi</option>
                  <option value="GMT-8:00 (PST)">GMT-8:00 (PST) - San Francisco</option>
                  <option value="GMT+0:00 (UTC)">GMT+0:00 (UTC) - London</option>
                </select>
              </div>
            </motion.div>

            {/* MODULE 2: CRYPTOGRAPHIC CRYPTO CREDENTIALS */}
            <motion.div variants={itemVariants} style={{ ...cardStyle, background: cardBg, border: cardBorder, backdropFilter: "blur(20px)" }}>
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80" alt="Security Grid" style={styles.cardDecorativeImage} />
              
              <div style={{ ...sectionTitle, color: textColor }}>
                <div style={{ padding: "8px", background: "rgba(168, 85, 247, 0.15)", borderRadius: "10px", display: "flex" }}><FaLock style={{ color: "#c084fc" }} /></div>
                Security Protocol Crypts
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Master Access Password</label>
                <div style={{ position: "relative" }}>
                  <input type={showPassword ? "text" : "password"} name="password" value={settings.password} onChange={handleChange} onFocus={() => setIsFocused("password")} onBlur={() => setIsFocused("")} style={{ ...inputStyle, background: inputBg, border: getInputBorderStyle("password"), color: textColor, paddingRight: "45px" }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeToggleButton}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: "700", marginBottom: "6px" }}>
                    <span style={{ color: subText }}>COMPLEXITY RATING:</span>
                    <span style={{ color: pwdStrength.color }}>{pwdStrength.text.toUpperCase()}</span>
                  </div>
                  <div style={{ height: "4px", width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: "10px", overflow: "hidden" }}>
                    <motion.div animate={{ width: `${(pwdStrength.score / 3) * 100}%`, backgroundColor: pwdStrength.color }} style={{ height: "100%" }} />
                  </div>
                </div>
              </div>

              <div style={{ ...toggleCard, background: innerCardBg, border: "1px solid rgba(255,255,255,0.03)", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ ...miniIconBox, background: "rgba(16, 185, 129, 0.15)" }}><FaKey style={{ color: "#34d399" }} /></div>
                  <div>
                    <h4 style={{ margin: 0, color: textColor, fontSize: "13px", fontWeight: "600" }}>Two-Factor Authentication (2FA)</h4>
                    <p style={{ margin: "2px 0 0 0", color: subText, fontSize: "11px" }}>Secure account with a hardware encryption token.</p>
                  </div>
                </div>
                <label style={styles.switchLabel}>
                  <input type="checkbox" name="twoFactor" checked={settings.twoFactor} onChange={handleChange} style={styles.switchHiddenInput} />
                  <motion.span animate={{ backgroundColor: settings.twoFactor ? "#10b981" : "rgba(255,255,255,0.1)" }} style={styles.switchTrack}>
                    <motion.span layout style={{ ...styles.switchThumb, left: settings.twoFactor ? "auto" : "3px", right: settings.twoFactor ? "3px" : "auto" }} />
                  </motion.span>
                </label>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Workspace Deployment API Key</label>
                <div style={{ position: "relative" }}>
                  <input type={keyVisible ? "text" : "password"} value={settings.apiKey} readOnly style={{ ...inputStyle, background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.04)", color: "#a5b4fc", fontFamily: "monospace", fontSize: "12px" }} />
                  <button type="button" onClick={() => setKeyVisible(!keyVisible)} style={styles.eyeToggleButton}>
                    {keyVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* MODULE 3: TELEMETRY SIGNALS */}
            <motion.div variants={itemVariants} style={{ ...cardStyle, background: cardBg, border: cardBorder, backdropFilter: "blur(20px)" }}>
              <div style={{ ...sectionTitle, color: textColor, marginBottom: "16px" }}>
                <div style={{ padding: "8px", background: "rgba(239, 68, 68, 0.15)", borderRadius: "10px", display: "flex" }}><FaBell style={{ color: "#f87171" }} /></div>
                Telemetry Alerts Matrix
              </div>
              <p style={{ color: subText, fontSize: "13px", margin: "0 0 24px 0" }}>Control how live pipeline triggers map to your active workstation ports.</p>

              <div style={styles.toggleStack}>
                <div style={{ ...toggleCard, background: innerCardBg }}>
                  <div>
                    <h4 style={styles.toggleHeader}>Terminal Webhook Pings</h4>
                    <p style={styles.toggleSub}>Flash client overlay on cluster build failures.</p>
                  </div>
                  <label style={styles.switchLabel}>
                    <input type="checkbox" name="notifications" checked={settings.notifications} onChange={handleChange} style={styles.switchHiddenInput} />
                    <motion.span animate={{ backgroundColor: settings.notifications ? "#6366f1" : "rgba(255,255,255,0.1)" }} style={styles.switchTrack}>
                      <motion.span layout style={{ ...styles.switchThumb, left: settings.notifications ? "auto" : "3px", right: settings.notifications ? "3px" : "auto" }} />
                    </motion.span>
                  </label>
                </div>

                <div style={{ ...toggleCard, background: innerCardBg }}>
                  <div>
                    <h4 style={styles.toggleHeader}>Weekly System Digests</h4>
                    <p style={styles.toggleSub}>Route telemetry analysis files to your communications node.</p>
                  </div>
                  <label style={styles.switchLabel}>
                    <input type="checkbox" name="emailDigests" checked={settings.emailDigests} onChange={handleChange} style={styles.switchHiddenInput} />
                    <motion.span animate={{ backgroundColor: settings.emailDigests ? "#6366f1" : "rgba(255,255,255,0.1)" }} style={styles.switchTrack}>
                      <motion.span layout style={{ ...styles.switchThumb, left: settings.emailDigests ? "auto" : "3px", right: settings.emailDigests ? "3px" : "auto" }} />
                    </motion.span>
                  </label>
                </div>

                <div style={{ ...toggleCard, background: innerCardBg }}>
                  <div>
                    <h4 style={styles.toggleHeader}>Slack Stream Mirroring</h4>
                    <p style={styles.toggleSub}>Forward critical event logs immediately into workspace channels.</p>
                  </div>
                  <label style={styles.switchLabel}>
                    <input type="checkbox" name="slackIntegration" checked={settings.slackIntegration} onChange={handleChange} style={styles.switchHiddenInput} />
                    <motion.span animate={{ backgroundColor: settings.slackIntegration ? "#6366f1" : "rgba(255,255,255,0.1)" }} style={styles.switchTrack}>
                      <motion.span layout style={{ ...styles.switchThumb, left: settings.slackIntegration ? "auto" : "3px", right: settings.slackIntegration ? "3px" : "auto" }} />
                    </motion.span>
                  </label>
                </div>
              </div>
            </motion.div>

            {/* MODULE 4: PLATFORM INTERFACE BEHAVIOR */}
            <motion.div variants={itemVariants} style={{ ...cardStyle, background: cardBg, border: cardBorder, backdropFilter: "blur(20px)" }}>
              <div style={{ ...sectionTitle, color: textColor, marginBottom: "16px" }}>
                <div style={{ padding: "8px", background: "rgba(245, 158, 11, 0.15)", borderRadius: "10px", display: "flex" }}><FaSlidersH style={{ color: "#fbbf24" }} /></div>
                Workspace Environment Tuning
              </div>
              <p style={{ color: subText, fontSize: "13px", margin: "0 0 24px 0" }}>Calibrate layouts and landing coordinates for your daily session workflow.</p>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Interface Aesthetics Archetype</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {["Cyber Glow", "Midnight Core"].map((t) => (
                    <button key={t} type="button" onClick={() => setSettings(p => ({ ...p, theme: t }))} style={{
                      ...styles.selectorButton,
                      background: settings.theme === t ? "rgba(99, 102, 241, 0.15)" : "rgba(255,255,255,0.02)",
                      border: settings.theme === t ? "1px solid #6366f1" : "1px solid rgba(255,255,255,0.06)",
                      color: settings.theme === t ? "#a5b4fc" : labelColor,
                    }}>
                      <FaDesktop style={{ fontSize: "12px" }} /> {t}
                    </button>
                  ))}
                </div>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Grid Node Density</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {["Comfortable", "Compact Core"].map((d) => (
                    <button key={d} type="button" onClick={() => setSettings(p => ({ ...p, density: d }))} style={{
                      ...styles.selectorButton,
                      background: settings.density === d ? "rgba(168, 85, 247, 0.15)" : "rgba(255,255,255,0.02)",
                      border: settings.density === d ? "1px solid #a855f7" : "1px solid rgba(255,255,255,0.06)",
                      color: settings.density === d ? "#e9d5ff" : labelColor,
                    }}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Initial Matrix Session Landing Path</label>
                <select name="defaultRoute" value={settings.defaultRoute} onChange={handleChange} style={{ ...inputStyle, background: inputBg, border: "1px solid rgba(255,255,255,0.08)", color: textColor, cursor: "pointer" }}>
                  <option value="Analytics Overview">Analytics Matrix Overview</option>
                  <option value="Kanban Board">Active Sprint Logs (Kanban)</option>
                  <option value="Roadmaps">Strategic Product Epics</option>
                </select>
              </div>
            </motion.div>
          </div>

          {/* PROCESS COMMIT CONTROLS */}
          <motion.div
            variants={itemVariants}
            style={{
              marginTop: "40px", display: "flex", justifyContent: "flex-end", alignItems: "center",
              gap: "20px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "24px", marginBottom: "60px",
            }}
          >
            {hasUnsavedChanges && (
              <motion.button initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} onClick={handleReset} style={{ ...secondaryButtonStyle, border: "none", background: "transparent", color: "#f87171" }}>
                <FaUndo /> Discard Sync
              </motion.button>
            )}

            <motion.button whileHover={{ scale: 1.02, filter: "brightness(1.15)" }} whileTap={{ scale: 0.98 }} onClick={handleSave} style={{ ...primaryButtonStyle, background: "#6366f1" }}>
              <FaSave /> Commit Workspace Registers
            </motion.button>
          </motion.div>

        </motion.div>
      </div>

      {/* FLOATING CACHE SYNC RADAR TOAST */}
      <AnimatePresence>
        {hasUnsavedChanges && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.95 }}
            style={{
              position: "fixed", bottom: "24px", left: isMobile ? "20px" : "calc(50% + 120px)",
              transform: isMobile ? "none" : "translateX(-50%)", right: isMobile ? "20px" : "auto",
              background: "#121326", border: "1px solid #4338ca", padding: "14px 24px", borderRadius: "16px",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)", zIndex: 1000,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <FaExclamationTriangle style={{ color: "#fbbf24", fontSize: "14px" }} />
              <span style={{ color: "#e0e7ff", fontSize: "13px", fontWeight: "600" }}>Unsaved mutations detected in local cluster memory.</span>
            </div>
            <button onClick={handleSave} style={styles.miniToastButton}>Sync Nodes</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- VISUAL ARCHITECTURE CSS MAP ---
const styles = {
  ambientBlob1: { position: "absolute", width: "500px", height: "500px", top: "-50px", right: "5%", background: "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)", zIndex: 0, pointerEvents: "none" },
  ambientBlob2: { position: "absolute", width: "550px", height: "550px", bottom: "-100px", left: "25%", background: "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)", zIndex: 0, pointerEvents: "none" },
  topBadge: { display: "inline-block", background: "rgba(99, 102, 241, 0.15)", color: "#a5b4fc", fontSize: "11px", fontWeight: "700", padding: "4px 10px", borderRadius: "6px", letterSpacing: "0.06em", marginBottom: "12px" },
  cardDecorativeImage: { width: "100%", height: "110px", objectFit: "cover", borderRadius: "14px", opacity: 0.35, marginBottom: "20px", border: "1px solid rgba(255, 255, 255, 0.05)" },
  eyeToggleButton: { position: "absolute", top: "50%", right: "16px", transform: "translateY(-50%)", border: "none", background: "transparent", cursor: "pointer", color: "#9ca3af", fontSize: "14px", display: "flex", alignItems: "center" },
  switchLabel: { position: "relative", display: "inline-block", width: "42px", height: "22px", cursor: "pointer" },
  switchHiddenInput: { opacity: 0, width: 0, height: 0 },
  switchTrack: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: "34px" },
  switchThumb: { position: "absolute", height: "16px", width: "16px", top: "3px", backgroundColor: "white", borderRadius: "50%" },
  toggleStack: { display: "flex", flexDirection: "column", gap: "12px" },
  toggleHeader: { margin: 0, color: "#ffffff", fontSize: "13px", fontWeight: "600" },
  toggleSub: { margin: "2px 0 0 0", color: "#9ca3af", fontSize: "11px" },
  selectorButton: { padding: "12px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontWeight: "700", fontSize: "12px", transition: "all 0.2s" },
  miniToastButton: { background: "#6366f1", color: "white", border: "none", padding: "8px 14px", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer", boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)" }
};

const cardStyle = { borderRadius: "24px", padding: "28px", boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3)", display: "flex", flexDirection: "column" };
const sectionTitle = { display: "flex", alignItems: "center", gap: "12px", fontSize: "16px", fontWeight: "700", marginBottom: "20px" };
const formGroupStyle = { display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px", width: "100%" };
const labelStyle = { fontSize: "11px", fontWeight: "700", letterSpacing: "0.03em", textTransform: "uppercase", color: "#9ca3af" };
const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: "10px", outline: "none", fontSize: "13px", boxSizing: "border-box", transition: "all 0.2s ease" };
const toggleCard = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderRadius: "12px" };
const miniIconBox = { width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyBox: "center", fontSize: "14px", flexShrink: 0, justifyContent: 'center' };
const primaryButtonStyle = { border: "none", padding: "12px 24px", borderRadius: "10px", color: "white", fontSize: "13px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" };
const secondaryButtonStyle = { padding: "10px 16px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontWeight: "700", fontSize: "12px" };

export default SettingsPage;