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

  // INITIAL DUMMY DATA
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

  const [payments, setPayments] = useState(() => {
    const savedPayments = localStorage.getItem("payments_data");
    return savedPayments ? JSON.parse(savedPayments) : defaultPayments;
  });

  useEffect(() => {
    localStorage.setItem("payments_data", JSON.stringify(payments));
  }, [payments]);

  const filteredPayments = payments.filter((payment) =>
    payment.customer.toLowerCase().includes(search.toLowerCase())
  );

  const deletePayment = (id) => {
    if (window.confirm("Are you sure you want to delete this payment record?")) {
      setPayments(payments.filter((payment) => payment.id !== id));
    }
  };

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

  const getVolumeByMethod = (method) => {
    return payments
      .filter((p) => p.method === method)
      .reduce((acc, curr) => {
        const num = parseFloat(curr.amount.replace(/[^0-9.]/g, ""));
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
      
      {/* GRAPHIC BLOB SHAPES */}
      <div style={styles.ambientBlob1}></div>
      <div style={styles.ambientBlob2}></div>

      <style>{`
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translate3d(0, 40px, 0) scale(0.95); }
          to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes backdropFade {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(12px); }
        }
        @keyframes fillBar {
          from { height: 0%; }
        }
        @keyframes subtlePulse {
          0% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); border-color: rgba(99, 102, 241, 0.4); }
          50% { box-shadow: 0 0 35px rgba(168, 85, 247, 0.6); border-color: rgba(168, 85, 247, 0.7); }
          100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); border-color: rgba(99, 102, 241, 0.4); }
        }
        
        /* TOUCH & HOVER ACTIVATED GLOW FOR THE CHART CARD */
        .chart-card-glow-interactive {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
          background: linear-gradient(145deg, rgba(22, 23, 43, 0.75), rgba(15, 16, 32, 0.8)) !important;
          cursor: pointer;
        }
        
        .chart-card-glow-interactive:hover,
        .chart-card-glow-interactive:active {
          animation: subtlePulse 3s infinite ease-in-out;
          background: linear-gradient(145deg, rgba(30, 32, 66, 0.9), rgba(22, 23, 43, 0.95)) !important;
          transform: translate3d(0, -2px, 0);
        }

        /* Amplify individual bar highlights inside when parent is hovered */
        .chart-card-glow-interactive:hover .chart-bar-fill {
          filter: brightness(1.3) drop-shadow(0 0 6px rgba(255, 255, 255, 0.2));
        }

        .premium-glow-trigger {
          position: relative;
          z-index: 1;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .premium-glow-trigger:hover {
          transform: translate3d(0, -2px, 0) !important;
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4) !important;
          filter: brightness(1.15);
        }

        .stat-card-glow {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .stat-card-glow:hover {
          transform: translate3d(0, -4px, 0);
          border-color: rgba(255, 255, 255, 0.15) !important;
          background: rgba(30, 32, 59, 0.75) !important;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3) !important;
        }

        .table-row-hover-effect { transition: background 0.2s ease; }
        .table-row-hover-effect:hover { background: rgba(255, 255, 255, 0.03) !important; }

        .action-btn-node {
          transition: all 0.2s ease;
        }
        .action-btn-node:hover {
          transform: scale(1.1);
        }

        .chart-bar-fill {
          animation: fillBar 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transition: filter 0.3s ease, drop-shadow 0.3s ease;
        }

        select option {
          background-color: #1a1b35;
          color: #ffffff;
        }
      `}</style>

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div style={styles.mainContent}>
        
        {/* HERO BANNER */}
        <div style={styles.header}>
          <div style={{ position: "relative", zIndex: 2 }}>
            <span style={styles.topBadge}>FINANCIAL HUB ACTIVE</span>
            <h1 style={styles.heading}>Payments Management</h1>
            <p style={styles.subText}>Calibrate transactions, verify settlement logs, and manage network revenue streams.</p>
          </div>

          <button 
            className="premium-glow-trigger" 
            style={styles.addButton} 
            onClick={() => setShowModal(true)}
          >
            <FaPlus />
            Deploy New Payment
          </button>
        </div>

        {/* METRICS, CHART & IMAGE GRID BLOCK */}
        <div style={styles.dashboardTopSection}>
          
          {/* STATS COLUMN */}
          <div style={styles.statsColumn}>
            <div className="stat-card-glow" style={styles.statCard}>
              <div style={styles.statIconBlue}>
                <FaMoneyBillWave />
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.statMiniFlex}>
                  <p style={styles.statLabel}>TOTAL VALUATION VOLUME</p>
                  <span style={styles.tagLive}><FaArrowUp size={8} /> Live</span>
                </div>
                <h2 style={styles.statValue}>
                  ₹
                  {(
                    payments.reduce((acc, curr) => {
                      const num = parseFloat(curr.amount.replace(/[^0-9.]/g, ""));
                      return acc + (isNaN(num) ? 0 : num);
                    }, 0) / 100000
                  ).toFixed(2)}
                  L
                </h2>
              </div>
            </div>

            <div className="stat-card-glow" style={styles.statCard}>
              <div style={styles.statIconGreen}>
                <FaCheckCircle />
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.statMiniFlex}>
                  <p style={styles.statLabel}>COMPLETED PIPELINES</p>
                  <span style={styles.tagActive}>Stable</span>
                </div>
                <h2 style={styles.statValue}>
                  {payments.filter((p) => p.status === "Completed").length}
                </h2>
              </div>
            </div>
          </div>

          {/* PAYMENT CHANNELS CHART (NOW WITH INTERACTIVE HOVER/TOUCH GLOW) */}
          <div className="chart-card-glow-interactive" style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <div style={styles.chartHeaderIcon}>
                <FaChartBar />
              </div>
              <div>
                <h3 style={styles.chartTitle}>Channel Tracking Metrics</h3>
                <p style={styles.chartSubtitle}>Breakdown by source liquidity volume</p>
              </div>
            </div>

            <div style={styles.chartContainer}>
              <div style={styles.chartColumnLayout}>
                <div style={styles.chartTrack}>
                  <div className="chart-bar-fill" style={{ ...styles.chartBarFilled, height: `${cashHeight}%`, background: "linear-gradient(to top, #4b5563, #9ca3af)" }} />
                </div>
                <span style={styles.chartLabelText}>Cash</span>
                <span style={styles.chartValueLabel}>₹{cashVolume.toLocaleString("en-IN")}</span>
              </div>

              <div style={styles.chartColumnLayout}>
                <div style={styles.chartTrack}>
                  <div className="chart-bar-fill" style={{ ...styles.chartBarFilled, height: `${upiHeight}%`, background: "linear-gradient(to top, #6366f1, #a5b4fc)" }} />
                </div>
                <span style={styles.chartLabelText}>UPI</span>
                <span style={{ ...styles.chartValueLabel, color: "#a5b4fc" }}>₹{upiVolume.toLocaleString("en-IN")}</span>
              </div>

              <div style={styles.chartColumnLayout}>
                <div style={styles.chartTrack}>
                  <div className="chart-bar-fill" style={{ ...styles.chartBarFilled, height: `${cardHeight}%`, background: "linear-gradient(to top, #ec4899, #fbcfe8)" }} />
                </div>
                <span style={styles.chartLabelText}>Card</span>
                <span style={styles.chartValueLabel}>₹{cardVolume.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* DASHBOARD IMAGE CARD */}
          <div style={styles.dashboardImageCard}>
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80" 
              alt="Financial Analytics Landscape" 
              style={styles.dashboardCardImage} 
            />
            <div style={styles.dashboardImageOverlay}>
              <p style={styles.imageOverlayTitle}>Secure Ledger System</p>
              <p style={styles.imageOverlaySub}>All transactional flows encrypted via localized hash state tokens.</p>
            </div>
          </div>

        </div>

        {/* SEARCH BAR */}
        <div style={styles.searchContainer}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Filter by customer token or identifier lookup..."
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
                <th style={styles.th}>Amount Track</th>
                <th style={styles.th}>Method Channel</th>
                <th style={styles.th}>Status Node</th>
                <th style={styles.th}>Date Logs</th>
                <th style={styles.th}>Operational Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment, index) => (
                <tr key={payment.id || index} className="table-row-hover-effect" style={styles.tr}>
                  <td style={{ ...styles.td, color: "#818cf8", fontWeight: "700" }}>{payment.id}</td>
                  <td style={{ ...styles.td, fontWeight: "600", color: "#ffffff" }}>{payment.customer}</td>
                  <td style={{ ...styles.td, fontWeight: "700", color: "#ffffff" }}>{payment.amount}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.methodBadge, background: payment.method === "UPI" ? "rgba(99,102,241,0.15)" : payment.method === "Card" ? "rgba(236,72,153,0.15)" : "rgba(255,255,255,0.08)", color: payment.method === "UPI" ? "#a5b4fc" : payment.method === "Card" ? "#fbcfe8" : "#9ca3af" }}>
                      {payment.method}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        background: payment.status === "Completed" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
                        color: payment.status === "Completed" ? "#34d399" : "#f87171",
                      }}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td style={{ ...styles.td, color: "#9ca3af" }}>{payment.date}</td>
                  <td style={styles.td}>
                    <div style={styles.actionContainer}>
                      <button
                        className="action-btn-node"
                        style={styles.viewButton}
                        onClick={() => setSelectedPayment(payment)}
                        title="Inspect Record"
                      >
                        <FaEye />
                      </button>
                      <button
                        className="action-btn-node"
                        style={styles.deleteButton}
                        onClick={() => deletePayment(payment.id)}
                        title="Purge Entry"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ ...styles.td, textAlign: "center", color: "#6b7280", padding: "40px" }}>
                    No dynamic records matched configuration variables.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ADD PAYMENT MODAL */}
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <img 
                src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80" 
                alt="New Payment Flow Graphic" 
                style={styles.modalBannerImage} 
              />
              <div style={{ padding: "28px 32px" }}>
                <h2 style={styles.modalTitle}>Deploy Payment Node</h2>
                
                <label style={styles.fieldLabel}>CUSTOMER NAME</label>
                <input
                  type="text"
                  placeholder="E.g., Arun Kumar"
                  value={newPayment.customer}
                  onChange={(e) => setNewPayment({ ...newPayment, customer: e.target.value })}
                  style={styles.modalInput}
                />
                
                <label style={styles.fieldLabel}>EXCHANGE QUANTITY VALUE (INR)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                  style={styles.modalInput}
                />
                
                <label style={styles.fieldLabel}>CHANNEL STREAM</label>
                <select
                  value={newPayment.method}
                  onChange={(e) => setNewPayment({ ...newPayment, method: e.target.value })}
                  style={styles.modalInput}
                >
                  <option value="Cash">Cash Channel</option>
                  <option value="UPI">UPI Endpoint</option>
                  <option value="Card">Card Gateway</option>
                </select>
                
                <label style={styles.fieldLabel}>INITIAL TRANSACTION STATUS</label>
                <select
                  value={newPayment.status}
                  onChange={(e) => setNewPayment({ ...newPayment, status: e.target.value })}
                  style={styles.modalInput}
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>

                <div style={styles.modalBtnContainer}>
                  <button style={styles.cancelBtn} onClick={() => setShowModal(false)}>Abort</button>
                  <button className="premium-glow-trigger" style={styles.createBtn} onClick={createPayment}>Deploy Node</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INSPECT DETAIL MODAL */}
        {selectedPayment && (
          <div style={styles.modalOverlay}>
            <div style={styles.viewModal}>
              <div style={styles.viewModalImageSide}>
                <img 
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=500&q=80" 
                  alt="Validation Asset Ledger Graphic" 
                  style={styles.viewSideImage} 
                />
                <div style={styles.imageOverlayGradient} />
                <div style={styles.imageTextBadge}>VERIFIED LEDGER</div>
              </div>

              <div style={styles.viewModalContentSide}>
                <button style={styles.closeBtn} onClick={() => setSelectedPayment(null)}>
                  <FaTimes />
                </button>

                <div style={styles.viewHeader}>
                  <div style={styles.viewIcon}>
                    <FaMoneyBillWave />
                  </div>
                  <div>
                    <h2 style={styles.viewTitle}>Node Inspection</h2>
                    <p style={styles.viewSub}>Atomic details for selected financial data log</p>
                  </div>
                </div>

                <div style={styles.detailsContainer}>
                  <div style={styles.detailBox}>
                    <span style={styles.detailLabel}>Identifier Node</span>
                    <h3 style={styles.detailValue}>{selectedPayment.id}</h3>
                  </div>
                  <div style={styles.detailBox}>
                    <span style={styles.detailLabel}>Customer Track</span>
                    <h3 style={styles.detailValue}>{selectedPayment.customer}</h3>
                  </div>
                  <div style={styles.detailBox}>
                    <span style={styles.detailLabel}>Valuation Metric</span>
                    <h3 style={{ ...styles.detailValue, color: "#6366f1", fontWeight: "800" }}>{selectedPayment.amount}</h3>
                  </div>
                  <div style={styles.detailBox}>
                    <span style={styles.detailLabel}>Channel Pathway</span>
                    <h3 style={styles.detailValue}>{selectedPayment.method}</h3>
                  </div>
                  <div style={styles.detailBox}>
                    <span style={styles.detailLabel}>State Registry</span>
                    <div>
                      <span style={{ ...styles.status, display: "inline-block", marginTop: "6px", background: selectedPayment.status === "Completed" ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)", color: selectedPayment.status === "Completed" ? "#34d399" : "#f87171" }}>
                        {selectedPayment.status}
                      </span>
                    </div>
                  </div>
                  <div style={styles.detailBox}>
                    <span style={styles.detailLabel}>Log Generation Timestamp</span>
                    <h3 style={styles.detailValue}>{selectedPayment.date}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// --- CORE STYLING VARIABLES ---
const styles = {
  pageContainer: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#0b0c16",
    overflow: "hidden",
    position: "relative",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  ambientBlob1: {
    position: "absolute",
    width: "450px",
    height: "450px",
    top: "-100px",
    right: "10%",
    background: "radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, transparent 70%)",
    zIndex: 0,
    pointerEvents: "none",
  },
  ambientBlob2: {
    position: "absolute",
    width: "600px",
    height: "600px",
    bottom: "-150px",
    left: "20%",
    background: "radial-gradient(circle, rgba(14, 116, 144, 0.2) 0%, transparent 70%)",
    zIndex: 0,
    pointerEvents: "none",
  },
  mainContent: {
    flex: 1,
    height: "100vh",
    padding: "32px",
    overflowY: "auto",
    overflowX: "hidden",
    boxSizing: "border-box",
    position: "relative",
    zIndex: 1,
  },
  header: {
    position: "relative",
    background: "linear-gradient(135deg, rgba(26, 28, 54, 0.95), rgba(18, 19, 38, 0.95))",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    padding: "32px 40px",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "28px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
  },
  topBadge: {
    display: "inline-block",
    background: "rgba(99, 102, 241, 0.15)",
    color: "#a5b4fc",
    fontSize: "11px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "6px",
    letterSpacing: "0.06em",
    marginBottom: "12px",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#ffffff",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  subText: {
    color: "#9ca3af",
    fontSize: "14px",
    margin: 0,
    marginTop: "8px",
    fontWeight: "400",
  },
  addButton: {
    border: "none",
    background: "#6366f1",
    color: "#ffffff",
    padding: "14px 24px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
  },
  dashboardTopSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "24px",
    marginBottom: "28px",
    alignItems: "stretch",
  },
  statsColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  statCard: {
    background: "rgba(22, 23, 43, 0.75)",
    backdropFilter: "blur(20px)",
    padding: "20px 24px",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
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
  tagLive: {
    background: "rgba(16, 185, 129, 0.15)",
    color: "#34d399",
    fontSize: "10px",
    fontWeight: "700",
    padding: "2px 8px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  tagActive: {
    background: "rgba(99, 102, 241, 0.15)",
    color: "#a5b4fc",
    fontSize: "10px",
    fontWeight: "700",
    padding: "2px 8px",
    borderRadius: "6px",
  },
  chartCard: {
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    padding: "24px 28px",
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
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    background: "rgba(168, 85, 247, 0.15)",
    color: "#c084fc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
  },
  chartTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
  },
  chartSubtitle: {
    fontSize: "12px",
    color: "#9ca3af",
    margin: 0,
  },
  chartContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: "125px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  chartColumnLayout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "60px",
  },
  chartTrack: {
    width: "12px",
    height: "80px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "20px",
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    overflow: "hidden",
  },
  chartBarFilled: {
    width: "100%",
    borderRadius: "20px",
  },
  chartLabelText: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#9ca3af",
    marginTop: "8px",
  },
  chartValueLabel: {
    fontSize: "10px",
    fontWeight: "500",
    color: "#6b7280",
    marginTop: "2px",
  },
  dashboardImageCard: {
    borderRadius: "16px",
    overflow: "hidden",
    position: "relative",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    background: "#16172b",
  },
  dashboardCardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.45,
    display: "block",
  },
  dashboardImageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "20px",
    background: "linear-gradient(to top, rgba(11,12,22,1) 10%, rgba(11,12,22,0.4) 70%, transparent)",
  },
  imageOverlayTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
  },
  imageOverlaySub: {
    fontSize: "12px",
    color: "#9ca3af",
    margin: 0,
    marginTop: "4px",
    lineHeight: "1.4",
  },
  statIconBlue: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "rgba(99, 102, 241, 0.15)",
    color: "#818cf8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
  },
  statIconGreen: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "rgba(16, 185, 129, 0.15)",
    color: "#34d399",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#ffffff",
    margin: 0,
    marginTop: "4px",
  },
  statLabel: {
    color: "#9ca3af",
    margin: 0,
    fontSize: "11px",
    fontWeight: "700",
  },
  searchContainer: {
    background: "rgba(22, 23, 43, 0.65)",
    backdropFilter: "blur(20px)",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    padding: "14px 20px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "28px",
  },
  searchIcon: {
    color: "#6b7280",
    fontSize: "15px",
  },
  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "14px",
    color: "#ffffff",
    background: "transparent",
  },
  tableWrapper: {
    width: "100%",
    overflowX: "auto",
    background: "rgba(22, 23, 43, 0.65)",
    backdropFilter: "blur(20px)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "900px",
  },
  th: {
    textAlign: "left",
    padding: "16px 20px",
    background: "rgba(255, 255, 255, 0.02)",
    color: "#9ca3af",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  tr: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
  },
  td: {
    padding: "16px 20px",
    color: "#d1d5db",
    fontSize: "14px",
  },
  methodBadge: {
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: "700",
  },
  status: {
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: "700",
  },
  actionContainer: {
    display: "flex",
    gap: "8px",
  },
  viewButton: {
    border: "none",
    background: "rgba(255,255,255,0.05)",
    color: "#818cf8",
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    border: "none",
    background: "rgba(239,68,68,0.1)",
    color: "#f87171",
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(5, 6, 12, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    animation: "backdropFade 0.25s ease forwards",
  },
  modal: {
    width: "92%",
    maxWidth: "440px",
    background: "#15162a",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.5)",
    overflow: "hidden",
    animation: "modalSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
  },
  modalBannerImage: {
    width: "100%",
    height: "130px",
    objectFit: "cover",
    display: "block",
  },
  modalTitle: {
    fontSize: "22px",
    fontWeight: "800",
    marginBottom: "20px",
    color: "#ffffff",
    margin: 0,
  },
  fieldLabel: {
    display: "block",
    fontSize: "11px",
    fontWeight: "700",
    color: "#9ca3af",
    marginBottom: "6px",
  },
  modalInput: {
    width: "100%",
    padding: "11px 14px",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    marginBottom: "18px",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
    background: "#1d1f3b",
    color: "#ffffff",
  },
  modalBtnContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
  },
  cancelBtn: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.05)",
    cursor: "pointer",
    fontWeight: "600",
    color: "#d1d5db",
  },
  createBtn: {
    padding: "12px 22px",
    border: "none",
    borderRadius: "10px",
    background: "#6366f1",
    color: "white",
    cursor: "pointer",
    fontWeight: "700",
  },
  viewModal: {
    width: "92%",
    maxWidth: "740px",
    background: "#15162a",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "24px",
    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.6)",
    display: "flex",
    overflow: "hidden",
    animation: "modalSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
  },
  viewModalImageSide: {
    width: "38%",
    position: "relative",
    background: "#0b0c16",
  },
  viewSideImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  imageOverlayGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to right, transparent, #15162a)",
  },
  imageTextBadge: {
    position: "absolute",
    bottom: "24px",
    left: "24px",
    background: "rgba(16, 185, 129, 0.2)",
    border: "1px solid rgba(16, 185, 129, 0.4)",
    color: "#34d399",
    fontSize: "10px",
    fontWeight: "800",
    padding: "4px 10px",
    borderRadius: "6px",
  },
  viewModalContentSide: {
    flex: 1,
    padding: "36px",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: "24px",
    right: "24px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "none",
    color: "#9ca3af",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  viewHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "32px",
  },
  viewIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "rgba(99, 102, 241, 0.15)",
    color: "#818cf8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  },
  viewTitle: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#ffffff",
    margin: 0,
  },
  viewSub: {
    fontSize: "12px",
    color: "#9ca3af",
    margin: 0,
  },
  detailsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px 20px",
  },
  detailBox: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  detailLabel: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#6b7280",
    textTransform: "uppercase",
  },
  detailValue: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#e5e7eb",
    margin: 0,
  },
};

export default PaymentsPage;