// src/pages/CustomersPage.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";

import {
  FaUsers,
  FaUserPlus,
  FaSearch,
  FaTrash,
  FaEdit,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdCard,
  FaInbox,
  FaDownload,
  FaCheckCircle
} from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.08 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 110, damping: 16 } 
  }
};

function CustomersPage() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showExportSuccess, setShowExportSuccess] = useState(false);

  const [customers, setCustomers] = useState(() => {
    const savedCustomers = localStorage.getItem("dashboard_customers");
    if (savedCustomers) {
      try { return JSON.parse(savedCustomers); } 
      catch (error) { console.error("Error parsing local storage data", error); }
    }
    return [
      { id: 1, name: "Arjun Kumar", email: "arjun@gmail.com", phone: "+91 9876543210", location: "Chennai", status: "Active" },
      { id: 2, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "+91 9876543211", location: "Bangalore", status: "Inactive" },
      { id: 3, name: "Kavin Raj", email: "kavin@gmail.com", phone: "+91 9876543212", location: "Hyderabad", status: "Active" },
      { id: 4, name: "Priya", email: "priya@gmail.com", phone: "+91 9876543213", location: "Mumbai", status: "Active" },
    ];
  });

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", location: "", status: "Active",
  });

  useEffect(() => {
    localStorage.setItem("dashboard_customers", JSON.stringify(customers));
  }, [customers]);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.location.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: "", email: "", phone: "", location: "", status: "Active" });
    setShowModal(true);
  };

  const handleEditClick = (customer) => {
    setEditingId(customer.id);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      location: customer.location,
      status: customer.status,
    });
    setShowModal(true);
  };

  const handleSaveCustomer = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.location) {
      alert("Please fill all fields");
      return;
    }

    if (editingId !== null) {
      setCustomers(customers.map((c) => c.id === editingId ? { ...c, ...formData } : c));
    } else {
      setCustomers([...customers, { id: Date.now(), ...formData }]);
    }

    setFormData({ name: "", email: "", phone: "", location: "", status: "Active" });
    setEditingId(null);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  const triggerDataExport = () => {
    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 3000);
  };

  const activeCustomers = customers.filter((customer) => customer.status === "Active").length;
  const inactiveCustomers = customers.filter((customer) => customer.status === "Inactive").length;

  const statsCards = [
    { title: "Total Customers", value: customers.length, icon: <FaUsers />, color: "#4f46e5", glow: "rgba(79, 70, 229, 0.2)" },
    { title: "Active Nodes", value: activeCustomers, icon: <FaUserPlus />, color: "#10b981", glow: "rgba(16, 185, 129, 0.2)" },
    { title: "Inactive Nodes", value: inactiveCustomers, icon: <FaUsers />, color: "#ef4444", glow: "rgba(239, 68, 68, 0.2)" },
  ];

  const getAvatarGradient = (name) => {
    const charCode = name ? name.charCodeAt(0) : 65;
    if (charCode % 3 === 0) return "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)";
    if (charCode % 3 === 1) return "linear-gradient(135deg, #10b981 0%, #059669 100%)";
    return "linear-gradient(135deg, #ec4899 0%, #d946ef 100%)";
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
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12) !important;
          background: #ffffff !important;
        }
        .modal-input-group:focus-within svg { color: #4f46e5 !important; transform: scale(1.08); transition: transform 0.2s; }
        .interactive-row { transition: background-color 0.2s ease, transform 0.2s ease; }
        .interactive-row:hover { background-color: #f8fafc !important; transform: translateY(-1px); }
      `}</style>

      <div style={{ flex: 1, height: "100vh", overflowY: "auto", display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopNav title="Customers" />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ padding: "28px" }}
        >
          {/* TOAST SYSTEM ACCELERATOR */}
          <AnimatePresence>
            {showExportSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                style={styles.notificationToast}
              >
                <FaCheckCircle style={{ color: "#10b981", fontSize: "16px" }} />
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>Pipeline ledger compiled to spreadsheet format successfully.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BRANDED WELCOME BANNER */}
          <motion.div variants={cardVariants} style={styles.welcomeBanner}>
            <div style={styles.welcomeOverlay} />
            <div style={{ position: "relative", zIndex: 2, maxWidth: "65%" }}>
              <h1 style={styles.bannerTitle}>Customer Management Matrix</h1>
              <p style={styles.bannerSubtitle}>
                Calibrate data frameworks, inspect client transaction health channels, and monitor interconnected pipeline accounts.
              </p>
            </div>
            <svg style={styles.bannerVector} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="50" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              <path d="M60 100 L140 100 M100 60 L100 140" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              <motion.circle cx="60" cy="100" r="8" fill="#38bdf8" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} />
              <motion.circle cx="140" cy="100" r="8" fill="#10b981" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3, delay: 0.5, ease: "easeInOut" }} />
              <motion.circle cx="100" cy="60" r="8" fill="#f59e0b" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3, delay: 1, ease: "easeInOut" }} />
              <motion.circle cx="100" cy="140" r="8" fill="#ec4899" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3, delay: 1.5, ease: "easeInOut" }} />
            </svg>
          </motion.div>

          {/* HIGHLIGHT METRICS GRID */}
          <div style={styles.metricsGrid}>
            {statsCards.map((card, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6, boxShadow: `0 22px 30px -5px ${card.glow}` }}
                style={styles.metricCard}
              >
                <div>
                  <p style={styles.metricTitle}>{card.title}</p>
                  <h2 style={styles.metricValue}>{card.value}</h2>
                </div>
                <motion.div whileHover={{ rotate: 12, scale: 1.05 }} style={{ ...styles.metricIconContainer, background: card.color }}>
                  {card.icon}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CUSTOMER LEDGER PANEL */}
          <motion.div variants={cardVariants} style={styles.cardPanel}>
            <div style={styles.panelHeaderRow}>
              <div style={styles.searchContainerBlock}>
                <div style={styles.searchBarWrapper}>
                  <FaSearch style={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Filter by customer name or territory..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={styles.searchInput}
                  />
                </div>
                {/* ADVANCED LIVE METRIC HUB OVERLAY */}
                <span style={styles.searchFeedbackText}>
                  Matches: <b>{filteredCustomers.length}</b> rows of <b>{customers.length}</b> total directory records
                </span>
              </div>

              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                {/* EXTRA UTILITY ACTION: CSV DIRECTORY EXPORT */}
                <motion.button
                  whileHover={{ y: -2, background: "#f1f5f9" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={triggerDataExport}
                  style={styles.secondaryExportBtn}
                  title="Export Current Query Registry To Local Layout"
                >
                  <FaDownload /> Export Ledger
                </motion.button>

                <motion.button
                  whileHover={{ y: -2, scale: 1.02, boxShadow: "0 12px 20px -3px rgba(79,70,229,0.35)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openAddModal}
                  style={styles.primaryPanelActionBtn}
                >
                  <FaUserPlus /> Expand Node Directory
                </motion.button>
              </div>
            </div>

            {/* LEDGER DATA STRUCTURE LAYERS */}
            <div style={{ overflowX: "auto", margin: "0 -24px -24px -24px", padding: "0 24px 24px 24px" }}>
              {filteredCustomers.length === 0 ? (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} style={styles.emptyStateContainer}>
                  <FaInbox style={styles.emptyStateIcon} />
                  <h3 style={styles.emptyStateHeading}>Zero Matching Database Nodes</h3>
                  <p style={styles.emptyStateText}>No active entity maps to your filter configurations.</p>
                </motion.div>
              ) : (
                <table style={styles.ledgerTable}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      <th style={styles.tableHead}>CLIENT MATRIX IDENTITY</th>
                      <th style={styles.tableHead}>EMAIL PIPELINE</th>
                      <th style={styles.tableHead}>CONTACT CHANNEL</th>
                      <th style={styles.tableHead}>TERRITORY CORRIDOR</th>
                      <th style={styles.tableHead}>SYSTEM STATE</th>
                      <th style={{ ...styles.tableHead, textAlign: "center" }}>OPERATIONAL ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence initial={false}>
                      {filteredCustomers.map((customer) => (
                        <motion.tr
                          key={customer.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -15, transition: { duration: 0.18 } }}
                          layout
                          className="interactive-row"
                          style={styles.tableRowStyle}
                        >
                          <td style={styles.tableData}>
                            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                              <motion.div whileHover={{ scale: 1.08 }} style={{ ...styles.avatarCircle, background: getAvatarGradient(customer.name) }}>
                                {customer.name ? customer.name.charAt(0).toUpperCase() : "C"}
                              </motion.div>
                              <span style={{ fontWeight: "700", color: "#0f172a" }}>{customer.name}</span>
                            </div>
                          </td>

                          <td style={styles.tableData}>
                            <div style={styles.tableIconLabelGroup}>
                              <FaEnvelope style={{ color: "#94a3b8" }} />
                              <span>{customer.email}</span>
                            </div>
                          </td>

                          <td style={styles.tableData}>
                            <div style={styles.tableIconLabelGroup}>
                              <FaPhoneAlt style={{ color: "#94a3b8" }} />
                              <span style={{ fontFamily: "monospace", fontWeight: "600" }}>{customer.phone}</span>
                            </div>
                          </td>

                          <td style={styles.tableData}>
                            <div style={styles.tableIconLabelGroup}>
                              <FaMapMarkerAlt style={{ color: "#ef4444", opacity: 0.85 }} />
                              <span style={{ fontWeight: "500" }}>{customer.location}</span>
                            </div>
                          </td>

                          <td style={styles.tableData}>
                            <span style={{
                              ...styles.statusBadge,
                              background: customer.status === "Active" ? "#e2fbe8" : "#fee2e2",
                              color: customer.status === "Active" ? "#15803d" : "#991b1b",
                            }}>
                              <span style={{ ...styles.statusDot, background: customer.status === "Active" ? "#16a34a" : "#ef4444" }} />
                              {customer.status}
                            </span>
                          </td>

                          <td style={styles.tableData}>
                            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                              <motion.button
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                onClick={() => handleEditClick(customer)}
                                style={{ ...styles.rowActionBtn, background: "#fef3c7", color: "#d97706" }}
                                title="Mutate Node Data"
                              >
                                <FaEdit />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                onClick={() => handleDelete(customer.id)}
                                style={{ ...styles.rowActionBtn, background: "#fee2e2", color: "#dc2626" }}
                                title="Prune Database Record"
                              >
                                <FaTrash />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* DYNAMIC MODAL ENGINE LAYER */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.modalBackdrop}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              style={styles.modalCard}
            >
              <button onClick={() => setShowModal(false)} style={styles.modalCloseBtn}>×</button>

              <div style={styles.modalHeaderBlock}>
                <FaIdCard style={{ fontSize: "24px", color: "#4f46e5" }} />
                <h2 style={{ margin: 0, fontSize: "21px", fontWeight: "800", color: "#0f172a" }}>
                  {editingId !== null ? "Mutate Node Interface" : "Inject Customer Entity"}
                </h2>
              </div>

              <label style={styles.modalInputLabel}>Customer Legal Title</label>
              <div className="modal-input-group" style={styles.modalInputWrapper}>
                <FaUsers style={styles.modalInputIcon} />
                <input
                  type="text" placeholder="Full name string" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={styles.cleanInput}
                />
              </div>

              <label style={styles.modalInputLabel}>Secure Communication Gateway</label>
              <div className="modal-input-group" style={styles.modalInputWrapper}>
                <FaEnvelope style={styles.modalInputIcon} />
                <input
                  type="email" placeholder="client@enterprise.com" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={styles.cleanInput}
                />
              </div>

              <label style={styles.modalInputLabel}>Telephony Backbone Node</label>
              <div className="modal-input-group" style={styles.modalInputWrapper}>
                <FaPhoneAlt style={styles.modalInputIcon} />
                <input
                  type="text" placeholder="+91 XXXXX XXXXX" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={styles.cleanInput}
                />
              </div>

              <label style={styles.modalInputLabel}>Geographical Hub Location</label>
              <div className="modal-input-group" style={styles.modalInputWrapper}>
                <FaMapMarkerAlt style={styles.modalInputIcon} />
                <input
                  type="text" placeholder="Target regional core office" value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })} style={styles.cleanInput}
                />
              </div>

              <label style={styles.modalInputLabel}>Pipeline Operational State Flag</label>
              <div className="modal-input-group" style={styles.modalInputWrapper}>
                <FaIdCard style={styles.modalInputIcon} />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={styles.cleanSelect}
                >
                  <option value="Active">State Flag: Active Channel Access</option>
                  <option value="Inactive">State Flag: Suppressed Dormant State</option>
                </select>
              </div>

              <motion.button 
                whileHover={{ y: -2, boxShadow: "0 10px 20px rgba(79, 70, 229, 0.25)" }} whileTap={{ scale: 0.99 }} 
                onClick={handleSaveCustomer} 
                style={{
                  ...styles.modalExecuteBtn,
                  background: editingId !== null 
                    ? "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)" 
                    : "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)"
                }}
              >
                {editingId !== null ? "Commit Registry Changes" : "Deploy Entity Node"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles = {
  container: {
    display: "flex", height: "100vh", background: "#f4f6fa", overflowX: "hidden", overflowY: "hidden",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  notificationToast: {
    position: "fixed", top: "24px", right: "24px", background: "#ffffff", padding: "14px 20px",
    borderRadius: "14px", boxShadow: "0 20px 25px -5px rgba(15,23,42,0.1), 0 10px 10px -5px rgba(15,23,42,0.04)",
    display: "flex", alignItems: "center", gap: "10px", zIndex: 999999, border: "1px solid #e2e8f0"
  },
  welcomeBanner: {
    background: "linear-gradient(135deg, #1e1b4b 0%, #3730a3 100%)", borderRadius: "24px",
    padding: "40px", color: "white", marginBottom: "28px", position: "relative",
    overflow: "hidden", display: "flex", justifyContent: "space-between", alignItems: "center"
  },
  welcomeOverlay: {
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    background: "radial-gradient(circle at bottom right, rgba(16,185,129,0.12) 0%, transparent 65%)", zIndex: 1
  },
  bannerTitle: { fontSize: "clamp(24px, 4vw, 32px)", fontWeight: "800", margin: "0 0 10px 0", letterSpacing: "-0.5px" },
  bannerSubtitle: { opacity: 0.8, margin: 0, fontSize: "15px", lineHeight: "1.6" },
  bannerVector: { width: "140px", height: "140px", position: "relative", zIndex: 2, opacity: 0.95 },
  metricsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", marginBottom: "28px" },
  metricCard: {
    background: "#ffffff", borderRadius: "20px", padding: "24px", boxShadow: "0 4px 18px rgba(148, 163, 184, 0.04)",
    border: "1px solid rgba(226, 232, 240, 0.7)", display: "flex", justifyContent: "space-between", alignItems: "center",
    cursor: "pointer", boxSizing: "border-box",
  },
  metricTitle: { color: "#64748b", fontWeight: "700", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 6px 0" },
  metricValue: { fontSize: "clamp(26px, 3vw, 30px)", fontWeight: "800", color: "#0f172a", margin: 0, letterSpacing: "-0.5px" },
  metricIconContainer: {
    width: "52px", height: "52px", borderRadius: "16px", color: "white", display: "flex",
    justifyContent: "center", alignItems: "center", fontSize: "20px", boxShadow: "0 8px 16px -3px rgba(0,0,0,0.04)"
  },
  cardPanel: { background: "#ffffff", borderRadius: "24px", padding: "24px", boxShadow: "0 4px 18px rgba(148, 163, 184, 0.04)", border: "1px solid rgba(226, 232, 240, 0.7)", boxSizing: "border-box" },
  panelHeaderRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", gap: "16px", flexWrap: "wrap" },
  searchContainerBlock: { display: "flex", flexDirection: "column", gap: "6px", width: "100%", maxWidth: "380px" },
  searchBarWrapper: { position: "relative", width: "100%" },
  searchIcon: { position: "absolute", top: "50%", left: "18px", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "15px" },
  searchInput: {
    width: "100%", padding: "14px 14px 14px 48px", borderRadius: "16px", border: "1px solid #e2e8f0",
    background: "#f8fafc", outline: "none", fontSize: "14px", color: "#334155", boxSizing: "border-box", transition: "all 0.2s ease-in-out",
  },
  searchFeedbackText: { fontSize: "12px", color: "#64748b", paddingLeft: "4px" },
  secondaryExportBtn: {
    padding: "14px 20px", border: "1px solid #e2e8f0", borderRadius: "16px", background: "#ffffff",
    color: "#475569", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: "700", fontSize: "14px"
  },
  primaryPanelActionBtn: {
    padding: "14px 24px", border: "none", borderRadius: "16px", background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
    color: "white", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: "700", fontSize: "14px"
  },
  ledgerTable: { width: "100%", minWidth: "950px", borderCollapse: "collapse", marginTop: "4px" },
  tableHead: { textAlign: "left", padding: "16px 20px", borderBottom: "2px solid #f1f5f9", color: "#64748b", fontWeight: "700", fontSize: "12px", letterSpacing: "0.5px" },
  tableData: { padding: "18px 20px", borderBottom: "1px solid #f1f5f9", color: "#475569", fontSize: "14px", verticalAlign: "middle" },
  tableRowStyle: { background: "#ffffff" },
  avatarCircle: {
    width: "40px", height: "40px", borderRadius: "12px", color: "white", display: "flex",
    justifyContent: "center", alignItems: "center", fontWeight: "700", fontSize: "15px", boxShadow: "0 4px 12px rgba(0,0,0,0.06)", cursor: "pointer"
  },
  tableIconLabelGroup: { display: "flex", alignItems: "center", gap: "10px" },
  statusBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "12px", fontSize: "13px", fontWeight: "700" },
  statusDot: { width: "6px", height: "6px", borderRadius: "50%" },
  rowActionBtn: { width: "36px", height: "36px", border: "none", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", fontSize: "14px" },
  emptyStateContainer: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "64px 24px", textAlign: "center" },
  emptyStateIcon: { fontSize: "48px", color: "#cbd5e1", marginBottom: "16px" },
  emptyStateHeading: { fontSize: "16px", fontWeight: "700", color: "#475569", margin: "0 0 4px 0" },
  emptyStateText: { fontSize: "14px", color: "#94a3b8", margin: 0 },
  modalBackdrop: {
    position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", zIndex: 99999
  },
  modalCard: { background: "#ffffff", width: "100%", maxWidth: "460px", borderRadius: "24px", padding: "36px", position: "relative", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)", boxSizing: "border-box" },
  modalCloseBtn: { position: "absolute", top: "24px", right: "24px", border: "none", background: "transparent", fontSize: "24px", color: "#94a3b8", cursor: "pointer" },
  modalHeaderBlock: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" },
  modalInputLabel: { display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" },
  modalInputWrapper: { display: "flex", alignItems: "center", gap: "10px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "12px 16px", marginBottom: "18px", transition: "all 0.2s ease" },
  modalInputIcon: { color: "#94a3b8", fontSize: "15px" },
  cleanInput: { border: "none", background: "transparent", outline: "none", width: "100%", fontSize: "14px", color: "#334155" },
  cleanSelect: { border: "none", background: "transparent", outline: "none", width: "100%", fontSize: "14px", color: "#334155", cursor: "pointer" },
  modalExecuteBtn: { width: "100%", padding: "14px", border: "none", borderRadius: "14px", color: "white", fontWeight: "700", fontSize: "15px", cursor: "pointer", marginTop: "8px" },
};

export default CustomersPage;