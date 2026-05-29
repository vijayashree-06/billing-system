// src/pages/InvoicesPage.jsx

import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";

import {
  FaSearch,
  FaFileInvoiceDollar,
  FaDownload,
  FaEye,
  FaTrash,
  FaPlus,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

function InvoicesPage() {
  // SEARCH

  const [search, setSearch] =
    useState("");

  // MODAL

  const [showModal, setShowModal] =
    useState(false);

  // NEW INVOICE

  const [newInvoice, setNewInvoice] =
    useState({
      customer: "",
      amount: "",
      status: "Pending",
    });

  // INVOICES

  const [invoices, setInvoices] =
    useState([
      {
        id: "INV-1001",
        customer: "Arun Kumar",
        amount: "₹12,500",
        status: "Paid",
        date: "12 May 2026",
      },

      {
        id: "INV-1002",
        customer: "Priya Stores",
        amount: "₹8,200",
        status: "Pending",
        date: "15 May 2026",
      },

      {
        id: "INV-1003",
        customer:
          "Vijay Enterprises",
        amount: "₹22,400",
        status: "Paid",
        date: "18 May 2026",
      },

      {
        id: "INV-1004",
        customer:
          "Kavin Traders",
        amount: "₹6,750",
        status: "Pending",
        date: "20 May 2026",
      },
    ]);

  // FILTER

  const filteredInvoices =
    invoices.filter((invoice) =>
      invoice.customer
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // DELETE

  const deleteInvoice = (id) => {
    setInvoices(
      invoices.filter(
        (invoice) =>
          invoice.id !== id
      )
    );
  };

  // CREATE

  const createInvoice = () => {
    if (
      !newInvoice.customer ||
      !newInvoice.amount
    ) {
      alert("Fill all fields");
      return;
    }

    const invoice = {
      id:
        "INV-" +
        Math.floor(
          Math.random() * 10000
        ),

      customer:
        newInvoice.customer,

      amount:
        "₹" +
        newInvoice.amount,

      status:
        newInvoice.status,

      date:
        new Date().toLocaleDateString(),
    };

    setInvoices([
      invoice,
      ...invoices,
    ]);

    setShowModal(false);

    setNewInvoice({
      customer: "",
      amount: "",
      status: "Pending",
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
              Invoices
            </h1>

            <p style={styles.subText}>
              Manage and track all
              invoices efficiently
            </p>
          </div>

          <button
            style={styles.addButton}
            onClick={() =>
              setShowModal(true)
            }
          >
            <FaPlus />
            Create Invoice
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
              <FaFileInvoiceDollar />
            </div>

            <h2
              style={
                styles.statValue
              }
            >
              {invoices.length}
            </h2>

            <p
              style={
                styles.statLabel
              }
            >
              Total Invoices
            </p>
          </div>

          <div style={styles.statCard}>
            <div
              style={
                styles.statIconGreen
              }
            >
              <FaCheckCircle />
            </div>

            <h2
              style={
                styles.statValue
              }
            >
              ₹4.2L
            </h2>

            <p
              style={
                styles.statLabel
              }
            >
              Paid Amount
            </p>
          </div>

          <div style={styles.statCard}>
            <div
              style={
                styles.statIconOrange
              }
            >
              <FaClock />
            </div>

            <h2
              style={
                styles.statValue
              }
            >
              {
                invoices.filter(
                  (i) =>
                    i.status ===
                    "Pending"
                ).length
              }
            </h2>

            <p
              style={
                styles.statLabel
              }
            >
              Pending Invoices
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
            placeholder="Search customer..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={styles.searchInput}
          />
        </div>

        {/* MODAL */}

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
                Create Invoice
              </h2>

              <input
                type="text"
                placeholder="Customer Name"
                value={
                  newInvoice.customer
                }
                onChange={(e) =>
                  setNewInvoice({
                    ...newInvoice,

                    customer:
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
                placeholder="Amount"
                value={
                  newInvoice.amount
                }
                onChange={(e) =>
                  setNewInvoice({
                    ...newInvoice,

                    amount:
                      e.target
                        .value,
                  })
                }
                style={
                  styles.modalInput
                }
              />

              <select
                value={
                  newInvoice.status
                }
                onChange={(e) =>
                  setNewInvoice({
                    ...newInvoice,

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
                  Pending
                </option>

                <option>
                  Paid
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
                  onClick={
                    createInvoice
                  }
                >
                  Create
                </button>
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
                  Invoice ID
                </th>

                <th style={styles.th}>
                  Customer
                </th>

                <th style={styles.th}>
                  Amount
                </th>

                <th style={styles.th}>
                  Status
                </th>

                <th style={styles.th}>
                  Date
                </th>

                <th style={styles.th}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredInvoices.map(
                (
                  invoice,
                  index
                ) => (
                  <tr
                    key={index}
                    style={styles.tr}
                  >
                    <td style={styles.td}>
                      {invoice.id}
                    </td>

                    <td style={styles.td}>
                      {
                        invoice.customer
                      }
                    </td>

                    <td style={styles.td}>
                      {invoice.amount}
                    </td>

                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.status,

                          background:
                            invoice.status ===
                            "Paid"
                              ? "#dcfce7"
                              : "#fef3c7",

                          color:
                            invoice.status ===
                            "Paid"
                              ? "#166534"
                              : "#92400e",
                        }}
                      >
                        {
                          invoice.status
                        }
                      </span>
                    </td>

                    <td style={styles.td}>
                      {invoice.date}
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
                        >
                          <FaEye />
                        </button>

                        <button
                          style={
                            styles.downloadButton
                          }
                        >
                          <FaDownload />
                        </button>

                        <button
                          style={
                            styles.deleteButton
                          }
                          onClick={() =>
                            deleteInvoice(
                              invoice.id
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
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },

  heading: {
    fontSize: "40px",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "8px",
  },

  subText: {
    color: "#6b7280",
    fontSize: "15px",
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
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  statCard: {
    background: "white",
    padding: "24px",
    borderRadius: "22px",
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.05)",
  },

  statIconBlue: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    background: "#eef2ff",
    color: "#4f46e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    marginBottom: "18px",
  },

  statIconGreen: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    background: "#dcfce7",
    color: "#16a34a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    marginBottom: "18px",
  },

  statIconOrange: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    background: "#fef3c7",
    color: "#d97706",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    marginBottom: "18px",
  },

  statValue: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "8px",
  },

  statLabel: {
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
    borderRadius: "22px",
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.05)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "900px",
  },

  th: {
    textAlign: "left",
    padding: "18px",
    background: "#f9fafb",
    color: "#374151",
    fontSize: "14px",
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

  downloadButton: {
    border: "none",
    background: "#dcfce7",
    color: "#16a34a",
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
      "rgba(0,0,0,0.4)",

    display: "flex",
    justifyContent:
      "center",
    alignItems: "center",

    zIndex: 1000,
  },

  modal: {
    width: "100%",
    maxWidth: "420px",

    background: "white",

    padding: "30px",

    borderRadius: "22px",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.2)",
  },

  modalTitle: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#111827",
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
};

export default InvoicesPage;