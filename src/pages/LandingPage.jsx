// src/pages/LandingPage.jsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaFileInvoice,
  FaUsers,
  FaShieldAlt,
  FaMobileAlt,
  FaCloud,
  FaArrowRight,
  FaCheckCircle,
  FaBolt,
  FaGlobe
} from "react-icons/fa";

function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaFileInvoice />,
      title: "Smart Invoice Management",
      desc: "Create and manage invoices instantly with modern workflow.",
      backDesc: "Automate recurring billing, customize PDF templates, and track delivery status in real-time with instant email alerts.",
      color: "#4f46e5",
    },
    {
      icon: <FaUsers />,
      title: "Customer Management",
      desc: "Track customers and maintain business records efficiently.",
      backDesc: "Maintain detailed transaction histories, manage communication profiles, and organize CRM fields easily.",
      color: "#10b981",
    },
    {
      icon: <FaChartLine />,
      title: "Analytics Dashboard",
      desc: "Visualize revenue growth and transactions beautifully.",
      backDesc: "Gain deep insights with interactive quarterly projections, real-time breakdown metrics, and quick exporting tools.",
      color: "#f59e0b",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Billing",
      desc: "Keep your billing data protected and secure.",
      backDesc: "Engineered with bank-grade 256-bit encryption, strict access logs, and complete adherence to global compliance protocols.",
      color: "#ef4444",
    },
    {
      icon: <FaMobileAlt />,
      title: "Fully Responsive",
      desc: "Works perfectly on desktop, tablet and mobile devices.",
      backDesc: "Crafted with dynamic responsive breakpoints ensuring a fluid dashboard experience across any screen layout.",
      color: "#06b6d4",
    },
    {
      icon: <FaCloud />,
      title: "Cloud Ready",
      desc: "Future-ready scalable billing management architecture.",
      backDesc: "Powered by modern cloud infrastructure to maintain 100% uptime with instant sync across all active workstations.",
      color: "#8b5cf6",
    },
  ];

  const stats = [
    { value: "10K+", label: "Invoices Generated" },
    { value: "5K+", label: "Happy Customers" },
    { value: "99%", label: "System Reliability" },
    { value: "24/7", label: "Business Access" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top right, #f1f5f9, #f8fafc)",
        overflowX: "hidden",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative"
      }}
    >
      {/* Dynamic Animated Organic Background Graphics */}
      <motion.div 
        animate={{ y: [0, -20, 0], scale: [1, 1.03, 1] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        style={bgBlobLeft} 
      />
      <motion.div 
        animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1 }}
        style={bgBlobRight} 
      />

      {/* Styled Glassmorphism, Flipping and Cursor Proximity Text Glow Enhancements */}
      <style>{`
        /* Dynamic Cursor Proximity Glow Effects for Text Content */
        .glow-text {
          transition: text-shadow 0.4s ease, color 0.4s ease, filter 0.4s ease;
          display: inline-block;
        }
        .glow-text:hover {
          color: #4f46e5 !important;
          text-shadow: 0 0 25px rgba(79, 70, 229, 0.6), 0 0 50px rgba(79, 70, 229, 0.3);
          filter: drop-shadow(0 2px 8px rgba(79, 70, 229, 0.2));
        }
        .glow-accent {
          transition: text-shadow 0.4s ease, color 0.4s ease;
          display: inline-block;
        }
        .glow-accent:hover {
          text-shadow: 0 0 30px rgba(56, 189, 248, 0.9), 0 0 60px rgba(56, 189, 248, 0.4);
        }

        /* Card Layout System Framework */
        .flip-card {
          background-color: transparent;
          height: 310px;
          perspective: 1000px;
          cursor: pointer;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
        }
        .flip-card:hover .flip-card-inner, .flip-card:focus-within .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 24px;
          padding: 32px 24px;
          box-sizing: border-box;
        }
        /* Glassmorphism Front Style */
        .flip-card-front {
          background-color: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
        }
        /* Rich Blue Gradient Back Style */
        .flip-card-back {
          background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          color: white;
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 15px 35px rgba(30, 64, 175, 0.25);
        }
      `}</style>

      {/* FIXED GLASS NAVIGATION BAR (Right-Aligned Buttons) */}
      <nav
        style={{
          width: "100%",
          padding: "16px 6%",
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(16px)",
          webkitbackdropfilter: "blur(16px)",
          display: "flex",
          justifyContent: "space-between", 
          alignItems: "center",
          boxSizing: "border-box",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
        }}
      >
        <h1 className="glow-text" style={{ fontSize: "28px", fontWeight: "800", color: "#4f46e5", margin: 0, letterSpacing: "-0.5px", cursor: "pointer" }}>
          BillFlow
        </h1>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <motion.button 
            whileHover={{ scale: 1.03, color: "#4f46e5" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/login")} 
            style={loginBtn}
          >
            Login
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(79, 70, 229, 0.25)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/register")} 
            style={primaryBtn}
          >
            Register
          </motion.button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        style={{
          padding: "70px 6% 60px 6%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "60px",
          alignItems: "center",
          position: "relative",
          zIndex: 2
        }}
      >
        {/* HERO LEFT */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div
            style={{
              background: "linear-gradient(90deg, #eef2ff, #e0e7ff)",
              color: "#4f46e5",
              width: "fit-content",
              padding: "10px 20px",
              borderRadius: "30px",
              fontWeight: "600",
              fontSize: "14px",
              marginBottom: "25px",
              boxShadow: "0 2px 10px rgba(79, 70, 229, 0.05)"
            }}
          >
            🚀 Modern Billing Solution
          </div>

          <h1
            style={{
              fontSize: "clamp(44px, 5.5vw, 68px)",
              lineHeight: "1.1",
              fontWeight: "800",
              color: "#111827",
              marginBottom: "24px",
              marginTop: 0,
              letterSpacing: "-0.02em"
            }}
          >
            <span className="glow-text" style={{ color: "#111827" }}>Smart Billing</span>
            <br />
            <span className="glow-text" style={{ color: "#111827" }}>Management</span>
            <span className="glow-text" style={{ color: "#4f46e5" }}> System</span>
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#4b5563",
              lineHeight: "1.8",
              marginBottom: "35px",
              maxWidth: "600px",
            }}
          >
            Modern responsive billing platform for invoices, customers, payments, analytics and business management.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <motion.button 
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(79, 70, 229, 0.35)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/register")} 
              style={heroPrimaryBtn}
            >
              Get Started <FaArrowRight />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.03, backgroundColor: "#f1f5f9" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/login")} 
              style={heroSecondaryBtn}
            >
              Login
            </motion.button>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "45px" }}>
            {["Responsive UI", "Invoice Tracking", "Analytics Dashboard"].map((item, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#374151", fontWeight: "500" }}>
                <FaCheckCircle style={{ color: "#10b981" }} />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* HERO RIGHT */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "500px",
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(20px)",
              webkitbackdropfilter: "blur(20px)",
              borderRadius: "32px",
              padding: "28px",
              boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05)",
              border: "1px solid rgba(255, 255, 255, 0.6)"
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "24px" }}>
              {stats.map((stat, index) => (
                <motion.div 
                  whileHover={{ y: -4 }}
                  key={index} 
                  style={{ background: "rgba(255, 255, 255, 0.7)", padding: "20px", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.8)" }}
                >
                  <h2 style={{ color: "#4f46e5", fontSize: "28px", fontWeight: "700", marginBottom: "6px", marginTop: 0 }}>
                    {stat.value}
                  </h2>
                  <p style={{ color: "#6b7280", margin: 0, fontSize: "14px", fontWeight: "500" }}>{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div style={{ background: "rgba(255, 255, 255, 0.5)", borderRadius: "24px", padding: "24px", border: "1px solid rgba(255, 255, 255, 0.6)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: "160px", gap: "12px" }}>
                {[60, 95, 130, 80, 160].map((h, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${h}px` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      style={{
                        width: "100%",
                        maxWidth: "42px",
                        background: "linear-gradient(to top, #4f46e5, #818cf8)",
                        borderRadius: "8px 8px 0 0",
                      }}
                    />
                    <span style={{ marginTop: "10px", color: "#6b7280", fontSize: "13px", fontWeight: "600" }}>
                      {["Jan", "Feb", "Mar", "Apr", "May"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section style={{ padding: "60px 6% 80px 6%", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: "55px" }}>
          <h2 className="glow-text" style={{ fontSize: "clamp(34px, 5vw, 48px)", fontWeight: "800", marginBottom: "15px", color: "#111827", marginTop: 0 }}>
            Powerful Features
          </h2>
          <p style={{ color: "#6b7280", fontSize: "18px", margin: 0 }}>
            Everything you need for your business (Hover or tap to reveal)
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          {features.map((feature, index) => (
            <motion.div variants={itemVariants} key={index} className="flip-card" tabIndex="0">
              <div className="flip-card-inner">
                {/* GLASSMORPHISM FRONT */}
                <div className="flip-card-front">
                  <div
                    style={{
                      width: "65px",
                      height: "65px",
                      borderRadius: "18px",
                      background: `${feature.color}15`,
                      color: feature.color,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "24px",
                      marginBottom: "22px",
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 style={{ fontSize: "21px", fontWeight: "700", marginBottom: "14px", color: "#1e293b", marginTop: 0 }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: "#4b5563", lineHeight: "1.6", fontSize: "15px", margin: 0 }}>
                    {feature.desc}
                  </p>
                </div>

                {/* VIBRANT BLUE GRADIENT BACK */}
                <div className="flip-card-back">
                  <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "12px", color: "#ffffff", marginTop: 0 }}>
                    More Details
                  </h3>
                  <p style={{ color: "#e0e7ff", lineHeight: "1.6", fontSize: "14px", margin: 0, padding: "0 10px" }}>
                    {feature.backDesc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ATTRACTIVE ENTERPRISE CTA SECTION */}
      <section style={{ padding: "20px 6% 90px 6%", position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ scale: 0.97, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          viewport={{ once: true }}
          style={{
            background: "linear-gradient(135deg, #312e81 0%, #4f46e5 50%, #1e40af 100%)",
            borderRadius: "40px",
            padding: "80px 40px",
            textAlign: "center",
            color: "white",
            boxShadow: "0 30px 60px -15px rgba(79, 70, 229, 0.4)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
            pointerEvents: "none"
          }} />

          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            padding: "8px 16px",
            borderRadius: "30px",
            fontSize: "14px",
            fontWeight: "600",
            letterSpacing: "0.5px",
            marginBottom: "28px",
            border: "1px solid rgba(255, 255, 255, 0.15)"
          }}>
            ⚡ Elevate Operations
          </div>

          <h2 style={{ 
            fontSize: "clamp(36px, 5.5vw, 56px)", 
            fontWeight: "800", 
            marginBottom: "20px", 
            marginTop: 0,
            lineHeight: "1.2",
            letterSpacing: "-0.02em"
          }}>
            <span className="glow-accent" style={{ color: "#ffffff" }}>Empower Your Enterprise</span> <br />
            <span className="glow-accent" style={{ color: "#38bdf8" }}>Asset Flow Today</span>
          </h2>
          
          <p style={{ 
            fontSize: "20px", 
            color: "#e0e7ff", 
            maxWidth: "700px", 
            margin: "0 auto 40px auto", 
            lineHeight: "1.8",
            fontWeight: "400"
          }}>
            Join thousands of modern businesses accelerating cash cycles, eliminating discrepancies, and making operations seamless.
          </p>

          {/* Value Highlights Feature Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            maxWidth: "800px",
            margin: "0 auto 45px auto"
          }}>
            {[
              { icon: <FaBolt style={{ color: "#38bdf8" }} />, text: "Instant Automated Reminders" },
              { icon: <FaGlobe style={{ color: "#34d399" }} />, text: "Multirate Global Tax Structures" },
              { icon: <FaCheckCircle style={{ color: "#a78bfa" }} />, text: "No Hidden Implementation Fees" }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(5px)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "16px",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                textAlign: "left"
              }}>
                <div style={{ fontSize: "18px", display: "flex" }}>{item.icon}</div>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "#f1f5f9" }}>{item.text}</span>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/register")}
            style={{
              padding: "18px 44px",
              border: "none",
              borderRadius: "20px",
              background: "#ffffff",
              color: "#4f46e5",
              fontWeight: "800",
              fontSize: "16px",
              cursor: "pointer",
              letterSpacing: "0.2px"
            }}
          >
            Create Your Free Account
          </motion.button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0f172a", padding: "35px 6%", textAlign: "center", color: "#9ca3af", position: "relative", zIndex: 2 }}>
        <h2 style={{ color: "white", marginBottom: "12px", marginTop: 0, fontWeight: "700" }}>BillFlow</h2>
        <p style={{ margin: 0, fontSize: "14px" }}>Modern Billing Management System © 2026</p>
      </footer>
    </div>
  );
}

/* Core Interface Config Styles */
const primaryBtn = {
  padding: "11px 24px",
  border: "none",
  borderRadius: "12px",
  background: "#4f46e5",
  color: "white",
  fontWeight: "600",
  fontSize: "15px",
  cursor: "pointer",
};

const loginBtn = {
  padding: "11px 22px",
  border: "none",
  background: "transparent",
  color: "#4b5563",
  fontWeight: "600",
  fontSize: "15px",
  cursor: "pointer",
};

const heroPrimaryBtn = {
  padding: "16px 32px",
  border: "none",
  borderRadius: "16px",
  background: "#4f46e5",
  color: "white",
  fontWeight: "700",
  fontSize: "16px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const heroSecondaryBtn = {
  padding: "16px 32px",
  borderRadius: "16px",
  border: "1px solid #d1d5db",
  background: "white",
  color: "#111827",
  fontWeight: "700",
  fontSize: "16px",
  cursor: "pointer",
};

/* Ambient Mesh Backdrop Orbs */
const bgBlobLeft = {
  position: "absolute",
  width: "550px",
  height: "550px",
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(79,70,229,0.08) 0%, rgba(255,255,255,0) 70%)",
  top: "-100px",
  left: "-150px",
  zIndex: 1,
  pointerEvents: "none"
};

const bgBlobRight = {
  position: "absolute",
  width: "650px",
  height: "650px",
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, rgba(255,255,255,0) 70%)",
  top: "350px",
  right: "-200px",
  zIndex: 1,
  pointerEvents: "none"
};

export default LandingPage;