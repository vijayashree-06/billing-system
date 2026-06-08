// src/pages/StaffPage.jsx
import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";
import {
  FaUsers,
  FaUserTie,
  FaUserPlus,
  FaSearch,
  FaTrash,
  FaEye,
  FaTimes,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEdit,
  FaFilter,
  FaArrowUp,
  FaChartPie,
  FaCheckCircle,
  FaInbox,
  FaCamera
} from "react-icons/fa";

// MOCK DATA ARCHIVE
const INITIAL_STAFF = [
  {
    id: "EMP-1001",
    name: "Arun Kumar",
    role: "Manager",
    email: "arun@billflow.com",
    phone: "9876543210",
    location: "Chennai",
    status: "Active",
    joined: "12 Jan 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
  },
  {
    id: "EMP-1002",
    name: "Priya Sharma",
    role: "Cashier",
    email: "priya@billflow.com",
    phone: "9876501234",
    location: "Bangalore",
    status: "Active",
    joined: "18 Feb 2026",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80"
  },
  {
    id: "EMP-1003",
    name: "Vignesh",
    role: "Accountant",
    email: "vignesh@billflow.com",
    phone: "9876549999",
    location: "Hyderabad",
    status: "Inactive",
    joined: "05 Mar 2026",
    avatar: "" 
  },
];

function StaffPage() {
  const [staffs, setStaffs] = useState(() => {
    const savedStaff = localStorage.getItem("billflow_staff_glow_v4");
    return savedStaff ? JSON.parse(savedStaff) : INITIAL_STAFF;
  });

  useEffect(() => {
    localStorage.setItem("billflow_staff_glow_v4", JSON.stringify(staffs));
  }, [staffs]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [staffForm, setStaffForm] = useState({
    id: "",
    name: "",
    role: "Cashier",
    email: "",
    phone: "",
    location: "",
    status: "Active",
    avatar: ""
  });

  const filteredStaffs = staffs.filter((staff) => {
    const matchesName = staff.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || staff.role === roleFilter;
    const matchesStatus = statusFilter === "All" || staff.status === statusFilter;
    return matchesName && matchesRole && matchesStatus;
  });

  const deleteStaff = (id) => {
    if (window.confirm("Prune this personnel profile node from secure logs?")) {
      setStaffs(staffs.filter((staff) => staff.id !== id));
      if (selectedStaff && selectedStaff.id === id) {
        setSelectedStaff(null);
      }
    }
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setStaffForm({ id: "", name: "", role: "Cashier", email: "", phone: "", location: "", status: "Active", avatar: "" });
    setShowModal(true);
  };

  const openEditModal = (staff, e) => {
    e.stopPropagation();
    setIsEditing(true);
    setStaffForm({ ...staff });
    setShowModal(true);
  };

  const handleFormSubmit = () => {
    if (!staffForm.name || !staffForm.email || !staffForm.phone) {
      alert("Please fill out all marked fields.");
      return;
    }

    if (isEditing) {
      setStaffs(staffs.map((item) => (item.id === staffForm.id ? { ...staffForm } : item)));
      if (selectedStaff && selectedStaff.id === staffForm.id) {
        setSelectedStaff({ ...staffForm });
      }
    } else {
      const uniqueId = "EMP-" + Math.floor(1000 + Math.random() * 9000);
      setStaffs([{ ...staffForm, id: uniqueId, joined: "06 Jun 2026" }, ...staffs]);
    }
    setShowModal(false);
  };

  const managerCount = staffs.filter((s) => s.role === "Manager").length;
  const cashierCount = staffs.filter((s) => s.role === "Cashier").length;
  const accountantCount = staffs.filter((s) => s.role === "Accountant").length;
  const maxRoleCount = Math.max(managerCount, cashierCount, accountantCount, 1);

  return (
    <div style={styles.pageContainer}>
      <Sidebar />

      {/* DYNAMIC GLOW TRIGGER SHEETS */}
      <style>{`
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(99, 102, 241, 0.6); box-shadow: 0 0 10px #4f46e5; }
        
        /* TOUCH & HOVER TOUCH GLOW EFFECTS */
        .touch-glow-card { transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); cursor: default; }
        .touch-glow-card:hover, .touch-glow-card:active {
          transform: translateY(-3px);
          border-color: rgba(99, 102, 241, 0.4) !important;
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.3) !important;
          background: rgba(14, 20, 38, 0.9) !important;
        }

        .touch-glow-chart { transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
        .touch-glow-chart:hover, .touch-glow-chart:active {
          border-color: rgba(168, 85, 247, 0.4) !important;
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.25) !important;
        }

        .touch-glow-input { transition: all 0.2s ease; }
        .touch-glow-input:focus-within, .touch-glow-input:hover {
          border-color: #6366f1 !important;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.5) !important;
          background: rgba(15, 23, 42, 0.9) !important;
        }
        
        .touch-glow-row { transition: all 0.2s ease; }
        .touch-glow-row:hover, .touch-glow-row:active {
          background: rgba(99, 102, 241, 0.06) !important;
          box-shadow: inset 0 0 15px rgba(99, 102, 241, 0.15) !important;
        }

        .touch-glow-btn { transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1); }
        .touch-glow-btn:hover, .touch-glow-btn:active {
          box-shadow: 0 0 25px rgba(99, 102, 241, 0.8) !important;
          transform: scale(1.02);
        }

        .touch-glow-action-icon { transition: all 0.2s ease; }
        .touch-glow-action-icon:hover, .touch-glow-action-icon:active {
          box-shadow: 0 0 15px currentColor !important;
          transform: scale(1.1);
        }

        .touch-glow-select { transition: all 0.2s ease; }
        .touch-glow-select:hover, .touch-glow-select:focus-within {
          box-shadow: 0 0 18px rgba(99, 102, 241, 0.35) !important;
          border-color: rgba(99, 102, 241, 0.35) !important;
        }
      `}</style>

      <div style={styles.mainContent}>
        <TopNav title="Staff Terminal" />

        <div style={{ padding: "32px" }}>
          
          {/* HEADER HERO BANNER LAYER */}
          <div style={styles.header}>
            <div style={styles.headerImageBackdrop} />
            <div style={styles.welcomeOverlay} />
            
            <div style={{ position: "relative", zIndex: 2 }}>
              <span style={styles.bannerBadge}>CYBER ACCESS PROTOCOLS</span>
              <h1 style={styles.heading}>Staff Command Center</h1>
              <p style={styles.subText}>
                Provision digital credential keys, adjust internal security profiles, and run diagnostic queries across operational personnel nodes.
              </p>
            </div>

            <button className="touch-glow-btn" style={styles.addButton} onClick={openCreateModal}>
              <FaUserPlus /> Deploy Staff Node
            </button>
          </div>

          {/* TOTAL HEADCOUNT GRID CONFIGS */}
          <div style={styles.dashboardTopSection}>
            <div style={styles.statsColumn}>
              <div className="touch-glow-card" style={styles.statCard}>
                <div style={styles.statIconBlue}><FaUsers /></div>
                <div style={{ flex: 1 }}>
                  <div style={styles.statMiniFlex}>
                    <p style={styles.statMiniLabel}>Active Registry Connections</p>
                    <span style={styles.liveTag}><FaArrowUp size={9} /> Syncing</span>
                  </div>
                  <h2 style={styles.statValue}>{staffs.length} Nodes</h2>
                </div>
              </div>

              <div className="touch-glow-card" style={{ ...styles.statCard, borderColor: "rgba(16, 185, 129, 0.1)" }}>
                <div style={styles.statIconGreen}><FaUserTie /></div>
                <div style={{ flex: 1 }}>
                  <div style={styles.statMiniFlex}>
                    <p style={styles.statMiniLabel}>Verified Clearances</p>
                    <span style={styles.activeTagBadge}>System Secure</span>
                  </div>
                  <h2 style={styles.statValue}>
                    {staffs.filter((s) => s.status === "Active").length} Live
                  </h2>
                </div>
              </div>
            </div>

            {/* DISTRIBUTION PROFILE MATRIX GRAPH */}
            <div className="touch-glow-chart" style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <div style={styles.chartHeaderIcon}><FaChartPie /></div>
                <div>
                  <h3 style={styles.chartTitle}>Department Metric Densities</h3>
                  <p style={styles.chartSubtitle}>Internal operational volume ratios</p>
                </div>
              </div>

              <div style={styles.chartContainer}>
                {[
                  { label: "Management Node", count: managerCount, fill: `${(managerCount/maxRoleCount)*100}%`, color: "linear-gradient(90deg, #4f46e5, #818cf8)" },
                  { label: "Cashier Terminals", count: cashierCount, fill: `${(cashierCount/maxRoleCount)*100}%`, color: "linear-gradient(90deg, #10b981, #34d399)" },
                  { label: "Ledger Accounting", count: accountantCount, fill: `${(accountantCount/maxRoleCount)*100}%`, color: "linear-gradient(90deg, #f59e0b, #fbbf24)" }
                ].map((row, idx) => (
                  <div key={idx} style={styles.chartRowLayout}>
                    <div style={styles.chartLabelMeta}>
                      <span style={styles.chartLabelText}>{row.label}</span>
                      <span style={styles.chartValueLabel}>{row.count}</span>
                    </div>
                    <div style={styles.chartTrack}>
                      <div style={{ ...styles.chartBarFilled, width: row.fill, background: row.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CONTROLS ROW PACKAGES */}
          <div style={styles.controlsRow}>
            <div className="touch-glow-input" style={styles.searchContainer}>
              <FaSearch style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Query personnel registry arrays..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <div style={styles.filtersGroup}>
              {[{ val: roleFilter, set: setRoleFilter, opts: ["All", "Manager", "Cashier", "Accountant"], label: "All Clearance Tiers" },
                { val: statusFilter, set: setStatusFilter, opts: ["All", "Active", "Inactive"], label: "All Network Statuses" }
              ].map((filt, idx) => (
                <div key={idx} className="touch-glow-select" style={styles.filterBox}>
                  <FaFilter style={styles.filterIcon} />
                  <select value={filt.val} onChange={(e) => filt.set(e.target.value)} style={styles.filterSelect}>
                    <option value="All" style={{ background: "#0f172a" }}>{filt.label}</option>
                    {filt.opts.slice(1).map((o) => (
                      <option key={o} value={o} style={{ background: "#0f172a" }}>{o}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* MASTER PERSONNEL SYSTEM LEDGER TABLE */}
          <div className="touch-glow-card" style={styles.cardPanel}>
            <div style={{ overflowX: "auto" }}>
              {filteredStaffs.length === 0 ? (
                <div style={styles.emptyStateContainer}>
                  <FaInbox style={styles.emptyStateIcon} />
                  <h3 style={styles.emptyStateHeading}>No Registry Arrays Match Query</h3>
                </div>
              ) : (
                <table style={styles.ledgerTable}>
                  <thead>
                    <tr style={{ background: "rgba(255, 255, 255, 0.02)" }}>
                      <th style={styles.tableHead}>ID REF</th>
                      <th style={styles.tableHead}>STAFF NODE NAME</th>
                      <th style={styles.tableHead}>ASSIGNED ROLE</th>
                      <th style={styles.tableHead}>SECURE EMAIL CHANNEL</th>
                      <th style={styles.tableHead}>NETWORK STATUS</th>
                      <th style={styles.tableHead}>PROVISIONED</th>
                      <th style={{ ...styles.tableHead, textAlign: "center" }}>OPERATIONS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredStaffs.map((staff) => (
                      <tr key={staff.id} className="touch-glow-row" style={styles.tableRowStyle}>
                        <td style={{ ...styles.tableData, color: "#6366f1", fontWeight: "700", fontFamily: "monospace" }}>{staff.id}</td>
                        <td style={{ ...styles.tableData, fontWeight: "700", color: "#ffffff" }}>{staff.name}</td>
                        <td>
                          <span style={{
                            ...styles.roleBadge,
                            background: staff.role === "Manager" ? "rgba(59, 130, 246, 0.12)" : staff.role === "Accountant" ? "rgba(245, 158, 11, 0.12)" : "rgba(255,255,255,0.04)",
                            color: staff.role === "Manager" ? "#60a5fa" : staff.role === "Accountant" ? "#fbbf24" : "#94a3b8"
                          }}>
                            {staff.role}
                          </span>
                        </td>
                        <td style={{ ...styles.tableData, color: "#cbd5e1" }}>{staff.email}</td>
                        <td>
                          <span style={{
                            ...styles.statusBadge,
                            background: staff.status === "Active" ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
                            color: staff.status === "Active" ? "#34d399" : "#f87171",
                            border: staff.status === "Active" ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid rgba(239, 68, 68, 0.2)"
                          }}>
                            <span style={{ ...styles.statusDot, background: staff.status === "Active" ? "#10b981" : "#ef4444" }} />
                            {staff.status}
                          </span>
                        </td>
                        <td style={{ ...styles.tableData, color: "#64748b" }}>{staff.joined}</td>
                        <td style={styles.tableData}>
                          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                            <button className="touch-glow-action-icon" style={{ ...styles.rowActionBtn, background: "rgba(99, 102, 241, 0.15)", color: "#818cf8" }} onClick={() => setSelectedStaff(staff)}><FaEye /></button>
                            <button className="touch-glow-action-icon" style={{ ...styles.rowActionBtn, background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" }} onClick={(e) => openEditModal(staff, e)}><FaEdit /></button>
                            <button className="touch-glow-action-icon" style={{ ...styles.rowActionBtn, background: "rgba(239, 68, 68, 0.15)", color: "#f87171" }} onClick={() => deleteStaff(staff.id)}><FaTrash /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* FORM MODAL COMPONENT WINDOW */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalCard, boxShadow: "0 0 50px rgba(99, 102, 241, 0.45)", borderColor: "rgba(99, 102, 241, 0.3)" }}>
            <button style={styles.modalCloseBtn} onClick={() => setShowModal(false)}><FaTimes /></button>
            <h2 style={styles.modalTitle}>
              {isEditing ? "Modify Node Parameters" : "Deploy Variant Array Node"}
            </h2>

            <label style={styles.modalInputLabel}>Profile Image Source URL</label>
            <div className="touch-glow-input" style={styles.modalInputWrapper}>
              <FaCamera style={{ color: "#475569" }} />
              <input type="text" placeholder="https://images.unsplash.com/photo-..." value={staffForm.avatar || ""} onChange={(e) => setStaffForm({ ...staffForm, avatar: e.target.value })} style={styles.cleanInput} />
            </div>

            <label style={styles.modalInputLabel}>Staff Core Identifier Name *</label>
            <div className="touch-glow-input" style={styles.modalInputWrapper}>
              <input type="text" placeholder="Full name designation" value={staffForm.name} onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })} style={styles.cleanInput} />
            </div>

            <label style={styles.modalInputLabel}>Routing Communication Address *</label>
            <div className="touch-glow-input" style={styles.modalInputWrapper}>
              <input type="email" placeholder="name@billflow.com" value={staffForm.email} onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })} style={styles.cleanInput} />
            </div>

            <label style={styles.modalInputLabel}>Contact Link Line *</label>
            <div className="touch-glow-input" style={styles.modalInputWrapper}>
              <input type="text" placeholder="Secure baseline number" value={staffForm.phone} onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })} style={styles.cleanInput} />
            </div>

            <label style={styles.modalInputLabel}>Corporate Operational Hub</label>
            <div className="touch-glow-input" style={styles.modalInputWrapper}>
              <input type="text" placeholder="Regional zone base" value={staffForm.location} onChange={(e) => setStaffForm({ ...staffForm, location: e.target.value })} style={styles.cleanInput} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={styles.modalInputLabel}>Clearance Allocation</label>
                <div className="touch-glow-input" style={styles.modalInputWrapper}>
                  <select value={staffForm.role} onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })} style={styles.cleanSelect}>
                    <option value="Manager" style={{ background: "#0f172a" }}>Manager</option>
                    <option value="Cashier" style={{ background: "#0f172a" }}>Cashier</option>
                    <option value="Accountant" style={{ background: "#0f172a" }}>Accountant</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={styles.modalInputLabel}>Network Gateway State</label>
                <div className="touch-glow-input" style={styles.modalInputWrapper}>
                  <select value={staffForm.status} onChange={(e) => setStaffForm({ ...staffForm, status: e.target.value })} style={styles.cleanSelect}>
                    <option value="Active" style={{ background: "#0f172a" }}>Active</option>
                    <option value="Inactive" style={{ background: "#0f172a" }}>Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={styles.modalBtnContainer}>
              <button style={styles.cancelBtn} onClick={() => setShowModal(false)}>Abort Change</button>
              <button className="touch-glow-btn" style={{ ...styles.modalExecuteBtn, background: isEditing ? "linear-gradient(135deg, #eab308, #ca8a04)" : "linear-gradient(135deg, #4f46e5, #3730a3)" }} onClick={handleFormSubmit}>
                {isEditing ? "Commit Blueprint" : "Activate Node"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAILED VIEW EXPANSION (IMAGE LOCATED HERE WITH IMMERSIVE GLOW BACKING) */}
      {selectedStaff && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.viewModalCard, boxShadow: "0 0 55px rgba(139, 92, 246, 0.5)", borderColor: "rgba(139, 92, 246, 0.4)" }}>
            <button style={styles.modalCloseBtn} onClick={() => setSelectedStaff(null)}><FaTimes /></button>

            <div style={styles.profileSection}>
              {selectedStaff.avatar ? (
                <div style={styles.avatarImageWrapper}>
                  <img src={selectedStaff.avatar} alt={selectedStaff.name} style={styles.avatarImageLarge} />
                </div>
              ) : (
                <div style={styles.avatarFallbackLarge}>
                  {selectedStaff.name ? selectedStaff.name[0].toUpperCase() : "?"}
                </div>
              )}
              <h2 style={styles.profileName}>{selectedStaff.name}</h2>
              <p style={styles.profileRole}>{selectedStaff.role} • Security Identifier: {selectedStaff.id}</p>
            </div>

            <div style={styles.detailsGrid}>
              {[
                { icon: <FaEnvelope style={{ color: "#6366f1" }} />, label: "SECURE COM-LINK NODE", val: selectedStaff.email },
                { icon: <FaPhoneAlt style={{ color: "#10b981" }} />, label: "DATA STREAM MATRIX", val: selectedStaff.phone },
                { icon: <FaMapMarkerAlt style={{ color: "#f59e0b" }} />, label: "GEOLOCATION HUB BRANCH", val: selectedStaff.location || "Default HQ Matrix" },
                { icon: <FaCheckCircle style={{ color: selectedStaff.status === "Active" ? "#10b981" : "#ef4444" }} />, label: "NETWORK FIREWALL FLAG", val: selectedStaff.status, color: selectedStaff.status === "Active" ? "#34d399" : "#f87171" }
              ].map((det, idx) => (
                <div key={idx} style={styles.detailCard}>
                  {det.icon}
                  <div>
                    <span style={styles.detailLabel}>{det.label}</span>
                    <h4 style={{ ...styles.detailValue, color: det.color || "#ffffff" }}>{det.val}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// IMMERSIVE DESIGN DESIGN PARADIGMS
const styles = {
  pageContainer: { display: "flex", height: "100vh", backgroundColor: "#04060d", overflow: "hidden", fontFamily: "system-ui, sans-serif" },
  mainContent: { flex: 1, height: "100vh", overflowY: "auto", display: "flex", flexDirection: "column", minWidth: 0, zIndex: 1 },
  header: {
    background: "linear-gradient(135deg, #09091e 0%, #03030a 100%)", borderRadius: "24px", padding: "44px", color: "white", marginBottom: "32px", position: "relative",
    overflow: "hidden", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(99, 102, 241, 0.15)", flexWrap: "wrap", gap: "20px"
  },
  headerImageBackdrop: {
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80')`,
    backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12, zIndex: 0, filter: "hue-rotate(220deg) saturate(1.4)"
  },
  welcomeOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at top left, rgba(99,102,241,0.15) 0%, transparent 70%)", zIndex: 1 },
  bannerBadge: { background: "rgba(99, 102, 241, 0.15)", color: "#a5b4fc", fontSize: "11px", fontWeight: "700", padding: "6px 14px", borderRadius: "8px", letterSpacing: "1px", display: "inline-block", marginBottom: "14px", border: "1px solid rgba(99,102,241,0.2)" },
  heading: { fontSize: "32px", fontWeight: "800", margin: "0 0 12px 0", letterSpacing: "-0.5px" },
  subText: { opacity: 0.65, margin: 0, fontSize: "14px", lineHeight: "1.6", maxWidth: "620px" },
  addButton: {
    border: "none", background: "linear-gradient(135deg, #4f46e5, #6366f1)", color: "#ffffff", padding: "14px 24px", borderRadius: "14px", cursor: "pointer", fontWeight: "700", display: "flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 2, outline: "none"
  },
  dashboardTopSection: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px", marginBottom: "32px" },
  statsColumn: { display: "flex", flexDirection: "column", gap: "24px" },
  statCard: { background: "rgba(10, 15, 30, 0.5)", borderRadius: "22px", padding: "26px", border: "1px solid rgba(99, 102, 241, 0.1)", display: "flex", alignItems: "center", gap: "20px" },
  statMiniFlex: { display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" },
  liveTag: { background: "rgba(16, 185, 129, 0.15)", color: "#34d399", fontSize: "11px", fontWeight: "700", padding: "4px 10px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "5px" },
  activeTagBadge: { background: "rgba(255, 255, 255, 0.05)", color: "#94a3b8", fontSize: "11px", fontWeight: "700", padding: "4px 10px", borderRadius: "8px" },
  statIconBlue: { width: "52px", height: "52px", borderRadius: "16px", background: "linear-gradient(135deg, #4f46e5, #6366f1)", color: "white", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px" },
  statIconGreen: { width: "52px", height: "52px", borderRadius: "16px", background: "linear-gradient(135deg, #10b981, #34d399)", color: "white", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px" },
  statValue: { fontSize: "32px", fontWeight: "800", color: "#ffffff", margin: "4px 0 0 0" },
  statMiniLabel: { color: "#64748b", margin: 0, fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" },
  chartCard: { background: "rgba(10, 15, 30, 0.5)", borderRadius: "22px", border: "1px solid rgba(168, 85, 247, 0.1)", padding: "26px", display: "flex", flexDirection: "column", gap: "22px" },
  chartHeader: { display: "flex", alignItems: "center", gap: "14px" },
  chartHeaderIcon: { width: "44px", height: "44px", borderRadius: "14px", background: "rgba(168, 85, 247, 0.12)", color: "#c084fc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" },
  chartTitle: { fontSize: "17px", fontWeight: "700", color: "#ffffff", margin: 0 },
  chartSubtitle: { fontSize: "13px", color: "#64748b", margin: "2px 0 0 0" },
  chartContainer: { display: "flex", flexDirection: "column", gap: "16px", justifyContent: "center", flex: 1 },
  chartRowLayout: { display: "flex", flexDirection: "column", gap: "8px" },
  chartLabelMeta: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  chartLabelText: { fontSize: "13px", fontWeight: "700", color: "#94a3b8" },
  chartValueLabel: { fontSize: "13px", fontWeight: "800", color: "#ffffff" },
  chartTrack: { width: "100%", height: "8px", background: "rgba(255, 255, 255, 0.04)", borderRadius: "30px", overflow: "hidden" },
  chartBarFilled: { height: "100%", borderRadius: "30px" },
  controlsRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "18px", marginBottom: "32px" },
  searchContainer: { background: "rgba(10, 15, 30, 0.6)", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.05)", padding: "14px 20px", display: "flex", alignItems: "center", gap: "14px", flex: "1", minWidth: "290px" },
  searchIcon: { color: "#4f5e75", fontSize: "15px" },
  searchInput: { border: "none", outline: "none", background: "transparent", width: "100%", fontSize: "14px", color: "#ffffff", fontWeight: "500" },
  filtersGroup: { display: "flex", gap: "14px", flexWrap: "wrap" },
  filterBox: { background: "rgba(10, 15, 30, 0.6)", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.05)", padding: "12px 18px", display: "flex", alignItems: "center", gap: "10px" },
  filterIcon: { color: "#64748b", fontSize: "13px" },
  filterSelect: { border: "none", outline: "none", background: "transparent", fontSize: "14px", fontWeight: "700", color: "#cbd5e1", cursor: "pointer" },
  cardPanel: { background: "rgba(6, 9, 20, 0.4)", borderRadius: "24px", padding: "28px", border: "1px solid rgba(99, 102, 241, 0.08)" },
  ledgerTable: { width: "100%", borderCollapse: "separate", borderSpacing: "0 10px" },
  tableHead: { textTransform: "uppercase", color: "#475569", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", padding: "16px 22px", textAlign: "left" },
  tableRowStyle: { background: "rgba(255, 255, 255, 0.01)", borderRadius: "16px" },
  tableData: { padding: "16px 22px", verticalAlign: "middle" },
  roleBadge: { padding: "5px 12px", borderRadius: "10px", fontSize: "12px", fontWeight: "700" },
  statusBadge: { display: "inline-flex", alignItems: "center", gap: "7px", padding: "5px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" },
  statusDot: { width: "6px", height: "6px", borderRadius: "50%" },
  rowActionBtn: { width: "34px", height: "34px", borderRadius: "10px", border: "none", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "14px" },
  emptyStateContainer: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px" },
  emptyStateIcon: { fontSize: "40px", color: "#1e293b", marginBottom: "16px" },
  emptyStateHeading: { color: "#64748b", fontSize: "16px", margin: 0 },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(2, 3, 7, 0.85)", backdropFilter: "blur(12px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 99999, padding: "20px" },
  modalCard: { background: "#090d16", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "28px", padding: "36px", width: "100%", maxWidth: "480px", position: "relative" },
  modalCloseBtn: { position: "absolute", top: "26px", right: "26px", background: "none", border: "none", color: "#475569", fontSize: "22px", cursor: "pointer", outline: "none" },
  modalTitle: { margin: "0 0 24px 0", fontSize: "22px", fontWeight: "800", color: "#ffffff" },
  modalInputLabel: { display: "block", color: "#64748b", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px", paddingLeft: "2px" },
  modalInputWrapper: { display: "flex", alignItems: "center", gap: "12px", background: "rgba(4,6,12,0.7)", border: "1px solid rgba(255,255,255,0.05)", padding: "0 18px", borderRadius: "16px", marginBottom: "18px", height: "48px", boxSizing: "border-box" },
  cleanInput: { background: "none", border: "none", outline: "none", color: "#ffffff", fontSize: "14px", width: "100%", height: "100%" },
  cleanSelect: { background: "none", border: "none", outline: "none", color: "#ffffff", fontSize: "14px", width: "100%", height: "100%", cursor: "pointer" },
  modalBtnContainer: { display: "flex", gap: "14px", marginTop: "28px" },
  cancelBtn: { flex: 1, height: "46px", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", color: "#94a3b8", fontSize: "14px", fontWeight: "700", cursor: "pointer" },
  modalExecuteBtn: { flex: 1, height: "46px", border: "none", borderRadius: "14px", color: "#ffffff", fontSize: "14px", fontWeight: "700", cursor: "pointer" },
  viewModalCard: { background: "#070b12", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "28px", padding: "40px", width: "100%", maxWidth: "520px", position: "relative" },
  profileSection: { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "32px" },
  avatarImageWrapper: { padding: "4px", borderRadius: "24px", background: "linear-gradient(135deg, #8b5cf6, #ec4899)", boxShadow: "0 0 25px rgba(139, 92, 246, 0.4)", marginBottom: "16px" },
  avatarImageLarge: { width: "84px", height: "84px", borderRadius: "20px", objectFit: "cover", display: "block" },
  avatarFallbackLarge: { width: "88px", height: "88px", borderRadius: "24px", background: "linear-gradient(135deg, #4f46e5, #8b5cf6)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", fontWeight: "800", marginBottom: "16px" },
  profileName: { fontSize: "22px", fontWeight: "800", color: "#ffffff", margin: 0 },
  profileRole: { fontSize: "14px", color: "#475569", margin: "6px 0 0 0", fontWeight: "700", letterSpacing: "0.3px" },
  detailsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" },
  detailCard: { background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(255, 255, 255, 0.03)", padding: "18px", borderRadius: "18px", display: "flex", gap: "14px", alignItems: "center" },
  detailLabel: { display: "block", color: "#475569", fontSize: "10px", fontWeight: "700", letterSpacing: "0.5px" },
  detailValue: { margin: "4px 0 0 0", color: "#ffffff", fontSize: "14px", fontWeight: "600", wordBreak: "break-all" }
};

export default StaffPage;