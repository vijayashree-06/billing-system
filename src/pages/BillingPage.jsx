// src/pages/BillingPage.jsx

import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";

import {
  FaPlus,
  FaTrash,
  FaDownload,
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";

function BillingPage() {
  const [showModal, setShowModal] =
    useState(false);

  const [invoices, setInvoices] =
    useState([
      {
        id: "INV001",
        customer: "Arjun",
        amount: "₹12,000",
        status: "Paid",
        date: "28 May 2026",
      },

      {
        id: "INV002",
        customer: "Rahul",
        amount: "₹8,500",
        status: "Pending",
        date: "27 May 2026",
      },

      {
        id: "INV003",
        customer: "Kavin",
        amount: "₹5,400",
        status: "Paid",
        date: "26 May 2026",
      },
    ]);

  const [formData, setFormData] =
    useState({
      id: "",
      customer: "",
      amount: "",
      status: "Pending",
      date: "",
    });

  // ADD INVOICE

  const handleAddInvoice = () => {
    if (
      !formData.id ||
      !formData.customer ||
      !formData.amount ||
      !formData.date
    ) {
      alert("Please fill all fields");
      return;
    }

    setInvoices([
      ...invoices,
      formData,
    ]);

    setFormData({
      id: "",
      customer: "",
      amount: "",
      status: "Pending",
      date: "",
    });

    setShowModal(false);
  };

  // DELETE INVOICE

  const handleDelete = (id) => {
    const updated = invoices.filter(
      (invoice) =>
        invoice.id !== id
    );

    setInvoices(updated);
  };

  // TOTALS

  const totalRevenue =
    invoices.reduce(
      (acc, item) =>
        acc +
        Number(
          item.amount.replace(
            /[^0-9]/g,
            ""
          )
        ),
      0
    );

  const paidInvoices =
    invoices.filter(
      (invoice) =>
        invoice.status === "Paid"
    ).length;

  const pendingInvoices =
    invoices.filter(
      (invoice) =>
        invoice.status ===
        "Pending"
    ).length;

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

      {/* Main */}

      <div
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <TopNav title="Billing" />

        <div
          style={{
            padding: "20px",
          }}
        >
          {/* Header */}

          <div
            style={{
              background:
                "linear-gradient(to right,#4f46e5,#7c3aed)",
              borderRadius: "24px",
              padding: "30px",
              color: "white",
              marginBottom: "20px",
            }}
          >
            <h1
              style={{
                fontSize:
                  "clamp(28px,5vw,42px)",
                marginBottom: "10px",
              }}
            >
              Billing Management
            </h1>

            <p
              style={{
                opacity: 0.9,
              }}
            >
              Create, manage and
              monitor invoices
              efficiently
            </p>
          </div>

          {/* Stats */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(240px,1fr))",
              gap: "18px",
              marginBottom: "20px",
            }}
          >
            {/* Revenue */}

            <div style={cardStyle}>
              <div>
                <p style={labelStyle}>
                  Revenue
                </p>

                <h2 style={valueStyle}>
                  ₹
                  {totalRevenue.toLocaleString()}
                </h2>
              </div>

              <div
                style={{
                  ...iconBox,
                  background:
                    "#4f46e5",
                }}
              >
                <FaMoneyBillWave />
              </div>
            </div>

            {/* Paid */}

            <div style={cardStyle}>
              <div>
                <p style={labelStyle}>
                  Paid Invoices
                </p>

                <h2 style={valueStyle}>
                  {paidInvoices}
                </h2>
              </div>

              <div
                style={{
                  ...iconBox,
                  background:
                    "#10b981",
                }}
              >
                <FaCheckCircle />
              </div>
            </div>

            {/* Pending */}

            <div style={cardStyle}>
              <div>
                <p style={labelStyle}>
                  Pending
                </p>

                <h2 style={valueStyle}>
                  {
                    pendingInvoices
                  }
                </h2>
              </div>

              <div
                style={{
                  ...iconBox,
                  background:
                    "#f59e0b",
                }}
              >
                <FaFileInvoiceDollar />
              </div>
            </div>
          </div>

          {/* Invoice Table */}

          <div
            style={{
              background: "white",
              borderRadius: "22px",
              padding: "20px",
              overflowX: "auto",
            }}
          >
            {/* Top */}

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <h2
                style={{
                  color: "#111827",
                }}
              >
                Recent Invoices
              </h2>

              <button
                onClick={() =>
                  setShowModal(true)
                }
                style={addBtn}
              >
                <FaPlus />
                Create Invoice
              </button>
            </div>

            {/* Table */}

            <table
              style={{
                width: "100%",
                minWidth: "850px",
                borderCollapse:
                  "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    background:
                      "#f9fafb",
                  }}
                >
                  <th style={thStyle}>
                    Invoice ID
                  </th>

                  <th style={thStyle}>
                    Customer
                  </th>

                  <th style={thStyle}>
                    Date
                  </th>

                  <th style={thStyle}>
                    Amount
                  </th>

                  <th style={thStyle}>
                    Status
                  </th>

                  <th style={thStyle}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {invoices.map(
                  (invoice, index) => (
                    <tr key={index}>
                      <td style={tdStyle}>
                        {invoice.id}
                      </td>

                      <td style={tdStyle}>
                        {
                          invoice.customer
                        }
                      </td>

                      <td style={tdStyle}>
                        {invoice.date}
                      </td>

                      <td style={tdStyle}>
                        {
                          invoice.amount
                        }
                      </td>

                      <td style={tdStyle}>
                        <span
                          style={{
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

                            padding:
                              "6px 14px",

                            borderRadius:
                              "20px",

                            fontSize:
                              "14px",

                            fontWeight:
                              "600",
                          }}
                        >
                          {
                            invoice.status
                          }
                        </span>
                      </td>

                      <td style={tdStyle}>
                        <div
                          style={{
                            display:
                              "flex",
                            gap: "10px",
                          }}
                        >
                          {/* Download */}

                          <button
                            onClick={() =>
                              alert(
                                "Invoice Downloaded"
                              )
                            }
                            style={
                              downloadBtn
                            }
                          >
                            <FaDownload />
                          </button>

                          {/* Delete */}

                          <button
                            onClick={() =>
                              handleDelete(
                                invoice.id
                              )
                            }
                            style={
                              deleteBtn
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

      {/* MODAL */}

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.5)",
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
              maxWidth: "500px",
              borderRadius: "24px",
              padding: "25px",
              position: "relative",
            }}
          >
            {/* Close */}

            <button
              onClick={() =>
                setShowModal(false)
              }
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                width: "35px",
                height: "35px",
                border: "none",
                borderRadius: "50%",
                background: "#ef4444",
                color: "white",
                cursor: "pointer",
              }}
            >
              X
            </button>

            <h2
              style={{
                marginBottom: "20px",
                color: "#111827",
              }}
            >
              Create Invoice
            </h2>

            {/* Inputs */}

            <input
              type="text"
              placeholder="Invoice ID"
              value={formData.id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  id: e.target.value,
                })
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Customer Name"
              value={
                formData.customer
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  customer:
                    e.target.value,
                })
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount:
                    e.target.value,
                })
              }
              style={inputStyle}
            />

            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date: e.target.value,
                })
              }
              style={inputStyle}
            />

            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status:
                    e.target.value,
                })
              }
              style={inputStyle}
            >
              <option>
                Pending
              </option>

              <option>Paid</option>
            </select>

            {/* Button */}

            <button
              onClick={
                handleAddInvoice
              }
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                borderRadius: "14px",
                background:
                  "#4f46e5",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Add Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* STYLES */

const cardStyle = {
  background: "white",
  borderRadius: "20px",
  padding: "22px",
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
  boxShadow:
    "0 4px 12px rgba(0,0,0,0.08)",
};

const labelStyle = {
  color: "#6b7280",
  marginBottom: "8px",
};

const valueStyle = {
  fontSize: "32px",
  color: "#111827",
};

const iconBox = {
  width: "60px",
  height: "60px",
  borderRadius: "18px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontSize: "22px",
};

const addBtn = {
  padding: "14px 18px",
  border: "none",
  borderRadius: "14px",
  background: "#4f46e5",
  color: "white",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
  fontWeight: "600",
};

const thStyle = {
  textAlign: "left",
  padding: "16px",
  borderBottom: "1px solid #e5e7eb",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "16px",
  borderBottom: "1px solid #e5e7eb",
  whiteSpace: "nowrap",
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

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "14px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "15px",
  boxSizing: "border-box",
};

export default BillingPage;