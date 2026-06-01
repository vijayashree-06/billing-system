// src/pages/Dashboard.jsx

import { useState, useEffect } from "react";

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
  FaDownload,
} from "react-icons/fa";

function Dashboard() {
  const [hoveredBar, setHoveredBar] = useState(null);
  const [dialogType, setDialogType] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // 1. INITIALIZE STATE FROM LOCALSTORAGE (or fallback to defaults)
  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem("dashboard_activities");
    return savedActivities ? JSON.parse(savedActivities) : [
      {
        text: "Invoice Created Successfully",
        color: "#10b981",
        type: "invoice"
      },
      {
        text: "New Customer Registered",
        color: "#3b82f6",
        type: "customer"
      },
      {
        text: "Payment Received",
        color: "#f59e0b",
        type: "payment"
      },
      {
        text: "Product Added",
        color: "#8b5cf6",
        type: "product"
      },
      {
        text: "Revenue Increased",
        color: "#ef4444",
        type: "revenue"
      },
    ];
  });

  const [invoices, setInvoices] = useState(() => {
    const savedInvoices = localStorage.getItem("dashboard_invoices");
    return savedInvoices ? JSON.parse(savedInvoices) : [
      {
        id: "INV001",
        customer: "Arjun",
        date: "28 May 2026",
        amount: "₹12,000",
        status: "Paid",
      },
      {
        id: "INV002",
        customer: "Rahul",
        date: "27 May 2026",
        amount: "₹8,500",
        status: "Pending",
      },
      {
        id: "INV003",
        customer: "Kavin",
        date: "26 May 2026",
        amount: "₹4,300",
        status: "Paid",
      },
    ];
  });

  const [newInvoice, setNewInvoice] = useState({
    id: "",
    customer: "",
    date: "",
    amount: "",
    status: "Pending",
  });

  // State to handle field edits safely
  const [editForm, setEditForm] = useState({ customer: "", amount: "" });

  // 2. SYNC STATES TO LOCALSTORAGE ON CHANGES
  useEffect(() => {
    localStorage.setItem("dashboard_invoices", JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem("dashboard_activities", JSON.stringify(activities));
  }, [activities]);

  // Map types back to icons dynamically since functions/React elements can't be stored in localStorage
  const getActivityIcon = (type) => {
    switch (type) {
      case "invoice": return <FaCheckCircle />;
      case "customer": return <FaUserPlus />;
      case "payment": return <FaCreditCard />;
      case "product": return <FaBoxOpen />;
      case "revenue": return <FaChartLine />;
      default: return <FaPlus />;
    }
  };

  const cards = [
    {
      title: "Revenue",
      value: "₹3,40,000",
      icon: <FaMoneyBillWave />,
      color: "#4f46e5",
    },
    {
      title: "Customers",
      value: "245",
      icon: <FaUsers />,
      color: "#10b981",
    },
    {
      title: "Products",
      value: "85",
      icon: <FaBoxOpen />,
      color: "#8b5cf6",
    },
    {
      title: "Invoices",
      value: invoices.length,
      icon: <FaFileInvoice />,
      color: "#ef4444",
    },
  ];

  const revenueData = [
    { month: "Jan", amount: "₹20,000", height: 80, color: "#4f46e5" },
    { month: "Feb", amount: "₹35,000", height: 130, color: "#7c3aed" },
    { month: "Mar", amount: "₹28,000", height: 100, color: "#ec4899" },
    { month: "Apr", amount: "₹48,000", height: 180, color: "#06b6d4" },
    { month: "May", amount: "₹38,000", height: 140, color: "#10b981" },
    { month: "Jun", amount: "₹60,000", height: 230, color: "#f59e0b" },
  ];

  // ADD INVOICE
  const handleAddInvoice = () => {
    if (
      !newInvoice.id ||
      !newInvoice.customer ||
      !newInvoice.date ||
      !newInvoice.amount
    ) {
      alert("Please fill all fields");
      return;
    }

    // Format currency symbol if not typed by user
    let formattedAmount = newInvoice.amount;
    if (!formattedAmount.startsWith("₹")) {
      formattedAmount = "₹" + formattedAmount;
    }

    // Format date string beautifully if fallback input raw text is used
    let formattedDate = newInvoice.date;
    if (newInvoice.date.includes("-")) {
      const d = new Date(newInvoice.date);
      formattedDate = d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    }

    const createdInvoice = {
      ...newInvoice,
      amount: formattedAmount,
      date: formattedDate
    };

    setInvoices([...invoices, createdInvoice]);

    // Add corresponding update to recent activities
    setActivities([
      ...activities,
      {
        text: `Invoice ${newInvoice.id} Created`,
        color: "#10b981",
        type: "invoice"
      }
    ]);

    setNewInvoice({
      id: "",
      customer: "",
      date: "",
      amount: "",
      status: "Pending",
    });
    setSelectedInvoice(null);
  };

  // EDIT INVOICE
  const handleEditInvoice = () => {
    if (!editForm.customer || !editForm.amount) {
      alert("Please fill all fields");
      return;
    }

    let formattedAmount = editForm.amount;
    if (!formattedAmount.startsWith("₹")) {
      formattedAmount = "₹" + formattedAmount;
    }

    const updated = invoices.map((inv) =>
      inv.id === selectedInvoice.id
        ? { ...inv, customer: editForm.customer, amount: formattedAmount }
        : inv
    );

    setInvoices(updated);
    setSelectedInvoice(null);
  };

  // DELETE INVOICE
  const handleDeleteInvoice = () => {
    const updated = invoices.filter(
      (invoice) => invoice.id !== selectedInvoice.id
    );
    setInvoices(updated);
    setSelectedInvoice(null);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f3f4f6",
        overflowX: "hidden",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1, width: "100%", minWidth: 0 }}>
        <TopNav title="Dashboard" />

        <div style={{ padding: "20px" }}>
          {/* Welcome Banner */}
          <div
            style={{
              background: "linear-gradient(to right,#4f46e5,#7c3aed)",
              borderRadius: "24px",
              padding: "30px",
              color: "white",
              marginBottom: "20px",
            }}
          >
            <h1 style={{ fontSize: "clamp(28px,5vw,42px)", marginBottom: "10px" }}>
              Welcome Back
            </h1>
            <p style={{ opacity: 0.9 }}>
              Manage your billing system efficiently
            </p>
          </div>

          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "18px",
            }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "22px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p style={{ color: "#6b7280", marginBottom: "8px" }}>
                    {card.title}
                  </p>
                  <h2 style={{ fontSize: "clamp(24px,4vw,34px)" }}>
                    {card.value}
                  </h2>
                </div>
                <div
                  style={{
                    width: "62px",
                    height: "62px",
                    borderRadius: "18px",
                    background: card.color,
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "24px",
                  }}
                >
                  {card.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Chart + Activity */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {/* Revenue Chart */}
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "20px",
                overflowX: "auto",
              }}
            >
              <h2 style={{ marginBottom: "25px" }}>Revenue Analytics</h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: "10px",
                  height: "260px",
                  minWidth: "320px",
                }}
              >
                {revenueData.map((bar, index) => (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    {hoveredBar === index && (
                      <div
                        style={{
                          position: "absolute",
                          top: `${220 - bar.height}px`,
                          background: "#111827",
                          color: "white",
                          padding: "6px 12px",
                          borderRadius: "10px",
                          fontSize: "12px",
                          zIndex: 10,
                        }}
                      >
                        {bar.amount}
                      </div>
                    )}
                    <div
                      onMouseEnter={() => setHoveredBar(index)}
                      onMouseLeave={() => setHoveredBar(null)}
                      style={{
                        width: "100%",
                        maxWidth: "48px",
                        height: `${bar.height}px`,
                        background: `linear-gradient(to top, ${bar.color}, #c4b5fd)`,
                        borderRadius: "14px 14px 0 0",
                        cursor: "pointer",
                      }}
                    />
                    <p style={{ marginTop: "10px", fontWeight: "600" }}>
                      {bar.month}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <h2 style={{ fontSize: "22px", fontWeight: "600" }}>
                  Recent Activities
                </h2>
                <button
                  onClick={() =>
                    setActivities([
                      ...activities,
                      {
                        text: "Custom Activity Triggered",
                        color: "#4f46e5",
                        type: "default",
                      },
                    ])
                  }
                  style={{
                    width: "42px",
                    height: "42px",
                    border: "none",
                    borderRadius: "12px",
                    background: "#4f46e5",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <FaPlus />
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  maxHeight: "260px",
                  overflowY: "auto",
                  paddingRight: "4px"
                }}
              >
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    style={{
                      background: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      borderRadius: "16px",
                      padding: "16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "14px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          width: "45px",
                          height: "45px",
                          borderRadius: "14px",
                          background: `${activity.color}15`,
                          color: activity.color,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "18px",
                          flexShrink: 0,
                        }}
                      >
                        {getActivityIcon(activity.type)}
                      </div>
                      <span
                        style={{
                          fontSize: "15px",
                          color: "#374151",
                          fontWeight: "500",
                        }}
                      >
                        {activity.text}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        const updated = activities.filter((_, i) => i !== index);
                        setActivities(updated);
                      }}
                      style={{
                        width: "38px",
                        height: "38px",
                        border: "none",
                        borderRadius: "10px",
                        background: "#fee2e2",
                        color: "#ef4444",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Invoices Table Section */}
          <div
            style={{
              marginTop: "20px",
              background: "white",
              borderRadius: "20px",
              padding: "20px",
              overflowX: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <h2>Recent Invoices</h2>
              <button
                onClick={() => {
                  setDialogType("add");
                  setSelectedInvoice({ id: "", customer: "", date: "", amount: "", status: "Pending" });
                }}
                style={{
                  padding: "12px 18px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#4f46e5",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                <FaPlus />
                Add Invoice
              </button>
            </div>

            <table
              style={{
                width: "100%",
                minWidth: "900px",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  <th style={tableHead}>Invoice ID</th>
                  <th style={tableHead}>Customer</th>
                  <th style={tableHead}>Date</th>
                  <th style={tableHead}>Amount</th>
                  <th style={tableHead}>Status</th>
                  <th style={tableHead}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <tr key={invoice.id || index}>
                    <td style={tableData}>{invoice.id}</td>
                    <td style={tableData}>{invoice.customer}</td>
                    <td style={tableData}>{invoice.date}</td>
                    <td style={tableData}>{invoice.amount}</td>
                    <td style={tableData}>
                      <span
                        style={{
                          background: invoice.status === "Paid" ? "#dcfce7" : "#fef3c7",
                          color: invoice.status === "Paid" ? "#166534" : "#92400e",
                          padding: "6px 14px",
                          borderRadius: "20px",
                        }}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td style={tableData}>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <button
                          onClick={() => {
                            setSelectedInvoice(invoice);
                            setEditForm({
                              customer: invoice.customer,
                              amount: invoice.amount.replace("₹", ""),
                            });
                            setDialogType("edit");
                          }}
                          style={editBtn}
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => alert(`Invoice ${invoice.id} Downloaded`)}
                          style={downloadBtn}
                        >
                          <FaDownload />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedInvoice(invoice);
                            setDialogType("delete");
                          }}
                          style={deleteBtn}
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

      {/* Modal Dialog container */}
      {selectedInvoice && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "15px",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "white",
              width: "100%",
              maxWidth: "450px",
              borderRadius: "20px",
              padding: "25px",
              position: "relative",
            }}
          >
            <button
              onClick={() => setSelectedInvoice(null)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                border: "none",
                background: "#ef4444",
                color: "white",
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              X
            </button>

            {/* Dialog View: Add Invoice */}
            {dialogType === "add" && (
              <>
                <h2 style={{ marginBottom: "20px" }}>Add Invoice</h2>
                <input
                  placeholder="Invoice ID (e.g. INV004)"
                  value={newInvoice.id}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, id: e.target.value })
                  }
                  style={dialogInput}
                />
                <input
                  placeholder="Customer Name"
                  value={newInvoice.customer}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, customer: e.target.value })
                  }
                  style={dialogInput}
                />
                <input
                  type="date"
                  value={newInvoice.date}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, date: e.target.value })
                  }
                  style={dialogInput}
                />
                <input
                  placeholder="Amount (e.g. 5000)"
                  value={newInvoice.amount}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, amount: e.target.value })
                  }
                  style={dialogInput}
                />
                <select
                  value={newInvoice.status}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, status: e.target.value })
                  }
                  style={{ ...dialogInput, backgroundColor: "#fff" }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
                <button onClick={handleAddInvoice} style={saveBtn}>
                  Add Invoice
                </button>
              </>
            )}

            {/* Dialog View: Edit Invoice */}
            {dialogType === "edit" && (
              <>
                <h2 style={{ marginBottom: "20px" }}>Edit Invoice ({selectedInvoice.id})</h2>
                <label style={{ fontSize: "13px", color: "#6b7280" }}>Customer Name</label>
                <input
                  value={editForm.customer}
                  onChange={(e) => setEditForm({ ...editForm, customer: e.target.value })}
                  style={dialogInput}
                />
                <label style={{ fontSize: "13px", color: "#6b7280" }}>Amount (₹)</label>
                <input
                  value={editForm.amount}
                  onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                  style={dialogInput}
                />
                <button onClick={handleEditInvoice} style={saveBtn}>
                  Save Changes
                </button>
              </>
            )}

            {/* Dialog View: Delete Invoice */}
            {dialogType === "delete" && (
              <>
                <h2 style={{ marginBottom: "20px", color: "#ef4444" }}>
                  Delete Invoice
                </h2>
                <p style={{ marginBottom: "20px" }}>
                  Are you sure you want to delete <strong>{selectedInvoice.id}</strong>?
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => setSelectedInvoice(null)} style={cancelBtn}>
                    Cancel
                  </button>
                  <button onClick={handleDeleteInvoice} style={deleteConfirmBtn}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Styling Objects
const tableHead = {
  textAlign: "left",
  padding: "16px",
  borderBottom: "1px solid #e5e7eb",
  whiteSpace: "nowrap",
  color: "#4b5563",
  fontWeight: "600"
};

const tableData = {
  padding: "16px",
  borderBottom: "1px solid #e5e7eb",
  whiteSpace: "nowrap",
  color: "#1f2937"
};

const editBtn = {
  width: "38px",
  height: "38px",
  border: "none",
  borderRadius: "10px",
  background: "#fef3c7",
  color: "#f59e0b",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

const downloadBtn = {
  width: "38px",
  height: "38px",
  border: "none",
  borderRadius: "10px",
  background: "#dcfce7",
  color: "#10b981",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

const deleteBtn = {
  width: "38px",
  height: "38px",
  border: "none",
  borderRadius: "10px",
  background: "#fee2e2",
  color: "#ef4444",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

const dialogInput = {
  width: "100%",
  padding: "14px",
  marginTop: "4px",
  marginBottom: "15px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "15px",
  boxSizing: "border-box",
};

const saveBtn = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "12px",
  background: "#4f46e5",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "10px"
};

const cancelBtn = {
  flex: 1,
  padding: "12px",
  border: "none",
  borderRadius: "12px",
  background: "#d1d5db",
  cursor: "pointer",
  fontWeight: "600"
};
const deleteConfirmBtn = {
  flex: 1,
  padding: "12px",
  border: "none",
  borderRadius: "12px",
  background: "#ef4444",
  color: "white",
  cursor: "pointer",
  fontWeight: "600"
};

export default Dashboard;