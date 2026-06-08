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
  FaCalendarAlt,
  FaIdCard,
  FaExclamationTriangle,
  FaPaperPlane,
  FaArrowUp,
  FaLightbulb
} from "react-icons/fa";

// ADVANCED ORCHESTRATION ANIMATION DEFINITIONS
const screenReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.02 }
  }
};

const cardSpring = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 16 } 
  }
};

const pulseGlow = {
  animate: {
    scale: [1, 1.03, 1],
    opacity: [0.15, 0.25, 0.15],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  }
};

function Dashboard() {
  const [hoveredBar, setHoveredBar] = useState(null);
  const [selectedChartBar, setSelectedChartBar] = useState(null);
  const [dialogType, setDialogType] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [systemAlert, setSystemAlert] = useState(true);

  // MEMORY NODE HYDRATION SYSTEM
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem("db_lux_activities");
    return saved ? JSON.parse(saved) : [
      { id: 1, text: "High-yield invoice cluster generated", user: "Vikram", time: "2m ago", color: "#10b981", type: "invoice" },
      { id: 2, text: "New merchant profile white-listed", user: "Ananya", time: "15m ago", color: "#3b82f6", type: "customer" },
      { id: 3, text: "Liquidity clearance successful", user: "System Desk", time: "1h ago", color: "#f59e0b", type: "payment" },
    ];
  });

  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem("db_lux_invoices");
    return saved ? JSON.parse(saved) : [
      { id: "INV-9021", customer: "Aditya Birla Co", date: "04 Jun 2026", amount: "₹4,85,000", status: "Paid" },
      { id: "INV-8841", customer: "Meenakshi Tech Ltd", date: "02 Jun 2026", amount: "₹1,24,500", status: "Pending" },
      { id: "INV-7312", customer: "Srinivasan Logistics", date: "29 May 2026", amount: "₹92,000", status: "Paid" },
    ];
  });

  const [newInvoice, setNewInvoice] = useState({ id: "", customer: "", date: "", amount: "", status: "Pending" });
  const [editForm, setEditForm] = useState({ customer: "", amount: "", status: "Pending" });

  useEffect(() => {
    localStorage.setItem("db_lux_invoices", JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem("db_lux_activities", JSON.stringify(activities));
  }, [activities]);

  const getActivityIcon = (type) => {
    switch (type) {
      case "invoice": return <FaCheckCircle />;
      case "customer": return <FaUserPlus />;
      case "payment": return <FaCreditCard />;
      default: return <FaPaperPlane />;
    }
  };

  const cards = [
    { title: "Net Revenue Stream", value: "₹6,01,500", growth: "+14.2%", icon: <FaMoneyBillWave />, color: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)" },
    { title: "Active Consumer Nodes", value: "1,482", growth: "+8.6%", icon: <FaUsers />, color: "linear-gradient(135deg, #10b981 0%, #059669 100%)" },
    { title: "Vaulted Allocations", value: "412 Units", growth: "Stable", icon: <FaBoxOpen />, color: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)" },
    { title: "Invoices Transacted", value: invoices.length, growth: "Real-time", icon: <FaFileInvoice />, color: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)" },
  ];

  const chartData = [
    { label: "Mon", val: 110, text: "₹1.1L", color: "#4f46e5" },
    { label: "Tue", val: 175, text: "₹1.75L", color: "#4338ca" },
    { label: "Wed", val: 140, text: "₹1.4L", color: "#3730a3" },
    { label: "Thu", val: 240, text: "₹6366f1", color: "#6366f1" },
    { label: "Fri", val: 190, text: "₹1.9L", color: "#4f46e5" },
    { label: "Sat", val: 90, text: "0.9L", color: "#10b981" },
    { label: "Sun", val: 60, text: "0.6L", color: "#059669" },
  ];

  const handleAddInvoice = () => {
    if (!newInvoice.id || !newInvoice.customer || !newInvoice.amount) return;
    const item = {
      ...newInvoice,
      amount: newInvoice.amount.startsWith("₹") ? newInvoice.amount : "₹" + newInvoice.amount,
      date: newInvoice.date ? new Date(newInvoice.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "04 Jun 2026",
    };
    setInvoices([item, ...invoices]);
    setActivities([{
      id: Date.now(),
      text: `Injected pipeline element ${item.id}`,
      user: "Root Node",
      time: "Just now",
      color: "#10b981",
      type: "invoice"
    }, ...activities]);
    setSelectedInvoice(null);
    setNewInvoice({ id: "", customer: "", date: "", amount: "", status: "Pending" });
  };

  const handleEditInvoice = () => {
    const updated = invoices.map(i => i.id === selectedInvoice.id ? { ...i, customer: editForm.customer, amount: editForm.amount.startsWith("₹") ? editForm.amount : "₹" + editForm.amount, status: editForm.status } : i);
    setInvoices(updated);
    setSelectedInvoice(null);
  };

  return (
    <div style={styles.appShell}>
      {/* AURORA FLOW MESH LAYER OUTLINES - DIRECTLY EMULATING SCREENSHOT EYE CANDY */}
      <div style={styles.auroraWaveOne} />
      <div style={styles.auroraWaveTwo} />
      <div style={styles.auroraWaveThree} />
      
      <Sidebar />
      
      <style>{`
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0e0f17; }
        ::-webkit-scrollbar-thumb { background: #222533; border-radius: 8px; }
        
        .interactive-tr { 
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s; 
          border-bottom: 1px solid rgba(255, 255, 255, 0.04) !important;
        }
        .interactive-tr:hover { 
          background-color: rgba(255, 255, 255, 0.02) !important; 
          transform: scale(1.002); 
        }
        
        .glass-input {
          outline: none;
          transition: all 0.2s ease;
        }
        .glass-input:focus { 
          border-color: rgba(99, 102, 241, 0.4) !important; 
          background: rgba(20, 21, 31, 0.8) !important; 
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15); 
        }
      `}</style>

      <div style={styles.workspace}>
        <TopNav title="Executive Terminal Overview" />

        <motion.div initial="hidden" animate="visible" variants={screenReveal} style={{ padding: "32px", position: "relative", zIndex: 5 }}>
          
          {/* MANAGEMENT FLOATING HERO BANNER */}
          <motion.div variants={cardSpring} style={styles.heroBanner}>
            <motion.div variants={pulseGlow} animate="animate" style={styles.bannerGlowDisk} />
            
            <div style={styles.heroLeftContent}>
              <div style={styles.pillIndicator}>
                MANAGEMENT PORTAL ACTIVE
              </div>
              <h1 style={styles.heroTitle}>Quantum Ledger Engine v4.2</h1>
              <p style={styles.heroDescription}>
                Calibrate manufacturing pipelines, evaluate warehouse capacities, map marketplace pricing tiers, and track inventory velocity smoothly across active pipeline nodes.
              </p>
            </div>

            <div style={styles.heroVisualFrame}>
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=80" 
                alt="Analytical Infrastructure Network" 
                style={styles.heroImageLayer}
              />
              <div style={styles.imageOverlayShield} />
            </div>
          </motion.div>

          {/* SYSTEM WARNING SLIDE */}
          <AnimatePresence>
            {systemAlert && (
              <motion.div 
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                style={styles.alertBanner}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <FaExclamationTriangle style={{ color: "#fbbf24", fontSize: "16px" }} />
                  <span style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.8)", fontWeight: "500" }}>
                    Production Cluster sync processing pending for 1 non-audited valuation node.
                  </span>
                </div>
                <button onClick={() => setSystemAlert(false)} style={styles.alertDismissBtn}>Dismiss</button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FLUID METRICS LAYOUT GRID */}
          <div style={styles.metricsLayoutGrid}>
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={cardSpring}
                whileHover={{ y: -4, backgroundColor: "rgba(24, 25, 37, 0.6)" }}
                style={styles.performanceMetricBlock}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={styles.metricLabelText}>{card.title}</span>
                  <span style={styles.metricMainHeading}>{card.value}</span>
                  <span style={styles.metricGrowthSubtext}>
                    <FaArrowUp style={{ marginRight: "4px", fontSize: "10px" }} /> {card.growth} this period
                  </span>
                </div>
                <div style={{ ...styles.metricIconShield, background: card.color }}>
                  {card.icon}
                </div>
              </motion.div>
            ))}
          </div>

          {/* MID SECTION SPLIT */}
          <div style={styles.midSectionSplit}>
            
            {/* ANALYTICS DATA BAR ENGINE */}
            <motion.div variants={cardSpring} style={styles.dataPanelContainer}>
              <div style={styles.panelControlHeader}>
                <div>
                  <h3 style={styles.panelMainTitle}>Liquidity Ingestion Graph</h3>
                  <span style={styles.panelSubtext}>Continuous chronological metric feed</span>
                </div>
                <span style={styles.badgeInteractive}>LIVE TRACKING</span>
              </div>

              <div style={styles.graphContainerFrame}>
                {chartData.map((bar, index) => {
                  const active = selectedChartBar === index;
                  const visibleTooltip = hoveredBar === index || active;

                  return (
                    <div key={index} style={styles.graphVerticalColumn}>
                      <AnimatePresence>
                        {visibleTooltip && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.9 }} 
                            animate={{ opacity: 1, y: 0, scale: 1 }} 
                            exit={{ opacity: 0, y: 5 }} 
                            style={{ ...styles.graphFloatTooltip, bottom: `${bar.val + 20}px` }}
                          >
                            {bar.text}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <motion.div
                        onMouseEnter={() => setHoveredBar(index)}
                        onMouseLeave={() => setHoveredBar(null)}
                        onClick={() => setSelectedChartBar(active ? null : index)}
                        initial={{ height: 0 }}
                        animate={{ 
                          height: `${bar.val}px`,
                          backgroundColor: active ? "#6366f1" : bar.color,
                          boxShadow: active ? "0 0 20px rgba(99, 102, 241, 0.4)" : "none"
                        }}
                        transition={{ height: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
                        style={styles.graphActiveBarShape}
                      />
                      <span style={{ ...styles.graphAxisLabel, color: active ? "#818cf8" : "#626575", fontWeight: active ? "700" : "500" }}>
                        {bar.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* REAL-TIME NOTIFICATION EVENT PIPELINE */}
            <motion.div variants={cardSpring} style={styles.dataPanelContainer}>
              <div style={styles.panelControlHeader}>
                <div>
                  <h3 style={styles.panelMainTitle}>Operational Event Logs</h3>
                  <span style={styles.panelSubtext}>Diagnostic user trace timeline</span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={() => setActivities([{ id: Date.now(), text: "Manual runtime stack analysis run", user: "Admin Dev", time: "Just now", color: "#6366f1", type: "system" }, ...activities])} 
                  style={styles.panelUtilityAddBtn}
                >
                  <FaPlus />
                </motion.button>
              </div>

              <div style={styles.scrollingActivityZone}>
                <AnimatePresence initial={false}>
                  {activities.map((act) => (
                    <motion.div 
                      key={act.id} 
                      initial={{ opacity: 0, x: -30, height: 0 }} 
                      animate={{ opacity: 1, x: 0, height: "auto" }} 
                      exit={{ opacity: 0, x: 30, height: 0 }} 
                      transition={{ type: "spring", stiffness: 120, damping: 18 }}
                      style={styles.logEventItem}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ ...styles.logAssetIconFrame, background: `${act.color || '#6366f1'}15`, color: act.color || '#6366f1' }}>
                          {getActivityIcon(act.type)}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={styles.logEventMainText}>{act.text}</span>
                          <span style={styles.logEventSubtext}>Invoked by {act.user} • {act.time}</span>
                        </div>
                      </div>
                      <button onClick={() => setActivities(activities.filter(a => a.id !== act.id))} style={styles.logDeleteActionTrigger}>
                        <FaTrash />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* CENTRAL TRANSACTION MATRIX COMPONENT */}
          <motion.div variants={cardSpring} layout style={{ ...styles.dataPanelContainer, marginTop: "32px" }}>
            <div style={styles.panelControlHeader}>
              <div>
                <h3 style={styles.panelMainTitle}>Central Invoicing Matrix</h3>
                <span style={styles.panelSubtext}>Persistent database cluster record cache</span>
              </div>
              <motion.button 
                whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(99, 102, 241, 0.3)" }} 
                whileTap={{ scale: 0.98 }} 
                onClick={() => { setDialogType("add"); setSelectedInvoice({}); }} 
                style={styles.mainActionDispatchBtn}
              >
                <FaPlus /> Deploy New Variant
              </motion.button>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={styles.matrixDataTableElement}>
                <thead>
                  <tr style={{ background: "rgba(25, 26, 36, 0.5)" }}>
                    <th style={styles.matrixHeaderCell}>REFERENCE KEY</th>
                    <th style={styles.matrixHeaderCell}>CLIENT ASSIGNMENT</th>
                    <th style={styles.matrixHeaderCell}>INGESTION TIMESTAMP</th>
                    <th style={styles.matrixHeaderCell}>VALUATION INDEX</th>
                    <th style={styles.matrixHeaderCell}>PIPELINE STATUS</th>
                    <th style={{ ...styles.matrixHeaderCell, textAlign: "center" }}>OPERATIONS TARGET</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence initial={false}>
                    {invoices.map((inv, index) => (
                      <motion.tr 
                        key={inv.id || index} 
                        initial={{ opacity: 0, y: 4 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.98 }} 
                        layoutId={`row_${inv.id}`} 
                        className="interactive-tr" 
                        style={styles.matrixRowStyle}
                      >
                        <td style={{ ...styles.matrixDataCell, fontWeight: "700", color: "#818cf8" }}>{inv.id}</td>
                        <td style={styles.matrixDataCell}>
                          <span style={{ fontWeight: "600", color: "#f4f4f5" }}>{inv.customer}</span>
                        </td>
                        <td style={styles.matrixDataCell}>{inv.date}</td>
                        <td style={{ ...styles.matrixDataCell, fontWeight: "700", color: "#f4f4f5" }}>{inv.amount}</td>
                        <td style={styles.matrixDataCell}>
                          <span style={{ 
                            ...styles.matrixStateBadge, 
                            background: inv.status === "Paid" ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)", 
                            color: inv.status === "Paid" ? "#34d399" : "#fbbf24",
                            border: inv.status === "Paid" ? "1px solid rgba(16, 185, 129, 0.15)" : "1px solid rgba(245, 158, 11, 0.15)"
                          }}>
                            <span style={{ ...styles.badgeDotIndicator, background: inv.status === "Paid" ? "#10b981" : "#f59e0b" }} />
                            {inv.status}
                          </span>
                        </td>
                        <td style={styles.matrixDataCell}>
                          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                            <button onClick={() => { setSelectedInvoice(inv); setEditForm({ customer: inv.customer, amount: inv.amount.replace("₹", ""), status: inv.status }); setDialogType("edit"); }} style={{ ...styles.rowActionIconBtn, background: "rgba(245, 158, 11, 0.12)", color: "#fbbf24" }}><FaEdit /></button>
                            <button onClick={() => { setSelectedInvoice(inv); setDialogType("delete"); }} style={{ ...styles.rowActionIconBtn, background: "rgba(239, 68, 68, 0.12)", color: "#f87171" }}><FaTrash /></button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* BACKDROP DIALOG FRAMEWORK */}
      <AnimatePresence>
        {selectedInvoice && (
          <div style={styles.dialogOverlayShield}>
            <motion.div initial={{ opacity: 0, scale: 0.94, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94 }} style={styles.dialogCardFrame}>
              <button onClick={() => setSelectedInvoice(null)} style={styles.dialogDismissX}>×</button>

              {dialogType === "add" && (
                <>
                  <div style={styles.dialogHeaderSection}>
                    <FaFileInvoice style={{ fontSize: "20px", color: "#818cf8" }} />
                    <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#ffffff" }}>Instantiate New Database Node</h2>
                  </div>
                  <div style={styles.dialogInputWrapper}><FaIdCard style={styles.dialogInputIconSymbol} /><input placeholder="Invoice Key ID Ref (e.g. INV-2010)" value={newInvoice.id} onChange={(e) => setNewInvoice({ ...newInvoice, id: e.target.value })} style={styles.dialogCoreInputNode} className="glass-input" /></div>
                  <div style={styles.dialogInputWrapper}><FaUsers style={styles.dialogInputIconSymbol} /><input placeholder="Client Organization Entity" value={newInvoice.customer} onChange={(e) => setNewInvoice({ ...newInvoice, customer: e.target.value })} style={styles.dialogCoreInputNode} className="glass-input" /></div>
                  <div style={styles.dialogInputWrapper}><FaCalendarAlt style={styles.dialogInputIconSymbol} /><input type="date" value={newInvoice.date} onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })} style={styles.dialogCoreInputNode} className="glass-input" /></div>
                  <div style={styles.dialogInputWrapper}><FaMoneyBillWave style={styles.dialogInputIconSymbol} /><input placeholder="Valuation Base Amount (₹)" value={newInvoice.amount} onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })} style={styles.dialogCoreInputNode} className="glass-input" /></div>
                  <div style={styles.dialogInputWrapper}>
                    <FaChartLine style={styles.dialogInputIconSymbol} />
                    <select value={newInvoice.status} onChange={(e) => setNewInvoice({ ...newInvoice, status: e.target.value })} style={styles.dialogDropdownSelectionElement}>
                      <option value="Pending">Execution State: Awaiting External Clearing</option>
                      <option value="Paid">Execution State: Confirmed Capital Match</option>
                    </select>
                  </div>
                  <button onClick={handleAddInvoice} style={styles.dialogPrimaryDispatchBtn}>Commit Struct Array To Stack</button>
                </>
              )}

              {dialogType === "edit" && (
                <>
                  <div style={styles.dialogHeaderSection}>
                    <FaEdit style={{ fontSize: "20px", color: "#fbbf24" }} />
                    <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#ffffff" }}>Mutate Target Ledger Properties ({selectedInvoice.id})</h2>
                  </div>
                  <div style={styles.dialogInputWrapper}><FaUsers style={styles.dialogInputIconSymbol} /><input value={editForm.customer} onChange={(e) => setEditForm({ ...editForm, customer: e.target.value })} style={styles.dialogCoreInputNode} className="glass-input" /></div>
                  <div style={styles.dialogInputWrapper}><FaMoneyBillWave style={styles.dialogInputIconSymbol} /><input value={editForm.amount} onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })} style={styles.dialogCoreInputNode} className="glass-input" /></div>
                  <div style={styles.dialogInputWrapper}>
                    <FaChartLine style={styles.dialogInputIconSymbol} />
                    <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} style={styles.dialogDropdownSelectionElement}>
                      <option value="Pending">Execution State: Awaiting External Clearing</option>
                      <option value="Paid">Execution State: Confirmed Capital Match</option>
                    </select>
                  </div>
                  <button onClick={handleEditInvoice} style={{ ...styles.dialogPrimaryDispatchBtn, background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" }}>Save Cluster Structural Deltas</button>
                </>
              )}

              {dialogType === "delete" && (
                <>
                  <div style={{ ...styles.dialogHeaderSection, flexDirection: "column", gap: "12px", textAlign: "center" }}>
                    <div style={styles.dialogWarningCircle}><FaExclamationTriangle /></div>
                    <h2 style={{ margin: 0, fontSize: "18px", color: "#f87171", fontWeight: "700" }}>Wipe Transaction Trace</h2>
                  </div>
                  <p style={{ textAlign: "center", color: "#8e92a6", fontSize: "13.5px", lineHeight: "1.6", margin: "0 0 24px 0" }}>Are you completely certain you want to purge data row object tracking reference <strong>{selectedInvoice.id}</strong>? This operation isolates and deletes the record from state storage nodes.</p>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button onClick={() => setSelectedInvoice(null)} style={styles.dialogAbortControlBtn}>Cancel Action</button>
                    <button onClick={() => { setInvoices(invoices.filter(i => i.id !== selectedInvoice.id)); setSelectedInvoice(null); }} style={styles.dialogConfirmWipeBtn}>Purge Structural Index</button>
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
  // MASTER WRAPPER - RECREATING SCREENSHOT'S SHADOWY CHROMATIC CANVAS 
  appShell: { 
    display: "flex", 
    height: "100vh", 
    background: "#0a0b10", 
    overflow: "hidden", 
    fontFamily: "system-ui, -apple-system, sans-serif", 
    position: "relative" 
  },
  
  // CHROMATIC MESH EMBED LAYER ARRAYS (AURORA EFFECT FROM THE IMAGE)
  auroraWaveOne: { position: "absolute", top: "-20%", left: "-10%", width: "70vw", height: "60vh", borderRadius: "50%", background: "radial-gradient(circle, rgba(49, 46, 129, 0.4) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 1 },
  auroraWaveTwo: { position: "absolute", bottom: "10%", right: "-5%", width: "60vw", height: "65vh", borderRadius: "50%", background: "radial-gradient(circle, rgba(15, 118, 110, 0.25) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 1 },
  auroraWaveThree: { position: "absolute", top: "30%", right: "20%", width: "50vw", height: "50vh", borderRadius: "50%", background: "radial-gradient(circle, rgba(134, 25, 143, 0.12) 0%, transparent 60%)", filter: "blur(70px)", pointerEvents: "none", zIndex: 1 },

  workspace: { flex: 1, height: "100vh", overflowY: "auto", display: "flex", flexDirection: "column", position: "relative", zIndex: 10 },
  
  // HERO SEGMENT - MATTE DEEP BLUE WITH AMBIENT SHADING
  heroBanner: { background: "linear-gradient(135deg, #1b1c30 0%, #151624 100%)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "24px", padding: "36px 40px", color: "white", marginBottom: "28px", position: "relative", overflow: "hidden", display: "flex", justifyContent: "space-between", alignItems: "center" },
  bannerGlowDisk: { position: "absolute", bottom: "-40px", right: "-40px", width: "260px", height: "260px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 75%)", pointerEvents: "none" },
  heroLeftContent: { position: "relative", zIndex: 2, maxWidth: "60%" },
  pillIndicator: { display: "inline-flex", alignItems: "center", background: "rgba(99, 102, 241, 0.15)", color: "#9ca3af", padding: "5px 12px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.5px", marginBottom: "16px", border: "1px solid rgba(99, 102, 241, 0.2)" },
  heroTitle: { fontSize: "28px", fontWeight: "700", margin: "0 0 10px 0", letterSpacing: "-0.5px", color: "#ffffff" },
  heroDescription: { opacity: 0.7, margin: 0, fontSize: "13.5px", lineHeight: "1.6", color: "#9ca3af" },
  heroVisualFrame: { position: "relative", width: "200px", height: "120px", borderRadius: "16px", overflow: "hidden", opacity: 0.65 },
  heroImageLayer: { width: "100%", height: "100%", objectFit: "cover" },
  imageOverlayShield: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to right, #151624, transparent)" },
  
  alertBanner: { background: "rgba(30, 31, 46, 0.4)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "14px", padding: "12px 20px", marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  alertDismissBtn: { background: "transparent", border: "none", color: "#9cb3ff", fontWeight: "600", fontSize: "12.5px", cursor: "pointer" },
  metricsLayoutGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "24px", marginBottom: "32px" },
  
  // COMPONENT BLOCKS - MATCHING THE SOLID SMOOTH TEXTURE SEEN IN SCREENSHOT 2026-06-05 172442.JPG
  performanceMetricBlock: { background: "rgba(22, 23, 33, 0.55)", backdropFilter: "blur(20px)", borderRadius: "20px", padding: "24px", border: "1px solid rgba(255, 255, 255, 0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", transition: "all 0.25s ease" },
  metricLabelText: { color: "#797c8c", fontWeight: "600", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" },
  metricMainHeading: { fontSize: "26px", fontWeight: "700", color: "#ffffff", margin: "4px 0" },
  metricGrowthSubtext: { fontSize: "11.5px", color: "#10b981", fontWeight: "500", display: "flex", alignItems: "center" },
  metricIconShield: { width: "46px", height: "46px", borderRadius: "12px", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" },
  
  midSectionSplit: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "28px" },
  dataPanelContainer: { background: "rgba(22, 23, 33, 0.55)", backdropFilter: "blur(20px)", borderRadius: "24px", padding: "26px", border: "1px solid rgba(255, 255, 255, 0.04)" },
  panelControlHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
  panelMainTitle: { fontSize: "16px", fontWeight: "700", color: "#ffffff", margin: 0 },
  panelSubtext: { fontSize: "12.5px", color: "#626575", marginTop: "2px", display: "block" },
  badgeInteractive: { background: "rgba(255, 255, 255, 0.05)", color: "#9ca3af", fontSize: "10px", fontWeight: "700", padding: "4px 10px", borderRadius: "9999px", letterSpacing: "0.5px" },
  panelUtilityAddBtn: { width: "32px", height: "32px", borderRadius: "8px", border: "none", background: "rgba(255,255,255,0.04)", color: "#797c8c", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" },
  graphContainerFrame: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: "220px", paddingTop: "30px", position: "relative" },
  graphVerticalColumn: { display: "flex", flexDirection: "column", alignItems: "center", width: "10%", position: "relative" },
  graphFloatTooltip: { position: "absolute", background: "#11121a", color: "white", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "600", whiteSpace: "nowrap", border: "1px solid rgba(255,255,255,0.05)", pointerEvents: "none" },
  graphActiveBarShape: { width: "100%", borderRadius: "6px 6px 2px 2px", cursor: "pointer" },
  graphAxisLabel: { fontSize: "11px", marginTop: "10px" },
  scrollingActivityZone: { maxHeight: "220px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px" },
  logEventItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderRadius: "14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.02)" },
  logAssetIconFrame: { width: "34px", height: "34px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" },
  logEventMainText: { fontSize: "13px", fontWeight: "600", color: "#e4e4e7" },
  logEventSubtext: { fontSize: "11.5px", color: "#626575", marginTop: "2px" },
  logDeleteActionTrigger: { background: "transparent", border: "none", color: "#3f414d", cursor: "pointer", fontSize: "12px" },
  
  // INTERACTIVE BUTTON INSPIRED BY THE 'DEPLOY NEW VARIANT' NEON IN THE IMAGE
  mainActionDispatchBtn: { padding: "10px 20px", borderRadius: "12px", border: "none", background: "#4f46e5", color: "white", fontWeight: "600", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", boxShadow: "0 4px 14px rgba(79, 70, 229, 0.4)" },
  
  matrixDataTableElement: { width: "100%", borderCollapse: "collapse", textAlign: "left", marginTop: "12px" },
  matrixHeaderCell: { padding: "14px 16px", fontSize: "11px", fontWeight: "700", color: "#626575", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid rgba(255,255,255,0.04)" },
  matrixRowStyle: { borderBottom: "1px solid rgba(255,255,255,0.03)" },
  matrixDataCell: { padding: "16px", fontSize: "13px", color: "#a0a4b8" },
  matrixStateBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "600" },
  badgeDotIndicator: { width: "5px", height: "5px", borderRadius: "50%" },
  rowActionIconBtn: { border: "none", padding: "7px", borderRadius: "8px", cursor: "pointer", display: "inline-flex", alignItems: "center", fontSize: "12px" },
  
  dialogOverlayShield: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(5, 5, 8, 0.8)", backdropFilter: "blur(12px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
  dialogCardFrame: { background: "#11121a", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "24px", padding: "32px", width: "90%", maxWidth: "460px", position: "relative" },
  dialogDismissX: { position: "absolute", top: "20px", right: "20px", background: "transparent", border: "none", color: "#626575", fontSize: "22px", cursor: "pointer" },
  dialogHeaderSection: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" },
  dialogInputWrapper: { position: "relative", display: "flex", alignItems: "center", marginBottom: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "0 16px" },
  dialogInputIconSymbol: { color: "#4b4e5e", fontSize: "13px", position: "absolute", left: "16px" },
  dialogCoreInputNode: { width: "100%", background: "transparent", border: "none", padding: "12px 12px 12px 24px", color: "#ffffff", fontSize: "13.5px" },
  dialogDropdownSelectionElement: { width: "100%", background: "transparent", border: "none", padding: "12px 12px 12px 24px", color: "#ffffff", fontSize: "13.5px", cursor: "pointer" },
  dialogPrimaryDispatchBtn: { width: "100%", padding: "12px", borderRadius: "12px", border: "none", background: "#4f46e5", color: "white", fontWeight: "600", fontSize: "13.5px", cursor: "pointer", marginTop: "8px" },
  dialogWarningCircle: { width: "50px", height: "50px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.1)", color: "#f87171", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" },
  dialogAbortControlBtn: { flex: 1, padding: "12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "#797c8c", fontWeight: "600", fontSize: "13.5px", cursor: "pointer" },
  dialogConfirmWipeBtn: { flex: 1, padding: "12px", borderRadius: "12px", border: "none", background: "#dc2626", color: "white", fontWeight: "600", fontSize: "13.5px", cursor: "pointer" }
};

export default Dashboard;