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
  FaChartBar,
  FaArrowUp,
  FaArrowDown,
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
    if (window.confirm("Are you sure you want to delete this payment record?")) {
      setPayments(payments.filter((payment) => payment.id !== id));
    }
  };

  // CREATE PAYMENT
  const createPayment = () => {
    if (!newPayment.customer || !newPayment.amount) {
      alert("Please fill all fields");
      return;
    }

    const payment = {
      id: "PAY-" + Math.floor(1000 + Math.random() * 9000),
      customer: newPayment.customer,
      amount: "₹" + parseFloat(newPayment.amount).toLocaleString("en-IN"),
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

  // --- DYNAMIC CALCULATIONS FOR THE CHANNELS CHART ---
  const getVolumeByMethod = (method) => {
    return payments
      .filter((p) => p.method === method)
      .reduce((acc, curr) => {
        const num = parseInt(curr.amount.replace(/[^0-9]/g, ""), 10);
        return acc + (isNaN(num) ? 0 : num);
      }, 0);
  };

  const cashVolume = getVolumeByMethod("Cash");
  const upiVolume = getVolumeByMethod("UPI");
  const cardVolume = getVolumeByMethod("Card");
  const maxVolume = Math.max(cashVolume, upiVolume, cardVolume, 1);

  const cashHeight = (cashVolume / maxVolume) * 100;
  const upiHeight = (upiVolume / maxVolume) * 100;
  const cardHeight = (cardVolume / maxVolume) * 100;

  return (
    <div style={styles.pageContainer}>
      {/* HIGH-DENSITY VISUAL GLOW & ANIMATION ENGINE */}
      <style>{`
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translate3d(0, 30px, 0) scale(0.98); }
          to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes backdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fillBar {
          from { height: 0%; }
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
        
        .total-pay-card { box-shadow: 0 4px 20px -2px rgba(79, 70, 229, 0.06) !important; }
        .total-pay-card:hover {
          transform: translate3d(0, -6px, 0);
          border-color: rgba(79, 70, 229, 0.3) !important;
          box-shadow: 0 12px 24px -4px rgba(79, 70, 229, 0.12), 0 24px 48px -8px rgba(79, 70, 229, 0.24) !important;
        }

        .completed-pay-card { box-shadow: 0 4px 20px -2px rgba(22, 163, 74, 0.06) !important; }
        .completed-pay-card:hover {
          transform: translate3d(0, -6px, 0);
          border-color: rgba(22, 163, 74, 0.3) !important;
          box-shadow: 0 12px 24px -4px rgba(22, 163, 74, 0.12), 0 24px 48px -8px rgba(22, 163, 74, 0.24) !important;
        }

        .pending-pay-card { box-shadow: 0 4px 20px -2px rgba(217, 119, 6, 0.06) !important; }
        .pending-pay-card:hover {
          transform: translate3d(0, -6px, 0);
          border-color: rgba(217, 119, 6, 0.3) !important;
          box-shadow: 0 12px 24px -4px rgba(217, 119, 6, 0.12), 0 24px 48px -8px rgba(217, 119, 6, 0.24) !important;
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
        .action-delete-glow:hover {
          background: #dc2626 !important;
          color: #ffffff !important;
          box-shadow: 0 6px 16px rgba(220, 38, 38, 0.4) !important;
        }

        /* CHART INTERNAL TRANSITIONS */
        .chart-bar-fill {
          animation: fillBar 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transition: height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div style={styles.mainContent}>
        
        {/* PREMIUM RADIENT HEADER HERO */}
        <div style={styles.header}>
          <div style={{ position: "relative", zIndex: 2 }}>
            <h1 style={styles.heading}>Payments</h1>
            <p style={styles.subText}>Track all payment transactions easily and maintain balances</p>
          </div>

          <button 
            className="premium-glow-trigger" 
            style={styles.addButton} 
            onClick={() => setShowModal(true)}
          >
            <FaPlus />
            Add Payment
          </button>
          
          <div style={{ position: "absolute", top: "-50px", right: "-30px", width: "200px", height: "200px", background: "rgba(255,255,255,0.07)", borderRadius: "50%" }}></div>
          <div style={{ position: "absolute", bottom: "-40px", right: "140px", width: "120px", height: "120px", background: "rgba(255,255,255,0.04)", borderRadius: "50%" }}></div>
        </div>

        {/* METRICS & LIVESTREAM CHART SECTION SPLIT BLOCK */}
        <div style={styles.dashboardTopSection}>
          
          {/* STATS CARD COLUMN */}
          <div style={styles.statsColumn}>
            <div className="stat-card-glow total-pay-card" style={styles.statCard}>
              <div style={styles.statIconBlue}>
                <FaMoneyBillWave />
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.statMiniFlex}>
                  <p style={styles.statLabel}>Total Payments</p>
                  <span style={styles.trendingUpTag}><FaArrowUp size={10} /> Live</span>
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
              </div>
            </div>

            <div className="stat-card-glow completed-pay-card" style={styles.statCard}>
              <div style={styles.statIconGreen}>
                <FaCheckCircle />
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.statMiniFlex}>
                  <p style={styles.statLabel}>Completed</p>
                  <span style={styles.stableTag}>Active</span>
                </div>
                <h2 style={styles.statValue}>
                  {payments.filter((p) => p.status === "Completed").length}
                </h2>
              </div>
            </div>

            <div className="stat-card-glow pending-pay-card" style={styles.statCard}>
              <div style={styles.statIconOrange}>
                <FaClock />
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.statMiniFlex}>
                  <p style={styles.statLabel}>Pending</p>
                  {payments.filter((p) => p.status === "Pending").length > 0 ? (
                    <span style={styles.trendingDownTag}>Action Req</span>
                  ) : (
                    <span style={styles.stableTag}>Clear</span>
                  )}
                </div>
                <h2 style={styles.statValue}>
                  {payments.filter((p) => p.status === "Pending").length}
                </h2>
              </div>
            </div>
          </div>

          {/* DYNAMIC REALTIME CUSTOM ENGINE METHOD CHART CARD */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <div style={styles.chartHeaderIcon}>
                <FaChartBar />
              </div>
              <div>
                <h3 style={styles.chartTitle}>Payment Channels</h3>
                <p style={styles.chartSubtitle}>Real-time breakdown by incoming source value</p>
              </div>
            </div>

            <div style={styles.chartContainer}>
              {/* Cash Bar */}
              <div style={styles.chartColumnLayout}>
                <div style={styles.chartTrack}>
                  <div 
                    className="chart-bar-fill" 
                    style={{ ...styles.chartBarFilled, height: `${cashHeight}%`, background: "linear-gradient(to top, #64748b, #94a3b8)" }}
                  />
                </div>
                <span style={styles.chartLabelText}>Cash</span>
                <span style={styles.chartValueLabel}>₹{cashVolume.toLocaleString("en-IN")}</span>
              </div>

              {/* UPI Bar */}
              <div style={styles.chartColumnLayout}>
                <div style={styles.chartTrack}>
                  <div 
                    className="chart-bar-fill" 
                    style={{ ...styles.chartBarFilled, height: `${upiHeight}%`, background: "linear-gradient(to top, #3b82f6, #60a5fa)" }}
                  />
                </div>
                <span style={styles.chartLabelText}>UPI</span>
                <span style={{ ...styles.chartValueLabel, color: "#3b82f6", fontWeight: "700" }}>₹{upiVolume.toLocaleString("en-IN")}</span>
              </div>

              {/* Card Bar */}
              <div style={styles.chartColumnLayout}>
                <div style={styles.chartTrack}>
                  <div 
                    className="chart-bar-fill" 
                    style={{ ...styles.chartBarFilled, height: `${cardHeight}%`, background: "linear-gradient(to top, #a855f7, #c084fc)" }}
                  />
                </div>
                <span style={styles.chartLabelText}>Card</span>
                <span style={styles.chartValueLabel}>₹{cardVolume.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

        </div>

        {/* SEARCH BAR */}
        <div style={styles.searchContainer}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search customer lookup records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* DATA RECORDS TABLE */}
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
                <tr key={payment.id || index} className="table-row-hover-effect" style={styles.tr}>
                  <td style={{ ...styles.td, color: "#4f46e5", fontWeight: "700" }}>{payment.id}</td>
                  <td style={{ ...styles.td, fontWeight: "600", color: "#0f172a" }}>{payment.customer}</td>
                  <td style={{ ...styles.td, fontWeight: "700" }}>{payment.amount}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.methodBadge, background: payment.method === "UPI" ? "#e0f2fe" : payment.method === "Card" ? "#f3e8ff" : "#f1f5f9", color: payment.method === "UPI" ? "#0369a1" : payment.method === "Card" ? "#6b21a8" : "#475569" }}>
                      {payment.method}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        background: payment.status === "Completed" ? "#dcfce7" : "#ffe4e6",
                        color: payment.status === "Completed" ? "#166534" : "#991b1b",
                      }}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td style={{ ...styles.td, color: "#64748b" }}>{payment.date}</td>
                  <td style={styles.td}>
                    <div style={styles.actionContainer}>
                      <button
                        className="btn-interact-node action-view-glow"
                        style={styles.viewButton}
                        onClick={() => setSelectedPayment(payment)}
                        title="View Details"
                      >
                        <FaEye />
                      </button>

                      <button
                        className="btn-interact-node action-delete-glow"
                        style={styles.deleteButton}
                        onClick={() => deletePayment(payment.id)}
                        title="Delete Record"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ ...styles.td, textAlign: "center", color: "#94a3b8", padding: "40px" }}>
                    No payment profiles matched your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* INTERACTIVE ADD PAYMENT MODAL */}
        {showModal && (
          <div style={{ ...styles.modalOverlay, animation: "backdropFade 0.2s ease forwards" }}>
            <div style={{ ...styles.modal, animation: "modalSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}>
              <h2 style={styles.modalTitle}>Add Payment</h2>
              
              <label style={styles.fieldLabel}>Customer Name</label>
              <input
                type="text"
                placeholder="E.g., Arun Kumar"
                value={newPayment.customer}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, customer: e.target.value })
                }
                style={styles.modalInput}
              />
              
              <label style={styles.fieldLabel}>Amount (INR)</label>
              <input
                type="number"
                placeholder="0.00"
                value={newPayment.amount}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, amount: e.target.value })
                }
                style={styles.modalInput}
              />
              
              <label style={styles.fieldLabel}>Payment Mode</label>
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
              
              <label style={styles.fieldLabel}>Transaction Status</label>
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
                <button 
                  className="premium-glow-trigger" 
                  style={styles.createBtn} 
                  onClick={createPayment}
                >
                  Add Transaction
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INTERACTIVE VIEW PAYMENT MODAL */}
        {selectedPayment && (
          <div style={{ ...styles.modalOverlay, animation: "backdropFade 0.2s ease forwards" }}>
            <div style={{ ...styles.viewModal, animation: "modalSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}>
              <button
                style={styles.closeBtn}
                onClick={() => setSelectedPayment(null)}
              >
                <FaTimes />
              </button>

              <div style={styles.viewHeader}>
                <div style={styles.viewIcon}>
                  <FaMoneyBillWave />
                </div>
                <div>
                  <h2 style={styles.viewTitle}>Payment Details</h2>
                  <p style={styles.viewSub}>Complete transaction receipt information</p>
                </div>
              </div>

              <div style={styles.detailsContainer}>
                <div style={styles.detailBox}>
                  <span style={styles.detailLabel}>Payment ID</span>
                  <h3 style={styles.detailValue}>{selectedPayment.id}</h3>
                </div>
                <div style={styles.detailBox}>
                  <span style={styles.detailLabel}>Customer</span>
                  <h3 style={styles.detailValue}>{selectedPayment.customer}</h3>
                </div>
                <div style={styles.detailBox}>
                  <span style={styles.detailLabel}>Amount</span>
                  <h3 style={{ ...styles.detailValue, color: "#4f46e5", fontWeight: "800" }}>{selectedPayment.amount}</h3>
                </div>
                <div style={styles.detailBox}>
                  <span style={styles.detailLabel}>Method</span>
                  <h3 style={styles.detailValue}>{selectedPayment.method}</h3>
                </div>
                <div style={styles.detailBox}>
                  <span style={styles.detailLabel}>Status</span>
                  <div>
                    <span
                      style={{
                        ...styles.status,
                        display: "inline-block",
                        marginTop: "4px",
                        background: selectedPayment.status === "Completed" ? "#dcfce7" : "#ffe4e6",
                        color: selectedPayment.status === "Completed" ? "#166534" : "#991b1b",
                      }}
                    >
                      {selectedPayment.status}
                    </span>
                  </div>
                </div>
                <div style={styles.detailBox}>
                  <span style={styles.detailLabel}>Settlement Date</span>
                  <h3 style={styles.detailValue}>{selectedPayment.date}</h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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
    flexWrap: "wrap",
  },
  statsColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    justifyContent: "space-between",
  },
  statCard: {
    background: "#ffffff",
    padding: "20px 24px",
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
  trendingUpTag: {
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
  trendingDownTag: {
    background: "#fee2e2",
    color: "#b91c1c",
    fontSize: "11px",
    fontWeight: "700",
    padding: "2px 8px",
    borderRadius: "6px",
  },
  stableTag: {
    background: "#f1f5f9",
    color: "#475569",
    fontSize: "11px",
    fontWeight: "700",
    padding: "2px 8px",
    borderRadius: "6px",
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
    marginBottom: "20px",
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
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: "140px",
    paddingTop: "20px",
    borderBottom: "2px solid #f1f5f9",
  },
  chartColumnLayout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "60px",
  },
  chartTrack: {
    width: "16px",
    height: "90px",
    background: "#f1f5f9",
    borderRadius: "30px",
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    overflow: "hidden",
  },
  chartBarFilled: {
    width: "100%",
    borderRadius: "30px",
  },
  chartLabelText: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#475569",
    marginTop: "10px",
  },
  chartValueLabel: {
    fontSize: "11px",
    fontWeight: "500",
    color: "#94a3b8",
    marginTop: "2px",
  },
  statIconBlue: {
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    background: "rgba(79, 70, 229, 0.08)",
    color: "#4f46e5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    flexShrink: 0,
  },
  statIconGreen: {
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    background: "rgba(22, 163, 74, 0.08)",
    color: "#16a34a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    flexShrink: 0,
  },
  statIconOrange: {
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    background: "rgba(217, 119, 6, 0.08)",
    color: "#d97706",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    flexShrink: 0,
  },
  statValue: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
    letterSpacing: "-0.01em",
    marginTop: "2px",
  },
  statLabel: {
    color: "#64748b",
    margin: 0,
    fontSize: "13px",
    fontWeight: "600",
  },
  searchContainer: {
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    padding: "14px 20px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "32px",
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
    borderCollapse: "collapse",
    minWidth: "900px",
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
  methodBadge: {
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
  },
  modal: {
    width: "92%",
    maxWidth: "440px",
    background: "#ffffff",
    padding: "36px",
    borderRadius: "24px",
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
    width: "92%",
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
  viewHeader: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "30px",
  },
  viewIcon: {
    width: "64px",
    height: "64px",
    borderRadius: "16px",
    background: "rgba(79, 70, 229, 0.08)",
    color: "#4f46e5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    flexShrink: 0,
  },
  viewTitle: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
    letterSpacing: "-0.01em",
  },
  viewSub: {
    color: "#64748b",
    fontSize: "14px",
    margin: 0,
    marginTop: "4px",
    fontWeight: "500",
  },
  detailsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
  },
  detailBox: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    padding: "16px",
    borderRadius: "16px",
  },
  detailLabel: {
    display: "block",
    fontSize: "12px",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.02em",
    marginBottom: "4px",
  },
  detailValue: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
  },
};

export default PaymentsPage;