// src/pages/ReportsPage.jsx
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Cell
} from "recharts";
import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";
import {
  FaChartBar,
  FaChartLine,
  FaFileInvoiceDollar,
  FaUsers,
  FaDownload,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaCheckCircle,
  FaClock,
  FaFileAlt
} from "react-icons/fa";

// FRAMER MOTION ANIMATION VARIANTS
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 18 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } }
};

// HIGH-QUALITY AUDIT TRACK IMAGES FOR PREMIUM UI LOOK
const REPORT_THEME_IMAGES = {
  "Live Revenue Audit": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&q=80",
  "Pending Gateway Payouts": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80",
  "System Tax Invoice Summary": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=120&q=80",
  "Default": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=120&q=80"
};

function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  
  const [dashboardMetrics, setDashboardMetrics] = useState({
    totalRevenue: 0,
    invoiceCount: 0,
    customerCount: 0,
    totalExpenses: 0,
    revenueGrowth: "0%",
    invoiceGrowth: "0%",
    customerGrowth: "0%",
    expenseGrowth: "0%",
  });
  const [salesChartData, setSalesChartData] = useState([]);
  const [recentLiveReports, setRecentLiveReports] = useState([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);
        // Simulate premium metrics sync
        setDashboardMetrics({
          totalRevenue: 245000, 
          invoiceCount: 1248,   
          customerCount: 320,   
          totalExpenses: 72000,  
          revenueGrowth: "+12%",
          invoiceGrowth: "+8%",
          customerGrowth: "+5%",
          expenseGrowth: "-3%",
        });

        const timeSeriesMock = {
          Daily: [
            { label: "Mon", amount: 20 }, { label: "Tue", amount: 35 }, 
            { label: "Wed", amount: 28 }, { label: "Thu", amount: 40 }, 
            { label: "Fri", amount: 55 }, { label: "Sat", amount: 48 }
          ],
          Weekly: [
            { label: "W1", amount: 60 }, { label: "W2", amount: 75 }, 
            { label: "W3", amount: 50 }, { label: "W4", amount: 95 }
          ],
          Monthly: [
            { label: "Jan", amount: 45 }, { label: "Feb", amount: 70 }, 
            { label: "Mar", amount: 55 }, { label: "Apr", amount: 90 }, 
            { label: "May", amount: 75 }, { label: "Jun", amount: 110 }
          ],
          Yearly: [
            { label: "2023", amount: 410 }, { label: "2024", amount: 520 }
          ],
        };

        setSalesChartData(timeSeriesMock[selectedPeriod] || []);
        
        setRecentLiveReports([
          { name: "Live Revenue Audit", date: "01 Jun 2026", status: "Completed" },
          { name: "Pending Gateway Payouts", date: "31 May 2026", status: "Pending" },
          { name: "System Tax Invoice Summary", date: "28 May 2026", status: "Completed" },
        ]);

        setError(null);
      } catch (err) {
        setError("Failed to stream accurate billing metrics.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [selectedPeriod]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const reportsCardsConfig = [
    {
      title: "Total Revenue",
      value: formatCurrency(dashboardMetrics.totalRevenue),
      growth: dashboardMetrics.revenueGrowth,
      icon: <FaChartLine />,
      color: "#6366f1",
      glow: "rgba(99, 102, 241, 0.25)",
      status: "up",
    },
    {
      title: "Invoices Issued",
      value: dashboardMetrics.invoiceCount.toLocaleString("en-IN"),
      growth: dashboardMetrics.invoiceGrowth,
      icon: <FaFileInvoiceDollar />,
      color: "#10b981",
      glow: "rgba(16, 185, 129, 0.25)",
      status: "up",
    },
    {
      title: "Active Customers",
      value: dashboardMetrics.customerCount.toLocaleString("en-IN"),
      growth: dashboardMetrics.customerGrowth,
      icon: <FaUsers />,
      color: "#f59e0b",
      glow: "rgba(245, 158, 11, 0.25)",
      status: "up",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(dashboardMetrics.totalExpenses),
      growth: dashboardMetrics.expenseGrowth,
      icon: <FaChartBar />,
      color: "#ef4444",
      glow: "rgba(239, 68, 68, 0.25)",
      status: "down",
    },
  ];

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Billing & Payment Analytics Report", 20, 20);
    doc.save(`${selectedPeriod}-Live-Financial-Report.pdf`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={styles.chartTooltip}>
          <p style={{ margin: 0 }}>{`Value: ₹${payload[0].value}k`}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div style={styles.loaderCanvas}>
        <div style={styles.spinnerElement}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{`
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }
        .control-select:focus-within {
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15) !important;
        }
      `}</style>

      {/* AMBIENT BACKGROUND GLOW NODES */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1], 
          x: [0, 30, 0], 
          y: [0, -20, 0] 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={styles.ambientBlobLeft} 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1], 
          x: [0, -40, 0], 
          y: [0, 40, 0] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={styles.ambientBlobRight} 
      />

      {/* SIDEBAR NAVIGATION BLOCK */}
      <div style={{ height: "100vh", position: "sticky", top: 0, zIndex: 100, flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* MAIN VIEW AREA */}
      <div style={{ flex: 1, height: "100vh", overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column", zIndex: 10 }}>
        
        <div style={styles.stickyTopNav}>
          <TopNav title="Reports & Analytics" />
        </div>

        {/* CONTENT PACK WRAPPER */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ padding: isMobile ? "24px" : "36px", boxSizing: "border-box" }}
        >
          {/* TOAST SYSTEM ACCELERATOR */}
          <AnimatePresence>
            {showToast && (
              <motion.div 
                initial={{ opacity: 0, y: -30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                style={styles.toastNotification}
              >
                <FaCheckCircle style={{ color: "#10b981", fontSize: "16px" }} />
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#ffffff" }}>Financial report spreadsheet saved successfully.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* DYNAMIC WELCOME BANNER MATCHING CORE DASHBOARD */}
          <motion.div variants={cardVariants} style={styles.welcomeBanner}>
            <div style={styles.bannerOverlay} />
            <div style={{ position: "relative", zIndex: 2, maxWidth: isMobile ? "100%" : "70%" }}>
              <span style={styles.bannerBadge}>FINANCIAL LEDGER ACTIVE</span>
              <h1 style={{ fontSize: isMobile ? "26px" : "34px", fontWeight: "800", margin: "0 0 10px 0", letterSpacing: "-0.02em" }}>
                Live System Statements
              </h1>
              <p style={styles.bannerSubtitle}>
                Real-time audit overview sync with your accounting books, invoices, payment entries, and expense tracking tables.
              </p>
            </div>

            {!isMobile && (
              <svg style={styles.bannerVectorGraphic} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 160 L70 110 L120 130 L170 60" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M30 160 L70 110 L120 130 L170 60 L170 160 Z" fill="linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)" />
                <circle cx="170" cy="60" r="6" fill="#10b981" />
                <circle cx="70" cy="110" r="4" fill="#6366f1" />
                <line x1="20" y1="160" x2="180" y2="160" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              </svg>
            )}
          </motion.div>

          {error && <div style={styles.errorPanel}>{error}</div>}

          {/* UTILITY CONTROL ROW */}
          <div style={{ ...styles.controlRow, flexDirection: isMobile ? "column" : "row" }}>
            <div className="control-select" style={styles.filterWrapper}>
              <FaCalendarAlt style={{ color: "#6366f1", fontSize: "14px" }} />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                style={styles.dropdownElement}
              >
                <option style={{ background: "#111827" }}>Daily</option>
                <option style={{ background: "#111827" }}>Weekly</option>
                <option style={{ background: "#111827" }}>Monthly</option>
                <option style={{ background: "#111827" }}>Yearly</option>
              </select>
            </div>

            <motion.button 
              whileHover={{ y: -2, scale: 1.02, boxShadow: "0 10px 20px rgba(79,70,229,0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload} 
              style={styles.downloadReportBtn}
            >
              <FaDownload /> Download Report
            </motion.button>
          </div>

          {/* GRID METRICS SECTION */}
          <div style={{ ...styles.metricsGrid, gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {reportsCardsConfig.map((report, index) => (
              <motion.div 
                key={index} 
                variants={cardVariants}
                whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.04)", boxShadow: `0 20px 30px -10px ${report.glow}` }}
                style={styles.metricCard}
              >
                <div style={styles.metricCardHeader}>
                  <div style={{ ...styles.iconBox, background: `rgba(${report.color === "#6366f1" ? "99,102,241" : report.color === "#10b981" ? "16,185,129" : report.color === "#f59e0b" ? "245,158,11" : "239,68,68"}, 0.12)`, color: report.color }}>
                    {report.icon}
                  </div>
                  <div style={{
                    ...styles.growthBadge,
                    backgroundColor: report.status === "up" ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
                    color: report.status === "up" ? "#34d399" : "#f87171"
                  }}>
                    {report.status === "up" ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />} {report.growth}
                  </div>
                </div>
                <p style={styles.metricCardTitle}>{report.title}</p>
                <h2 style={styles.metricCardValue}>{report.value}</h2>
              </motion.div>
            ))}
          </div>

          {/* VISUAL ANALYTICS LAYOUT SECTION */}
          <div style={{ ...styles.bottomDashboardLayout, gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr" }}>
            
            {/* BAR CHART GRAPH WORKSTATION */}
            <motion.div variants={cardVariants} style={styles.glassPanelCard}>
              <h2 style={styles.panelHeading}>{selectedPeriod} Distribution Analysis</h2>
              <div style={{ width: "100%", height: isMobile ? 260 : 330 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesChartData} margin={{ top: 10, right: 10, left: -22, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                    <Bar dataKey="amount" radius={[6, 6, 0, 0]} maxBarSize={40}>
                      {salesChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="url(#premiumReportGrad)" />
                      ))}
                    </Bar>
                    <defs>
                      <linearGradient id="premiumReportGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#4f46e5" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* AUDIT LOG MODULE WITH PREMIUM IMAGES */}
            <motion.div variants={cardVariants} style={styles.glassPanelCard}>
              <h2 style={styles.panelHeading}>Recent Audit Tracks</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {recentLiveReports.map((report, index) => {
                  const itemThumbnail = REPORT_THEME_IMAGES[report.name] || REPORT_THEME_IMAGES.Default;
                  const isCompleted = report.status === "Completed";
                  
                  return (
                    <motion.div 
                      key={index}
                      variants={itemVariants}
                      whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.03)" }}
                      style={styles.auditLogItem}
                    >
                      {/* DYNAMIC PHOTO THUMBNAIL INTEGRATION */}
                      <div style={styles.thumbnailWrapper}>
                        <img src={itemThumbnail} alt={report.name} style={styles.auditImage} />
                        <div style={styles.thumbnailStatusIconBox}>
                          {isCompleted ? (
                            <FaCheckCircle style={{ color: "#10b981", fontSize: "11px" }} />
                          ) : (
                            <FaClock style={{ color: "#f59e0b", fontSize: "11px" }} />
                          )}
                        </div>
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={styles.auditItemName}>{report.name}</h4>
                        <p style={styles.auditItemDate}>{report.date}</p>
                        <span style={{
                          ...styles.auditStatusBadge,
                          background: isCompleted ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
                          color: isCompleted ? "#34d399" : "#fbbf24"
                        }}>
                          {report.status}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex", height: "100vh", 
    backgroundColor: "#0b0f19",
    overflowX: "hidden", overflowY: "hidden",
    fontFamily: "system-ui, -apple-system, sans-serif",
    position: "relative"
  },
  loaderCanvas: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0b0f19" },
  spinnerElement: { border: "3px solid rgba(255,255,255,0.05)", borderTop: "3px solid #6366f1", borderRadius: "50%", width: "36px", height: "36px", animation: "spin 0.8s linear infinite" },
  stickyTopNav: { position: "sticky", top: 0, zIndex: 90, background: "rgba(11, 15, 25, 0.75)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
  ambientBlobLeft: { position: "absolute", width: "350px", height: "350px", top: "15%", left: "-100px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", filter: "blur(20px)", pointerEvents: "none", zIndex: 1 },
  ambientBlobRight: { position: "absolute", width: "400px", height: "400px", bottom: "10%", right: "-150px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)", filter: "blur(30px)", pointerEvents: "none", zIndex: 1 },
  toastNotification: {
    position: "fixed", top: "32px", right: "32px", background: "#1e293b", padding: "16px 24px",
    borderRadius: "16px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
    display: "flex", alignItems: "center", gap: "12px", zIndex: 999999, border: "1px solid rgba(255,255,255,0.08)"
  },
  welcomeBanner: {
    background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)", 
    borderRadius: "24px", padding: "36px 40px", color: "white", marginBottom: "32px", position: "relative",
    overflow: "hidden", display: "flex", justifyContent: "space-between", alignItems: "center",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    boxShadow: "0 20px 40px -15px rgba(0,0,0,0.6)"
  },
  bannerOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at bottom right, rgba(124,58,237,0.12) 0%, transparent 65%)", zIndex: 1 },
  bannerBadge: { background: "rgba(99, 102, 241, 0.15)", color: "#a5b4fc", fontSize: "11px", fontWeight: "700", padding: "5px 12px", borderRadius: "6px", letterSpacing: "0.5px", display: "inline-block", marginBottom: "14px" },
  bannerSubtitle: { opacity: 0.7, margin: 0, fontSize: "14.5px", lineHeight: "1.6" },
  bannerVectorGraphic: { width: "120px", height: "120px", position: "relative", zIndex: 2, opacity: 0.7 },
  errorPanel: { padding: "16px", background: "rgba(239, 68, 68, 0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "16px", marginBottom: "32px", fontWeight: "600" },
  controlRow: { display: "flex", justifyContent: "space-between", alignItems: "stretch", gap: "16px", marginBottom: "32px" },
  filterWrapper: { display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.03)", padding: "0 18px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.06)", height: "46px", transition: "all 0.2s" },
  dropdownElement: { border: "none", outline: "none", background: "transparent", fontSize: "14.5px", fontWeight: "600", cursor: "pointer", color: "#ffffff", width: "110px" },
  downloadReportBtn: { border: "none", padding: "12px 24px", borderRadius: "14px", background: "linear-gradient(135deg, #4f46e5, #6366f1)", color: "white", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: "600", boxShadow: "0 4px 14px rgba(79, 70, 229, 0.3)" },
  metricsGrid: { display: "grid", gap: "24px", marginBottom: "32px" },
  metricCard: { background: "rgba(255, 255, 255, 0.02)", borderRadius: "20px", padding: "24px", border: "1px solid rgba(255, 255, 255, 0.05)", boxSBox: "border-box", transition: "all 0.3s" },
  metricCardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  iconBox: { width: "46px", height: "46px", borderRadius: "14px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "18px" },
  growthBadge: { display: "flex", alignItems: "center", gap: "4px", padding: "4px 10px", borderRadius: "100px", fontSize: "12px", fontWeight: "700" },
  metricCardTitle: { color: "#64748b", fontSize: "13.5px", fontWeight: "600", margin: "0 0 6px 0", letterSpacing: "0.01em", textTransform: "uppercase" },
  metricCardValue: { fontSize: "28px", fontWeight: "700", color: "#ffffff", margin: 0, letterSpacing: "-0.02em" },
  bottomDashboardLayout: { display: "grid", gap: "32px" },
  glassPanelCard: { background: "rgba(255, 255, 255, 0.02)", borderRadius: "24px", padding: "28px", border: "1px solid rgba(255, 255, 255, 0.05)", boxShadow: "0 20px 40px -15px rgba(0,0,0,0.3)" },
  panelHeading: { fontSize: "18px", fontWeight: "700", color: "#ffffff", margin: "0 0 24px 0", letterSpacing: "-0.01em" },
  chartTooltip: { backgroundColor: "#0f172a", color: "#fff", padding: "10px 14px", borderRadius: "10px", fontSize: "13px", fontWeight: "600", border: "1px solid rgba(255,255,255,0.1)" },
  auditLogItem: { padding: "14px", borderRadius: "16px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", display: "flex", gap: "14px", alignItems: "center", transition: "all 0.2s" },
  thumbnailWrapper: { position: "relative", width: "44px", height: "44px", borderRadius: "10px", overflow: "hidden", background: "#1e293b", flexShrink: 0 },
  auditImage: { width: "100%", height: "100%", objectFit: "cover" },
  thumbnailStatusIconBox: { position: "absolute", bottom: "-2px", right: "-2px", background: "#0b0f19", width: "18px", height: "18px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid rgba(255,255,255,0.05)" },
  auditItemName: { margin: "0 0 3px 0", color: "#e2e8f0", fontSize: "14.5px", fontWeight: "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  auditItemDate: { margin: "0 0 10px 0", color: "#64748b", fontSize: "12.5px" },
  auditStatusBadge: { padding: "3px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.02em" }
};

export default ReportsPage;