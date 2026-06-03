// src/pages/StaffPage.jsx
import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
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
} from "react-icons/fa";

// DEFAULT MOCK DATA
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
  },
];

function StaffPage() {
  // CORE STATE PERSISTENCE
  const [staffs, setStaffs] = useState(() => {
    const savedStaff = localStorage.getItem("billflow_staff_data");
    return savedStaff ? JSON.parse(savedStaff) : INITIAL_STAFF;
  });

  // Sync state to local storage when changed
  useEffect(() => {
    localStorage.setItem("billflow_staff_data", JSON.stringify(staffs));
  }, [staffs]);

  // FILTERS & SEARCH STATE
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // MODALS CONTROL STATE
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // MANAGE FORM STATE (Handles both Create and Update operations)
  const [staffForm, setStaffForm] = useState({
    id: "",
    name: "",
    role: "Cashier",
    email: "",
    phone: "",
    location: "",
    status: "Active",
  });

  // ADVANCED MATRIX FILTERING (Search + Dropdowns)
  const filteredStaffs = staffs.filter((staff) => {
    const matchesName = staff.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || staff.role === roleFilter;
    const matchesStatus = statusFilter === "All" || staff.status === statusFilter;
    return matchesName && matchesRole && matchesStatus;
  });

  // DELETE HANDLER
  const deleteStaff = (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      setStaffs(staffs.filter((staff) => staff.id !== id));
      if (selectedStaff && selectedStaff.id === id) {
        setSelectedStaff(null);
      }
    }
  };

  // TRIGGER CREATE MODE
  const openCreateModal = () => {
    setIsEditing(false);
    setStaffForm({
      id: "",
      name: "",
      role: "Cashier",
      email: "",
      phone: "",
      location: "",
      status: "Active",
    });
    setShowModal(true);
  };

  // TRIGGER EDIT MODE
  const openEditModal = (staff, e) => {
    e.stopPropagation(); // Avoid triggering any background selectors
    setIsEditing(true);
    setStaffForm({ ...staff });
    setShowModal(true);
  };

  // SUBMIT HANDLER FOR FORM (Create / Edit)
  const handleFormSubmit = () => {
    if (!staffForm.name || !staffForm.email || !staffForm.phone) {
      alert("Please fill in all the required fields.");
      return;
    }

    if (isEditing) {
      // Update logic
      setStaffs(
        staffs.map((item) => (item.id === staffForm.id ? { ...staffForm } : item))
      );
      // Synchronize live View Details modal if open
      if (selectedStaff && selectedStaff.id === staffForm.id) {
        setSelectedStaff({ ...staffForm });
      }
    } else {
      // Create logic
      const uniqueId = "EMP-" + Math.floor(1000 + Math.random() * 9000);
      const newStaffEntry = {
        ...staffForm,
        id: uniqueId,
        joined: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };
      setStaffs([newStaffEntry, ...staffs]);
    }

    setShowModal(false);
  };

  // DYNAMIC COUNTS FOR LIVE INTERACTIVE DISTRIBUTION GRAPH
  const getRoleCount = (role) => staffs.filter((s) => s.role === role).length;
  const managerCount = getRoleCount("Manager");
  const cashierCount = getRoleCount("Cashier");
  const accountantCount = getRoleCount("Accountant");
  const maxRoleCount = Math.max(managerCount, cashierCount, accountantCount, 1);

  const managerWidth = (managerCount / maxRoleCount) * 100;
  const cashierWidth = (cashierCount / maxRoleCount) * 100;
  const accountantWidth = (accountantCount / maxRoleCount) * 100;

  return (
    <div style={styles.pageContainer}>
      {/* HIGH-DENSITY ANIMATION AND INTERACTIVE GLOW STYLES */}
      <style>{`
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translate3d(0, 30px, 0) scale(0.98); }
          to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes backdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fillRowBar {
          from { width: 0%; }
        }
        
        .premium-glow-trigger {
          position: relative;
          z-index: 1;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .premium-glow-trigger:hover {
          transform: translate3d(0, -3px, 0) !important;
          box-shadow: 
            0 0 0 2px rgba(255, 255, 255, 0.2),
            0 10px 25px rgba(79, 70, 229, 0.45) !important;
        }

        .stat-card-glow {
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .total-staff-card { box-shadow: 0 4px 20px -2px rgba(79, 70, 229, 0.06) !important; }
        .total-staff-card:hover {
          transform: translate3d(0, -6px, 0);
          border-color: rgba(79, 70, 229, 0.3) !important;
          box-shadow: 0 12px 24px -4px rgba(79, 70, 229, 0.12), 0 24px 48px -8px rgba(79, 70, 229, 0.24) !important;
        }

        .active-staff-card { box-shadow: 0 4px 20px -2px rgba(22, 163, 74, 0.06) !important; }
        .active-staff-card:hover {
          transform: translate3d(0, -6px, 0);
          border-color: rgba(22, 163, 74, 0.3) !important;
          box-shadow: 0 12px 24px -4px rgba(22, 163, 74, 0.12), 0 24px 48px -8px rgba(22, 163, 74, 0.24) !important;
        }

        .table-row-hover-effect { transition: background 0.25s ease; }
        .table-row-hover-effect:hover { background: #f8fafc !important; }

        .btn-interact-node {
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .btn-interact-node:hover { transform: translate3d(0, -3px, 0) scale(1.08); }
        
        .action-view-glow:hover {
          background: #4f46e5 !important;
          color: #ffffff !important;
          box-shadow: 0 6px 16px rgba(79, 70, 229, 0.4) !important;
        }
        .action-edit-glow:hover {
          background: #d97706 !important;
          color: #ffffff !important;
          box-shadow: 0 6px 16px rgba(217, 119, 6, 0.4) !important;
        }
        .action-delete-glow:hover {
          background: #dc2626 !important;
          color: #ffffff !important;
          box-shadow: 0 6px 16px rgba(220, 38, 38, 0.4) !important;
        }

        .chart-row-fill {
          animation: fillRowBar 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTAINER */}
      <div style={styles.mainContent}>
        
        {/* HEADER SECTION */}
        <div style={styles.header}>
          <div style={{ position: "relative", zIndex: 2 }}>
            <h1 style={styles.heading}>Staff Management</h1>
            <p style={styles.subText}>
              Manage employees, roles, filters and profile details safely stored in local cache.
            </p>
          </div>

          <button className="premium-glow-trigger" style={styles.addButton} onClick={openCreateModal}>
            <FaUserPlus />
            Add Staff
          </button>
          
          <div style={{ position: "absolute", top: "-50px", right: "-30px", width: "200px", height: "200px", background: "rgba(255,255,255,0.07)", borderRadius: "50%" }}></div>
          <div style={{ position: "absolute", bottom: "-40px", right: "140px", width: "120px", height: "120px", background: "rgba(255,255,255,0.04)", borderRadius: "50%" }}></div>
        </div>

        {/* METRICS & LIVESTREAM SPLIT BLOCK CONTAINER */}
        <div style={styles.dashboardTopSection}>
          
          {/* STATS CARDS COLUMN */}
          <div style={styles.statsColumn}>
            <div className="stat-card-glow total-staff-card" style={styles.statCard}>
              <div style={styles.statIconBlue}>
                <FaUsers />
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.statMiniFlex}>
                  <p style={styles.statMiniLabel}>Total Headcount</p>
                  <span style={styles.liveTag}><FaArrowUp size={9} /> Live</span>
                </div>
                <h2 style={styles.statValue}>{staffs.length}</h2>
              </div>
            </div>

            <div className="stat-card-glow active-staff-card" style={styles.statCard}>
              <div style={styles.statIconGreen}>
                <FaUserTie />
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.statMiniFlex}>
                  <p style={styles.statMiniLabel}>Active Deployments</p>
                  <span style={styles.activeTagBadge}>System OK</span>
                </div>
                <h2 style={styles.statValue}>
                  {staffs.filter((s) => s.status === "Active").length}
                </h2>
              </div>
            </div>
          </div>

          {/* DYNAMIC REALTIME HORIZONTAL DISTRIBUTION GRAPH */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <div style={styles.chartHeaderIcon}>
                <FaChartPie />
              </div>
              <div>
                <h3 style={styles.chartTitle}>Role Distribution</h3>
                <p style={styles.chartSubtitle}>Internal operational allocation chart</p>
              </div>
            </div>

            <div style={styles.chartContainer}>
              {/* Manager Progress */}
              <div style={styles.chartRowLayout}>
                <div style={styles.chartLabelMeta}>
                  <span style={styles.chartLabelText}>Managers</span>
                  <span style={styles.chartValueLabel}>{managerCount}</span>
                </div>
                <div style={styles.chartTrack}>
                  <div 
                    className="chart-row-fill" 
                    style={{ ...styles.chartBarFilled, width: `${managerWidth}%`, background: "linear-gradient(to right, #4f46e5, #818cf8)" }}
                  />
                </div>
              </div>

              {/* Cashier Progress */}
              <div style={styles.chartRowLayout}>
                <div style={styles.chartLabelMeta}>
                  <span style={styles.chartLabelText}>Cashiers</span>
                  <span style={styles.chartValueLabel}>{cashierCount}</span>
                </div>
                <div style={styles.chartTrack}>
                  <div 
                    className="chart-row-fill" 
                    style={{ ...styles.chartBarFilled, width: `${cashierWidth}%`, background: "linear-gradient(to right, #134e4a, #2dd4bf)" }}
                  />
                </div>
              </div>

              {/* Accountant Progress */}
              <div style={styles.chartRowLayout}>
                <div style={styles.chartLabelMeta}>
                  <span style={styles.chartLabelText}>Accountants</span>
                  <span style={styles.chartValueLabel}>{accountantCount}</span>
                </div>
                <div style={styles.chartTrack}>
                  <div 
                    className="chart-row-fill" 
                    style={{ ...styles.chartBarFilled, width: `${accountantWidth}%`, background: "linear-gradient(to right, #b45309, #fbbf24)" }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* CONTROLS BAR (SEARCH AND ADVANCED FILTERS) */}
        <div style={styles.controlsRow}>
          <div style={styles.searchContainer}>
            <FaSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search staff profiles by name lookup..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.filtersGroup}>
            <div style={styles.filterBox}>
              <FaFilter style={styles.filterIcon} />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                style={styles.filterSelect}
              >
                <option value="All">All Roles</option>
                <option value="Manager">Manager</option>
                <option value="Cashier">Cashier</option>
                <option value="Accountant">Accountant</option>
              </select>
            </div>

            <div style={styles.filterBox}>
              <FaFilter style={styles.filterIcon} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={styles.filterSelect}
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* MANAGE / FORM MODAL (Add & Edit Wrapper) */}
        {showModal && (
          <div style={{ ...styles.modalOverlay, animation: "backdropFade 0.2s ease forwards" }}>
            <div style={{ ...styles.modal, animation: "modalSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}>
              <h2 style={styles.modalTitle}>
                {isEditing ? "Modify Staff Details" : "Add New Staff"}
              </h2>

              <label style={styles.fieldLabel}>Staff Full Name *</label>
              <input
                type="text"
                placeholder="Ex: Arun Kumar"
                value={staffForm.name}
                onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                style={styles.modalInput}
              />

              <label style={styles.fieldLabel}>Email Address *</label>
              <input
                type="email"
                placeholder="name@billflow.com"
                value={staffForm.email}
                onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                style={styles.modalInput}
              />

              <label style={styles.fieldLabel}>Phone Number *</label>
              <input
                type="text"
                placeholder="Primary contact number"
                value={staffForm.phone}
                onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                style={styles.modalInput}
              />

              <label style={styles.fieldLabel}>Work Location</label>
              <input
                type="text"
                placeholder="City office branch"
                value={staffForm.location}
                onChange={(e) => setStaffForm({ ...staffForm, location: e.target.value })}
                style={styles.modalInput}
              />

              <label style={styles.fieldLabel}>Assigned Corporate Role</label>
              <select
                value={staffForm.role}
                onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
                style={styles.modalInput}
              >
                <option value="Manager">Manager</option>
                <option value="Cashier">Cashier</option>
                <option value="Accountant">Accountant</option>
              </select>

              <label style={styles.fieldLabel}>Account Deployment Status</label>
              <select
                value={staffForm.status}
                onChange={(e) => setStaffForm({ ...staffForm, status: e.target.value })}
                style={styles.modalInput}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <div style={styles.modalBtnContainer}>
                <button style={styles.cancelBtn} onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="premium-glow-trigger" style={styles.createBtn} onClick={handleFormSubmit}>
                  {isEditing ? "Save Changes" : "Create Profile"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW DETAILS MODAL */}
        {selectedStaff && (
          <div style={{ ...styles.modalOverlay, animation: "backdropFade 0.2s ease forwards" }}>
            <div style={{ ...styles.viewModal, animation: "modalSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}>
              <button style={styles.closeBtn} onClick={() => setSelectedStaff(null)}>
                <FaTimes />
              </button>

              <div style={styles.profileSection}>
                <div style={styles.avatar}>
                  {selectedStaff.name ? selectedStaff.name[0].toUpperCase() : "?"}
                </div>
                <h2 style={styles.profileName}>{selectedStaff.name}</h2>
                <p style={styles.profileRole}>{selectedStaff.role} • {selectedStaff.id}</p>
              </div>

              <div style={styles.detailsGrid}>
                <div style={styles.detailCard}>
                  <FaEnvelope style={{ flexShrink: 0 }} />
                  <div>
                    <span style={styles.detailLabel}>Email</span>
                    <h4 style={styles.detailValue}>{selectedStaff.email}</h4>
                  </div>
                </div>

                <div style={styles.detailCard}>
                  <FaPhoneAlt style={{ flexShrink: 0 }} />
                  <div>
                    <span style={styles.detailLabel}>Phone</span>
                    <h4 style={styles.detailValue}>{selectedStaff.phone}</h4>
                  </div>
                </div>

                <div style={styles.detailCard}>
                  <FaMapMarkerAlt style={{ flexShrink: 0 }} />
                  <div>
                    <span style={styles.detailLabel}>Location</span>
                    <h4 style={styles.detailValue}>{selectedStaff.location || "N/A"}</h4>
                  </div>
                </div>

                <div style={styles.detailCard}>
                  <FaUsers style={{ flexShrink: 0 }} />
                  <div>
                    <span style={styles.detailLabel}>Status Matrix</span>
                    <h4 style={styles.detailValue}>{selectedStaff.status}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DATA TABLE VIEW */}
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Joined</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStaffs.length > 0 ? (
                filteredStaffs.map((staff) => (
                  <tr key={staff.id} className="table-row-hover-effect" style={styles.tr}>
                    <td style={{ ...styles.td, color: "#4f46e5", fontWeight: "700" }}>{staff.id}</td>
                    <td style={{ ...styles.td, fontWeight: "600", color: "#0f172a" }}>{staff.name}</td>
                    <td style={styles.td}>
                      <span style={{ ...styles.roleBadge, background: staff.role === "Manager" ? "#e0f2fe" : staff.role === "Accountant" ? "#fef3c7" : "#f1f5f9", color: staff.role === "Manager" ? "#0369a1" : staff.role === "Accountant" ? "#b45309" : "#475569" }}>
                        {staff.role}
                      </span>
                    </td>
                    <td style={{ ...styles.td, color: "#475569" }}>{staff.email}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.status,
                          background: staff.status === "Active" ? "#dcfce7" : "#fee2e2",
                          color: staff.status === "Active" ? "#166534" : "#991b1b",
                        }}
                      >
                        {staff.status}
                      </span>
                    </td>
                    <td style={{ ...styles.td, color: "#64748b" }}>{staff.joined}</td>
                    <td style={styles.td}>
                      <div style={styles.actionContainer}>
                        <button
                          className="btn-interact-node action-view-glow"
                          style={styles.viewButton}
                          title="View Details"
                          onClick={() => setSelectedStaff(staff)}
                        >
                          <FaEye />
                        </button>
                        <button
                          className="btn-interact-node action-edit-glow"
                          style={styles.editButton}
                          title="Edit Profile"
                          onClick={(e) => openEditModal(staff, e)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn-interact-node action-delete-glow"
                          style={styles.deleteButton}
                          title="Remove Staff"
                          onClick={() => deleteStaff(staff.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={styles.emptyRowText}>
                    No records matched your specific search filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// MODERNIZED UI INLINE STYLES SHEET
const styles = {
  pageContainer: {
    display: "flex",
    height: "100vh",
    background: "#f8fafc",
    overflow: "hidden",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  mainContent: {
    flex: 1,
    height: "100vh",
    padding: "40px 30px",
    overflowY: "auto",
    overflowX: "hidden",
    boxSizing: "border-box",
  },
  header: {
    position: "relative",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    padding: "36px 40px",
    borderRadius: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "32px",
    boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.25)",
    overflow: "hidden",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#ffffff",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  subText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: "15px",
    margin: 0,
    marginTop: "6px",
    fontWeight: "500",
  },
  addButton: {
    border: "none",
    background: "#ffffff",
    color: "#4f46e5",
    padding: "14px 24px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  },
  dashboardTopSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "32px",
    marginBottom: "32px",
    alignItems: "stretch",
  },
  statsColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    justifyContent: "space-between",
  },
  statCard: {
    background: "#ffffff",
    padding: "24px",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    cursor: "pointer",
    flex: 1,
  },
  statMiniFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  liveTag: {
    background: "#dcfce7",
    color: "#15803d",
    fontSize: "11px",
    fontWeight: "700",
    padding: "2px 8px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  activeTagBadge: {
    background: "#f1f5f9",
    color: "#475569",
    fontSize: "11px",
    fontWeight: "700",
    padding: "2px 8px",
    borderRadius: "6px",
  },
  statIconBlue: {
    width: "54px",
    height: "54px",
    borderRadius: "14px",
    background: "rgba(79, 70, 229, 0.08)",
    color: "#4f46e5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
    flexShrink: 0,
  },
  statIconGreen: {
    width: "54px",
    height: "54px",
    borderRadius: "14px",
    background: "rgba(22, 163, 74, 0.08)",
    color: "#16a34a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
    flexShrink: 0,
  },
  statValue: {
    fontSize: "30px",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
    letterSpacing: "-0.01em",
    marginTop: "2px",
  },
  statMiniLabel: {
    color: "#64748b",
    margin: 0,
    fontSize: "13px",
    fontWeight: "600",
  },
  chartCard: {
    background: "#ffffff",
    borderRadius: "24px",
    border: "1px solid #e2e8f0",
    padding: "28px",
    boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.02)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  chartHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "16px",
  },
  chartHeaderIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "#faf5ff",
    color: "#a855f7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  },
  chartTitle: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
  },
  chartSubtitle: {
    fontSize: "13px",
    color: "#64748b",
    margin: 0,
    marginTop: "2px",
    fontWeight: "500",
  },
  chartContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    justifyContent: "center",
    flex: 1,
  },
  chartRowLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  chartLabelMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chartLabelText: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#475569",
  },
  chartValueLabel: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#1e293b",
  },
  chartTrack: {
    width: "100%",
    height: "10px",
    background: "#f1f5f9",
    borderRadius: "30px",
    overflow: "hidden",
  },
  chartBarFilled: {
    height: "100%",
    borderRadius: "30px",
  },
  controlsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "32px",
  },
  searchContainer: {
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    padding: "14px 20px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: "1",
    minWidth: "280px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
  },
  searchIcon: {
    color: "#94a3b8",
    fontSize: "16px",
  },
  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "15px",
    color: "#0f172a",
    fontWeight: "500",
  },
  filtersGroup: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  filterBox: {
    background: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
  },
  filterIcon: {
    color: "#94a3b8",
    fontSize: "13px",
  },
  filterSelect: {
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "14px",
    fontWeight: "700",
    color: "#475569",
    cursor: "pointer",
  },
  tableWrapper: {
    width: "100%",
    overflowX: "auto",
    background: "#ffffff",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
  },
  table: {
    width: "100%",
    minWidth: "900px",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "16px 20px",
    background: "#f8fafc",
    color: "#475569",
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.03em",
    borderBottom: "1px solid #e2e8f0",
  },
  tr: {
    borderBottom: "1px solid #f1f5f9",
  },
  td: {
    padding: "18px 20px",
    color: "#334155",
    fontSize: "15px",
    verticalAlign: "middle",
  },
  roleBadge: {
    padding: "4px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "700",
  },
  status: {
    padding: "6px 12px",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: "700",
  },
  actionContainer: {
    display: "flex",
    gap: "8px",
  },
  viewButton: {
    border: "none",
    background: "#f1f5f9",
    color: "#4f46e5",
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },
  editButton: {
    border: "none",
    background: "#fffbeb",
    color: "#d97706",
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },
  deleteButton: {
    border: "none",
    background: "#fff1f2",
    color: "#dc2626",
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },
  emptyRowText: {
    padding: "40px",
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "16px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(15, 23, 42, 0.3)",
    backdropFilter: "blur(6px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "20px",
    boxSizing: "border-box",
  },
  modal: {
    width: "100%",
    maxWidth: "460px",
    background: "#ffffff",
    borderRadius: "24px",
    padding: "36px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
    boxSizing: "border-box",
  },
  modalTitle: {
    fontSize: "24px",
    fontWeight: "800",
    marginBottom: "24px",
    color: "#0f172a",
    margin: 0,
    letterSpacing: "-0.01em",
  },
  fieldLabel: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569",
    marginBottom: "8px",
    letterSpacing: "0.01em",
  },
  modalInput: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    marginBottom: "20px",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
    background: "#f8fafc",
    color: "#0f172a",
    fontWeight: "500",
  },
  modalBtnContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "8px",
  },
  cancelBtn: {
    padding: "14px 22px",
    border: "none",
    borderRadius: "12px",
    background: "#f1f5f9",
    cursor: "pointer",
    fontWeight: "600",
    color: "#475569",
    fontSize: "15px",
  },
  createBtn: {
    padding: "14px 24px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "white",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
    boxShadow: "0 4px 14px rgba(79, 70, 229, 0.35)",
  },
  viewModal: {
    width: "100%",
    maxWidth: "520px",
    background: "#ffffff",
    padding: "36px",
    borderRadius: "28px",
    position: "relative",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)",
    boxSizing: "border-box",
  },
  closeBtn: {
    position: "absolute",
    top: "20px",
    right: "20px",
    border: "none",
    background: "#f1f5f9",
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#475569",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  },
  profileSection: {
    textAlign: "center",
    marginBottom: "28px",
  },
  avatar: {
    width: "84px",
    height: "84px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "white",
    fontSize: "32px",
    fontWeight: "800",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 16px auto",
    boxShadow: "0 8px 20px rgba(79, 70, 229, 0.2)",
  },
  profileName: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
    letterSpacing: "-0.01em",
  },
  profileRole: {
    color: "#64748b",
    marginTop: "6px",
    fontSize: "14px",
    margin: 0,
    fontWeight: "500",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
  },
  detailCard: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    gap: "14px",
    alignItems: "center",
    color: "#4f46e5",
  },
  detailLabel: {
    display: "block",
    fontSize: "11px",
    color: "#64748b",
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: "0.02em",
    marginBottom: "2px",
  },
  detailValue: {
    margin: 0,
    color: "#0f172a",
    fontSize: "14px",
    fontWeight: "700",
    wordBreak: "break-all",
  },
};

export default StaffPage;