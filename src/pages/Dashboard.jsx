// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";

import {
  FaUsers,
  FaMoneyBillWave,
  FaBoxOpen,
  FaFileInvoice,
  FaCheckCircle,
  FaUserPlus,
  FaCreditCard,
  FaChartLine,
  FaPlus,
  FaTrash,
  FaEdit,
  FaDownload,
  FaCalendarAlt,
  FaIdCard,
  FaExclamationTriangle,
  FaInbox
} from "react-icons/fa";

function Dashboard() {
  const [hoveredBar, setHoveredBar] = useState(null);
  const [selectedChartBar, setSelectedChartBar] = useState(null);
  const [dialogType, setDialogType] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // 1. INITIALIZE STATE FROM LOCALSTORAGE
  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem("dashboard_activities");
    return savedActivities ? JSON.parse(savedActivities) : [
      { text: "Invoice Created Successfully", color: "#10b981", type: "invoice" },
      { text: "New Customer Registered", color: "#3b82f6", type: "customer" },
      { text: "Payment Received", color: "#f59e0b", type: "payment" },
      { text: "Product Added", color: "#8b5cf6", type: "product" },
      { text: "Revenue Increased", color: "#ef4444", type: "revenue" },
    ];
  });

  const [invoices, setInvoices] = useState(() => {
    const savedInvoices = localStorage.getItem("dashboard_invoices");
    return savedInvoices ? JSON.parse(savedInvoices) : [
      { id: "INV001", customer: "Arjun", date: "28 May 2026", amount: "₹12,000", status: "Paid" },
      { id: "INV002", customer: "Rahul", date: "27 May 2026", amount: "₹8,500", status: "Pending" },
      { id: "INV003", customer: "Kavin", date: "26 May 2026", amount: "₹4,300", status: "Paid" },
    ];
  });

  const [newInvoice, setNewInvoice] = useState({
    id: "",
    customer: "",
    date: "",
    amount: "",
    status: "Pending",
  });

  const [editForm, setEditForm] = useState({ customer: "", amount: "", status: "Pending" });

  // 2. SYNC STATES TO LOCALSTORAGE ON CHANGES
  useEffect(() => {
    localStorage.setItem("dashboard_invoices", JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem("dashboard_activities", JSON.stringify(activities));
  }, [activities]);

  const getActivityIcon = (type) => {
    switch (type) {
      case "invoice": return <FaCheckCircle />;
      case "customer": return <FaUserPlus />;
      case "payment": return <FaCreditCard />;
      case "product": return <FaBoxOpen />;
      case "revenue": return <FaChartLine />;
      default: return <FaPlus />;
    }
  };

  const cards = [
    { title: "Revenue", value: "₹3,40,000", icon: <FaMoneyBillWave />, color: "#4f46e5", glow: "rgba(79, 70, 229, 0.15)" },
    { title: "Customers", value: "245", icon: <FaUsers />, color: "#10b981", glow: "rgba(16, 185, 129, 0.15)" },
    { title: "Products", value: "85", icon: <FaBoxOpen />, color: "#8b5cf6", glow: "rgba(139, 92, 246, 0.15)" },
    { title: "Invoices", value: invoices.length, icon: <FaFileInvoice />, color: "#ef4444", glow: "rgba(239, 68, 68, 0.15)" },
  ];

  const revenueData = [
    { month: "Jan", amount: "₹20,000", height: 80, color: "#4f46e5" },
    { month: "Feb", amount: "₹35,000", height: 130, color: "#7c3aed" },
    { month: "Mar", amount: "₹28,000", height: 100, color: "#ec4899" },
    { month: "Apr", amount: "₹48,000", height: 180, color: "#06b6d4" },
    { month: "May", amount: "₹38,000", height: 140, color: "#10b981" },
    { month: "Jun", amount: "₹60,000", height: 230, color: "#f59e0b" },
  ];

  const handleAddInvoice = () => {
    if (!newInvoice.id || !newInvoice.customer || !newInvoice.date || !newInvoice.amount) {
      alert("Please fill all fields");
      return;
    }

    let formattedAmount = newInvoice.amount;
    if (!formattedAmount.startsWith("₹")) {
      formattedAmount = "₹" + formattedAmount;
    }

    let formattedDate = newInvoice.date;
    if (newInvoice.date.includes("-")) {
      const d = new Date(newInvoice.date);
      formattedDate = d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    }

    const createdInvoice = { ...newInvoice, amount: formattedAmount, date: formattedDate };
    setInvoices([...invoices, createdInvoice]);
    setActivities([{ text: `Invoice ${newInvoice.id} Created`, color: "#10b981", type: "invoice" }, ...activities]);

    setNewInvoice({ id: "", customer: "", date: "", amount: "", status: "Pending" });
    setSelectedInvoice(null);
  };

  const handleEditInvoice = () => {
    if (!editForm.customer || !editForm.amount) {
      alert("Please fill all fields");
      return;
    }

    let formattedAmount = editForm.amount;
    if (!formattedAmount.startsWith("₹")) {
      formattedAmount = "₹" + formattedAmount;
    }

    const updated = invoices.map((inv) =>
      inv.id === selectedInvoice.id ? { ...inv, customer: editForm.customer, amount: formattedAmount, status: editForm.status } : inv
    );

    setInvoices(updated);
    setActivities([{ text: `Invoice ${selectedInvoice.id} Updated`, color: "#3b82f6", type: "invoice" }, ...activities]);
    setSelectedInvoice(null);
  };

  const handleDeleteInvoice = () => {
    const updated = invoices.filter((invoice) => invoice.id !== selectedInvoice.id);
    setInvoices(updated);
    setActivities([{ text: `Invoice ${selectedInvoice.id} Removed`, color: "#ef4444", type: "revenue" }, ...activities]);
    setSelectedInvoice(null);
  };

  const handleDownloadInvoice = (invoice) => {
    const executePdfGeneration = () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      
      doc.setFillColor(79, 70, 229);
      doc.rect(0, 0, 210, 38, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("INVOICE STATEMENT", 15, 24);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text("AUTOMATED SYSTEM MANAGEMENT TERMINAL", 145, 24);

      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("INVOICE DETAILS", 15, 52);
      
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(15, 55, 195, 55);

      doc.setFont("helvetica", "bold"); doc.text("Invoice ID:", 15, 65);
      doc.setFont("helvetica", "normal"); doc.text(String(invoice.id), 50, 65);

      doc.setFont("helvetica", "bold"); doc.text("Customer Node:", 15, 73);
      doc.setFont("helvetica", "normal"); doc.text(String(invoice.customer), 50, 73);

      doc.setFont("helvetica", "bold"); doc.text("Timestamp Node:", 15, 81);
      doc.setFont("helvetica", "normal"); doc.text(String(invoice.date), 50, 81);

      doc.setFont("helvetica", "bold"); doc.text("Pipeline State:", 15, 89);
      doc.setFont("helvetica", "normal"); doc.text(String(invoice.status), 50, 89);

      doc.setFillColor(248, 250, 252);
      doc.rect(15, 100, 180, 20, "F");
      doc.setDrawColor(79, 70, 229);
      doc.line(15, 100, 15, 120);

      doc.setTextColor(79, 70, 229);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("TOTAL VALUATION AMOUNT", 22, 112);
      
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(15);
      doc.text(String(invoice.amount), 155, 112);

      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text("This document serves as an official system manifest generated directly via application memory nodes.", 15, 275);

      doc.save(`Invoice_${invoice.id}_Manifest.pdf`);
    };

    if (!window.jspdf) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      script.onload = executePdfGeneration;
      document.body.appendChild(script);
    } else {
      executePdfGeneration();
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar />

      <style>{`
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; borderRadius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        .modal-input-group:focus-within {
          border-color: #4f46e5 !important;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1) !important;
          background: #ffffff !important;
        }
        .modal-input-group:focus-within svg { color: #4f46e5 !important; }
        .interactive-row:hover { background-color: #f8fafc !important; transform: scale(1.002); }
      `}</style>

      <div style={{ flex: 1, height: "100vh", overflowY: "auto", display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopNav title="Dashboard" />

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ padding: "24px" }}
        >
          {/* WELCOME BANNER */}
          <div style={styles.welcomeBanner}>
            <div style={styles.welcomeOverlay} />
            <div style={{ position: "relative", zIndex: 2, maxWidth: "60%" }}>
              <h1 style={styles.bannerTitle}>Welcome Back Terminal Node</h1>
              <p style={styles.bannerSubtitle}>
                Operational systems are secure. You have {invoices.filter(i => i.status === "Pending").length} pending transaction pipelines requiring audit clearances.
              </p>
            </div>
            <svg style={styles.bannerVector} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 60 L100 20 L180 60 L100 100 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>
              <path d="M20 100 L100 60 L180 100 L100 140 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
              <path d="M20 140 L100 100 L180 140 L100 180 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="2"/>
              <circle cx="100" cy="60" r="12" fill="#38bdf8" opacity="0.75" filter="drop-shadow(0 0 8px #38bdf8)"/>
              <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4"/>
            </svg>
          </div>

          {/* HIGHLIGHT METRICS GRID */}
          <div style={styles.metricsGrid}>
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, type: "spring", stiffness: 60 }}
                whileHover={{ y: -5, boxShadow: `0 20px 25px -5px ${card.glow}, 0 10px 10px -5px rgba(0,0,0,0.02)` }}
                style={styles.metricCard}
              >
                <div>
                  <p style={styles.metricTitle}>{card.title}</p>
                  <h2 style={styles.metricValue}>{card.value}</h2>
                </div>
                <div style={{ ...styles.metricIconContainer, background: card.color }}>
                  {card.icon}
                </div>
              </motion.div>
            ))}
          </div>

          {/* SPLIT SECTION */}
          <div style={styles.splitGrid}>
            
            {/* REVENUE GRAPH */}
            <div style={styles.cardPanel}>
              <h2 style={styles.panelHeading}>Revenue Analytics</h2>
              <div style={styles.chartWrapper}>
                {revenueData.map((bar, index) => {
                  const isGlowing = selectedChartBar === index;
                  const showTooltip = hoveredBar === index || isGlowing;

                  return (
                    <div key={index} style={{ ...styles.chartColumn, zIndex: isGlowing ? 10 : 1 }}>
                      <AnimatePresence>
                        {showTooltip && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            style={{ ...styles.chartTooltip, top: `${170 - bar.height}px` }}
                          >
                            {bar.amount}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <motion.div
                        onMouseEnter={() => setHoveredBar(index)}
                        onMouseLeave={() => setHoveredBar(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedChartBar(isGlowing ? null : index);
                        }}
                        initial={{ height: 0 }}
                        animate={{ 
                          height: `${bar.height}px`,
                          scale: isGlowing ? 1.08 : 1,
                          boxShadow: isGlowing 
                            ? `0 0 25px 6px ${bar.color}, 0 0 10px 2px rgba(255, 255, 255, 0.5)` 
                            : "0 4px 6px -1px rgba(0,0,0,0.05)",
                          outline: isGlowing ? "2px solid #ffffff" : "0px solid transparent"
                        }}
                        transition={{ 
                          height: { duration: 0.8, ease: "easeOut", delay: index * 0.05 },
                          default: { duration: 0.2 }
                        }}
                        style={{
                          ...styles.chartBar,
                          background: `linear-gradient(to top, ${bar.color}, #c4b5fd)`,
                          cursor: "pointer",
                          boxSizing: "border-box",
                        }}
                      />
                      <p style={{
                        ...styles.chartLabel,
                        color: isGlowing ? bar.color : "#64748b",
                        fontWeight: isGlowing ? "800" : "700"
                      }}>{bar.month}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* LIVE SYSTEM ACTIVITY PIPELINES LOG */}
            <div style={styles.cardPanel}>
              <div style={styles.panelHeaderRow}>
                <h2 style={styles.panelHeading}>Recent Activities</h2>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#4338ca" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActivities([{ text: "Manual Operational Snapshot Generated", color: "#4f46e5", type: "default" }, ...activities])}
                  style={styles.actionCircleBtn}
                >
                  <FaPlus />
                </motion.button>
              </div>

              <div style={styles.activityScrollArea}>
                <AnimatePresence initial={false}>
                  {activities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      style={styles.activityItem}
                    >
                      <div style={styles.activityLeftNode}>
                        <div style={{ ...styles.activityIconBox, background: `${activity.color}15`, color: activity.color }}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <span style={styles.activityText}>{activity.text}</span>
                      </div>
                      <button
                        onClick={() => setActivities(activities.filter((_, i) => i !== index))}
                        style={styles.activityDeleteBtn}
                      >
                        <FaTrash />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* DATA TABLES INTERFACE */}
          <div style={{ ...styles.cardPanel, marginTop: "24px" }}>
            <div style={styles.panelHeaderRow}>
              <div>
                <h2 style={styles.panelHeading}>Recent Invoices Ledger</h2>
                <p style={{ fontSize: "13px", color: "#6b7280", margin: "4px 0 0 0" }}>System processing matrix updates inside localStorage nodes</p>
              </div>
              <motion.button
                whileHover={{ y: -2, scale: 1.02, boxShadow: "0 10px 15px -3px rgba(79,70,229,0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setDialogType("add");
                  setSelectedInvoice({ id: "", customer: "", date: "", amount: "", status: "Pending" });
                }}
                style={styles.primaryPanelActionBtn}
              >
                <FaPlus /> Add New Record
              </motion.button>
            </div>

            <div style={{ overflowX: "auto", margin: "0 -24px -24px -24px", padding: "0 24px 24px 24px" }}>
              {invoices.length === 0 ? (
                <div style={styles.emptyStateContainer}>
                  <FaInbox style={styles.emptyStateIcon} />
                  <h3 style={styles.emptyStateHeading}>No Invoices Available</h3>
                  <p style={styles.emptyStateText}>Initialize a brand new pipeline transaction record node to get started.</p>
                </div>
              ) : (
                <table style={styles.ledgerTable}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      <th style={styles.tableHead}>ID REF</th>
                      <th style={styles.tableHead}>CLIENT NODE</th>
                      <th style={styles.tableHead}>TIMESTAMP</th>
                      <th style={styles.tableHead}>VALUATION</th>
                      <th style={styles.tableHead}>PIPELINE STATE</th>
                      <th style={{ ...styles.tableHead, textAlign: "center" }}>ACTIONS OPERATIONAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence initial={false}>
                      {invoices.map((invoice, index) => (
                        <motion.tr
                          key={invoice.id || index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="interactive-row"
                          style={styles.tableRowStyle}
                        >
                          <td style={{ ...styles.tableData, fontWeight: "700", color: "#4f46e5" }}>{invoice.id}</td>
                          <td style={{ ...styles.tableData, fontWeight: "500" }}>{invoice.customer}</td>
                          <td style={styles.tableData}>{invoice.date}</td>
                          <td style={{ ...styles.tableData, fontWeight: "600" }}>{invoice.amount}</td>
                          <td style={styles.tableData}>
                            <span style={{
                              ...styles.statusBadge,
                              background: invoice.status === "Paid" ? "#e2fbe8" : "#fff3cd",
                              color: invoice.status === "Paid" ? "#15803d" : "#a16207",
                            }}>
                              <span style={{
                                ...styles.statusDot,
                                background: invoice.status === "Paid" ? "#16a34a" : "#ca8a04"
                              }} />
                              {invoice.status}
                            </span>
                          </td>
                          <td style={styles.tableData}>
                            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                              <button
                                onClick={() => {
                                  setSelectedInvoice(invoice);
                                  setEditForm({ customer: invoice.customer, amount: invoice.amount.replace("₹", ""), status: invoice.status });
                                  setDialogType("edit");
                                }}
                                style={{ ...styles.rowActionBtn, background: "#fef3c7", color: "#d97706" }}
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDownloadInvoice(invoice)}
                                style={{ ...styles.rowActionBtn, background: "#e2fbe8", color: "#16a34a" }}
                                title="Download Official Invoice PDF"
                              >
                                <FaDownload />
                              </button>
                              <button
                                onClick={() => { setSelectedInvoice(invoice); setDialogType("delete"); }}
                                style={{ ...styles.rowActionBtn, background: "#fee2e2", color: "#dc2626" }}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* DYNAMIC CONTAINER MODALS */}
      <AnimatePresence>
        {selectedInvoice && (
          <div style={styles.modalBackdrop}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              style={styles.modalCard}
            >
              <button onClick={() => setSelectedInvoice(null)} style={styles.modalCloseBtn}>×</button>

              {/* CREATE DATA CHANNEL */}
              {dialogType === "add" && (
                <>
                  <div style={styles.modalHeaderBlock}>
                    <FaFileInvoice style={{ fontSize: "24px", color: "#4f46e5" }} />
                    <h2 style={{ margin: 0, fontSize: "22px" }}>Initialize Invoice Node</h2>
                  </div>
                  
                  <div className="modal-input-group" style={styles.modalInputWrapper}>
                    <FaIdCard style={styles.modalInputIcon} />
                    <input
                      placeholder="Invoice Key Reference (e.g. INV004)"
                      value={newInvoice.id}
                      onChange={(e) => setNewInvoice({ ...newInvoice, id: e.target.value })}
                      style={styles.cleanInput}
                    />
                  </div>

                  <div className="modal-input-group" style={styles.modalInputWrapper}>
                    <FaUsers style={styles.modalInputIcon} />
                    <input
                      placeholder="Target Client Name"
                      value={newInvoice.customer}
                      onChange={(e) => setNewInvoice({ ...newInvoice, customer: e.target.value })}
                      style={styles.cleanInput}
                    />
                  </div>

                  <div className="modal-input-group" style={styles.modalInputWrapper}>
                    <FaCalendarAlt style={styles.modalInputIcon} />
                    <input
                      type="date"
                      value={newInvoice.date}
                      onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })}
                      style={styles.cleanInput}
                    />
                  </div>

                  <div className="modal-input-group" style={styles.modalInputWrapper}>
                    <FaMoneyBillWave style={styles.modalInputIcon} />
                    <input
                      placeholder="Valuation Matrix Base (₹)"
                      value={newInvoice.amount}
                      onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                      style={styles.cleanInput}
                    />
                  </div>

                  <div className="modal-input-group" style={styles.modalInputWrapper}>
                    <FaChartLine style={styles.modalInputIcon} />
                    <select
                      value={newInvoice.status}
                      onChange={(e) => setNewInvoice({ ...newInvoice, status: e.target.value })}
                      style={styles.cleanSelect}
                    >
                      <option value="Pending">State Flag: Pending Audits</option>
                      <option value="Paid">State Flag: Settled Liquid Asset</option>
                    </select>
                  </div>

                  <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.99 }} onClick={handleAddInvoice} style={styles.modalExecuteBtn}>
                    Inject Transaction Node
                  </motion.button>
                </>
              )}

              {/* MUTATE RECORDS DATA */}
              {dialogType === "edit" && (
                <>
                  <div style={styles.modalHeaderBlock}>
                    <FaEdit style={{ fontSize: "24px", color: "#eab308" }} />
                    <h2 style={{ margin: 0, fontSize: "22px" }}>Mutate Core Node ({selectedInvoice.id})</h2>
                  </div>
                  
                  <label style={styles.modalInputLabel}>Client Node Name Identifier</label>
                  <div className="modal-input-group" style={styles.modalInputWrapper}>
                    <FaUsers style={styles.modalInputIcon} />
                    <input
                      value={editForm.customer}
                      onChange={(e) => setEditForm({ ...editForm, customer: e.target.value })}
                      style={styles.cleanInput}
                    />
                  </div>

                  <label style={styles.modalInputLabel}>Valuation Base Metric (₹)</label>
                  <div className="modal-input-group" style={styles.modalInputWrapper}>
                    <FaMoneyBillWave style={styles.modalInputIcon} />
                    <input
                      value={editForm.amount}
                      onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                      style={styles.cleanInput}
                    />
                  </div>

                  <label style={styles.modalInputLabel}>Pipeline State Assignment</label>
                  <div className="modal-input-group" style={styles.modalInputWrapper}>
                    <FaChartLine style={styles.modalInputIcon} />
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      style={styles.cleanSelect}
                    >
                      <option value="Pending">State Flag: Pending Audits</option>
                      <option value="Paid">State Flag: Settled Liquid Asset</option>
                    </select>
                  </div>

                  <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.99 }} onClick={handleEditInvoice} style={{ ...styles.modalExecuteBtn, background: "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)" }}>
                    Commit Matrix Adjustments
                  </motion.button>
                </>
              )}

              {/* PRUNE OPERATIONAL ASSET */}
              {dialogType === "delete" && (
                <>
                  <div style={{ ...styles.modalHeaderBlock, justifyContent: "center", flexDirection: "column", gap: "12px", textAlign: "center" }}>
                    <div style={styles.warningIconWrapper}>
                      <FaExclamationTriangle />
                    </div>
                    <h2 style={{ margin: 0, fontSize: "22px", color: "#ef4444" }}>Confirm Structural Wipe</h2>
                  </div>
                  <p style={{ textAlign: "center", color: "#4b5563", fontSize: "15px", lineHeight: "1.5", margin: "0 0 24px 0" }}>
                    Are you absolutely sure you want to drop ledger frame object <strong>{selectedInvoice.id}</strong> from local storage clusters? This cannot be undone.
                  </p>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button onClick={() => setSelectedInvoice(null)} style={styles.modalCancelBtn}>Abort Action</button>
                    <button onClick={handleDeleteInvoice} style={styles.modalDeleteConfirmBtn}>Wipe Cluster</button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#f1f5f9",
    overflowX: "hidden",
    overflowY: "hidden",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  welcomeBanner: {
    background: "linear-gradient(135deg, #1e3a8a 0%, #4338ca 100%)",
    borderRadius: "28px",
    padding: "36px",
    color: "white",
    marginBottom: "24px",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  welcomeOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "radial-gradient(circle at bottom right, rgba(56,189,248,0.2) 0%, transparent 60%)",
    zIndex: 1
  },
  bannerTitle: {
    fontSize: "clamp(24px, 4vw, 34px)",
    fontWeight: "800",
    margin: "0 0 8px 0",
    letterSpacing: "-0.5px"
  },
  bannerSubtitle: {
    opacity: 0.85,
    margin: 0,
    fontSize: "15px",
    lineHeight: "1.6"
  },
  bannerVector: {
    width: "140px",
    height: "140px",
    position: "relative",
    zIndex: 2,
    opacity: 0.95
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginBottom: "24px"
  },
  metricCard: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 4px 15px rgba(148, 163, 184, 0.05)",
    border: "1px solid rgba(226, 232, 240, 0.8)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    boxSizing: "border-box",
    transition: "transform 0.2s, box-shadow 0.2s"
  },
  metricTitle: {
    color: "#64748b",
    fontWeight: "600",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: "0 0 6px 0"
  },
  metricValue: {
    fontSize: "clamp(24px, 3vw, 30px)",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
    letterSpacing: "-0.5px"
  },
  metricIconContainer: {
    width: "56px",
    height: "56px",
    borderRadius: "18px",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)"
  },
  splitGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "24px",
  },
  cardPanel: {
    background: "#ffffff",
    borderRadius: "28px",
    padding: "24px",
    boxShadow: "0 4px 15px rgba(148, 163, 184, 0.05)",
    border: "1px solid rgba(226, 232, 240, 0.8)",
    boxSizing: "border-box"
  },
  panelHeading: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#0f172a",
    margin: "0 0 20px 0"
  },
  panelHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    gap: "12px",
    flexWrap: "wrap"
  },
  actionCircleBtn: {
    width: "40px",
    height: "40px",
    border: "none",
    borderRadius: "12px",
    background: "#4f46e5",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)"
  },
  primaryPanelActionBtn: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px"
  },
  chartWrapper: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "12px",
    height: "210px",
    paddingTop: "24px",
    boxSizing: "border-box"
  },
  chartColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    transition: "z-index 0.2s ease"
  },
  chartBar: {
    width: "100%",
    maxWidth: "40px",
    borderRadius: "10px 10px 0 0",
  },
  chartLabel: {
    marginTop: "8px",
    fontSize: "12px",
    margin: "8px 0 0 0",
    transition: "color 0.2s ease, font-weight 0.2s ease"
  },
  chartTooltip: {
    position: "absolute",
    transform: "translateY(-110%)",
    background: "#0f172a",
    color: "white",
    padding: "6px 10px",
    borderRadius: "8px",
    fontSize: "11px",
    fontWeight: "600",
    zIndex: 15,
    whiteSpace: "nowrap",
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.15)"
  },
  activityScrollArea: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxHeight: "210px",
    overflowY: "auto",
    paddingRight: "4px"
  },
  activityItem: {
    background: "#f8fafc",
    border: "1px solid #f1f5f9",
    borderRadius: "16px",
    padding: "12px 14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    boxSizing: "border-box",
    overflow: "hidden"
  },
  activityLeftNode: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: 1,
    minWidth: 0
  },
  activityIconBox: {
    width: "38px",
    height: "38px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "15px",
    flexShrink: 0
  },
  activityText: {
    fontSize: "14px",
    color: "#334155",
    fontWeight: "600",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  activityDeleteBtn: {
    width: "32px",
    height: "32px",
    border: "none",
    borderRadius: "8px",
    background: "transparent",
    color: "#94a3b8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "color 0.2s, background 0.2s",
  },
  ledgerTable: {
    width: "100%",
    minWidth: "800px",
    borderCollapse: "collapse",
    marginTop: "8px"
  },
  tableHead: {
    textAlign: "left",
    padding: "14px 18px",
    borderBottom: "2px solid #edf2f7",
    color: "#64748b",
    fontWeight: "700",
    fontSize: "12px",
    letterSpacing: "0.5px"
  },
  tableData: {
    padding: "16px 18px",
    borderBottom: "1px solid #f1f5f9",
    color: "#334155",
    fontSize: "14px",
    verticalAlign: "middle"
  },
  tableRowStyle: {
    transition: "all 0.2s ease"
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "700"
  },
  statusDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%"
  },
  rowActionBtn: {
    width: "36px",
    height: "36px",
    border: "none",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "14px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
    transition: "transform 0.1s ease"
  },
  emptyStateContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 24px",
    textAlign: "center"
  },
  emptyStateIcon: {
    fontSize: "48px",
    color: "#cbd5e1",
    marginBottom: "16px"
  },
  emptyStateHeading: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#475569",
    margin: "0 0 4px 0"
  },
  emptyStateText: {
    fontSize: "14px",
    color: "#94a3b8",
    margin: 0
  },
  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.3)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    zIndex: 99999
  },
  modalCard: {
    background: "#ffffff",
    width: "100%",
    maxWidth: "440px",
    borderRadius: "28px",
    padding: "32px",
    position: "relative",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12)",
    boxSizing: "border-box"
  },
  modalCloseBtn: {
    position: "absolute",
    top: "20px",
    right: "20px",
    border: "none",
    background: "transparent",
    fontSize: "24px",
    color: "#94a3b8",
    cursor: "pointer",
  },
  modalHeaderBlock: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
  },
  modalInputLabel: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#64748b",
    marginBottom: "6px",
    marginTop: "12px",
  },
  modalInputWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "12px 16px",
    marginBottom: "16px",
    transition: "all 0.2s",
  },
  modalInputIcon: {
    color: "#94a3b8",
    fontSize: "18px",
  },
  cleanInput: {
    border: "none",
    background: "transparent",
    outline: "none",
    width: "100%",
    fontSize: "14px",
    color: "#334155",
  },
  cleanSelect: {
    border: "none",
    background: "transparent",
    outline: "none",
    width: "100%",
    fontSize: "14px",
    color: "#334155",
    cursor: "pointer",
  },
  modalExecuteBtn: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
    color: "white",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "16px",
    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)",
  },
  warningIconWrapper: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "#fee2e2",
    color: "#ef4444",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    margin: "0 auto 12px auto",
  },
  modalCancelBtn: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "14px",
    background: "#f1f5f9",
    color: "#64748b",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },
  modalDeleteConfirmBtn: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "14px",
    background: "#ef4444",
    color: "white",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)",
  },
};

export default Dashboard;