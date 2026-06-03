// src/pages/ReportsPage.jsx
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
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
  FaClock
} from "react-icons/fa";

function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // LIVE DATA STATES
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  // RESPONSIVE VIEWPORT LISTENER
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // FETCH LIVE DATA
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);
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
      bg: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
      status: "up",
    },
    {
      title: "Invoices Issued",
      value: dashboardMetrics.invoiceCount.toLocaleString("en-IN"),
      growth: dashboardMetrics.invoiceGrowth,
      icon: <FaFileInvoiceDollar />,
      color: "#10b981",
      bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
      status: "up",
    },
    {
      title: "Active Customers",
      value: dashboardMetrics.customerCount.toLocaleString("en-IN"),
      growth: dashboardMetrics.customerGrowth,
      icon: <FaUsers />,
      color: "#f59e0b",
      bg: "linear-gradient(135deg, #fffbb1 0%, #fef3c7 100%)",
      status: "up",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(dashboardMetrics.totalExpenses),
      growth: dashboardMetrics.expenseGrowth,
      icon: <FaChartBar />,
      color: "#ef4444",
      bg: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
      status: "down",
    },
  ];

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Billing & Payment Analytics Report", 20, 20);
    doc.save(`${selectedPeriod}-Live-Financial-Report.pdf`);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: "#0f172a", color: "#fff", padding: "10px 14px", borderRadius: "12px", fontSize: "13px", fontWeight: "600", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
          <p style={{ margin: 0 }}>{`Value: ₹${payload[0].value}k`}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f8fafc" }}>
        <div style={{ border: "3px solid #e2e8f0", borderTop: "3px solid #6366f1", borderRadius: "50%", width: "35px", height: "35px", animation: "spin 0.8s linear infinite" }}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f8fafc", overflow: "hidden", fontFamily: "system-ui, sans-serif" }}>
      
      {/* LOCKED SIDEBAR HOUSING WRAPPER */}
      <div style={{ height: "100vh", position: "sticky", top: 0, zIndex: 100, flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* INDEPENDENT SCROLLABLE MAIN CONTENT AREA */}
      <div style={{ flex: 1, height: "100vh", overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column" }}>
        
        {/* TOP NAV GLASSMORPHISM TRACK */}
        <div style={{ position: "sticky", top: 0, zIndex: 90, background: "rgba(248, 250, 252, 0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(226, 232, 240, 0.8)" }}>
          <TopNav title="Reports" />
        </div>

        {/* CONTAINER CONTENT SLOPING BOX */}
        <div style={{ padding: isMobile ? "20px" : "40px", width: "100%", boxSizing: "border-box" }}>
          
          {/* BANNER WITH SLEEK ACCENT RADIUS */}
          <div style={{ 
            background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", 
            borderRadius: "24px", 
            padding: isMobile ? "24px" : "40px", 
            color: "white", 
            marginBottom: "32px",
            boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.25)"
          }}>
            <h1 style={{ fontSize: isMobile ? "26px" : "38px", fontWeight: "800", marginBottom: "12px", letterSpacing: "-0.02em" }}>Live System Statements</h1>
            <p style={{ opacity: 0.85, lineHeight: "1.6", fontSize: isMobile ? "14px" : "16px", margin: 0, fontWeight: "400" }}>
              Real-time audit overview sync with your accounting books, invoices, payments entries, and expense tracking tables.
            </p>
          </div>

          {error && <div style={{ padding: "16px", background: "#fee2e2", color: "#ef4444", borderRadius: "16px", marginBottom: "32px", fontWeight: "600" }}>{error}</div>}

          {/* CONTROLS */}
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "center", gap: "16px", marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "white", padding: "12px 20px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.03)", border: "1px solid #e2e8f0" }}>
              <FaCalendarAlt style={{ color: "#6366f1" }} />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                style={{ border: "none", outline: "none", background: "transparent", fontSize: "15px", fontWeight: "600", cursor: "pointer", color: "#0f172a" }}
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>

            <button onClick={handleDownload} style={{ border: "none", padding: "14px 24px", borderRadius: "16px", background: "#4f46e5", color: "white", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: "600", boxShadow: "0 4px 14px rgba(79, 70, 229, 0.35)", transition: "opacity 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
              <FaDownload /> Download Report
            </button>
          </div>

          {/* CARDS METRIC GRID */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "32px" }}>
            {reportsCardsConfig.map((report, index) => (
              <div key={index} style={{ background: "white", borderRadius: "24px", padding: "28px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.03)", border: "1px solid #e2e8f0", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }} onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.05)';}} onMouseLeave={(e) => {e.currentTarget.style.transform = 'translateY(0px)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.03)';}}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: report.bg, color: report.color, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "22px" }}>
                    {report.icon}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", backgroundColor: report.status === "up" ? "#d1fae5" : "#fee2e2", padding: "6px 14px", borderRadius: "100px", color: report.status === "up" ? "#065f46" : "#991b1b", fontSize: "13px", fontWeight: "700" }}>
                    {report.status === "up" ? <FaArrowUp size={11} /> : <FaArrowDown size={11} />} {report.growth}
                  </div>
                </div>
                <p style={{ color: "#64748b", fontSize: "14px", fontWeight: "500", margin: "0 0 6px 0", letterSpacing: "0.01em" }}>{report.title}</p>
                <h2 style={{ fontSize: "30px", fontWeight: "700", color: "#0f172a", margin: 0, letterSpacing: "-0.03em" }}>{report.value}</h2>
              </div>
            ))}
          </div>

          {/* VISUAL DATA PLOTS CHART AREA */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: "32px" }}>
            <div style={{ background: "white", borderRadius: "24px", padding: isMobile ? "20px" : "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.03)", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: "0 0 24px 0" }}>{selectedPeriod} Distribution Analysis</h2>
              <div style={{ width: "100%", height: isMobile ? 260 : 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                    <Bar dataKey="amount" radius={[6, 6, 0, 0]} maxBarSize={45}>
                      {salesChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="url(#purpleBlueGrad)" />
                      ))}
                    </Bar>
                    <defs>
                      <linearGradient id="purpleBlueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#4f46e5" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AUDIT LOG PANEL */}
            <div style={{ background: "white", borderRadius: "24px", padding: isMobile ? "20px" : "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.03)", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", marginBottom: "24px" }}>Recent Audit Tracks</h2>
              {recentLiveReports.map((report, index) => (
                <div key={index} style={{ padding: "16px", borderRadius: "20px", background: "#f8fafc", marginBottom: "16px", border: "1px solid #f1f5f9", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{ color: report.status === "Completed" ? "#10b981" : "#f59e0b", marginTop: "2px", fontSize: "16px" }}>
                    {report.status === "Completed" ? <FaCheckCircle /> : <FaClock />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: "0 0 4px 0", color: "#1e293b", fontSize: "15px", fontWeight: "600" }}>{report.name}</h4>
                    <p style={{ margin: "0 0 12px 0", color: "#64748b", fontSize: "13px" }}>{report.date}</p>
                    <span style={{ background: report.status === "Completed" ? "#d1fae5" : "#fef3c7", color: report.status === "Completed" ? "#065f46" : "#92400e", padding: "4px 12px", borderRadius: "100px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.02em" }}>
                      {report.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ReportsPage;