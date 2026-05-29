// src/pages/StaffPage.jsx

import { useState } from "react";

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
} from "react-icons/fa";

function StaffPage() {
  // SEARCH

  const [search, setSearch] =
    useState("");

  // ADD STAFF MODAL

  const [showModal, setShowModal] =
    useState(false);

  // VIEW STAFF

  const [selectedStaff, setSelectedStaff] =
    useState(null);

  // NEW STAFF

  const [newStaff, setNewStaff] =
    useState({
      name: "",
      role: "Cashier",
      email: "",
      phone: "",
      location: "",
      status: "Active",
    });

  // STAFF DATA

  const [staffs, setStaffs] =
    useState([
      {
        id: "EMP-1001",
        name: "Arun Kumar",
        role: "Manager",
        email:
          "arun@billflow.com",
        phone: "9876543210",
        location: "Chennai",
        status: "Active",
        joined: "12 Jan 2026",
      },

      {
        id: "EMP-1002",
        name: "Priya Sharma",
        role: "Cashier",
        email:
          "priya@billflow.com",
        phone: "9876501234",
        location: "Bangalore",
        status: "Active",
        joined: "18 Feb 2026",
      },

      {
        id: "EMP-1003",
        name: "Vignesh",
        role: "Accountant",
        email:
          "vignesh@billflow.com",
        phone: "9876549999",
        location: "Hyderabad",
        status: "Inactive",
        joined: "05 Mar 2026",
      },
    ]);

  // FILTER

  const filteredStaffs =
    staffs.filter((staff) =>
      staff.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // DELETE

  const deleteStaff = (id) => {
    setStaffs(
      staffs.filter(
        (staff) =>
          staff.id !== id
      )
    );
  };

  // CREATE STAFF

  const addStaff = () => {
    if (
      !newStaff.name ||
      !newStaff.email ||
      !newStaff.phone
    ) {
      alert("Fill all fields");
      return;
    }

    const staff = {
      id:
        "EMP-" +
        Math.floor(
          Math.random() * 10000
        ),

      name: newStaff.name,

      role: newStaff.role,

      email: newStaff.email,

      phone: newStaff.phone,

      location:
        newStaff.location,

      status: newStaff.status,

      joined:
        new Date().toLocaleDateString(),
    };

    setStaffs([
      staff,
      ...staffs,
    ]);

    setShowModal(false);

    setNewStaff({
      name: "",
      role: "Cashier",
      email: "",
      phone: "",
      location: "",
      status: "Active",
    });
  };

  return (
    <div style={styles.pageContainer}>
      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div style={styles.mainContent}>
        {/* HEADER */}

        <div style={styles.header}>
          <div>
            <h1 style={styles.heading}>
              Staff Management
            </h1>

            <p style={styles.subText}>
              Manage employees and
              staff information
            </p>
          </div>

          <button
            style={styles.addButton}
            onClick={() =>
              setShowModal(true)
            }
          >
            <FaUserPlus />
            Add Staff
          </button>
        </div>

        {/* STATS */}

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div
              style={
                styles.statIconBlue
              }
            >
              <FaUsers />
            </div>

            <h2
              style={
                styles.statValue
              }
            >
              {staffs.length}
            </h2>

            <p
              style={
                styles.statLabel
              }
            >
              Total Staff
            </p>
          </div>

          <div style={styles.statCard}>
            <div
              style={
                styles.statIconGreen
              }
            >
              <FaUserTie />
            </div>

            <h2
              style={
                styles.statValue
              }
            >
              {
                staffs.filter(
                  (s) =>
                    s.status ===
                    "Active"
                ).length
              }
            </h2>

            <p
              style={
                styles.statLabel
              }
            >
              Active Staff
            </p>
          </div>
        </div>

        {/* SEARCH */}

        <div
          style={styles.searchContainer}
        >
          <FaSearch
            style={styles.searchIcon}
          />

          <input
            type="text"
            placeholder="Search staff..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={styles.searchInput}
          />
        </div>

        {/* ADD STAFF MODAL */}

        {showModal && (
          <div
            style={
              styles.modalOverlay
            }
          >
            <div
              style={styles.modal}
            >
              <h2
                style={
                  styles.modalTitle
                }
              >
                Add Staff
              </h2>

              <input
                type="text"
                placeholder="Staff Name"
                value={newStaff.name}
                onChange={(e) =>
                  setNewStaff({
                    ...newStaff,

                    name:
                      e.target
                        .value,
                  })
                }
                style={
                  styles.modalInput
                }
              />

              <input
                type="email"
                placeholder="Email"
                value={newStaff.email}
                onChange={(e) =>
                  setNewStaff({
                    ...newStaff,

                    email:
                      e.target
                        .value,
                  })
                }
                style={
                  styles.modalInput
                }
              />

              <input
                type="number"
                placeholder="Phone"
                value={newStaff.phone}
                onChange={(e) =>
                  setNewStaff({
                    ...newStaff,

                    phone:
                      e.target
                        .value,
                  })
                }
                style={
                  styles.modalInput
                }
              />

              <input
                type="text"
                placeholder="Location"
                value={
                  newStaff.location
                }
                onChange={(e) =>
                  setNewStaff({
                    ...newStaff,

                    location:
                      e.target
                        .value,
                  })
                }
                style={
                  styles.modalInput
                }
              />

              <select
                value={newStaff.role}
                onChange={(e) =>
                  setNewStaff({
                    ...newStaff,

                    role:
                      e.target
                        .value,
                  })
                }
                style={
                  styles.modalInput
                }
              >
                <option>
                  Manager
                </option>

                <option>
                  Cashier
                </option>

                <option>
                  Accountant
                </option>
              </select>

              <select
                value={
                  newStaff.status
                }
                onChange={(e) =>
                  setNewStaff({
                    ...newStaff,

                    status:
                      e.target
                        .value,
                  })
                }
                style={
                  styles.modalInput
                }
              >
                <option>
                  Active
                </option>

                <option>
                  Inactive
                </option>
              </select>

              <div
                style={
                  styles.modalBtnContainer
                }
              >
                <button
                  style={
                    styles.cancelBtn
                  }
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                >
                  Cancel
                </button>

                <button
                  style={
                    styles.createBtn
                  }
                  onClick={addStaff}
                >
                  Add Staff
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW STAFF */}

        {selectedStaff && (
          <div
            style={
              styles.modalOverlay
            }
          >
            <div
              style={
                styles.viewModal
              }
            >
              {/* CLOSE */}

              <button
                style={
                  styles.closeBtn
                }
                onClick={() =>
                  setSelectedStaff(
                    null
                  )
                }
              >
                <FaTimes />
              </button>

              {/* PROFILE */}

              <div
                style={
                  styles.profileSection
                }
              >
                <div
                  style={
                    styles.avatar
                  }
                >
                  {
                    selectedStaff.name[0]
                  }
                </div>

                <h2
                  style={
                    styles.profileName
                  }
                >
                  {
                    selectedStaff.name
                  }
                </h2>

                <p
                  style={
                    styles.profileRole
                  }
                >
                  {
                    selectedStaff.role
                  }
                </p>
              </div>

              {/* DETAILS */}

              <div
                style={
                  styles.detailsGrid
                }
              >
                <div
                  style={
                    styles.detailCard
                  }
                >
                  <FaEnvelope />

                  <div>
                    <span>Email</span>

                    <h4>
                      {
                        selectedStaff.email
                      }
                    </h4>
                  </div>
                </div>

                <div
                  style={
                    styles.detailCard
                  }
                >
                  <FaPhoneAlt />

                  <div>
                    <span>Phone</span>

                    <h4>
                      {
                        selectedStaff.phone
                      }
                    </h4>
                  </div>
                </div>

                <div
                  style={
                    styles.detailCard
                  }
                >
                  <FaMapMarkerAlt />

                  <div>
                    <span>
                      Location
                    </span>

                    <h4>
                      {
                        selectedStaff.location
                      }
                    </h4>
                  </div>
                </div>

                <div
                  style={
                    styles.detailCard
                  }
                >
                  <FaUsers />

                  <div>
                    <span>Status</span>

                    <h4>
                      {
                        selectedStaff.status
                      }
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TABLE */}

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>
                  ID
                </th>

                <th style={styles.th}>
                  Name
                </th>

                <th style={styles.th}>
                  Role
                </th>

                <th style={styles.th}>
                  Email
                </th>

                <th style={styles.th}>
                  Status
                </th>

                <th style={styles.th}>
                  Joined
                </th>

                <th style={styles.th}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStaffs.map(
                (staff, index) => (
                  <tr
                    key={index}
                    style={styles.tr}
                  >
                    <td style={styles.td}>
                      {staff.id}
                    </td>

                    <td style={styles.td}>
                      {staff.name}
                    </td>

                    <td style={styles.td}>
                      {staff.role}
                    </td>

                    <td style={styles.td}>
                      {staff.email}
                    </td>

                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.status,

                          background:
                            staff.status ===
                            "Active"
                              ? "#dcfce7"
                              : "#fee2e2",

                          color:
                            staff.status ===
                            "Active"
                              ? "#166534"
                              : "#991b1b",
                        }}
                      >
                        {
                          staff.status
                        }
                      </span>
                    </td>

                    <td style={styles.td}>
                      {staff.joined}
                    </td>

                    <td style={styles.td}>
                      <div
                        style={
                          styles.actionContainer
                        }
                      >
                        <button
                          style={
                            styles.viewButton
                          }
                          onClick={() =>
                            setSelectedStaff(
                              staff
                            )
                          }
                        >
                          <FaEye />
                        </button>

                        <button
                          style={
                            styles.deleteButton
                          }
                          onClick={() =>
                            deleteStaff(
                              staff.id
                            )
                          }
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: "flex",
    minHeight: "100vh",
    background: "#f3f4f6",
  },

  mainContent: {
    flex: 1,
    padding: "30px",
    overflowX: "hidden",
  },

  header: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "30px",
  },

  heading: {
    fontSize: "40px",
    fontWeight: "800",
    color: "#111827",
  },

  subText: {
    color: "#6b7280",
    marginTop: "8px",
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
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  statCard: {
    background: "white",
    padding: "24px",
    borderRadius: "24px",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.05)",
  },

  statIconBlue: {
    width: "60px",
    height: "60px",
    borderRadius: "18px",
    background: "#eef2ff",
    color: "#4f46e5",
    display: "flex",
    justifyContent:
      "center",
    alignItems: "center",
    fontSize: "24px",
    marginBottom: "18px",
  },

  statIconGreen: {
    width: "60px",
    height: "60px",
    borderRadius: "18px",
    background: "#dcfce7",
    color: "#16a34a",
    display: "flex",
    justifyContent:
      "center",
    alignItems: "center",
    fontSize: "24px",
    marginBottom: "18px",
  },

  statValue: {
    fontSize: "34px",
    fontWeight: "800",
    color: "#111827",
  },

  statLabel: {
    marginTop: "8px",
    color: "#6b7280",
  },

  searchContainer: {
    background: "white",
    borderRadius: "16px",
    padding: "14px 18px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "30px",
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.05)",
  },

  searchIcon: {
    color: "#6b7280",
  },

  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "15px",
  },

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
    background: "white",
    borderRadius: "24px",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.05)",
  },

  table: {
    width: "100%",
    minWidth: "1000px",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "18px",
    background: "#f9fafb",
    color: "#374151",
  },

  tr: {
    borderBottom:
      "1px solid #e5e7eb",
  },

  td: {
    padding: "18px",
    color: "#111827",
    fontWeight: "500",
  },

  status: {
    padding: "8px 14px",
    borderRadius: "30px",
    fontSize: "13px",
    fontWeight: "700",
  },

  actionContainer: {
    display: "flex",
    gap: "10px",
  },

  viewButton: {
    border: "none",
    background: "#e0e7ff",
    color: "#4f46e5",
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    cursor: "pointer",
  },

  deleteButton: {
    border: "none",
    background: "#fee2e2",
    color: "#dc2626",
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    cursor: "pointer",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "rgba(0,0,0,0.5)",

    display: "flex",
    justifyContent:
      "center",
    alignItems: "center",

    zIndex: 1000,
    padding: "20px",
    boxSizing: "border-box",
  },

  modal: {
    width: "100%",
    maxWidth: "450px",
    background: "white",
    borderRadius: "28px",
    padding: "30px",
  },

  modalTitle: {
    fontSize: "28px",
    fontWeight: "800",
    marginBottom: "20px",
  },

  modalInput: {
    width: "100%",
    padding: "14px",
    border:
      "1px solid #d1d5db",
    borderRadius: "12px",
    marginBottom: "16px",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  modalBtnContainer: {
    display: "flex",
    justifyContent:
      "flex-end",
    gap: "12px",
    marginTop: "10px",
  },

  cancelBtn: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    background: "#e5e7eb",
    cursor: "pointer",
    fontWeight: "600",
  },

  createBtn: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    background: "#4f46e5",
    color: "white",
    cursor: "pointer",
    fontWeight: "700",
  },

  viewModal: {
    width: "100%",
    maxWidth: "550px",
    background: "white",
    borderRadius: "30px",
    padding: "35px",
    position: "relative",
    boxShadow:
      "0 20px 40px rgba(0,0,0,0.2)",
  },

  closeBtn: {
    position: "absolute",
    top: "18px",
    right: "18px",
    border: "none",
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    background: "#f3f4f6",
    cursor: "pointer",
  },

  profileSection: {
    textAlign: "center",
    marginBottom: "30px",
  },

  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background:
      "linear-gradient(to right,#4f46e5,#7c3aed)",
    color: "white",
    fontSize: "34px",
    fontWeight: "800",
    display: "flex",
    justifyContent:
      "center",
    alignItems: "center",
    margin:
      "0 auto 20px auto",
  },

  profileName: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#111827",
  },

  profileRole: {
    color: "#6b7280",
    marginTop: "6px",
    fontSize: "16px",
  },

  detailsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "18px",
  },

  detailCard: {
    background: "#f9fafb",
    borderRadius: "20px",
    padding: "18px",
    display: "flex",
    gap: "14px",
    alignItems: "center",
    color: "#4f46e5",
  },
};

export default StaffPage;