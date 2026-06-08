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
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

const listTransitionVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 15, transition: { duration: 0.2 } }
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
    { title: "Total Customers", value: customers.length, icon: <FaUsers />, color: "#4f46e5", glow: "rgba(79, 70, 229, 0.25)" },
    { title: "Active Nodes", value: activeCustomers, icon: <FaUserPlus />, color: "#10b981", glow: "rgba(16, 185, 129, 0.25)" },
    { title: "Inactive Nodes", value: inactiveCustomers, icon: <FaUsers />, color: "#ef4444", glow: "rgba(239, 68, 68, 0.25)" },
  ];

  const getAvatarGradient = (name) => {
    const charCode = name ? name.charCodeAt(0) : 65;
    if (charCode % 3 === 0) return "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)";
    if (charCode % 3 === 1) return "linear-gradient(135deg, #10b981 0%, #059669 100%)";
    return "linear-gradient(135deg, #ec4899 0%, #d946ef 100%)";
  };

  return (
    <div style={styles.container}>
      {/* AURORA GLOW MESH BACKGROUND CANVAS */}
      <div style={styles.auroraWaveOne} />
      <div style={styles.auroraWaveTwo} />
      <div style={styles.auroraWaveThree} />

      <Sidebar />

      <style>{`
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0e0f17; }
        ::-webkit-scrollbar-thumb { background: #222533; border-radius: 8px; }
        
        .modal-input-group { transition: all 0.2s ease-in-out; }
        .modal-input-group:focus-within {
          border-color: rgba(99, 102, 241, 0.4) !important; 
          background: rgba(20, 21, 31, 0.8) !important; 
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15) !important;
          transform: translateY(-1px);
        }
        .modal-input-group:focus-within svg { color: #818cf8 !important; transform: scale(1.1); }
        
        .interactive-row { transition: background-color 0.2s ease, transform 0.2s ease; border-bottom: 1px solid rgba(255, 255, 255, 0.04) !important; }
        .interactive-row:hover { background-color: rgba(255, 255, 255, 0.02) !important; transform: scale(1.002); }
        
        .search-input-element:focus {
          border-color: rgba(99, 102, 241, 0.4) !important; 
          background: rgba(20, 21, 31, 0.8) !important; 
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15) !important;
        }
      `}</style>

      <div style={{ flex: 1, height: "100vh", overflowY: "auto", display: "flex", flexDirection: "column", minWidth: 0, position: "relative", zIndex: 10 }}>
        <TopNav title="Customers" />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ padding: "32px" }}
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
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#ffffff" }}>Pipeline ledger compiled to spreadsheet format successfully.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WELCOME BANNER MATCHING EXECUTIVE TERMINAL LOOK */}
          <motion.div variants={cardVariants} style={styles.welcomeBanner}>
            <div style={{ position: "relative", zIndex: 2, maxWidth: "60%" }}>
              <span style={styles.bannerBadge}>SYSTEM INSIGHT • ONLINE</span>
              <h1 style={styles.bannerTitle}>Customer Ledger Engine v2.4</h1>
              <p style={styles.bannerSubtitle}>
                Data integrity metrics are securely locked to primary storage blocks. Your pipeline has successfully processed your customer ledger profiles with zero latency leakage detected.
              </p>
            </div>
            
            {/* FRAMED OFFICE WORKSPACE PICTURE WITH GRADIENT SMOOTH FADE OUT EFFECT */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={styles.bannerImageContainer}
            >
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" 
                alt="Executive Developer Workstation" 
                style={styles.bannerImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div style={styles.imageOverlayShield} />
            </motion.div>
          </motion.div>

          {/* HIGHLIGHT METRICS GRID */}
          <div style={styles.metricsGrid}>
            {statsCards.map((card, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -4, backgroundColor: "rgba(24, 25, 37, 0.6)" }}
                style={styles.metricCard}
              >
                <div>
                  <p style={styles.metricTitle}>{card.title}</p>
                  <motion.h2 
                    key={card.value}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={styles.metricValue}
                  >
                    {card.value}
                  </motion.h2>
                </div>
                <motion.div whileHover={{ rotate: 12, scale: 1.1 }} style={{ ...styles.metricIconContainer, background: card.color }}>
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
                    className="search-input-element"
                    style={styles.searchInput}
                  />
                </div>
                <span style={styles.searchFeedbackText}>
                  Matches: <b style={{ color: "#ffffff" }}>{filteredCustomers.length}</b> rows of <b style={{ color: "#ffffff" }}>{customers.length}</b> total directory records
                </span>
              </div>

              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <motion.button
                  whileHover={{ y: -2, background: "rgba(255,255,255,0.08)" }}
                  whileTap={{ scale: 0.96 }}
                  onClick={triggerDataExport}
                  style={styles.secondaryExportBtn}
                  title="Export Current Query Registry To Local Layout"
                >
                  <FaDownload /> Export Ledger
                </motion.button>

                <motion.button
                  whileHover={{ y: -2, scale: 1.02, boxShadow: "0 8px 20px rgba(79, 70, 229, 0.3)" }}
                  whileTap={{ scale: 0.97 }}
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
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={styles.emptyStateContainer}>
                  <FaInbox style={styles.emptyStateIcon} />
                  <h3 style={styles.emptyStateHeading}>Zero Matching Database Nodes</h3>
                  <p style={styles.emptyStateText}>No active entity maps to your filter configurations.</p>
                </motion.div>
              ) : (
                <table style={styles.ledgerTable}>
                  <thead>
                    <tr style={{ background: "rgba(25, 26, 36, 0.5)" }}>
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
                          variants={listTransitionVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                          className="interactive-row"
                          style={styles.tableRowStyle}
                        >
                          <td style={styles.tableData}>
                            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                              <motion.div whileHover={{ scale: 1.1, rotate: 4 }} style={{ ...styles.avatarCircle, background: getAvatarGradient(customer.name) }}>
                                {customer.name ? customer.name.charAt(0).toUpperCase() : "C"}
                              </motion.div>
                              <span style={{ fontWeight: "700", color: "#ffffff" }}>{customer.name}</span>
                            </div>
                          </td>

                          <td style={styles.tableData}>
                            <div style={styles.tableIconLabelGroup}>
                              <FaEnvelope style={{ color: "#4b4e5e" }} />
                              <span>{customer.email}</span>
                            </div>
                          </td>

                          <td style={styles.tableData}>
                            <div style={styles.tableIconLabelGroup}>
                              <FaPhoneAlt style={{ color: "#4b4e5e" }} />
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
                              background: customer.status === "Active" ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
                              color: customer.status === "Active" ? "#34d399" : "#f87171",
                              border: customer.status === "Active" ? "1px solid rgba(16, 185, 129, 0.15)" : "1px solid rgba(239, 68, 68, 0.15)"
                            }}>
                              <span style={{ ...styles.statusDot, background: customer.status === "Active" ? "#10b981" : "#ef4444" }} />
                              {customer.status}
                            </span>
                          </td>

                          <td style={styles.tableData}>
                            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                              <motion.button
                                whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.85 }}
                                onClick={() => handleEditClick(customer)}
                                style={{ ...styles.rowActionBtn, background: "rgba(245, 158, 11, 0.12)", color: "#fbbf24" }}
                                title="Mutate Node Data"
                              >
                                <FaEdit />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.85 }}
                                onClick={() => handleDelete(customer.id)}
                                style={{ ...styles.rowActionBtn, background: "rgba(239, 68, 68, 0.12)", color: "#f87171" }}
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
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            style={styles.modalBackdrop}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              style={styles.modalCard}
            >
              <motion.button 
                whileHover={{ scale: 1.1, color: "#94a3b8" }} 
                onClick={() => setShowModal(false)} 
                style={styles.modalCloseBtn}
              >
                ×
              </motion.button>

              <div style={styles.modalHeaderBlock}>
                <FaIdCard style={{ fontSize: "24px", color: "#818cf8" }} />
                <h2 style={{ margin: 0, fontSize: "21px", fontWeight: "800", color: "#ffffff" }}>
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
                whileHover={{ y: -2, boxShadow: "0 10px 20px rgba(79, 70, 229, 0.25)" }} 
                whileTap={{ scale: 0.99 }} 
                onClick={handleSaveCustomer} 
                style={{
                  ...styles.modalExecuteBtn,
                  background: editingId !== null 
                    ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" 
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
  // TRANSFORMS TO CHROMATIC DARK ENGINE THEME LAYOUTS
  container: {
    display: "flex", height: "100vh", background: "#0a0b10", overflow: "hidden",
    fontFamily: "system-ui, -apple-system, sans-serif", position: "relative"
  },
  
  auroraWaveOne: { position: "absolute", top: "-20%", left: "-10%", width: "70vw", height: "60vh", borderRadius: "50%", background: "radial-gradient(circle, rgba(49, 46, 129, 0.4) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 1 },
  auroraWaveTwo: { position: "absolute", bottom: "10%", right: "-5%", width: "60vw", height: "65vh", borderRadius: "50%", background: "radial-gradient(circle, rgba(15, 118, 110, 0.25) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 1 },
  auroraWaveThree: { position: "absolute", top: "30%", right: "20%", width: "50vw", height: "50vh", borderRadius: "50%", background: "radial-gradient(circle, rgba(134, 25, 143, 0.12) 0%, transparent 60%)", filter: "blur(70px)", pointerEvents: "none", zIndex: 1 },

  notificationToast: {
    position: "fixed", top: "24px", right: "24px", background: "#11121a", padding: "14px 20px",
    borderRadius: "14px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)",
    display: "flex", alignItems: "center", gap: "10px", zIndex: 999999, border: "1px solid rgba(255,255,255,0.05)"
  },
  welcomeBanner: {
    background: "linear-gradient(135deg, #1b1c30 0%, #151624 100%)", 
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "24px",
    padding: "36px 40px", 
    color: "white", 
    marginBottom: "28px", 
    position: "relative",
    overflow: "hidden", 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center"
  },
  bannerBadge: {
    display: "inline-block", background: "rgba(99, 102, 241, 0.15)", color: "#9ca3af",
    fontSize: "11px", fontWeight: "700", padding: "6px 12px", borderRadius: "6px",
    letterSpacing: "0.5px", marginBottom: "16px", border: "1px solid rgba(99, 102, 241, 0.2)"
  },
  bannerTitle: { fontSize: "clamp(24px, 4vw, 32px)", fontWeight: "800", margin: "0 0 12px 0", letterSpacing: "-0.5px", color: "#ffffff" },
  bannerSubtitle: { opacity: 0.7, margin: 0, fontSize: "14px", lineHeight: "1.6", color: "#9ca3af" },
  bannerImageContainer: {
    width: "32%", minWidth: "180px", height: "160px",
    position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.65
  },
  bannerImage: { 
    width: "100%", height: "100%", objectFit: "cover"
  },
  imageOverlayShield: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to right, #151624, transparent)" },
  
  metricsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", marginBottom: "28px" },
  metricCard: {
    background: "rgba(22, 23, 33, 0.55)", backdropFilter: "blur(20px)", borderRadius: "20px", padding: "24px",
    border: "1px solid rgba(255, 255, 255, 0.04)", display: "flex", justifyContent: "space-between", alignItems: "center",
    cursor: "pointer", boxSizing: "border-box", transition: "all 0.25s ease"
  },
  metricTitle: { color: "#797c8c", fontWeight: "700", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 6px 0" },
  metricValue: { fontSize: "clamp(26px, 3vw, 30px)", fontWeight: "800", color: "#ffffff", margin: 0, letterSpacing: "-0.5px" },
  metricIconContainer: {
    width: "52px", height: "52px", borderRadius: "16px", color: "white", display: "flex",
    justifyContent: "center", alignItems: "center", fontSize: "20px"
  },
  cardPanel: { background: "rgba(22, 23, 33, 0.55)", backdropFilter: "blur(20px)", borderRadius: "24px", padding: "24px", border: "1px solid rgba(255, 255, 255, 0.04)", boxSizing: "border-box" },
  panelHeaderRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", gap: "16px", flexWrap: "wrap" },
  searchContainerBlock: { display: "flex", flexDirection: "column", gap: "6px", width: "100%", maxWidth: "380px" },
  searchBarWrapper: { position: "relative", width: "100%" },
  searchIcon: { position: "absolute", top: "50%", left: "18px", transform: "translateY(-50%)", color: "#626575", fontSize: "15px" },
  searchInput: {
    width: "100%", padding: "14px 14px 14px 48px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)",
    background: "rgba(255,255,255,0.02)", outline: "none", fontSize: "14px", color: "#ffffff", boxSizing: "border-box", transition: "all 0.2s ease-in-out"
  },
  searchFeedbackText: { fontSize: "12px", color: "#626575", paddingLeft: "4px" },
  secondaryExportBtn: {
    padding: "14px 20px", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", background: "rgba(255,255,255,0.04)",
    color: "#a0a4b8", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: "700", fontSize: "14px"
  },
  primaryPanelActionBtn: {
    padding: "14px 24px", border: "none", borderRadius: "16px", background: "#4f46e5",
    color: "white", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: "700", fontSize: "14px",
    boxShadow: "0 4px 14px rgba(79, 70, 229, 0.4)"
  },
  ledgerTable: { width: "100%", minWidth: "950px", borderCollapse: "collapse", marginTop: "4px" },
  tableHead: { textAlign: "left", padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)", color: "#626575", fontWeight: "700", fontSize: "12px", letterSpacing: "0.5px" },
  tableData: { padding: "18px 20px", borderBottom: "1px solid rgba(255,255,255,0.03)", color: "#a0a4b8", fontSize: "14px", verticalAlign: "middle" },
  tableRowStyle: { background: "transparent" },
  avatarCircle: {
    width: "40px", height: "40px", borderRadius: "12px", color: "white", display: "flex",
    justifyContent: "center", alignItems: "center", fontWeight: "700", fontSize: "15px", cursor: "pointer"
  },
  tableIconLabelGroup: { display: "flex", alignItems: "center", gap: "10px" },
  statusBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "12px", fontSize: "13px", fontWeight: "700" },
  statusDot: { width: "6px", height: "6px", borderRadius: "50%" },
  rowActionBtn: { width: "36px", height: "36px", border: "none", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", fontSize: "14px" },
  emptyStateContainer: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "64px 24px", textAlign: "center" },
  emptyStateIcon: { fontSize: "48px", color: "#3f414d", marginBottom: "16px" },
  emptyStateHeading: { fontSize: "16px", fontWeight: "700", color: "#e4e4e7", margin: "0 0 4px 0" },
  emptyStateText: { fontSize: "14px", color: "#626575", margin: 0 },
  
  modalBackdrop: {
    position: "fixed", inset: 0, background: "rgba(5, 5, 8, 0.8)", backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", zIndex: 99999
  },
  modalCard: { background: "#11121a", width: "100%", maxWidth: "460px", borderRadius: "24px", padding: "36px", position: "relative", border: "1px solid rgba(255,255,255,0.05)", boxSizing: "border-box" },
  modalCloseBtn: { position: "absolute", top: "24px", right: "24px", border: "none", background: "transparent", fontSize: "24px", color: "#626575", cursor: "pointer", outline: "none" },
  modalHeaderBlock: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" },
  modalInputLabel: { display: "block", fontSize: "11px", fontWeight: "700", color: "#626575", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" },
  modalInputWrapper: { display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "14px", padding: "12px 16px", marginBottom: "18px" },
  modalInputIcon: { color: "#4b4e5e", fontSize: "15px", transition: "transform 0.2s" },
  cleanInput: { border: "none", background: "transparent", outline: "none", width: "100%", fontSize: "14px", color: "#ffffff" },
  cleanSelect: { border: "none", background: "transparent", outline: "none", width: "100%", fontSize: "14px", color: "#ffffff", cursor: "pointer" },
  modalExecuteBtn: { width: "100%", padding: "14px", border: "none", borderRadius: "14px", color: "white", fontWeight: "700", fontSize: "15px", cursor: "pointer", marginTop: "8px" },
};

export default CustomersPage;