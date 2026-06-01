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

  return (
    <div style={styles.pageContainer}>
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTAINER */}
      <div style={styles.mainContent}>
        
        {/* HEADER SECTION */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.heading}>Staff Management</h1>
            <p style={styles.subText}>
              Manage employees, roles, filters and profile details safely stored in local cache.
            </p>
          </div>

          <button style={styles.addButton} onClick={openCreateModal}>
            <FaUserPlus />
            Add Staff
          </button>
        </div>

        {/* METRICS / STATS CARDS */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIconBlue}>
              <FaUsers />
            </div>
            <h2 style={styles.statValue}>{staffs.length}</h2>
            <p style={styles.statLabel}>Total Staff</p>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIconGreen}>
              <FaUserTie />
            </div>
            <h2 style={styles.statValue}>
              {staffs.filter((s) => s.status === "Active").length}
            </h2>
            <p style={styles.statLabel}>Active Staff</p>
          </div>
        </div>

        {/* CONTROLS BAR (SEARCH AND ADVANCED FILTERS) */}
        <div style={styles.controlsRow}>
          <div style={styles.searchContainer}>
            <FaSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search staff by name..."
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
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
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
                <button style={styles.createBtn} onClick={handleFormSubmit}>
                  {isEditing ? "Save Changes" : "Create Profile"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW DETAILS MODAL */}
        {selectedStaff && (
          <div style={styles.modalOverlay}>
            <div style={styles.viewModal}>
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
                  <FaEnvelope />
                  <div>
                    <span style={styles.detailLabel}>Email</span>
                    <h4 style={styles.detailValue}>{selectedStaff.email}</h4>
                  </div>
                </div>

                <div style={styles.detailCard}>
                  <FaPhoneAlt />
                  <div>
                    <span style={styles.detailLabel}>Phone</span>
                    <h4 style={styles.detailValue}>{selectedStaff.phone}</h4>
                  </div>
                </div>

                <div style={styles.detailCard}>
                  <FaMapMarkerAlt />
                  <div>
                    <span style={styles.detailLabel}>Location</span>
                    <h4 style={styles.detailValue}>{selectedStaff.location || "N/A"}</h4>
                  </div>
                </div>

                <div style={styles.detailCard}>
                  <FaUsers />
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
                  <tr key={staff.id} style={styles.tr}>
                    <td style={styles.td}>{staff.id}</td>
                    <td style={styles.td}>{staff.name}</td>
                    <td style={styles.td}>{staff.role}</td>
                    <td style={styles.td}>{staff.email}</td>
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
                    <td style={styles.td}>{staff.joined}</td>
                    <td style={styles.td}>
                      <div style={styles.actionContainer}>
                        <button
                          style={styles.viewButton}
                          title="View Details"
                          onClick={() => setSelectedStaff(staff)}
                        >
                          <FaEye />
                        </button>
                        <button
                          style={styles.editButton}
                          title="Edit Profile"
                          onClick={(e) => openEditModal(staff, e)}
                        >
                          <FaEdit />
                        </button>
                        <button
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
    minHeight: "100vh",
    background: "#f3f4f6",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  mainContent: {
    flex: 1,
    padding: "30px",
    overflowX: "hidden",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "30px",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#111827",
    margin: 0,
  },
  subText: {
    color: "#6b7280",
    marginTop: "6px",
    marginBottom: 0,
  },
  addButton: {
    border: "none",
    background: "#4f46e5",
    color: "white",
    padding: "14px 22px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "background 0.2s",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  statCard: {
    background: "white",
    padding: "24px",
    borderRadius: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
  },
  statIconBlue: {
    width: "50px",
    height: "50px",
    borderRadius: "14px",
    background: "#eef2ff",
    color: "#4f46e5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    marginBottom: "14px",
  },
  statIconGreen: {
    width: "50px",
    height: "50px",
    borderRadius: "14px",
    background: "#dcfce7",
    color: "#16a34a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    marginBottom: "14px",
  },
  statValue: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#111827",
    margin: 0,
  },
  statLabel: {
    marginTop: "6px",
    marginBottom: 0,
    color: "#6b7280",
    fontSize: "14px",
  },
  controlsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "24px",
  },
  searchContainer: {
    background: "white",
    borderRadius: "16px",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: "1",
    minWidth: "280px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.02)",
  },
  searchIcon: {
    color: "#9ca3af",
  },
  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "15px",
    color: "#111827",
  },
  filtersGroup: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  filterBox: {
    background: "white",
    borderRadius: "14px",
    padding: "10px 14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.02)",
  },
  filterIcon: {
    color: "#9ca3af",
    fontSize: "13px",
  },
  filterSelect: {
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "14px",
    fontWeight: "600",
    color: "#4b5563",
    cursor: "pointer",
  },
  tableWrapper: {
    width: "100%",
    overflowX: "auto",
    background: "white",
    borderRadius: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
  },
  table: {
    width: "100%",
    minWidth: "900px",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "16px 20px",
    background: "#f9fafb",
    color: "#4b5563",
    fontWeight: "700",
    fontSize: "14px",
    borderBottom: "1px solid #f3f4f6",
  },
  tr: {
    borderBottom: "1px solid #f3f4f6",
    transition: "background 0.15s",
  },
  td: {
    padding: "16px 20px",
    color: "#111827",
    fontWeight: "500",
    fontSize: "15px",
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
    background: "#e0e7ff",
    color: "#4f46e5",
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    border: "none",
    background: "#fef3c7",
    color: "#d97706",
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    border: "none",
    background: "#fee2e2",
    color: "#dc2626",
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyRowText: {
    padding: "40px",
    textAlign: "center",
    color: "#9ca3af",
    fontSize: "16px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(17, 24, 39, 0.6)",
    backdropFilter: "blur(4px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "20px",
  },
  modal: {
    width: "100%",
    maxWidth: "460px",
    background: "white",
    borderRadius: "24px",
    padding: "28px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  },
  modalTitle: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "20px",
    marginTop: 0,
  },
  fieldLabel: {
    display: "block",
    fontSize: "13px",
    fontWeight: "700",
    color: "#4b5563",
    marginBottom: "6px",
  },
  modalInput: {
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    marginBottom: "16px",
    outline: "none",
    fontSize: "15px",
    color: "#111827",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  modalBtnContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "8px",
  },
  cancelBtn: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    background: "#e5e7eb",
    color: "#4b5563",
    cursor: "pointer",
    fontWeight: "600",
  },
  createBtn: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    background: "#4f46e5",
    color: "white",
    cursor: "pointer",
    fontWeight: "700",
  },
  viewModal: {
    width: "100%",
    maxWidth: "500px",
    background: "white",
    borderRadius: "24px",
    padding: "32px",
    position: "relative",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
  closeBtn: {
    position: "absolute",
    top: "20px",
    right: "20px",
    border: "none",
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: "#f3f4f6",
    color: "#4b5563",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profileSection: {
    textAlign: "center",
    marginBottom: "24px",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "white",
    fontSize: "30px",
    fontWeight: "800",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 16px auto",
  },
  profileName: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#111827",
    margin: 0,
  },
  profileRole: {
    color: "#6b7280",
    marginTop: "4px",
    fontSize: "14px",
    margin: 0,
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "14px",
  },
  detailCard: {
    background: "#f9fafb",
    borderRadius: "16px",
    padding: "14px 16px",
    display: "flex",
    gap: "12px",
    alignItems: "center",
    color: "#4f46e5",
  },
  detailLabel: {
    display: "block",
    fontSize: "11px",
    color: "#6b7280",
    textTransform: "uppercase",
    fontWeight: "600",
  },
  detailValue: {
    margin: 0,
    color: "#111827",
    fontSize: "14px",
    fontWeight: "600",
    wordBreak: "break-all",
  },
};

export default StaffPage;

