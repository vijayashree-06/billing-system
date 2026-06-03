// src/pages/ProductsPage.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";

import {
  FaBoxOpen,
  FaPlus,
  FaSearch,
  FaTrash,
  FaEdit,
  FaRupeeSign,
  FaLayerGroup,
  FaWarehouse,
  FaInbox,
  FaShoppingBag,
  FaDownload,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBoxes
} from "react-icons/fa";

// FRAMER MOTION ANIMATION CONFIGURATIONS
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

function ProductsPage() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [showExportSuccess, setShowExportSuccess] = useState(false);

  const categories = ["Electronics", "Furniture", "Accessories", "Clothing", "Books", "Grocery"];

  // PERSISTENCE STATE WITH LOCALSTORAGE
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("dashboard_products");
    if (savedProducts) {
      try { return JSON.parse(savedProducts); } 
      catch (error) { console.error("Error parsing local storage data", error); }
    }
    return [
      { id: 1, name: "Laptop", category: "Electronics", price: 65000, stock: 12, status: "Available" },
      { id: 2, name: "Smart Phone", category: "Electronics", price: 25000, stock: 3, status: "Available" }, // Triggers Low Stock Warning
      { id: 3, name: "Office Chair", category: "Furniture", price: 4500, stock: 0, status: "Out of Stock" },
      { id: 4, name: "Printer", category: "Accessories", price: 12000, stock: 5, status: "Available" },
    ];
  });

  const [formData, setFormData] = useState({
    name: "", category: "", price: "", stock: "", status: "Available",
  });

  // SAVE TO LOCALSTORAGE AUTOMATICALLY
  useEffect(() => {
    localStorage.setItem("dashboard_products", JSON.stringify(products));
  }, [products]);

  // SMART LOGISTICS AUTOMATION: SYNC STOCK INTENSITY WITH STATUS
  useEffect(() => {
    const stockNum = Number(formData.stock);
    if (formData.stock !== "" && stockNum === 0 && formData.status !== "Out of Stock") {
      setFormData(prev => ({ ...prev, status: "Out of Stock" }));
    } else if (formData.stock !== "" && stockNum > 0 && formData.status === "Out of Stock") {
      setFormData(prev => ({ ...prev, status: "Available" }));
    }
  }, [formData.stock]);

  // FILTER LOGIC
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  // ADD / UPDATE PRODUCT HANDLER
  const handleAddProduct = () => {
    if (!formData.name || !formData.category || formData.price === "" || formData.stock === "") {
      alert("Please fill all fields");
      return;
    }

    const calculatedStatus = Number(formData.stock) === 0 ? "Out of Stock" : formData.status;

    if (editId) {
      setProducts(products.map((p) => p.id === editId ? { 
        ...formData, 
        id: editId, 
        price: Number(formData.price), 
        stock: Number(formData.stock),
        status: calculatedStatus
      } : p));
    } else {
      setProducts([...products, {
        id: Date.now(),
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        status: calculatedStatus
      }]);
    }

    setFormData({ name: "", category: "", price: "", stock: "", status: "Available" });
    setEditId(null);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditId(product.id);
    setShowModal(true);
  };

  const triggerDataExport = () => {
    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 3000);
  };

  // METRICS
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, item) => acc + Number(item.stock || 0), 0);
  const outOfStock = products.filter((item) => item.status === "Out of Stock" || Number(item.stock) === 0).length;

  const statsCards = [
    { title: "Total Products", value: totalProducts, icon: <FaBoxOpen />, color: "#4f46e5", glow: "rgba(79, 70, 229, 0.25)" },
    { title: "Total Stock Counter", value: totalStock, icon: <FaWarehouse />, color: "#10b981", glow: "rgba(16, 185, 129, 0.25)" },
    { title: "Out Of Stock", value: outOfStock, icon: <FaLayerGroup />, color: "#ef4444", glow: "rgba(239, 68, 68, 0.25)" },
  ];

  // DYNAMIC CATEGORY COLOR GRADIENTS
  const getCategoryGradient = (category) => {
    switch (category) {
      case "Electronics": return "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)";
      case "Furniture": return "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)";
      case "Accessories": return "linear-gradient(135deg, #10b981 0%, #047857 100%)";
      case "Clothing": return "linear-gradient(135deg, #ec4899 0%, #be185d 100%)";
      case "Books": return "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)";
      default: return "linear-gradient(135deg, #6b7280 0%, #374151 100%)";
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar />

      {/* COMPONENT GLOBAL STYLES FOR INTERACTIVE INTERACTIONS */}
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
        .interactive-row { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
        .interactive-row:hover { 
          background-color: #f8fafc !important; 
          transform: translateY(-2px); 
          box-shadow: 0 10px 20px -10px rgba(15, 23, 42, 0.05);
        }

        /* HARDWARE ACCELERATED TOOLTIP ARCHITECTURE */
        .tooltip-container { position: relative; display: inline-block; }
        .tooltip-container::after {
          content: attr(data-tooltip); position: absolute; bottom: 125%; left: 50%; transform: translateX(-50%) scale(0.9);
          background: #0f172a; color: #ffffff; padding: 6px 10px; borderRadius: 8px; fontSize: 11px; fontWeight: '600';
          whiteSpace: nowrap; opacity: 0; pointerEvents: none; transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1); zIndex: 10;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }
        .tooltip-container:hover::after { opacity: 1; transform: translateX(-50%) scale(1); }

        /* CRITICAL LEVEL ALERT PULSE */
        @keyframes subtlePulse {
          0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(245, 158, 11, 0); }
          100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }
        .low-stock-glow { animation: subtlePulse 2s infinite; }
      `}</style>

      <div style={{ flex: 1, height: "100vh", overflowY: "auto", display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopNav title="Products" />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ padding: "32px" }}
        >
          {/* TOAST SYSTEM LEDGER NOTIFICATION */}
          <AnimatePresence>
            {showExportSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                style={styles.notificationToast}
              >
                <FaCheckCircle style={{ color: "#10b981", fontSize: "16px" }} />
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>Inventory spreadsheet report compiled successfully.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ATTRACTIVE BRANDED WELCOME INV-BANNER WITH REALTIME VECTOR ILLUSTRATIONS */}
          <motion.div variants={cardVariants} style={styles.welcomeBanner}>
            <div style={styles.welcomeOverlay} />
            <div style={{ position: "relative", zIndex: 2, maxWidth: "65%" }}>
              <span style={styles.bannerBadge}>MANAGEMENT PORTAL ACTIVE</span>
              <h1 style={styles.bannerTitle}>Product Management Hub</h1>
              <p style={styles.bannerSubtitle}>
                Calibrate manufacturing pipelines, evaluate warehouse capacities, map marketplace pricing tiers, and track inventory velocity.
              </p>
            </div>
            {/* INTERACTIVE VECTOR GRAPHIC */}
            <svg style={styles.bannerVector} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="50" y="60" width="100" height="90" rx="12" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M40 75 L100 35 L160 75 L100 115 Z" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
              <path d="M40 75 L100 115 L160 75" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
              <path d="M100 115 L100 190" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
              <motion.circle cx="100" cy="35" r="6" fill="#38bdf8" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} />
              <motion.circle cx="40" cy="75" r="5" fill="#10b981" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} />
              <motion.circle cx="160" cy="75" r="5" fill="#f59e0b" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5, ease: "easeInOut" }} />
            </svg>
          </motion.div>

          {/* HIGHLIGHT INFRASTRUCTURE METRICS GRID */}
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
                <motion.div whileHover={{ rotate: -12, scale: 1.05 }} style={{ ...styles.metricIconContainer, background: card.color }}>
                  {card.icon}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CENTRAL LEDGER STOCK CORE PANEL */}
          <motion.div variants={cardVariants} style={styles.cardPanel}>
            <div style={styles.panelHeaderRow}>
              <div style={styles.searchContainerBlock}>
                <div style={styles.searchBarWrapper}>
                  <FaSearch style={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Filter by product name or category string..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={styles.searchInput}
                  />
                </div>
                <span style={styles.searchFeedbackText}>
                  Matches: <b>{filteredProducts.length}</b> variants from <b>{products.length}</b> architecture profiles
                </span>
              </div>

              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <motion.button
                  whileHover={{ y: -2, background: "#f8fafc" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={triggerDataExport}
                  style={styles.secondaryExportBtn}
                >
                  <FaDownload /> Export Inventory
                </motion.button>

                <motion.button
                  whileHover={{ y: -2, scale: 1.02, boxShadow: "0 12px 20px -3px rgba(79,70,229,0.35)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setEditId(null);
                    setFormData({ name: "", category: "", price: "", stock: "", status: "Available" });
                    setShowModal(true);
                  }}
                  style={styles.primaryPanelActionBtn}
                >
                  <FaPlus /> Deploy New Variant
                </motion.button>
              </div>
            </div>

            {/* PRODUCT DATA ARCHITECTURE LAYER */}
            <div style={{ overflowX: "auto", margin: "0 -24px -24px -24px", padding: "0 24px 24px 24px" }}>
              {filteredProducts.length === 0 ? (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} style={styles.emptyStateContainer}>
                  <FaInbox style={styles.emptyStateIcon} />
                  <h3 style={styles.emptyStateHeading}>Zero Matching Warehouse Nodes</h3>
                  <p style={styles.emptyStateText}>No active entity maps to your search configurations.</p>
                </motion.div>
              ) : (
                <table style={styles.ledgerTable}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      <th style={styles.tableHead}>PRODUCT IDENTIFIER NODE</th>
                      <th style={styles.tableHead}>CATEGORY TRACK</th>
                      <th style={styles.tableHead}>UNIT EXCHANGE VALUATION</th>
                      <th style={styles.tableHead}>WAREHOUSE QUANTITY COUNTER</th>
                      <th style={styles.tableHead}>CHANNEL PIPELINE STATE</th>
                      <th style={{ ...styles.tableHead, textAlign: "center" }}>OPERATIONAL ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence initial={false}>
                      {filteredProducts.map((product, index) => {
                        const isOutOfStock = Number(product.stock) === 0 || product.status === "Out of Stock";
                        const isLowStock = !isOutOfStock && Number(product.stock) <= 5;

                        return (
                          <motion.tr
                            key={product.id || index}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -15, transition: { duration: 0.18 } }}
                            layout
                            className="interactive-row"
                            style={styles.tableRowStyle}
                          >
                            {/* PRODUCT METRIC IDENTIFIER GRAPHIC ELEMENT */}
                            <td style={styles.tableData}>
                              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                <motion.div 
                                  whileHover={{ scale: 1.08, rotate: 5 }} 
                                  style={{ ...styles.avatarCircle, background: getCategoryGradient(product.category) }}
                                >
                                  <FaShoppingBag style={{ fontSize: "14px", color: "#ffffff" }} />
                                </motion.div>
                                <span style={{ fontWeight: "700", color: "#0f172a", fontSize: "14.5px" }}>{product.name}</span>
                              </div>
                            </td>

                            <td style={styles.tableData}>
                              <span style={styles.categoryBadge}>{product.category}</span>
                            </td>

                            <td style={styles.tableData}>
                              <div style={{ display: "flex", alignItems: "center", gap: "2px", fontWeight: "700", color: "#1e293b" }}>
                                <FaRupeeSign style={{ fontSize: "12px", color: "#64748b" }} />
                                <span>{product.price.toLocaleString("en-IN")}</span>
                              </div>
                            </td>

                            {/* WAREHOUSE QUANTITY WITH LOW STOCK CRITICAL NOTIFICATIONS */}
                            <td style={styles.tableData}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ 
                                  fontWeight: "700", 
                                  fontFamily: "monospace", 
                                  fontSize: "15px",
                                  color: isOutOfStock ? "#ef4444" : isLowStock ? "#d97706" : "#334155" 
                                }}>
                                  {product.stock} units
                                </span>
                                
                                {isLowStock && (
                                  <span 
                                    className="tooltip-container low-stock-glow" 
                                    data-tooltip="Supply Deficit Risk: Reorder Urgently"
                                    style={styles.lowStockWarningBadge}
                                  >
                                    <FaExclamationTriangle style={{ fontSize: "10px" }} /> Low Stock
                                  </span>
                                )}
                              </div>
                            </td>

                            <td style={styles.tableData}>
                              <span style={{
                                ...styles.statusBadge,
                                background: isOutOfStock ? "#fee2e2" : "#e2fbe8",
                                color: isOutOfStock ? "#991b1b" : "#15803d",
                              }}>
                                <span style={{ ...styles.statusDot, background: isOutOfStock ? "#ef4444" : "#16a34a" }} />
                                {isOutOfStock ? "Out of Stock" : "Available"}
                              </span>
                            </td>

                            <td style={styles.tableData}>
                              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                                <div className="tooltip-container" data-tooltip="Edit Asset Blueprint">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                    onClick={() => handleEdit(product)}
                                    style={{ ...styles.rowActionBtn, background: "#fef3c7", color: "#d97706" }}
                                  >
                                    <FaEdit />
                                  </motion.button>
                                </div>
                                <div className="tooltip-container" data-tooltip="Prune Record Permanently">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                    onClick={() => handleDelete(product.id)}
                                    style={{ ...styles.rowActionBtn, background: "#fee2e2", color: "#dc2626" }}
                                  >
                                    <FaTrash />
                                  </motion.button>
                                </div>
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* DYNAMIC FORM INJECTION MODAL LAYER WITH BLUR OVERLAY */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.modalBackdrop}>
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              style={styles.modalCard}
            >
              <button onClick={() => setShowModal(false)} style={styles.modalCloseBtn}>×</button>

              <div style={styles.modalHeaderBlock}>
                <div style={styles.modalIconBox}>
                  <FaBoxes style={{ fontSize: "20px", color: "#4f46e5" }} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#0f172a" }}>
                    {editId ? "Modify Product Configuration" : "Deploy New Product Entity"}
                  </h2>
                  <p style={{ margin: "2px 0 0 0", fontSize: "13px", color: "#64748b" }}>Register item parameters to central systemic registry.</p>
                </div>
              </div>

              <label style={styles.modalInputLabel}>Product Label Designation</label>
              <div className="modal-input-group" style={styles.modalInputWrapper}>
                <FaBoxOpen style={styles.modalInputIcon} />
                <input
                  type="text" placeholder="e.g., UltraWide Monitor v2" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={styles.cleanInput}
                />
              </div>

              <label style={styles.modalInputLabel}>Inventory Operational Category</label>
              <div className="modal-input-group" style={styles.modalInputWrapper}>
                <FaLayerGroup style={styles.modalInputIcon} />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={styles.cleanSelect}
                >
                  <option value="">Select core matrix category</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={styles.modalInputLabel}>Exchange Value (INR)</label>
                  <div className="modal-input-group" style={styles.modalInputWrapper}>
                    <FaRupeeSign style={styles.modalInputIcon} />
                    <input
                      type="number" placeholder="Cost per unit" value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })} style={styles.cleanInput}
                    />
                  </div>
                </div>
                <div>
                  <label style={styles.modalInputLabel}>Initial Stock Counter</label>
                  <div className="modal-input-group" style={styles.modalInputWrapper}>
                    <FaWarehouse style={styles.modalInputIcon} />
                    <input
                      type="number" placeholder="Units count" value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })} style={styles.cleanInput}
                    />
                  </div>
                </div>
              </div>

              <label style={styles.modalInputLabel}>Pipeline Logistics State Flag</label>
              <div className="modal-input-group" style={{ ...styles.modalInputWrapper, background: Number(formData.stock) === 0 ? "#fff1f2" : "#f8fafc" }}>
                <FaCheckCircle style={{ ...styles.modalInputIcon, color: Number(formData.stock) === 0 ? "#f43f5e" : "#94a3b8" }} />
                <select
                  value={Number(formData.stock) === 0 ? "Out of Stock" : formData.status}
                  disabled={Number(formData.stock) === 0}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={styles.cleanSelect}
                >
                  <option value="Available">State Flag: Available for Marketplace</option>
                  <option value="Out of Stock">State Flag: Suppressed Stock Lockout</option>
                </select>
              </div>

              <motion.button 
                whileHover={{ y: -2, boxShadow: "0 10px 20px rgba(79, 70, 229, 0.25)" }} whileTap={{ scale: 0.99 }} 
                onClick={handleAddProduct} 
                style={{
                  ...styles.modalExecuteBtn,
                  background: editId 
                    ? "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)" 
                    : "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)"
                }}
              >
                {editId ? "Commit Changes" : "Deploy Variant To Floor"}
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
    display: "flex", height: "100vh", background: "#f8fafc", overflowX: "hidden", overflowY: "hidden",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  notificationToast: {
    position: "fixed", top: "32px", right: "32px", background: "#ffffff", padding: "16px 24px",
    borderRadius: "16px", boxShadow: "0 20px 25px -5px rgba(15,23,42,0.08), 0 10px 10px -5px rgba(15,23,42,0.04)",
    display: "flex", alignItems: "center", gap: "12px", zIndex: 999999, border: "1px solid #e2e8f0"
  },
  welcomeBanner: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)", borderRadius: "24px",
    padding: "44px 40px", color: "white", marginBottom: "32px", position: "relative",
    overflow: "hidden", display: "flex", justifyContent: "space-between", alignItems: "center",
    boxShadow: "0 10px 30px -10px rgba(15,23,42,0.15)"
  },
  welcomeOverlay: {
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    background: "radial-gradient(circle at bottom right, rgba(99,102,241,0.12) 0%, transparent 65%)", zIndex: 1
  },
  bannerBadge: { background: "rgba(99, 102, 241, 0.2)", color: "#a5b4fc", fontSize: "11px", fontWeight: "700", padding: "6px 12px", borderRadius: "8px", letterSpacing: "1px", display: "inline-block", marginBottom: "12px" },
  bannerTitle: { fontSize: "clamp(26px, 4vw, 34px)", fontWeight: "800", margin: "0 0 10px 0", letterSpacing: "-0.5px" },
  bannerSubtitle: { opacity: 0.75, margin: 0, fontSize: "15px", lineHeight: "1.6" },
  bannerVector: { width: "130px", height: "130px", position: "relative", zIndex: 2, opacity: 0.95 },
  metricsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "32px" },
  metricCard: {
    background: "#ffffff", borderRadius: "24px", padding: "24px", boxShadow: "0 4px 20px rgba(148, 163, 184, 0.03)",
    border: "1px solid rgba(226, 232, 240, 0.8)", display: "flex", justifyContent: "space-between", alignItems: "center",
    cursor: "pointer", boxSizing: "border-box", height: "115px"
  },
  metricTitle: { color: "#64748b", fontWeight: "700", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 6px 0" },
  metricValue: { fontSize: "32px", fontWeight: "800", color: "#0f172a", margin: 0, letterSpacing: "-1px" },
  metricIconContainer: {
    width: "54px", height: "54px", borderRadius: "18px", color: "white", display: "flex",
    justifyContent: "center", alignItems: "center", fontSize: "20px", boxShadow: "0 8px 20px -4px rgba(0,0,0,0.05)"
  },
  cardPanel: { background: "#ffffff", borderRadius: "24px", padding: "28px", boxShadow: "0 4px 20px rgba(148, 163, 184, 0.03)", border: "1px solid rgba(226, 232, 240, 0.8)", boxSizing: "border-box" },
  panelHeaderRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", gap: "20px", flexWrap: "wrap" },
  searchContainerBlock: { display: "flex", flexDirection: "column", gap: "8px", width: "100%", maxWidth: "400px" },
  searchBarWrapper: { position: "relative", width: "100%" },
  searchIcon: { position: "absolute", top: "50%", left: "18px", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "15px" },
  searchInput: {
    width: "100%", padding: "14px 14px 14px 48px", borderRadius: "16px", border: "1px solid #e2e8f0",
    background: "#f8fafc", outline: "none", fontSize: "14px", color: "#334155", boxSizing: "border-box", transition: "all 0.2s ease-in-out",
  },
  searchFeedbackText: { fontSize: "12px", color: "#64748b", paddingLeft: "4px" },
  secondaryExportBtn: {
    padding: "14px 22px", border: "1px solid #e2e8f0", borderRadius: "16px", background: "#ffffff",
    color: "#475569", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: "700", fontSize: "14px"
  },
  primaryPanelActionBtn: {
    padding: "14px 24px", border: "none", borderRadius: "16px", background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
    color: "white", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: "700", fontSize: "14px"
  },
  ledgerTable: { width: "100%", minWidth: "950px", borderCollapse: "collapse" },
  tableHead: { textAlign: "left", padding: "16px 24px", borderBottom: "2px solid #f1f5f9", color: "#64748b", fontWeight: "700", fontSize: "12px", letterSpacing: "0.5px" },
  tableData: { padding: "18px 24px", borderBottom: "1px solid #f1f5f9", color: "#475569", fontSize: "14px", verticalAlign: "middle" },
  tableRowStyle: { background: "#ffffff" },
  avatarCircle: {
    width: "42px", height: "42px", borderRadius: "14px", color: "white", display: "flex",
    justifyContent: "center", alignItems: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
  },
  categoryBadge: { background: "#f1f5f9", color: "#475569", padding: "6px 12px", borderRadius: "10px", fontSize: "13px", fontWeight: "600" },
  lowStockWarningBadge: { background: "#fff7ed", color: "#c2410c", fontSize: "11px", fontWeight: "700", padding: "4px 8px", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "4px", border: "1px solid #ffedd5", cursor: "default" },
  statusBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "12px", fontSize: "13px", fontWeight: "700" },
  statusDot: { width: "6px", height: "6px", borderRadius: "50%" },
  rowActionBtn: { width: "36px", height: "36px", border: "none", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", fontSize: "14px" },
  emptyStateContainer: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "64px 24px", textAlign: "center" },
  emptyStateIcon: { fontSize: "48px", color: "#cbd5e1", marginBottom: "16px" },
  emptyStateHeading: { fontSize: "16px", fontWeight: "700", color: "#475569", margin: "0 0 4px 0" },
  emptyStateText: { fontSize: "14px", color: "#94a3b8", margin: 0 },
  modalBackdrop: {
    position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.3)", backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", zIndex: 99999
  },
  modalCard: { background: "#ffffff", width: "100%", maxWidth: "480px", borderRadius: "28px", padding: "36px", position: "relative", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12)", boxSizing: "border-box" },
  modalCloseBtn: { position: "absolute", top: "28px", right: "28px", border: "none", background: "transparent", fontSize: "24px", color: "#94a3b8", cursor: "pointer", outline: "none" },
  modalHeaderBlock: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" },
  modalIconBox: { width: "44px", height: "44px", borderRadius: "12px", background: "#f0fdf4", display: "flex", justifyContent: "center", alignItems: "center" },
  modalInputLabel: { display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" },
  modalInputWrapper: { display: "flex", alignItems: "center", gap: "12px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "12px 16px", marginBottom: "18px", transition: "all 0.2s ease" },
  modalInputIcon: { color: "#94a3b8", fontSize: "14px" },
  cleanInput: { border: "none", background: "transparent", outline: "none", width: "100%", fontSize: "14px", color: "#334155" },
  cleanSelect: { border: "none", background: "transparent", outline: "none", width: "100%", fontSize: "14px", color: "#334155", cursor: "pointer" },
  modalExecuteBtn: { width: "100%", padding: "15px", border: "none", borderRadius: "14px", color: "white", fontWeight: "700", fontSize: "15px", cursor: "pointer", marginTop: "12px" },
};

export default ProductsPage;