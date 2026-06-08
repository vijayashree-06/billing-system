// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUserTie, 
  FaCashRegister, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaArrowLeft, 
  FaShieldAlt 
} from "react-icons/fa";

function LoginPage() {
  const navigate = useNavigate();

  // STATES
  const [role, setRole] = useState("manager");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // LOGIN FUNCTION
  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("role", role);
    console.log("Saved Role:", role);
    navigate("/dashboard");
  };

  // Framer Motion Parent/Child Animation Sequences
  const formContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
  };

  const fieldItemVariants = {
    hidden: { y: 12, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <div style={styles.container}>
      {/* PREMIUM HIGH-TECH ABSTRACT WAVE BACKGROUND LAYER */}
      <div style={styles.bgImageLayer} />
      <div style={styles.bgColorOverlay} />

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
        
        .input-wrapper:focus-within .visibility-eye {
          color: #4f46e5 !important;
        }

        /* Moving Grid Background Animation Overlay */
        @keyframes moveGridLines {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        .animated-mesh-grid {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          animation: moveGridLines 9s linear infinite;
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
        <div style={styles.graphicPanel} className="animated-mesh-grid">
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

            {/* FLOATING IMAGE COMPONENT - ENTERPRISE INTERFACE PREVIEW */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={styles.imageContainer}
            >
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" 
                alt="Analytical Corporate Architecture Operations" 
                style={styles.panelImage}
              />
              <div style={styles.imageGlassOverlay} />
            </motion.div>

            {/* Micro Dashboard Dynamic Mockup Representation */}
            <div style={styles.mockupContainer}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }} />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: "90px", paddingTop: "10px" }}>
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
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          style={styles.formPanel}
        >
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

          {/* DYNAMIC STAGGERED FORM EXECUTION */}
          <form onSubmit={handleLogin}>
            <motion.div variants={formContainerVariants} initial="hidden" animate="visible" style={{ display: "flex", flexDirection: "column" }}>
              
              {/* EMAIL ENTRY CONTAINER */}
              <motion.div variants={fieldItemVariants} className="input-wrapper" style={styles.inputContainer}>
                <FaEnvelope style={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="Work Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  required
                />
              </motion.div>

              {/* PASSWORD ENTRY CONTAINER WITH VISIBILITY TOGGLE */}
              <motion.div variants={fieldItemVariants} className="input-wrapper" style={styles.inputContainer}>
                <FaLock style={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Security Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  required
                />
                <button
                  type="button"
                  className="visibility-eye"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeToggleButton}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </motion.div>

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

            </motion.div>
          </form>

          {/* LEAP LINK TO REGISTER CHANNELS */}
          <p style={styles.registerRedirectText}>
            Don't have an operational account?{" "}
            <span
              className="glow-text-dark"
              onClick={() => navigate("/register")}
              style={styles.registerLinkSpan}
            >
              Register here
            </span>
          </p>

          {/* SYSTEM TERMS NOTICE */}
          <p style={styles.terms}>
            Authorized corporate access configurations only. All access procedures are monitored logs.
          </p>
        </motion.div>

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
    padding: "24px",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  bgImageLayer: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: `url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=80')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(12px)",
    transform: "scale(1.06)", // Eliminates border artifacts caused by blur filters
    zIndex: 0
  },
  bgColorOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "radial-gradient(circle at top right, rgba(241, 245, 249, 0.8), rgba(226, 232, 240, 0.88))",
    zIndex: 1
  },
  splitWrapper: {
    width: "100%",
    maxWidth: "1020px",
    minHeight: "640px",
    background: "rgba(255, 255, 255, 0.55)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    borderRadius: "32px",
    border: "1px solid rgba(255, 255, 255, 0.7)",
    boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.15)",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))",
    overflow: "hidden",
    position: "relative",
    zIndex: 5
  },
  graphicPanel: {
    background: "linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)",
    padding: "40px 48px",
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
    background: "radial-gradient(circle at bottom left, rgba(6,182,212,0.18) 0%, transparent 65%)",
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
    marginBottom: "20px"
  },
  panelTitle: {
    fontSize: "30px",
    fontWeight: "800",
    lineHeight: "1.25",
    margin: "0 0 12px 0",
    letterSpacing: "-0.01em"
  },
  panelSubtitle: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#cbd5e1",
    margin: "0 0 24px 0",
    maxWidth: "400px"
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    marginBottom: "24px",
    height: "150px"
  },
  panelImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block"
  },
  imageGlassOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "linear-gradient(to bottom, transparent 30%, rgba(49, 46, 129, 0.4))",
    pointerEvents: "none"
  },
  mockupContainer: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.06)",
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
    background: "rgba(255, 255, 255, 0.35)",
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
    background: "rgba(255, 255, 255, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.7)",
    borderRadius: "14px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#4b5563",
    cursor: "pointer",
    zIndex: 10,
    backdropFilter: "blur(10px)"
  },
  title: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#4f46e5",
    margin: "0 0 6px 0",
    letterSpacing: "-0.5px",
    textAlign: "left",
    cursor: "pointer",
    width: "fit-content"
  },
  subtitle: {
    fontSize: "15px",
    color: "#6b7280",
    margin: "0 0 28px 0",
    fontWeight: "500"
  },
  roleContainer: {
    display: "flex",
    gap: "12px",
    background: "rgba(0, 0, 0, 0.03)",
    padding: "6px",
    borderRadius: "16px",
    marginBottom: "24px"
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
    marginBottom: "16px",
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
  eyeToggleButton: {
    background: "none",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 4px",
    fontSize: "16px",
    transition: "color 0.25s ease"
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
    marginTop: "8px"
  },
  registerRedirectText: {
    fontSize: "14px",
    color: "#6b7280",
    textAlign: "center",
    marginTop: "24px",
    fontWeight: "500",
    marginBottom: 0
  },
  registerLinkSpan: {
    color: "#4f46e5",
    cursor: "pointer",
    fontWeight: "700",
    marginLeft: "3px"
  },
  terms: {
    fontSize: "12px",
    color: "#94a3b8",
    textAlign: "center",
    marginTop: "20px",
    lineHeight: "1.5",
    marginBottom: 0
  },
  bgBlobLeft: {
    position: "absolute",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(79,70,229,0.1) 0%, rgba(255,255,255,0) 70%)",
    top: "-150px",
    left: "-150px",
    zIndex: 2,
    pointerEvents: "none"
  },
  bgBlobRight: {
    position: "absolute",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, rgba(255,255,255,0) 70%)",
    bottom: "-150px",
    right: "-150px",
    zIndex: 2,
    pointerEvents: "none"
  }
};

export default LoginPage;