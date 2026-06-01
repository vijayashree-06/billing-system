// src/pages/ReportsPage.jsx
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
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
} from "react-icons/fa";

function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [activeBar, setActiveBar] = useState(null);
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

  // FETCH LIVE DATA FROM BILLING, PAYMENTS & EXPENSES
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);
        
        // Replace these URLs with your genuine backend API endpoints
        // Example: Promise.all([fetch('/api/payments'), fetch('/api/invoices'), fetch('/api/expenses')])
        
        /* const [paymentsRes, invoicesRes, expensesRes, customersRes] = await Promise.all([
          fetch(`/api/analytics/revenue?period=${selectedPeriod}`),
          fetch("/api/analytics/invoices"),
          fetch("/api/analytics/customers"),
          fetch("/api/analytics/recent-activity")
        ]);
        
        const [revenueData, invoiceData, customerData, recentData] = await Promise.all([
          paymentsRes.json(), invoicesRes.json(), customersRes.json(), invoicesRes.json()
        ]);
        */

        // For now, simulating API mapping structure:
        // Update state fields with incoming raw metrics directly
        setDashboardMetrics({
          totalRevenue: 245000, // Derived from total sum of successful payments
          invoiceCount: 1248,   // Derived from invoice table array length
          customerCount: 320,   // Derived from unique client database list
          totalExpenses: 72000,  // Derived from total corporate expenses logged
          revenueGrowth: "+12%",
          invoiceGrowth: "+8%",
          customerGrowth: "+5%",
          expenseGrowth: "-3%",
        });

        // Set your dynamic time series array values here matching the active timeframe selection
        // Array structure expected: [ { label: "Jan", amount: 45 }, { label: "Feb", amount: 70 } ]
        const timeSeriesMock = {
          Daily: [{ label: "Mon", amount: 20 }, { label: "Tue", amount: 35 }, { label: "Wed", amount: 28 }, { label: "Thu", amount: 40 }, { label: "Fri", amount: 55 }, { label: "Sat", amount: 48 }],
          Weekly: [{ label: "W1", amount: 60 }, { label: "W2", amount: 75 }, { label: "W3", amount: 50 }, { label: "W4", amount: 95 }],
          Monthly: [{ label: "Jan", amount: 45 }, { label: "Feb", amount: 70 }, { label: "Mar", amount: 55 }, { label: "Apr", amount: 90 }, { label: "May", amount: 75 }, { label: "Jun", amount: 110 }],
          Yearly: [{ label: "2023", amount: 410 }, { label: "2024", amount: 520 }],
        };

        setSalesChartData(timeSeriesMock[selectedPeriod] || []);
        
        setRecentLiveReports([
          { name: "Live Revenue Audit", date: "01 Jun 2026", status: "Completed" },
          { name: "Pending Gateway Payouts", date: "31 May 2026", status: "Pending" },
          { name: "System Tax Invoice Summary", date: "28 May 2026", status: "Completed" },
        ]);

        setError(null);
      } catch (err) {
        setError("Failed to stream accurate billing metrics. Check API connection.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [selectedPeriod]);

  // UTILITY HELPER: INDIAN CURRENCY SYSTEM FORMATTING (₹)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // STRUCTURING INTEGRATED REPORTING CARDS
  const reportsCardsConfig = [
    {
      title: "Total Revenue",
      value: formatCurrency(dashboardMetrics.totalRevenue),
      growth: dashboardMetrics.revenueGrowth,
      icon: <FaChartLine />,
      color: "#4f46e5",
      bg: "#eef2ff",
      status: "up",
    },
    {
      title: "Invoices Issued",
      value: dashboardMetrics.invoiceCount.toLocaleString("en-IN"),
      growth: dashboardMetrics.invoiceGrowth,
      icon: <FaFileInvoiceDollar />,
      color: "#10b981",
      bg: "#dcfce7",
      status: "up",
    },
    {
      title: "Active Customers",
      value: dashboardMetrics.customerCount.toLocaleString("en-IN"),
      growth: dashboardMetrics.customerGrowth,
      icon: <FaUsers />,
      color: "#f59e0b",
      bg: "#fef3c7",
      status: "up",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(dashboardMetrics.totalExpenses),
      growth: dashboardMetrics.expenseGrowth,
      icon: <FaChartBar />,
      color: "#ef4444",
      bg: "#fee2e2",
      status: "down",
    },
  ];

  // PDF DOWNLOAD EXPORT
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Billing & Payment Analytics Report", 20, 20);
    
    doc.setFontSize(14);
    doc.text(`Generated Timeline View: ${selectedPeriod}`, 20, 40);
    doc.text(`Aggregate Live Revenue Total: ${formatCurrency(dashboardMetrics.totalRevenue)}`, 20, 50);

    let yPosition = 70;
    doc.text("Breakdown Summary:", 20, yPosition);
    yPosition += 10;

    salesChartData.forEach((item) => {
      doc.text(`${item.label} : ₹${item.amount}k`, 25, yPosition);
      yPosition += 12;
    });

    doc.save(`${selectedPeriod}-Live-Financial-Report.pdf`);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f3f4f6", fontFamily: "sans-serif" }}>
        <h3>Streaming aggregate real-time metrics...</h3>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6", overflowX: "hidden", fontFamily: "sans-serif" }}>
      <Sidebar />
      <div style={{ flex: 1, width: "100%", overflowX: "hidden" }}>
        <TopNav title="Reports" />

        <div style={{ padding: isMobile ? "12px" : "20px", width: "100%", boxSizing: "border-box" }}>
          {/* BANNER */}
          <div style={{ background: "linear-gradient(to right,#4f46e5,#7c3aed)", borderRadius: "22px", padding: isMobile ? "22px" : "30px", color: "white", marginBottom: "20px" }}>
            <h1 style={{ fontSize: isMobile ? "28px" : "42px", marginBottom: "10px" }}>Live System Statements</h1>
            <p style={{ opacity: 0.9, lineHeight: "1.6", fontSize: isMobile ? "14px" : "16px" }}>
              Real-time audit overview sync with your accounting books, invoices, payments entries, and expense tracking tables.
            </p>
          </div>

          {error && <div style={{ padding: "15px", background: "#fee2e2", color: "#ef4444", borderRadius: "14px", marginBottom: "20px", fontWeight: "600" }}>{error}</div>}

          {/* CONTROL STRIP */}
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "center", gap: "15px", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "white", padding: "14px", borderRadius: "14px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
              <FaCalendarAlt style={{ color: "#4f46e5" }} />
              <select
                value={selectedPeriod}
                onChange={(e) => {
                  setSelectedPeriod(e.target.value);
                  setActiveBar(null);
                }}
                style={{ border: "none", outline: "none", background: "transparent", width: "100%", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>

            <button onClick={handleDownload} style={{ border: "none", padding: "14px 18px", borderRadius: "14px", background: "#4f46e5", color: "white", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: "600", width: isMobile ? "100%" : "auto" }}>
              <FaDownload /> Download Report
            </button>
          </div>

          {/* DYNAMIC METRIC GRID CARDS */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(240px,1fr))", gap: "18px", marginBottom: "20px" }}>
            {reportsCardsConfig.map((report, index) => (
              <div key={index} style={{ background: "white", borderRadius: "22px", padding: "22px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                  <div style={{ width: "58px", height: "58px", borderRadius: "18px", background: report.bg, color: report.color, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "22px" }}>
                    {report.icon}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", color: report.status === "up" ? "#10b981" : "#ef4444", fontWeight: "600" }}>
                    {report.status === "up" ? <FaArrowUp /> : <FaArrowDown />} {report.growth}
                  </div>
                </div>
                <p style={{ color: "#6b7280", marginBottom: "8px" }}>{report.title}</p>
                <h2 style={{ fontSize: isMobile ? "24px" : "30px", color: "#111827" }}>{report.value}</h2>
              </div>
            ))}
          </div>

          {/* ANALYTICS VISUALIZER & LOG REVIEWS */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: "20px" }}>
            {/* BAR GRAPH VISUALIZER */}
            <div style={{ background: "white", borderRadius: "22px", padding: isMobile ? "18px" : "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", overflowX: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "10px" }}>
                <h2 style={{ fontSize: "22px", color: "#111827" }}>{selectedPeriod} Distribution Analysis</h2>
                <button style={{ border: "none", background: "#eef2ff", color: "#4f46e5", padding: "10px 14px", borderRadius: "12px", fontWeight: "600", cursor: "pointer" }}>View Details</button>
              </div>

              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: isMobile ? "8px" : "15px", height: isMobile ? "230px" : "320px" }}>
                {salesChartData.map((item, index) => (
                  <div key={index} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                    <div style={{ marginBottom: "10px", opacity: activeBar === index ? 1 : 0, transition: "0.3s", background: "#111827", color: "white", padding: "6px 10px", borderRadius: "10px", fontSize: "12px", fontWeight: "600" }}>
                      ₹{item.amount}k
                    </div>
                    <div
                      onClick={() => setActiveBar(activeBar === index ? null : index)}
                      style={{
                        width: "100%",
                        height: isMobile ? `${item.amount * 0.9}px` : `${item.amount * 0.6}px`,
                        background: activeBar === index ? "linear-gradient(to top,#7c3aed,#c084fc)" : "linear-gradient(to top,#4f46e5,#7c3aed)",
                        borderRadius: "14px 14px 0 0",
                        cursor: "pointer",
                        transition: "0.3s",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        color: "white",
                        fontWeight: "600",
                        paddingTop: "10px",
                        fontSize: isMobile ? "11px" : "14px",
                        transform: activeBar === index ? "scale(1.05)" : "scale(1)",
                        boxShadow: activeBar === index ? "0 12px 20px rgba(124,58,237,0.3)" : "none",
                      }}
                    >
                      {activeBar === index ? `₹${item.amount}k` : ""}
                    </div>
                    <p style={{ marginTop: "10px", color: "#6b7280", fontWeight: "600", fontSize: isMobile ? "12px" : "14px" }}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* LIVE CONSOLE LOG ENTRY VIEW */}
            <div style={{ background: "white", borderRadius: "22px", padding: isMobile ? "18px" : "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
              <h2 style={{ fontSize: "22px", marginBottom: "25px", color: "#111827" }}>Recent Audit Tracks</h2>
              {recentLiveReports.map((report, index) => (
                <div key={index} style={{ padding: "16px", borderRadius: "18px", background: "#f9fafb", marginBottom: "15px", cursor: "pointer", transition: "0.3s" }}>
                  <h4 style={{ margin: "0 0 8px 0", color: "#111827", fontSize: isMobile ? "15px" : "16px" }}>{report.name}</h4>
                  <p style={{ margin: "0 0 10px 0", color: "#6b7280", fontSize: "13px" }}>{report.date}</p>
                  <span style={{ background: report.status === "Completed" ? "#dcfce7" : "#fef3c7", color: report.status === "Completed" ? "#166534" : "#92400e", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                    {report.status}
                  </span>
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