// src/pages/PaymentsPage.jsx

import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import {
  FaMoneyBillWave,
  FaSearch,
  FaPlus,
  FaCheckCircle,
  FaClock,
  FaTrash,
  FaEye,
  FaTimes,
} from "react-icons/fa";

function PaymentsPage() {
  // SEARCH
  const [search, setSearch] = useState("");

  // ADD PAYMENT MODAL
  const [showModal, setShowModal] = useState(false);

  // VIEW MODAL
  const [selectedPayment, setSelectedPayment] = useState(null);

  // NEW PAYMENT
  const [newPayment, setNewPayment] = useState({
    customer: "",
    amount: "",
    method: "Cash",
    status: "Completed",
  });

  // INITIAL DUMMY DATA (Only used if localStorage is empty)
  const defaultPayments = [
    {
      id: "PAY-1001",
      customer: "Arun Kumar",
      amount: "₹12,500",
      method: "UPI",
      status: "Completed",
      date: "12 May 2026",
    },
    {
      id: "PAY-1002",
      customer: "Priya Stores",
      amount: "₹8,200",
      method: "Cash",
      status: "Pending",
      date: "15 May 2026",
    },
    {
      id: "PAY-1003",
      customer: "Vijay Enterprises",
      amount: "₹22,400",
      method: "Card",
      status: "Completed",
      date: "18 May 2026",
    },
  ];

  // PAYMENTS STATE (Initialized directly from localStorage if it exists)
  const [payments, setPayments] = useState(() => {
    const savedPayments = localStorage.getItem("payments_data");
    return savedPayments ? JSON.parse(savedPayments) : defaultPayments;
  });

  // EFFECT TO SAVE PAYMENTS TO LOCALSTORAGE WHEN STATE CHANGES
  useEffect(() => {
    localStorage.setItem("payments_data", JSON.stringify(payments));
  }, [payments]);

  // FILTER
  const filteredPayments = payments.filter((payment) =>
    payment.customer.toLowerCase().includes(search.toLowerCase())
  );

  // DELETE
  const deletePayment = (id) => {
    setPayments(payments.filter((payment) => payment.id !== id));
  };

  // CREATE PAYMENT
  const createPayment = () => {
    if (!newPayment.customer || !newPayment.amount) {
      alert("Fill all fields");
      return;
    }

    const payment = {
      id: "PAY-" + Math.floor(Math.random() * 10000),
      customer: newPayment.customer,
      amount: "₹" + parseFloat(newPayment.amount).toLocaleString("en-IN"), // Formats number cleanly
      method: newPayment.method,
      status: newPayment.status,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    setPayments([payment, ...payments]);
    setShowModal(false);
    setNewPayment({
      customer: "",
      amount: "",
      method: "Cash",
      status: "Completed",
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
            <h1 style={styles.heading}>Payments</h1>
            <p style={styles.subText}>Track all payment transactions easily</p>
          </div>

          <button style={styles.addButton} onClick={() => setShowModal(true)}>
            <FaPlus />
            Add Payment
          </button>
        </div>

        {/* STATS */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIconBlue}>
              <FaMoneyBillWave />
            </div>
            <h2 style={styles.statValue}>
              ₹
              {(
                payments.reduce((acc, curr) => {
                  const num = parseInt(curr.amount.replace(/[^0-9]/g, ""), 10);
                  return acc + (isNaN(num) ? 0 : num);
                }, 0) / 100000
              ).toFixed(1)}
              L
            </h2>
            <p style={styles.statLabel}>Total Payments</p>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIconGreen}>
              <FaCheckCircle />
            </div>
            <h2 style={styles.statValue}>
              {payments.filter((p) => p.status === "Completed").length}
            </h2>
            <p style={styles.statLabel}>Completed</p>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIconOrange}>
              <FaClock />
            </div>
            <h2 style={styles.statValue}>
              {payments.filter((p) => p.status === "Pending").length}
            </h2>
            <p style={styles.statLabel}>Pending</p>
          </div>
        </div>

        {/* SEARCH */}
        <div style={styles.searchContainer}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* ADD PAYMENT MODAL */}
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h2 style={styles.modalTitle}>Add Payment</h2>
              <input
                type="text"
                placeholder="Customer Name"
                value={newPayment.customer}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, customer: e.target.value })
                }
                style={styles.modalInput}
              />
              <input
                type="number"
                placeholder="Amount"
                value={newPayment.amount}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, amount: e.target.value })
                }
                style={styles.modalInput}
              />
              <select
                value={newPayment.method}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, method: e.target.value })
                }
                style={styles.modalInput}
              >
                <option>Cash</option>
                <option>UPI</option>
                <option>Card</option>
              </select>
              <select
                value={newPayment.status}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, status: e.target.value })
                }
                style={styles.modalInput}
              >
                <option>Completed</option>
                <option>Pending</option>
              </select>

              <div style={styles.modalBtnContainer}>
                <button
                  style={styles.cancelBtn}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button style={styles.createBtn} onClick={createPayment}>
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW PAYMENT MODAL */}
        {selectedPayment && (
          <div style={styles.modalOverlay}>
            <div style={styles.viewModal}>
              {/* CLOSE */}
              <button
                style={styles.closeBtn}
                onClick={() => setSelectedPayment(null)}
              >
                <FaTimes />
              </button>

              {/* TITLE */}
              <div style={styles.viewHeader}>
                <div style={styles.viewIcon}>
                  <FaMoneyBillWave />
                </div>
                <div>
                  <h2 style={styles.viewTitle}>Payment Details</h2>
                  <p style={styles.viewSub}>Complete transaction information</p>
                </div>
              </div>

              {/* DETAILS */}
              <div style={styles.detailsContainer}>
                <div style={styles.detailBox}>
                  <span>Payment ID</span>
                  <h3>{selectedPayment.id}</h3>
                </div>
                <div style={styles.detailBox}>
                  <span>Customer</span>
                  <h3>{selectedPayment.customer}</h3>
                </div>
                <div style={styles.detailBox}>
                  <span>Amount</span>
                  <h3>{selectedPayment.amount}</h3>
                </div>
                <div style={styles.detailBox}>
                  <span>Method</span>
                  <h3>{selectedPayment.method}</h3>
                </div>
                <div style={styles.detailBox}>
                  <span>Status</span>
                  <h3>{selectedPayment.status}</h3>
                </div>
                <div style={styles.detailBox}>
                  <span>Date</span>
                  <h3>{selectedPayment.date}</h3>
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
                <th style={styles.th}>Payment ID</th>
                <th style={styles.th}>Customer</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Method</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment, index) => (
                <tr key={payment.id || index} style={styles.tr}>
                  <td style={styles.td}>{payment.id}</td>
                  <td style={styles.td}>{payment.customer}</td>
                  <td style={styles.td}>{payment.amount}</td>
                  <td style={styles.td}>{payment.method}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        background:
                          payment.status === "Completed"
                            ? "#dcfce7"
                            : "#fef3c7",
                        color:
                          payment.status === "Completed"
                            ? "#166534"
                            : "#92400e",
                      }}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td style={styles.td}>{payment.date}</td>
                  <td style={styles.td}>
                    <div style={styles.actionContainer}>
                      {/* VIEW */}
                      <button
                        style={styles.viewButton}
                        onClick={() => setSelectedPayment(payment)}
                      >
                        <FaEye />
                      </button>

                      {/* DELETE */}
                      <button
                        style={styles.deleteButton}
                        onClick={() => deletePayment(payment.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
    justifyContent: "space-between",
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
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  statCard: {
    background: "white",
    padding: "24px",
    borderRadius: "22px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  statIconBlue: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    background: "#eef2ff",
    color: "#4f46e5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    marginBottom: "18px",
  },
  statValue: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#111827",
  },
  statLabel: {
    color: "#6b7280",
    marginTop: "8px",
  },
  searchContainer: {
    background: "white",
    borderRadius: "16px",
    padding: "14px 18px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "30px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
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
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "1000px",
  },
  th: {
    textAlign: "left",
    padding: "18px",
    background: "#f9fafb",
    color: "#374151",
  },
  tr: {
    borderBottom: "1px solid #e5e7eb",
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
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    width: "100%",
    maxWidth: "420px",
    background: "white",
    padding: "30px",
    borderRadius: "24px",
  },
  modalTitle: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
  },
  modalInput: {
    width: "100%",
    padding: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    marginBottom: "16px",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
  },
  modalBtnContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
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
    maxWidth: "520px",
    background: "white",
    padding: "30px",
    borderRadius: "28px",
    position: "relative",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  },
  closeBtn: {
    position: "absolute",
    top: "18px",
    right: "18px",
    border: "none",
    background: "#f3f4f6",
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    cursor: "pointer",
    color: "#374151",
  },
  viewHeader: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "30px",
  },
  viewIcon: {
    width: "70px",
    height: "70px",
    borderRadius: "20px",
    background: "#eef2ff",
    color: "#4f46e5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "28px",
  },
  viewTitle: {
    fontSize: "30px",
    fontWeight: "800",
    color: "#111827",
  },
  viewSub: {
    color: "#6b7280",
    marginTop: "6px",
  },
  detailsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: "18px",
  },
  detailBox: {
    background: "#f9fafb",
    padding: "18px",
    borderRadius: "18px",
  },
};

export default PaymentsPage;