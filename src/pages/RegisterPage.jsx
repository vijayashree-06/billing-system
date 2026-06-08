// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaUserTag, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaRocket 
} from "react-icons/fa";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "cashier",
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData));
    alert("Registration Successful!");
    navigate("/login");
  };

  // Framer Motion Animation Configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <div style={styles.container}>
      {/* MATCHING PREMIUM HIGH-TECH ABSTRACT WAVE BACKGROUND LAYER */}
      <div style={styles.bgImageLayer} />
      <div style={styles.bgColorOverlay} />

      {/* Animated Floating Organic Background Mesh Orbs */}
      <motion.div 
        animate={{ y: [0, -25, 0], scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        style={styles.bgBlobLeft} 
      />
      <motion.div 
        animate={{ y: [0, 25, 0], scale: [1, 1.12, 1] }}
        transition={{ repeat: Infinity, duration: 11, ease: "easeInOut", delay: 1.5 }}
        style={styles.bgBlobRight} 
      />

      {/* Global Embedded Styles for Dynamic Glow Filters and Selectors */}
      <style>{`
        /* Mouse Proximity Hover Text Glow Systems */
        .glow-text-dark {
          transition: text-shadow 0.4s ease, color 0.4s ease, filter 0.4s ease;
          display: inline-block;
        }
        .glow-text-dark:hover {
          color: #4f46e5 !important;
          text-shadow: 0 0 25px rgba(79, 70, 229, 0.5), 0 0 50px rgba(79, 70, 229, 0.2);
          filter: drop-shadow(0 2px 6px rgba(79, 70, 229, 0.15));
        }

        .glow-text-light {
          transition: text-shadow 0.4s ease, color 0.4s ease;
          display: inline-block;
        }
        .glow-text-light:hover {
          color: #38bdf8 !important;
          text-shadow: 0 0 30px rgba(56, 189, 248, 0.8), 0 0 60px rgba(56, 189, 248, 0.3);
        }

        /* Form Inputs Focus Ring Transitions */
        .input-wrapper:focus-within {
          border-color: #4f46e5 !important;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1) !important;
          background: #ffffff !important;
        }
        .input-wrapper:focus-within svg {
          color: #4f46e5 !important;
        }
        
        .input-wrapper:focus-within .visibility-toggle {
          color: #4f46e5 !important;
        }

        /* Moving Grid Animation Lines for Left Graphic Panel */
        @keyframes moveGrid {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        .animated-grid {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          animation: moveGrid 8s linear infinite;
        }
      `}</style>

      {/* BACK NAVIGATION BUTTON */}
      <motion.button
        whileHover={{ x: -4, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/")}
        style={styles.backBtn}
      >
        <FaArrowLeft /> Back to home
      </motion.button>

      {/* MAIN REGISTRATION SPLIT WRAPPER */}
      <motion.div 
        initial={{ opacity: 0, y: 35, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 75, damping: 16 }}
        style={styles.splitWrapper}
      >
        
        {/* LEFT SIDE: GRAPHICAL BENEFITS PRESENTATION PANEL */}
        <div style={styles.graphicPanel} className="animated-grid">
          <div style={styles.graphicOverlay} />
          
          <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
            <div style={styles.badge}>
              <FaRocket /> Instant Setup Sandbox
            </div>
            
            <h2 style={styles.panelTitle}>
              <span className="glow-text-light" style={{ color: "#ffffff" }}>Start Automated</span> <br />
              <span className="glow-text-light" style={{ color: "#38bdf8" }}>Ledgers Tracking</span>
            </h2>
            <p style={styles.panelSubtitle}>
              Create your corporate operational node to deploy automated invoice generations, register items pipelines, and track processing states.
            </p>

            {/* FLOATING IMAGE WORKSPACE ILLUSTRATION DISPLAY */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={styles.imageContainer}
            >
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80" 
                alt="Corporate Infrastructure Workspace" 
                style={styles.panelImage}
              />
              <div style={styles.imageGlassOverlay} />
            </motion.div>

            {/* Core Features Micro Vertical List Graphic */}
            <div style={styles.featuresContainer}>
              {[
                "100% Secure cloud sync architectures",
                "Granular role access distribution logs",
                "Advanced live analytical projections"
              ].map((text, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.15 }}
                  key={idx} 
                  style={{ display: "flex", alignItems: "center", gap: "12px", margin: idx === 1 ? "16px 0" : "0" }}
                >
                  <FaCheckCircle style={{ color: "#34d399", fontSize: "16px", flexShrink: 0 }} />
                  <span style={{ fontSize: "14px", color: "#e2e8f0", fontWeight: "500" }}>{text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: INTERACTIVE INPUT FORM CARD */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={styles.formPanel}
        >
          {/* TITLE HEADER */}
          <h1 className="glow-text-dark" style={styles.title} onClick={() => navigate("/")}>
            Register
          </h1>
          <p style={styles.subtitle}>
            Configure your terminal user credentials
          </p>

          {/* REGISTRATION EXECUTION FORM (STAGGERED ANIMATIONS) */}
          <form onSubmit={handleRegister}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: "flex", flexDirection: "column" }}>
              
              {/* FULL NAME ENTRY BOX */}
              <motion.div variants={itemVariants} className="input-wrapper" style={styles.inputContainer}>
                <FaUser style={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={styles.input}
                />
              </motion.div>

              {/* EMAIL ENTRY BOX */}
              <motion.div variants={itemVariants} className="input-wrapper" style={styles.inputContainer}>
                <FaEnvelope style={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="Work Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={styles.input}
                />
              </motion.div>

              {/* SECURITY PASSWORD ENTRY BOX WITH VISIBILITY TOGGLE */}
              <motion.div variants={itemVariants} className="input-wrapper" style={styles.inputContainer}>
                <FaLock style={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Security Password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={styles.input}
                />
                <button
                  type="button"
                  className="visibility-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.toggleButton}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </motion.div>

              {/* DEPLOYMENT TERMINAL ROLE SELECTOR Dropdown Wrapper */}
              <motion.div variants={itemVariants} className="input-wrapper" style={styles.inputContainer}>
                <FaUserTag style={styles.inputIcon} />
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  style={styles.selectInput}
                >
                  <option value="cashier">Profile Role: Cashier Register</option>
                  <option value="manager">Profile Role: Branch Manager</option>
                </select>
              </motion.div>

              {/* ACTION SUBMIT REGISTRATION BUTTON */}
              <motion.button
                variants={itemVariants}
                type="submit"
                whileHover={{ y: -2, scale: 1.01, boxShadow: "0 12px 24px -5px rgba(79, 70, 229, 0.35)" }}
                whileTap={{ scale: 0.99 }}
                style={styles.submitButton}
              >
                Initialize Base Account
              </motion.button>
            </motion.div>
          </form>

          {/* LEAP LINK BACK TO LOGIN INTERFACE TERMINAL */}
          <p style={styles.loginRedirectText}>
            Already have an account?{" "}
            <span
              className="glow-text-dark"
              onClick={() => navigate("/login")}
              style={styles.loginLinkSpan}
            >
              Login here
            </span>
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
    transform: "scale(1.06)",
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
    margin: "0 0 28px 0",
    maxWidth: "400px"
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    marginBottom: "28px",
    height: "170px"
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
    background: "linear-gradient(to bottom, transparent 40%, rgba(30, 58, 138, 0.4))",
    pointerEvents: "none"
  },
  featuresContainer: {
    background: "rgba(255, 255, 255, 0.04)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "20px",
    padding: "20px 24px",
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
  inputContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    background: "rgba(255, 255, 255, 0.7)",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    marginBottom: "14px",
    padding: "0 16px",
    boxSizing: "border-box",
    transition: "all 0.25s ease"
  },
  inputIcon: {
    color: "#94a3b8",
    fontSize: "16px",
    marginRight: "12px",
    transition: "color 0.25s ease"
  },
  input: {
    flex: 1,
    padding: "15px 0",
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: "15px",
    color: "#1e293b",
    width: "100%"
  },
  toggleButton: {
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
  selectInput: {
    flex: 1,
    padding: "15px 0",
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: "15px",
    color: "#4b5563",
    width: "100%",
    cursor: "pointer",
    fontFamily: "inherit"
  },
  submitButton: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
    color: "white",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "8px"
  },
  loginRedirectText: {
    fontSize: "14px",
    color: "#6b7280",
    textAlign: "center",
    marginTop: "24px",
    fontWeight: "500",
    marginBottom: 0
  },
  loginLinkSpan: {
    color: "#4f46e5",
    cursor: "pointer",
    fontWeight: "700",
    marginLeft: "3px"
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

export default RegisterPage;