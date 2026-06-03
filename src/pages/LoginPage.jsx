// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUserTie, 
  FaCashRegister, 
  FaEnvelope, 
  FaLock, 
  FaArrowLeft, 
  FaShieldAlt 
} from "react-icons/fa";

function LoginPage() {
  const navigate = useNavigate();

  // STATES
  const [role, setRole] = useState("manager");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN FUNCTION
  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("role", role);
    console.log("Saved Role:", role);
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      {/* Animated Organic Backdrop Orbs */}
      <motion.div 
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        style={styles.bgBlobLeft} 
      />
      <motion.div 
        animate={{ y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
        style={styles.bgBlobRight} 
      />

      {/* Global CSS Inject for Proximity Hover Glow and Dynamic Transitions */}
      <style>{`
        /* Proximity Hover Text Glow Systems */
        .glow-text-dark {
          transition: text-shadow 0.4s ease, color 0.4s ease, filter 0.4s ease;
          display: inline-block;
        }
        .glow-text-dark:hover {
          color: #4f46e5 !important;
          text-shadow: 0 0 25px rgba(79, 70, 229, 0.6), 0 0 50px rgba(79, 70, 229, 0.3);
          filter: drop-shadow(0 2px 8px rgba(79, 70, 229, 0.2));
        }

        .glow-text-light {
          transition: text-shadow 0.4s ease, color 0.4s ease;
          display: inline-block;
        }
        .glow-text-light:hover {
          color: #38bdf8 !important;
          text-shadow: 0 0 30px rgba(56, 189, 248, 0.9), 0 0 60px rgba(56, 189, 248, 0.4);
        }

        /* Interactive Dashboard Glowing Bar Chart Feature Elements */
        .interactive-bar {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease, filter 0.3s ease !important;
          cursor: pointer;
        }
        .interactive-bar:hover {
          transform: scaleY(1.1) translateY(-4px) !important;
          background-color: #38bdf8 !important;
          filter: drop-shadow(0 0 12px #38bdf8) drop-shadow(0 0 25px rgba(56, 189, 248, 0.6)) !important;
        }

        /* Form Input Field Active Accent Frame Controls */
        .input-wrapper:focus-within {
          border-color: #4f46e5 !important;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1) !important;
        }
        .input-wrapper:focus-within svg {
          color: #4f46e5 !important;
        }
      `}</style>

      {/* BACK TO LANDING BUTTON */}
      <motion.button
        whileHover={{ x: -4, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/")}
        style={styles.backBtn}
      >
        <FaArrowLeft /> Back to home
      </motion.button>

      {/* MAIN LOGIN WRAPPER SPLIT CONTAINER */}
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        style={styles.splitWrapper}
      >
        
        {/* LEFT SIDE: GRAPHICAL PRESENTATION PANEL */}
        <div style={styles.graphicPanel}>
          <div style={styles.graphicOverlay} />
          
          <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
            <div style={styles.badge}>
              <FaShieldAlt /> Enterprise Security Enabled
            </div>
            
            <h2 style={styles.panelTitle}>
              <span className="glow-text-light" style={{ color: "#ffffff" }}>Real-time Ledger</span> <br />
              <span className="glow-text-light" style={{ color: "#38bdf8" }}>& Asset Architecture</span>
            </h2>
            <p style={styles.panelSubtitle}>
              Access your workspace terminal to manage incoming accounts pipelines, streamline cashflow operations, and control distributions.
            </p>

            {/* Micro Dashboard Dynamic Mockup Representation */}
            <div style={styles.mockupContainer}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }} />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: "100px", paddingTop: "10px" }}>
                {[40, 85, 60, 100, 70].map((h, idx) => (
                  <motion.div
                    key={idx}
                    className="interactive-bar"
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                    style={{
                      width: "14%",
                      background: idx === 3 ? "#38bdf8" : "rgba(255, 255, 255, 0.25)",
                      borderRadius: "6px 6px 0 0",
                      transformOrigin: "bottom"
                    }}
                  />
                ))}
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "12px", paddingTop: "8px", display: "flex", justifyContent: "space-between", fontSize: "11px", opacity: 0.7 }}>
                <span>Incoming Streams</span>
                <span style={{ color: "#38bdf8", fontWeight: "700" }}>+24.8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: AUTHENTICATION FORM CARD */}
        <div style={styles.formPanel}>
          {/* TITLE */}
          <h1 className="glow-text-dark" style={styles.title} onClick={() => navigate("/")}>
            BillFlow
          </h1>
          <p style={styles.subtitle}>
            Select your assigned role profile terminal
          </p>

          {/* INTERACTIVE ROLE SELECTOR SWITCH */}
          <div style={styles.roleContainer}>
            {/* MANAGER OPTION */}
            <button
              type="button"
              onClick={() => setRole("manager")}
              style={{
                ...styles.roleButton,
                color: role === "manager" ? "#ffffff" : "#4b5563",
                background: role === "manager" ? "#4f46e5" : "rgba(0, 0, 0, 0.03)",
                boxShadow: role === "manager" ? "0 4px 12px rgba(79, 70, 229, 0.25)" : "none",
              }}
            >
              <FaUserTie style={{ marginRight: "8px" }} /> Manager
            </button>

            {/* CASHIER OPTION */}
            <button
              type="button"
              onClick={() => setRole("cashier")}
              style={{
                ...styles.roleButton,
                color: role === "cashier" ? "#ffffff" : "#4b5563",
                background: role === "cashier" ? "#10b981" : "rgba(0, 0, 0, 0.03)",
                boxShadow: role === "cashier" ? "0 4px 12px rgba(16, 185, 129, 0.25)" : "none",
              }}
            >
              <FaCashRegister style={{ marginRight: "8px" }} /> Cashier
            </button>
          </div>

          {/* DYNAMIC FORM EXECUTION */}
          <form onSubmit={handleLogin}>
            
            {/* EMAIL ENTRY CONTAINER */}
            <div className="input-wrapper" style={styles.inputContainer}>
              <FaEnvelope style={styles.inputIcon} />
              <input
                type="email"
                placeholder="Work Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            {/* PASSWORD ENTRY CONTAINER */}
            <div className="input-wrapper" style={styles.inputContainer}>
              <FaLock style={styles.inputIcon} />
              <input
                type="password"
                placeholder="Security Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            {/* CONDITIONAL ACTION SUBMIT BUTTON */}
            <AnimatePresence mode="wait">
              <motion.button
                key={role}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                type="submit"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                style={{
                  ...styles.loginButton,
                  background: role === "manager" 
                    ? "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)" 
                    : "linear-gradient(135deg, #10b981 0%, #065f46 100%)",
                  boxShadow: role === "manager"
                    ? "0 10px 20px -5px rgba(79, 70, 229, 0.3)"
                    : "0 10px 20px -5px rgba(16, 185, 129, 0.3)"
                }}
              >
                Sign In as {role === "manager" ? "Manager Dashboard" : "Cashier Register"}
              </motion.button>
            </AnimatePresence>

          </form>

          {/* SYSTEM TERMS NOTICE */}
          <p style={styles.terms}>
            Authorized corporate access configurations only. All access procedures are monitored logs.
          </p>
        </div>

      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at top right, #f1f5f9, #e2e8f0)",
    padding: "24px",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  splitWrapper: {
    width: "100%",
    maxWidth: "960px",
    minHeight: "580px",
    background: "rgba(255, 255, 255, 0.45)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "32px",
    border: "1px solid rgba(255, 255, 255, 0.6)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    overflow: "hidden",
    position: "relative",
    zIndex: 5
  },
  graphicPanel: {
    background: "linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)",
    padding: "48px",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    boxSizing: "border-box",
  },
  graphicOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "radial-gradient(circle at bottom left, rgba(6,182,212,0.15) 0%, transparent 65%)",
    pointerEvents: "none"
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#38bdf8",
    marginBottom: "24px"
  },
  panelTitle: {
    fontSize: "32px",
    fontWeight: "800",
    lineHeight: "1.2",
    margin: "0 0 16px 0",
    letterSpacing: "-0.01em"
  },
  panelSubtitle: {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#cbd5e1",
    margin: "0 0 32px 0",
    maxWidth: "380px"
  },
  mockupContainer: {
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "20px",
    width: "100%",
    boxSizing: "border-box"
  },
  formPanel: {
    padding: "48px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: "rgba(255, 255, 255, 0.4)",
    boxSizing: "border-box",
  },
  backBtn: {
    position: "absolute",
    top: "24px",
    left: "24px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 18px",
    background: "rgba(255, 255, 255, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.6)",
    borderRadius: "14px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#4b5563",
    cursor: "pointer",
    zIndex: 10,
    backdropFilter: "blur(10px)"
  },
  title: {
    fontSize: "38px",
    fontWeight: "800",
    color: "#4f46e5",
    margin: "0 0 8px 0",
    letterSpacing: "-0.5px",
    textAlign: "left",
    cursor: "pointer",
    width: "fit-content"
  },
  subtitle: {
    fontSize: "15px",
    color: "#6b7280",
    margin: "0 0 32px 0",
    fontWeight: "500"
  },
  roleContainer: {
    display: "flex",
    gap: "12px",
    background: "rgba(0, 0, 0, 0.02)",
    padding: "6px",
    borderRadius: "16px",
    marginBottom: "28px"
  },
  roleButton: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.25s ease",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    background: "rgba(255, 255, 255, 0.7)",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    marginBottom: "18px",
    padding: "0 16px",
    boxSizing: "border-box",
    transition: "all 0.2s ease"
  },
  inputIcon: {
    color: "#94a3b8",
    fontSize: "16px",
    marginRight: "12px",
    transition: "color 0.2s ease"
  },
  input: {
    flex: 1,
    padding: "16px 0",
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: "15px",
    color: "#1e293b",
    width: "100%"
  },
  loginButton: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "16px",
    color: "white",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "10px"
  },
  terms: {
    fontSize: "12px",
    color: "#94a3b8",
    textAlign: "center",
    marginTop: "24px",
    lineHeight: "1.5",
    marginBottom: 0
  },
  bgBlobLeft: {
    position: "absolute",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(79,70,229,0.07) 0%, rgba(255,255,255,0) 70%)",
    top: "-150px",
    left: "-150px",
    zIndex: 1,
    pointerEvents: "none"
  },
  bgBlobRight: {
    position: "absolute",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(16,185,129,0.05) 0%, rgba(255,255,255,0) 70%)",
    bottom: "-150px",
    right: "-150px",
    zIndex: 1,
    pointerEvents: "none"
  }
};

export default LoginPage;