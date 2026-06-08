// src/pages/LandingPage.jsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  FaChartLine,
  FaFileInvoice,
  FaUsers,
  FaShieldAlt,
  FaMobileAlt,
  FaCloud,
  FaArrowRight,
  FaBolt,
  FaGlobe,
  FaCreditCard,
  FaServer,
  FaShopify,
  FaCcVisa,
  FaHubspot,
  FaHdd,
  FaClock,
  FaExchangeAlt,
  FaTimes,
  FaSignal,
  FaCheckCircle
} from "react-icons/fa";

function LandingPage() {
  const [showDrawer, setShowDrawer] = useState(false);
  
  // Refs for tracking interactive headlines
  const heroHeadlineRef = useRef(null);
  const ctaHeadlineRef = useRef(null);

  // Motion values for 3D parallax card matrix
  const x = useMotionValue(200);
  const y = useMotionValue(200);
  const rotateX = useTransform(y, [0, 400], [10, -10]);
  const rotateY = useTransform(x, [0, 400], [-10, 10]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  function handleMouseLeave() {
    x.set(200);
    y.set(200);
  }

  // --- REUSABLE PROXIMITY ENGINE (GLOW ONLY - NO MOVEMENT/DANCING) ---
  useEffect(() => {
    const handleProximityGlowOnly = (e) => {
      const words = document.querySelectorAll(".proximity-word");
      
      words.forEach((word) => {
        const rect = word.getBoundingClientRect();
        const wordCenterX = rect.left + rect.width / 2;
        const wordCenterY = rect.top + rect.height / 2;
        
        // Dynamic boundary tracking distance calculation
        const distance = Math.sqrt(
          Math.pow(e.clientX - wordCenterX, 2) + Math.pow(e.clientY - wordCenterY, 2)
        );

        const maxDistance = 200; // Radius of interaction field

        if (distance < maxDistance) {
          // Exponential physics lighting factor
          const factor = Math.pow((maxDistance - distance) / maxDistance, 1.8);
          const isHeroWord = word.classList.contains("hero-word");
          
          if (isHeroWord) {
            // Neon Indigo/Cyan glow palette
            word.style.textShadow = `0 0 ${15 + factor * 30}px rgba(79, 70, 229, ${0.3 + factor * 0.7}), 0 0 ${8 + factor * 20}px rgba(6, 182, 212, ${factor})`;
            word.style.color = `rgba(79, 70, 229, 0.95)`;
            word.style.filter = "brightness(1.15)";
          } else {
            // Ultra White/Sky Blue glow palette
            word.style.textShadow = `0 0 ${20 + factor * 35}px rgba(255, 255, 255, ${0.4 + factor * 0.6}), 0 0 ${10 + factor * 20}px rgba(56, 189, 248, ${factor})`;
            word.style.color = `#ffffff`;
          }
        } else {
          // Clean reset to defaults without moving positions
          word.style.textShadow = "none";
          word.style.color = ""; 
          word.style.filter = "none";
        }
      });
    };

    window.addEventListener("mousemove", handleProximityGlowOnly);
    return () => {
      window.removeEventListener("mousemove", handleProximityGlowOnly);
    };
  }, []);

  const systemStats = [
    { icon: <FaClock style={{ color: "#10b981" }} />, value: "99.99%", label: "Verified Core Uptime" },
    { icon: <FaExchangeAlt style={{ color: "#4f46e5" }} />, value: "< 14ms", label: "Ledger Sync Latency" },
    { icon: <FaHdd style={{ color: "#06b6d4" }} />, value: "256-bit", label: "AES Vault Encryption" },
  ];

  const features = [
    {
      icon: <FaFileInvoice />,
      title: "Smart Invoice Management",
      desc: "Create and manage invoices instantly with modern workflow.",
      backDesc: "Automate recurring billing, customize PDF templates, and track delivery status in real-time with instant email alerts.",
      color: "#4f46e5",
      points: ["Automated GST calculation", "Dynamic PDF Generation", "Overdue Auto-reminders"]
    },
    {
      icon: <FaUsers />,
      title: "Customer Management",
      desc: "Track customers and maintain business records efficiently.",
      backDesc: "Maintain detailed transaction histories, manage communication profiles, and organize CRM fields easily.",
      color: "#10b981",
      points: ["Complete Profile Vault", "Credit Limit Tracker", "Integrated Communication"]
    },
    {
      icon: <FaChartLine />,
      title: "Analytics Dashboard",
      desc: "Visualize revenue growth and transactions beautifully.",
      backDesc: "Gain deep insights with interactive quarterly projections, real-time breakdown metrics, and quick exporting tools.",
      color: "#f59e0b",
      points: ["Real-time cashflow chart", "Profit Margin Breakdown", "One-click Excel Export"]
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Billing",
      desc: "Keep your billing data protected and secure.",
      backDesc: "Engineered with bank-grade 256-bit encryption, strict access logs, and complete adherence to global compliance protocols.",
      color: "#ef4444",
      points: ["AES 256-bit Encryption", "IP Whitelisting Logs", "Regular Cloud Backups"]
    },
    {
      icon: <FaMobileAlt />,
      title: "Fully Responsive",
      desc: "Works perfectly on desktop, tablet and mobile devices.",
      backDesc: "Crafted with dynamic responsive breakpoints ensuring a fluid dashboard experience across any screen layout.",
      color: "#06b6d4",
      points: ["Fluid Adaptive Breakpoints", "Fast Mobile Loading", "Touch Gestures Ready"]
    },
    {
      icon: <FaCloud />,
      title: "Cloud Ready",
      desc: "Future-ready scalable billing management architecture.",
      backDesc: "Powered by modern cloud infrastructure to maintain 100% uptime with instant sync across all active workstations.",
      color: "#8b5cf6",
      points: ["99.99% Guaranteed Uptime", "Instant Multi-device Sync", "Global Edge Network"]
    },
  ];

  // All currency amounts updated to Indian Rupees (₹)
  const recentTransactions = [
    { id: "INV-0024", name: "Acme Corp Logistics", amount: "₹1,45,000.00", status: "Paid", badgeColor: "#10b981", bg: "rgba(16, 185, 129, 0.1)", hoverBorder: "rgba(16, 185, 129, 0.4)" },
    { id: "INV-0025", name: "Nova Design Studio", amount: "₹82,050.50", status: "Pending", badgeColor: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)", hoverBorder: "rgba(245, 158, 11, 0.4)" },
    { id: "INV-0026", name: "Apex Global Labs", amount: "₹3,11,000.00", status: "Overdue", badgeColor: "#ef4444", bg: "rgba(239, 68, 68, 0.1)", hoverBorder: "rgba(239, 68, 68, 0.4)" },
  ];

  const heroHeadlineWords = ["Smart", "Billing", "Management", "System"];
  const ctaHeadlineWords = ["Empower", "Your", "Enterprise", "Asset", "Flow", "Today"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 110, damping: 20 } }
  };

  const tickerVariants = {
    animate: {
      x: [0, -1000],
      transition: { x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" } }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top right, #f8fafc, #f1f5f9)",
        overflowX: "hidden",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative"
      }}
    >
      <style>{`
        .navbar-brand:hover {
          color: #4f46e5 !important;
          text-shadow: 0 0 25px rgba(79, 70, 229, 0.6);
        }
        .proximity-word {
          display: inline-block;
          transition: text-shadow 0.2s ease-out, color 0.2s ease-out, filter 0.2s ease-out;
          will-change: text-shadow, color, filter;
        }
        .hero-word {
          color: #111827;
        }
        .cta-word {
          color: rgba(255, 255, 255, 0.85);
        }
        .flip-card { background-color: transparent; height: 350px; perspective: 1000px; cursor: pointer; }
        .flip-card-inner { position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1); transform-style: preserve-3d; }
        .flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
        .flip-card-front, .flip-card-back { position: absolute; width: 100%; height: 100%; -webkit-backface-visibility: hidden; backface-visibility: hidden; border-radius: 24px; padding: 32px 24px; box-sizing: border-box; }
        .flip-card-front { background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.7); display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.04); }
        .flip-card-back { background: linear-gradient(135deg, #4f46e5 0%, #1e3a8a 100%); color: white; transform: rotateY(180deg); display: flex; flex-direction: column; align-items: flex-start; justify-content: center; text-align: left; }
        .img-layer { box-shadow: 0 35px 70px -15px rgba(0, 0, 0, 0.15); transition: box-shadow 0.4s ease; }
        .img-layer:hover { box-shadow: 0 50px 85px -10px rgba(79, 70, 229, 0.25); }
        
        .transaction-row {
          display: flex; 
          align-items: center; 
          justify-content: space-between; 
          background: #ffffff; 
          padding: 12px 16px; 
          border-radius: 14px; 
          border: 1px solid #f1f5f9;
          transition: all 0.25s ease;
        }
        @keyframes customPulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.4; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* BACKGROUND AMBIENCE */}
      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)", top: "-150px", left: "-150px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)", top: "400px", right: "-200px", pointerEvents: "none" }} />

      {/* STICKY GLASS NAVBAR */}
      <nav style={{ width: "100%", padding: "18px 6%", background: "rgba(255, 255, 255, 0.75)", backdropFilter: "blur(20px)", display: "flex", justifyContent: "space-between", alignItems: "center", boxSizing: "border-box", position: "sticky", top: 0, zIndex: 1000, borderBottom: "1px solid rgba(226, 232, 240, 0.6)" }}>
        <h1 className="navbar-brand" style={{ fontSize: "26px", fontWeight: "800", color: "#4f46e5", margin: 0, letterSpacing: "-0.5px", cursor: "pointer", transition: "all 0.3s" }}>BillFlow</h1>
        <div style={{ display: "flex", gap: "14px" }}>
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => window.location.href = "/login"} style={{ background: "transparent", border: "none", color: "#4b5563", fontWeight: "600", fontSize: "15px", cursor: "pointer" }}>Login</motion.button>
          <motion.button whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(79, 70, 229, 0.2)" }} onClick={() => window.location.href = "/register"} style={{ padding: "11px 24px", border: "none", borderRadius: "12px", background: "#4f46e5", color: "white", fontWeight: "600", fontSize: "15px", cursor: "pointer" }}>Register</motion.button>
        </div>
      </nav>

      {/* HERO DASHBOARD GRID */}
      <section style={{ padding: "100px 6% 90px 6%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "70px", alignItems: "center" }}>
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <div style={{ background: "linear-gradient(95deg, #eef2ff, #e0e7ff)", color: "#4f46e5", width: "fit-content", padding: "8px 18px", borderRadius: "30px", fontWeight: "600", fontSize: "14px", marginBottom: "25px", border: "1px solid rgba(79, 70, 229, 0.15)" }}>⚡ Automated Enterprise FinTech</div>
          
          {/* STATIC POSITION PROXIMITY GLOW HERO HEADLINE */}
          <h1 
            ref={heroHeadlineRef}
            style={{ 
              fontSize: "clamp(42px, 5vw, 64px)", 
              lineHeight: "1.2", 
              fontWeight: "800", 
              margin: "0 0 24px 0", 
              letterSpacing: "-0.02em",
              userSelect: "none"
            }}
          >
            {heroHeadlineWords.map((word, index) => (
              <span key={index} className="proximity-word hero-word">
                {word}&nbsp;
              </span>
            ))}
          </h1>
          
          <p style={{ fontSize: "18px", color: "#4b5563", lineHeight: "1.8", marginBottom: "40px", maxWidth: "580px" }}>
            Scale financial infrastructure with complex pipeline automation, transparent tracking frameworks, and dynamic analytics ledger integrations.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <motion.button whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)" }} onClick={() => window.location.href = "/register"} style={{ padding: "16px 32px", border: "none", borderRadius: "16px", background: "#4f46e5", color: "white", fontWeight: "700", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
              Launch Workstation <FaArrowRight />
            </motion.button>
          </div>
        </motion.div>

        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }} style={{ display: "flex", flexDirection: "column", gap: "30px", perspective: 1500 }}>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", borderRadius: "28px", overflow: "hidden", background: "#ffffff", border: "1px solid rgba(255,255,255,0.7)", cursor: "crosshair" }}
            className="img-layer"
          >
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" alt="Platform Dashboard" style={{ width: "100%", height: "auto", display: "block" }} />
          </motion.div>

          <motion.div whileHover={{ y: -4 }} style={{ background: "rgba(255, 255, 255, 0.7)", backdropFilter: "blur(20px)", borderRadius: "24px", padding: "24px", border: "1px solid rgba(255, 255, 255, 0.8)", boxShadow: "0 20px 40px -15px rgba(0,0,0,0.04)" }}>
            <h4 style={{ margin: "0 0 16px 0", color: "#1f2937", fontSize: "15px", fontWeight: "700", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Live Ledger Pipeline</span>
              <span style={{ fontSize: "11px", padding: "4px 8px", background: "#e0e7ff", color: "#4f46e5", borderRadius: "12px" }}>Active Syncing</span>
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {recentTransactions.map((tx, idx) => (
                <div 
                  key={idx} 
                  className="transaction-row"
                  style={{ ':hover': { borderColor: tx.hoverBorder } }}
                >
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: "600", fontSize: "13px", color: "#111827" }}>{tx.name}</div>
                    <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{tx.id}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontWeight: "700", fontSize: "14px", color: "#111827" }}>{tx.amount}</span>
                    <span style={{ fontSize: "11px", fontWeight: "700", padding: "4px 10px", borderRadius: "20px", color: tx.badgeColor, background: tx.bg }}>{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* INFINITE INTEGRATIONS TICKER */}
      <section style={{ background: "#ffffff", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", padding: "35px 0", overflow: "hidden", position: "relative", display: "flex" }}>
        <motion.div variants={tickerVariants} animate="animate" style={{ display: "flex", gap: "80px", whiteSpace: "nowrap", paddingRight: "40px" }}>
          {[1, 2].map((loop) => (
            <div key={loop} style={{ display: "flex", gap: "80px", alignItems: "center" }}>
              <div style={tickerItem}><FaCreditCard /> Stripe Architecture</div>
              <div style={tickerItem}><FaCcVisa /> Visa Global Merchant</div>
              <div style={tickerItem}><FaServer /> Amazon Web Infrastructure</div>
              <div style={tickerItem}><FaHubspot /> HubSpot CRM Engine</div>
              <div style={tickerItem}><FaShopify /> Shopify Merchant Flow</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* SYSTEM PULSE LIVE COUNTER GRID */}
      <section style={{ padding: "100px 6% 30px 6%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", maxWidth: "1100px", margin: "0 auto" }}>
          {systemStats.map((stat, idx) => (
            <div key={idx} style={{ background: "rgba(255,255,255,0.4)", border: "1px solid rgba(226, 232, 240, 0.6)", backdropFilter: "blur(8px)", padding: "24px", borderRadius: "20px", display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{ fontSize: "20px", background: "#ffffff", width: "46px", height: "46px", borderRadius: "14px", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.02)" }}>{stat.icon}</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", letterSpacing: "-1px" }}>{stat.value}</div>
                <div style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section style={{ padding: "60px 6% 110px 6%" }}>
        <div style={{ textAlign: "center", marginBottom: "70px" }}>
          <h2 style={{ fontSize: "38px", fontWeight: "800", marginBottom: "12px", color: "#111827" }}>Powerful Features</h2>
          <p style={{ color: "#6b7280", fontSize: "17px", margin: 0 }}>Advanced operational processing modules inside your control terminal.</p>
        </div>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
          {features.map((feature, index) => (
            <motion.div variants={itemVariants} key={index} className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div style={{ width: "60px", height: "60px", borderRadius: "16px", background: `${feature.color}12`, color: feature.color, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "22px", marginBottom: "20px" }}>{feature.icon}</div>
                  <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "12px", color: "#1e293b", marginTop: 0 }}>{feature.title}</h3>
                  <p style={{ color: "#4b5563", lineHeight: "1.6", fontSize: "14px", margin: 0 }}>{feature.desc}</p>
                </div>
                <div className="flip-card-back">
                  <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>Deploys Safely:</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", marginBottom: "14px" }}>
                    {feature.points.map((pt, pIdx) => (
                      <div key={pIdx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#e0e7ff" }}>
                        <FaCheckCircle style={{ color: "#34d399", flexShrink: 0 }} />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ color: "#cbd5e1", lineHeight: "1.5", fontSize: "13px", margin: 0, borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "10px" }}>{feature.backDesc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CALL TO ACTION DATA MATRIX PANEL */}
      <section style={{ padding: "0 6% 120px 6%" }}>
        <motion.div initial={{ scale: 0.98, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #4f46e5 100%)", borderRadius: "40px", padding: "60px 50px", color: "white", boxShadow: "0 30px 60px -15px rgba(79, 70, 229, 0.25)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "50px", alignItems: "center" }}>
          <div style={{ textAlign: "left" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255, 255, 255, 0.1)", padding: "8px 16px", borderRadius: "30px", fontSize: "13px", fontWeight: "600", marginBottom: "24px" }}>⚡ Instantly Fully Scalable</div>
            
            {/* STATIC POSITION PROXIMITY GLOW CTA HEADLINE */}
            <h2 
              ref={ctaHeadlineRef} 
              style={{ 
                fontSize: "clamp(32px, 4.5vw, 46px)", 
                fontWeight: "800", 
                margin: "0 0 20px 0", 
                lineHeight: "1.35",
                userSelect: "none"
              }}
            >
              {ctaHeadlineWords.map((word, index) => (
                <span key={index} className="proximity-word cta-word">
                  {word}&nbsp;
                </span>
              ))}
            </h2>
            
            <p style={{ fontSize: "17px", color: "#e0e7ff", marginBottom: "35px", lineHeight: "1.7" }}>Link business endpoints safely. Synchronize payment routing channels with sub-millisecond precision analytics logs.</p>
            <motion.button whileHover={{ scale: 1.04 }} onClick={() => window.location.href = "/register"} style={{ padding: "18px 40px", border: "none", borderRadius: "18px", background: "#ffffff", color: "#4f46e5", fontWeight: "800", fontSize: "16px", cursor: "pointer" }}>Initiate Account Configuration</motion.button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} style={{ borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(255, 255, 255, 0.15)" }}>
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Financial Analytics Nodes" style={{ width: "100%", height: "auto", display: "block" }} />
            </motion.div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { icon: <FaBolt style={{ color: "#38bdf8" }} />, text: "Automated Micro-Payment Collection" },
                { icon: <FaGlobe style={{ color: "#34d399" }} />, text: "Multi-Jurisdictional Vault Routing" }
              ].map((item, idx) => (
                <div key={idx} style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "14px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "12px", textAlign: "left" }}>
                  <div style={{ display: "flex" }}>{item.icon}</div>
                  <span style={{ fontSize: "14px", fontWeight: "500", color: "#f1f5f9" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* FLOATING GLASS QUICK-STATS DRAWER */}
      <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 2000, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <AnimatePresence>
          {showDrawer && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{
                background: "rgba(15, 23, 42, 0.9)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                padding: "20px",
                width: "280px",
                color: "white",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                marginBottom: "12px",
                textAlign: "left"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: "700", tracking: "1px", color: "#38bdf8", display: "flex", alignItems: "center", gap: "6px" }}><FaSignal /> LIVE NODES</span>
                <button onClick={() => setShowDrawer(false)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "14px", display: "flex" }}><FaTimes /></button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={drawerStatRow}><span>US-East Node</span><span style={{ color: "#34d399" }}>● Operational</span></div>
                <div style={drawerStatRow}><span>EU-West Node</span><span style={{ color: "#34d399" }}>● Operational</span></div>
                <div style={drawerStatRow}><span>AP-South Node</span><span style={{ color: "#34d399" }}>● Operational</span></div>
                <div style={drawerStatRow}><span>API Gateway</span><span style={{ color: "#38bdf8" }}>99.998% clean</span></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowDrawer(!showDrawer)}
          style={{
            background: showDrawer ? "#ef4444" : "#1e1b4b",
            color: "white",
            border: "none",
            borderRadius: "30px",
            padding: "12px 20px",
            fontWeight: "600",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            transition: "background 0.2s"
          }}
        >
          <div 
            style={{ 
              width: "7px", 
              height: "7px", 
              borderRadius: "50%", 
              background: "#34d399",
              animation: "customPulse 2s infinite"
            }} 
          />
          {showDrawer ? "Close Monitor" : "System Status"}
        </motion.button>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0f172a", padding: "40px 6%", textAlign: "center", color: "#9ca3af", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <h3 style={{ color: "white", margin: "0 0 10px 0", fontWeight: "700" }}>BillFlow</h3>
        <p style={{ margin: 0, fontSize: "13px" }}>Corporate Financial Management Systems Framework © 2026</p>
      </footer>
    </div>
  );
}

const tickerItem = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "15px",
  fontWeight: "600",
  color: "#64748b",
};

const drawerStatRow = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "13px",
  color: "#cbd5e1",
};

export default LandingPage;