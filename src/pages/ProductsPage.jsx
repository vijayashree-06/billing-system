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
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 17 } 
  }
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } },
  exit: { opacity: 0, x: 30, scale: 0.95, transition: { duration: 0.2 } }
};

// HIGH-QUALITY IMAGE MAP ALIGNED WITH DASHBOARD CATEGORIES
const CATEGORY_IMAGES = {
  Electronics: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=120&q=80",
  Furniture: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&w=120&q=80",
  Accessories: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=120&q=80",
  Clothing: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=120&q=80",
  Books: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=120&q=80",
  Grocery: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&q=80",
  Default: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=120&q=80"
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
      { id: 1, name: "Premium Laptop", category: "Electronics", price: 65000, stock: 12, status: "Available" },
      { id: 2, name: "Smart Phone OLED", category: "Electronics", price: 25000, stock: 3, status: "Available" }, 
      { id: 3, name: "Ergonomic Office Chair", category: "Furniture", price: 4500, stock: 0, status: "Out of Stock" },
      { id: 4, name: "Wireless Mechanical Keyboard", category: "Accessories", price: 6200, stock: 5, status: "Available" },
    ];
  });

  const [formData, setFormData] = useState({
    name: "", category: "", price: "", stock: "", status: "Available",
  });

  // SAVE TO LOCALSTORAGE AUTOMATICALLY
  useEffect(() => {
    localStorage.setItem("dashboard_products", JSON.stringify(products));
  }, [products]);

  // AUTOMATION: SYNC STOCK COUNTS WITH STATUS FLAGS
  useEffect(() => {
    const stockNum = Number(formData.stock);
    if (formData.stock !== "" && stockNum === 0 && formData.status !== "Out of Stock") {
      setFormData(prev => ({ ...prev, status: "Out of Stock" }));
    } else if (formData.stock !== "" && stockNum > 0 && formData.status === "Out of Stock") {
      setFormData(prev => ({ ...prev, status: "Available" }));
    }
  }, [formData.stock, formData.status]);

  // FILTER LOGIC
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  // ADD / EDIT HANDLERS
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
    if (window.confirm("Prune this variant asset blueprint permanently?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
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

  // METRICS CALCULATIONS
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, item) => acc + Number(item.stock || 0), 0);
  const outOfStock = products.filter((item) => item.status === "Out of Stock" || Number(item.stock) === 0).length;

  const statsCards = [
    { title: "Total Products", value: totalProducts, icon: <FaBoxOpen />, color: "linear-gradient(135deg, #4f46e5, #6366f1)", glow: "rgba(79, 70, 229, 0.4)", borderGlow: "rgba(99, 102, 241, 0.4)" },
    { title: "Total Stock Counter", value: totalStock, icon: <FaWarehouse />, color: "linear-gradient(135deg, #10b981, #34d399)", glow: "rgba(16, 185, 129, 0.4)", borderGlow: "rgba(52, 211, 153, 0.4)" },
    { title: "Out Of Stock", value: outOfStock, icon: <FaLayerGroup />, color: "linear-gradient(135deg, #ef4444, #f87171)", glow: "rgba(239, 68, 68, 0.4)", borderGlow: "rgba(248, 113, 113, 0.4)" },
  ];

  return (
    <div style={styles.container}>
      <Sidebar />

      {/* COMPONENT CSS ENHANCEMENTS */}
      <style>{`
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.4); }
        
        .modal-input-group:focus-within {
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2) !important;
          background: rgba(255, 255, 255, 0.08) !important;
        }
        .interactive-row { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
        .interactive-row:hover { 
          background-color: rgba(255, 255, 255, 0.04) !important; 
          transform: translateY(-2px); 
          box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.5);
        }

        .tooltip-container { position: relative; display: inline-block; }
        .tooltip-container::after {
          content: attr(data-tooltip); position: absolute; bottom: 125%; left: 50%; transform: translateX(-50%) scale(0.9);
          background: #0f172a; color: #ffffff; padding: 6px 10px; border-radius: 8px; font-size: 11px; font-weight: 600;
          white-space: nowrap; opacity: 0; pointer-events: none; transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1); z-index: 10;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);
        }
        .tooltip-container:hover::after { opacity: 1; transform: translateX(-50%) scale(1); }

        @keyframes subtlePulse {
          0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(245, 158, 11, 0); }
          100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }
        .low-stock-glow { animation: subtlePulse 2s infinite; }
      `}</style>

      <div style={{ flex: 1, height: "100vh", overflowY: "auto", display: "flex", flexDirection: "column", minWidth: 0, zIndex: 1 }}>
        <TopNav title="Products" />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ padding: "32px" }}
        >
          {/* TOAST NOTIFICATION LEDGER */}
          <AnimatePresence>
            {showExportSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                style={styles.notificationToast}
              >
                <FaCheckCircle style={{ color: "#10b981", fontSize: "16px" }} />
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#ffffff" }}>Inventory spreadsheet compiled successfully.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* DYNAMIC WELCOME BANNER */}
          <motion.div variants={cardVariants} style={styles.welcomeBanner}>
            <div style={styles.welcomeOverlay} />
            
            {/* NO FADE: INSTANT STATIC RENDERING FOR THE BILLFLOW HERO IMAGE */}
            <div style={styles.bannerImageContainer}>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" 
                alt="BillFlow Premium FinTech Metrics Grid" 
                style={styles.bannerImage}
              />
              <div style={styles.bannerImageLeftFadeMask} />
            </div>

            <div style={{ position: "relative", zIndex: 2, maxWidth: "60%" }}>
              <span style={styles.bannerBadge}>MANAGEMENT PORTAL ACTIVE</span>
              <h1 style={styles.bannerTitle}>Product Management Hub</h1>
              <p style={styles.bannerSubtitle}>
                Calibrate manufacturing pipelines, evaluate warehouse capacities, map marketplace pricing tiers, and track inventory velocity.
              </p>
            </div>
          </motion.div>

          {/* HIGHLIGHT METRICS GRID */}
          <div style={styles.metricsGrid}>
            {statsCards.map((card, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -6, 
                  backgroundColor: "rgba(255, 255, 255, 0.08)", 
                  borderColor: card.borderGlow,
                  boxShadow: `0 15px 35px -5px ${card.glow}` 
                }}
                whileTap={{ 
                  scale: 0.98,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: card.borderGlow,
                  boxShadow: `0 10px 25px -5px ${card.glow}`
                }}
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

          {/* MAIN PRODUCT MANAGEMENT PANEL */}
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
                  Matches: <b style={{ color: "#ffffff" }}>{filteredProducts.length}</b> variants from <b style={{ color: "#ffffff" }}>{products.length}</b> records
                </span>
              </div>

              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <motion.button
                  whileHover={{ y: -2, background: "rgba(255, 255, 255, 0.12)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={triggerDataExport}
                  style={styles.secondaryExportBtn}
                >
                  <FaDownload /> Export Inventory
                </motion.button>

                <motion.button
                  whileHover={{ y: -2, scale: 1.02, boxShadow: "0 12px 25px rgba(79,70,229,0.5)" }}
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

            {/* PRODUCT DATATABLE CONTAINER */}
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
                    <tr style={{ background: "rgba(255, 255, 255, 0.04)" }}>
                      <th style={styles.tableHead}>PRODUCT INFO</th>
                      <th style={styles.tableHead}>CATEGORY</th>
                      <th style={styles.tableHead}>UNIT PRICE</th>
                      <th style={styles.tableHead}>QUANTITY</th>
                      <th style={styles.tableHead}>PIPELINE STATE</th>
                      <th style={{ ...styles.tableHead, textAlign: "center" }}>OPERATIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence initial={false}>
                      {filteredProducts.map((product, index) => {
                        const isOutOfStock = Number(product.stock) === 0 || product.status === "Out of Stock";
                        const isLowStock = !isOutOfStock && Number(product.stock) <= 5;
                        const productThumbnail = CATEGORY_IMAGES[product.category] || CATEGORY_IMAGES.Default;

                        return (
                          <motion.tr
                            key={product.id || index}
                            variants={tableRowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layout
                            className="interactive-row"
                            style={styles.tableRowStyle}
                          >
                            <td style={styles.tableData}>
                              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                <div style={styles.imageWrapper}>
                                  <img 
                                    src={productThumbnail} 
                                    alt={product.name} 
                                    style={styles.productImageThumb} 
                                  />
                                  <div style={styles.imageGlassOverlay} />
                                </div>
                                <span style={{ fontWeight: "700", color: "#ffffff", fontSize: "14.5px" }}>{product.name}</span>
                              </div>
                            </td>

                            <td style={styles.tableData}>
                              <span style={styles.categoryBadge}>{product.category}</span>
                            </td>

                            <td style={styles.tableData}>
                              <div style={{ display: "flex", alignItems: "center", gap: "2px", fontWeight: "700", color: "#6366f1" }}>
                                <FaRupeeSign style={{ fontSize: "12px", color: "#a5b4fc" }} />
                                <span>{product.price.toLocaleString("en-IN")}</span>
                              </div>
                            </td>

                            <td style={styles.tableData}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ 
                                  fontWeight: "700", 
                                  fontFamily: "monospace", 
                                  fontSize: "15px",
                                  color: isOutOfStock ? "#f87171" : isLowStock ? "#fbbf24" : "#e2e8f0" 
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
                                background: isOutOfStock ? "rgba(239, 68, 68, 0.15)" : "rgba(16, 185, 129, 0.15)",
                                color: isOutOfStock ? "#f87171" : "#34d399",
                                border: isOutOfStock ? "1px solid rgba(239, 68, 68, 0.25)" : "1px solid rgba(16, 185, 129, 0.25)"
                              }}>
                                <span style={{ ...styles.statusDot, background: isOutOfStock ? "#ef4444" : "#10b981" }} />
                                {isOutOfStock ? "Out of Stock" : "Available"}
                              </span>
                            </td>

                            <td style={styles.tableData}>
                              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                                <div className="tooltip-container" data-tooltip="Edit Asset Blueprint">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                    onClick={() => handleEdit(product)}
                                    style={{ ...styles.rowActionBtn, background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" }}
                                  >
                                    <FaEdit />
                                  </motion.button>
                                </div>
                                <div className="tooltip-container" data-tooltip="Prune Record Permanently">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                    onClick={() => handleDelete(product.id)}
                                    style={{ ...styles.rowActionBtn, background: "rgba(239, 68, 68, 0.15)", color: "#f87171" }}
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

      {/* ACTION CONTROLS MODAL DIALOG CONTAINER */}
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
                  <FaBoxes style={{ fontSize: "20px", color: "#6366f1" }} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#ffffff" }}>
                    {editId ? "Modify Product Variant" : "Deploy New Product Entity"}
                  </h2>
                  <p style={{ margin: "2px 0 0 0", fontSize: "13px", color: "#94a3b8" }}>Register item parameters to central system.</p>
                </div>
              </div>

              <label style={styles.modalInputLabel}>Product Designation</label>
              <div className="modal-input-group" style={styles.modalInputWrapper}>
                <FaBoxOpen style={styles.modalInputIcon} />
                <input
                  type="text" placeholder="e.g., Wireless Mechanical Keyboard" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={styles.cleanInput}
                />
              </div>

              <label style={styles.modalInputLabel}>Matrix Category</label>
              <div className="modal-input-group" style={styles.modalInputWrapper}>
                <FaLayerGroup style={styles.modalInputIcon} />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={styles.cleanSelect}
                >
                  <option value="" style={{ background: "#1e293b" }}>Select product category</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat} style={{ background: "#1e293b" }}>{cat}</option>
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
                  <label style={styles.modalInputLabel}>Stock Counter</label>
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
              <div className="modal-input-group" style={{ ...styles.modalInputWrapper, background: Number(formData.stock) === 0 ? "rgba(239, 68, 68, 0.1)" : "rgba(255,255,255,0.05)" }}>
                <FaCheckCircle style={{ ...styles.modalInputIcon, color: Number(formData.stock) === 0 ? "#f43f5e" : "#94a3b8" }} />
                <select
                  value={Number(formData.stock) === 0 ? "Out of Stock" : formData.status}
                  disabled={Number(formData.stock) === 0}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={styles.cleanSelect}
                >
                  <option value="Available" style={{ background: "#1e293b" }}>State Flag: Available for Marketplace</option>
                  <option value="Out of Stock" style={{ background: "#1e293b" }}>State Flag: Suppressed Stock Lockout</option>
                </select>
              </div>

              <motion.button 
                whileHover={{ y: -2, boxShadow: "0 10px 20px rgba(99, 102, 241, 0.3)" }} whileTap={{ scale: 0.99 }} 
                onClick={handleAddProduct} 
                style={{
                  ...styles.modalExecuteBtn,
                  background: editId 
                    ? "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)" 
                    : "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)"
                }}
              >
                {editId ? "Commit Changes" : "Deploy Variant"}
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
    display: "flex", height: "100vh", 
    backgroundColor: "#0b0f19",
    overflowX: "hidden", overflowY: "hidden",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  notificationToast: {
    position: "fixed", top: "32px", right: "32px", background: "#1e293b", padding: "16px 24px",
    borderRadius: "16px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
    display: "flex", alignItems: "center", gap: "12px", zIndex: 999999, border: "1px solid rgba(255,255,255,0.1)"
  },
  welcomeBanner: {
    background: "linear-gradient(135deg, #14112e 0%, #0c0c1a 100%)", 
    borderRadius: "20px", padding: "40px 44px", color: "white", marginBottom: "32px", position: "relative",
    overflow: "hidden", display: "flex", justifyContent: "space-between", alignItems: "center",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    boxShadow: "0 20px 40px -15px rgba(0,0,0,0.5)"
  },
  welcomeOverlay: {
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    background: "radial-gradient(circle at top left, rgba(99,102,241,0.12) 0%, transparent 60%)", zIndex: 2
  },
  bannerImageContainer: {
    position: "absolute", right: 0, top: 0, bottom: 0, width: "45%", height: "100%",
    zIndex: 1, opacity: 0.5, pointerEvents: "none", overflow: "hidden"
  },
  bannerImage: {
    width: "100%", height: "100%", objectFit: "cover", objectPosition: "center-right"
  },
  bannerImageLeftFadeMask: {
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    background: "linear-gradient(to right, #0c0c1a 0%, rgba(12, 12, 26, 0.8) 20%, rgba(12, 12, 26, 0) 100%)"
  },
  bannerBadge: { background: "rgba(99, 102, 241, 0.15)", color: "#93c5fd", fontSize: "11px", fontWeight: "700", padding: "5px 12px", borderRadius: "6px", letterSpacing: "0.5px", display: "inline-block", marginBottom: "14px" },
  bannerTitle: { fontSize: "30px", fontWeight: "700", margin: "0 0 12px 0", letterSpacing: "-0.3px" },
  bannerSubtitle: { opacity: 0.7, margin: 0, fontSize: "14.5px", lineHeight: "1.6" },
  metricsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "32px" },
  metricCard: {
    background: "rgba(255, 255, 255, 0.03)", borderRadius: "20px", padding: "24px", 
    border: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", justifyContent: "space-between", alignItems: "center",
    cursor: "pointer", boxSizing: "border-box", height: "115px",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.15)", transition: "all 0.3s, border-color 0.3s, box-shadow 0.3s"
  },
  metricTitle: { color: "#64748b", fontWeight: "700", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 6px 0" },
  metricValue: { fontSize: "30px", fontWeight: "700", color: "#ffffff", margin: 0 },
  metricIconContainer: {
    width: "50px", height: "50px", borderRadius: "14px", color: "white", display: "flex",
    justifyContent: "center", alignItems: "center", fontSize: "18px"
  },
  cardPanel: { 
    background: "rgba(255, 255, 255, 0.02)", borderRadius: "20px", padding: "24px", 
    border: "1px solid rgba(255, 255, 255, 0.05)", boxSizing: "border-box",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)"
  },
  panelHeaderRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", gap: "20px", flexWrap: "wrap" },
  searchContainerBlock: { display: "flex", flexDirection: "column", gap: "8px", width: "100%", maxWidth: "400px" },
  searchBarWrapper: { position: "relative", width: "100%" },
  searchIcon: { position: "absolute", top: "50%", left: "18px", transform: "translateY(-50%)", color: "#64748b", fontSize: "14px" },
  searchInput: {
    width: "100%", padding: "12px 14px 12px 44px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255, 255, 255, 0.03)", outline: "none", fontSize: "14px", color: "#ffffff", boxSizing: "border-box"
  },
  searchFeedbackText: { fontSize: "12px", color: "#64748b", paddingLeft: "4px" },
  secondaryExportBtn: {
    display: "flex", alignItems: "center", gap: "8px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255,255,255,0.06)",
    padding: "11px 18px", borderRadius: "12px", color: "#ffffff", fontSize: "13.5px", fontWeight: "600", cursor: "pointer"
  },
  primaryPanelActionBtn: {
    display: "flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #4f46e5, #6366f1)", border: "none",
    padding: "11px 18px", borderRadius: "12px", color: "#ffffff", fontSize: "13.5px", fontWeight: "600", cursor: "pointer"
  },
  emptyStateContainer: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px" },
  emptyStateIcon: { fontSize: "40px", color: "#334155", marginBottom: "16px" },
  emptyStateHeading: { color: "#ffffff", fontSize: "17px", margin: "0 0 6px 0" },
  emptyStateText: { color: "#64748b", fontSize: "13.5px", margin: 0 },
  ledgerTable: { width: "100%", borderCollapse: "separate", borderSpacing: "0 8px" },
  tableHead: { textTransform: "uppercase", color: "#64748b", fontSize: "11px", fontWeight: "700", letterSpacing: "0.5px", padding: "14px 20px", textAlign: "left" },
  tableRowStyle: { background: "rgba(255,255,255,0.01)", borderRadius: "14px" },
  tableData: { padding: "14px 20px", verticalAlign: "middle", color: "#cbd5e1" },
  imageWrapper: { 
    position: "relative", width: "42px", height: "42px", borderRadius: "10px", 
    overflow: "hidden", background: "#1e293b", border: "1px solid rgba(255, 255, 255, 0.08)", flexShrink: 0
  },
  productImageThumb: { 
    width: "100%", height: "100%", objectFit: "cover" 
  },
  imageGlassOverlay: { 
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0, 
    background: "linear-gradient(rgba(255,255,255,0.05), transparent)", pointerEvents: "none"
  },
  categoryBadge: { background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: "600", border: "1px solid rgba(255,255,255,0.03)" },
  lowStockWarningBadge: { background: "rgba(245,158,11,0.15)", color: "#f59e0b", fontSize: "11px", padding: "3px 8px", borderRadius: "6px", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "4px", border: "1px solid rgba(245,158,11,0.2)" },
  statusBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" },
  statusDot: { width: "6px", height: "6px", borderRadius: "50%" },
  rowActionBtn: { width: "32px", height: "32px", borderRadius: "8px", border: "none", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "13px" },
  modalBackdrop: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(4, 6, 14, 0.8)", backdropFilter: "blur(8px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 99999 },
  modalCard: { background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "32px", width: "100%", maxWidth: "460px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", position: "relative", boxSizing: "border-box" },
  modalCloseBtn: { position: "absolute", top: "24px", right: "24px", background: "none", border: "none", color: "#64748b", fontSize: "24px", cursor: "pointer", outline: "none" },
  modalHeaderBlock: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" },
  modalIconBox: { width: "44px", height: "44px", borderRadius: "12px", background: "rgba(99,102,241,0.1)", display: "flex", justifyContent: "center", alignItems: "center" },
  modalInputLabel: { display: "block", color: "#94a3b8", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px", paddingLeft: "2px" },
  modalInputWrapper: { display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "0 16px", borderRadius: "14px", marginBottom: "18px", height: "44px", boxSizing: "border-box", transition: "all 0.2s" },
  modalInputIcon: { color: "#64748b", fontSize: "14px" },
  cleanInput: { background: "none", border: "none", outline: "none", color: "#ffffff", fontSize: "14px", width: "100%", height: "100%" },
  cleanSelect: { background: "none", border: "none", outline: "none", color: "#ffffff", fontSize: "14px", width: "100%", height: "100%", cursor: "pointer" },
  modalExecuteBtn: { width: "100%", height: "44px", border: "none", borderRadius: "14px", color: "#ffffff", fontSize: "14px", fontWeight: "700", cursor: "pointer", marginTop: "8px" }
};

export default ProductsPage;