// src/pages/BillingPage.jsx
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

// PRODUCT CATALOG: Add your master products and prices here
const PRODUCT_CATALOG = {
  "Wireless Mouse": 1500,
  "Mechanical Keyboard": 9000,
  "USB-C Hub": 3500,
  "HDMI Cable 2m": 2500,
  "Laptop Stand": 5400,
  "Monitor Mount": 4200,
  "RGB Desk Mat": 1200,
};

function BillingPage() {
  const [showModal, setShowModal] = useState(false);

  // PERSISTENCE: Save state in localstorage
  const [invoices, setInvoices] = useState(() => {
    const savedInvoices = localStorage.getItem("billing_invoices_v4");
    if (savedInvoices) {
      try {
        return JSON.parse(savedInvoices);
      } catch (e) {
        console.error("Failed to parse invoices", e);
      }
    }
    return [
      {
        id: "INV001",
        customer: "Arjun",
        date: "28 May 2026",
        status: "Paid",
        items: [
          { name: "Wireless Mouse", qty: 2, price: 1500 },
          { name: "Mechanical Keyboard", qty: 1, price: 9000 },
        ],
      },
    ];
  });

  const [formData, setFormData] = useState({
    id: "",
    customer: "",
    status: "Pending",
    date: "",
  });

  // Dynamic rows inside the invoice generator modal
  const [modalItems, setModalItems] = useState([{ name: "", qty: 1, price: "" }]);

  useEffect(() => {
    localStorage.setItem("billing_invoices_v4", JSON.stringify(invoices));
  }, [invoices]);

  // Master total calculation helper
  const calculateInvoiceTotal = (items) => {
    return items.reduce((sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0), 0);
  };

  const handleAddItemRow = () => {
    setModalItems([...modalItems, { name: "", qty: 1, price: "" }]);
  };

  // REAL-TIME AUTOFILL & TOTAL CALCULATION LOGIC
  const handleItemChange = (index, field, value) => {
    const updated = [...modalItems];

    if (field === "qty") {
      updated[index][field] = value === "" ? "" : Number(value);
    } else if (field === "price") {
      updated[index][field] = value === "" ? "" : Number(value);
    } else {
      updated[index][field] = value;
    }

    // Autofill price if it matches product list
    if (field === "name") {
      if (PRODUCT_CATALOG[value]) {
        updated[index]["price"] = PRODUCT_CATALOG[value];
      } else {
        updated[index]["price"] = ""; 
      }
    }

    setModalItems(updated);
  };

  const handleRemoveItemRow = (index) => {
    if (modalItems.length > 1) {
      setModalItems(modalItems.filter((_, i) => i !== index));
    }
  };

  // SAVE INVOICE
  const handleAddInvoice = () => {
    if (!formData.id || !formData.customer || !formData.date) {
      alert("Please fill all invoice configurations.");
      return;
    }

    const validItems = modalItems.filter((item) => item.name.trim() !== "" && Number(item.price) > 0);
    if (validItems.length === 0) {
      alert("Please choose at least one valid product.");
      return;
    }

    let displayDate = formData.date;
    try {
      const dateObj = new Date(formData.date);
      if (!isNaN(dateObj.getTime())) {
        displayDate = dateObj.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      }
    } catch (e) {}

    const newInvoice = {
      id: formData.id,
      customer: formData.customer,
      status: formData.status,
      date: displayDate,
      items: validItems.map((item) => ({
        name: item.name,
        qty: Number(item.qty),
        price: Number(item.price),
      })),
    };

    setInvoices([...invoices, newInvoice]);
    setFormData({ id: "", customer: "", status: "Pending", date: "" });
    setModalItems([{ name: "", qty: 1, price: "" }]);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Delete invoice ${id}?`)) {
      setInvoices(invoices.filter((inv) => inv.id !== id));
    }
  };

  // CORRECTED PDF DOWNLOAD ENGINE WITH AUTOTABLE
  const handleDownloadPDF = (invoice) => {
    try {
      const doc = new jsPDF();

      // Top Indigo Header Branding
      doc.setFillColor(79, 70, 229);
      doc.rect(0, 0, 210, 40, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(255, 255, 255);
      doc.text("INVOICE RECEIPT", 15, 25);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Invoice ID: ${invoice.id}`, 150, 20);
      doc.text(`Date: ${invoice.date}`, 150, 26);

      // Client Context Information
      doc.setTextColor(17, 24, 39);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Billed To:", 15, 55);

      doc.setFont("helvetica", "normal");
      doc.text(`Customer Name : ${invoice.customer}`, 15, 63);
      doc.text(`Payment Status : ${invoice.status}`, 15, 70);

      // AutoTable Construction
      const tableHeaders = [["#", "Product Description", "Qty", "Unit Price", "Total"]];
      const tableRows = invoice.items.map((item, index) => [
        index + 1,
        item.name,
        item.qty,
        `Rs. ${item.price.toLocaleString("en-IN")}`,
        `Rs. ${(item.qty * item.price).toLocaleString("en-IN")}`,
      ]);

      const finalTotal = calculateInvoiceTotal(invoice.items);

      autoTable(doc, {
        startY: 80,
        head: tableHeaders,
        body: tableRows,
        theme: "striped",
        headStyles: { fillColor: [124, 58, 237], fontStyle: "bold" },
        styles: { fontSize: 10, cellPadding: 5 },
        columnStyles: {
          0: { cellWidth: 10 },
          1: { cellWidth: 85 },
          2: { cellWidth: 15, halign: "center" },
          3: { cellWidth: 40, halign: "right" },
          4: { cellWidth: 40, halign: "right" },
        },
        didDrawPage: (data) => {
          let finalY = data.cursor.y + 15;
          doc.setFont("helvetica", "bold");
          doc.setFontSize(14);
          doc.text(`Grand Total: Rs. ${finalTotal.toLocaleString("en-IN")}`, 130, finalY);

          doc.setFontSize(10);
          doc.setFont("helvetica", "italic");
          doc.setTextColor(107, 114, 128);
          doc.text("Thank you for your business!", 15, finalY + 15);
        },
      });

      doc.save(`${invoice.id}_${invoice.customer}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Could not generate PDF. Please check the terminal console.");
    }
  };

  const totalRevenue = invoices.reduce((acc, inv) => acc + calculateInvoiceTotal(inv.items), 0);
  const paidCount = invoices.filter((i) => i.status === "Paid").length;
  const pendingCount = invoices.filter((i) => i.status === "Pending").length;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6", overflowX: "hidden" }}>
      <Sidebar />

      <div style={{ flex: 1, minWidth: 0 }}>
        <TopNav title="Billing" />

        <div style={{ padding: "20px" }}>
          {/* Main Hero Header banner */}
          <div style={{ background: "linear-gradient(to right,#4f46e5,#7c3aed)", borderRadius: "24px", padding: "30px", color: "white", marginBottom: "20px" }}>
            <h1 style={{ fontSize: "clamp(28px,5vw,42px)", marginBottom: "10px" }}>Billing Management</h1>
            <p style={{ opacity: 0.9 }}>Add multiple product quantities to update dynamic running subtotals and instantly export beautiful PDFs.</p>
          </div>

          {/* Aggregated Revenue Summary Blocks */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "18px", marginBottom: "20px" }}>
            <div style={cardStyle}>
              <div>
                <p style={labelStyle}>Total Revenue</p>
                <h2 style={valueStyle}>₹ {totalRevenue.toLocaleString("en-IN")}</h2>
              </div>
              <div style={{ ...iconBox, background: "#4f46e5" }}><FaMoneyBillWave /></div>
            </div>

            <div style={cardStyle}>
              <div>
                <p style={labelStyle}>Paid Invoices</p>
                <h2 style={valueStyle}>{paidCount}</h2>
              </div>
              <div style={{ ...iconBox, background: "#10b981" }}><FaCheckCircle /></div>
            </div>

            <div style={cardStyle}>
              <div>
                <p style={labelStyle}>Pending</p>
                <h2 style={valueStyle}>{pendingCount}</h2>
              </div>
              <div style={{ ...iconBox, background: "#f59e0b" }}><FaFileInvoiceDollar /></div>
            </div>
          </div>

          {/* Master Invoices Data Table View */}
          <div style={{ background: "white", borderRadius: "22px", padding: "20px", overflowX: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
              <h2 style={{ color: "#111827" }}>Recent Invoices</h2>
              <button onClick={() => setShowModal(true)} style={addBtn}>
                <FaPlus /> Create Invoice
              </button>
            </div>

            <table style={{ width: "100%", minWidth: "850px", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  <th style={thStyle}>Invoice ID</th>
                  <th style={thStyle}>Customer</th>
                  <th style={thStyle}>Products Bought</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Total Amount</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => {
                  const invoiceTotal = calculateInvoiceTotal(invoice.items);
                  return (
                    <tr key={invoice.id || index}>
                      <td style={tdStyle}>{invoice.id}</td>
                      <td style={tdStyle}><strong>{invoice.customer}</strong></td>
                      <td style={tdStyle}>
                        <div style={{ fontSize: "13px", color: "#4b5563" }}>
                          {invoice.items.map((it, idx) => (
                            <div key={idx}>• {it.name} <span style={{ color: "#9ca3af" }}>({it.qty}x)</span></div>
                          ))}
                        </div>
                      </td>
                      <td style={tdStyle}>{invoice.date}</td>
                      <td style={tdStyle}><strong>₹ {invoiceTotal.toLocaleString("en-IN")}</strong></td>
                      <td style={tdStyle}>
                        <span style={{
                          background: invoice.status === "Paid" ? "#dcfce7" : "#fef3c7",
                          color: invoice.status === "Paid" ? "#166534" : "#92400e",
                          padding: "6px 14px", borderRadius: "20px", fontSize: "14px", fontWeight: "600"
                        }}>
                          {invoice.status}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <button onClick={() => handleDownloadPDF(invoice)} style={downloadBtn} title="Download PDF">
                            <FaDownload />
                          </button>
                          <button onClick={() => handleDelete(invoice.id)} style={deleteBtn} title="Delete">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* DETAILED INTERACTIVE INVOICE GENERATOR MODAL */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", padding: "15px", zIndex: 9999 }}>
          <div style={{ background: "white", width: "100%", maxWidth: "650px", borderRadius: "24px", padding: "25px", position: "relative", maxHeight: "85vh", overflowY: "auto" }}>
            <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: "15px", right: "15px", width: "35px", height: "35px", border: "none", borderRadius: "50%", background: "#ef4444", color: "white", cursor: "pointer" }}>X</button>

            <h2 style={{ marginBottom: "20px", color: "#111827" }}>Create Detailed Invoice</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <input type="text" placeholder="Invoice ID (e.g., INV004)" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} style={inputStyle} />
              <input type="text" placeholder="Customer Name" value={formData.customer} onChange={(e) => setFormData({ ...formData, customer: e.target.value })} style={inputStyle} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} style={inputStyle} />
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} style={inputStyle}>
                <option>Pending</option>
                <option>Paid</option>
              </select>
            </div>

            <hr style={{ border: "0", borderTop: "1px solid #e5e7eb", margin: "15px 0" }} />
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <h4 style={{ color: "#374151", margin: 0 }}>Products Purchased</h4>
              <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: "600" }}>Running Total: ₹ {calculateInvoiceTotal(modalItems).toLocaleString("en-IN")}</span>
            </div>

            {/* Loop through each product row item mapping inside state */}
            {modalItems.map((item, index) => {
              const rowTotal = Number(item.qty || 0) * Number(item.price || 0);

              return (
                <div key={index} style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "10px" }}>
                  <select 
                    value={item.name} 
                    onChange={(e) => handleItemChange(index, "name", e.target.value)} 
                    style={{ ...inputStyle, marginBottom: 0, flex: 3 }}
                  >
                    <option value="">-- Choose Product --</option>
                    {Object.keys(PRODUCT_CATALOG).map((prodName) => (
                      <option key={prodName} value={prodName}>{prodName}</option>
                    ))}
                  </select>

                  <input 
                    type="number" 
                    min="1" 
                    placeholder="Qty" 
                    value={item.qty} 
                    onChange={(e) => handleItemChange(index, "qty", e.target.value)} 
                    style={{ ...inputStyle, marginBottom: 0, flex: 1 }} 
                  />

                  <input 
                    type="number" 
                    placeholder="Price" 
                    value={item.price} 
                    style={{ ...inputStyle, marginBottom: 0, flex: 1.5, background: "#f3f4f6" }} 
                    readOnly 
                  />

                  {/* Inline visual reactive tracking indicator element */}
                  <div style={{ flex: 1.5, fontSize: "14px", fontWeight: "600", color: "#111827", textAlign: "right", paddingRight: "5px" }}>
                    ₹ {rowTotal.toLocaleString("en-IN")}
                  </div>
                  
                  {modalItems.length > 1 && (
                    <button type="button" onClick={() => handleRemoveItemRow(index)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "16px" }}>✕</button>
                  )}
                </div>
              );
            })}

            <button type="button" onClick={handleAddItemRow} style={{ background: "#f3f4f6", border: "1px dashed #d1d5db", padding: "8px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "#4b5563", marginBottom: "20px", display: "block" }}>
              + Add Another Product
            </button>

            <button onClick={handleAddInvoice} style={{ width: "100%", padding: "15px", border: "none", borderRadius: "14px", background: "#4f46e5", color: "white", fontSize: "16px", fontWeight: "600", cursor: "pointer" }}>
              Generate & Save Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* DESIGN & INTERFACE LAYOUT PROPERTIES */
const cardStyle = { background: "white", borderRadius: "20px", padding: "22px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" };
const labelStyle = { color: "#6b7280", marginBottom: "8px", fontSize: "14px" };
const valueStyle = { fontSize: "28px", color: "#111827", fontWeight: "bold" };
const iconBox = { width: "54px", height: "54px", borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: "20px" };
const addBtn = { padding: "12px 18px", border: "none", borderRadius: "14px", background: "#4f46e5", color: "white", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: "600" };
const thStyle = { textAlign: "left", padding: "16px", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap", color: "#374151" };
const tdStyle = { padding: "16px", borderBottom: "1px solid #e5e7eb", verticalAlign: "top" };
const downloadBtn = { width: "38px", height: "38px", border: "none", borderRadius: "10px", background: "#dcfce7", color: "#10b981", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" };
const deleteBtn = { width: "38px", height: "38px", border: "none", borderRadius: "10px", background: "#fee2e2", color: "#ef4444", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" };
const inputStyle = { width: "100%", padding: "12px 14px", marginBottom: "12px", borderRadius: "12px", border: "1px solid #d1d5db", outline: "none", fontSize: "14px", boxSizing: "border-box" };

export default BillingPage;