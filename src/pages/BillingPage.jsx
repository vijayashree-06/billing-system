// src/pages/BillingPage.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// PRODUCT CATALOG
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

    if (field === "qty" || field === "price") {
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

  // PDF DOWNLOAD ENGINE WITH AUTOTABLE
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
          {/* Main Hero Header Banner with subtle initial fade entry and glow shadow */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ 
              background: "linear-gradient(to right, #4f46e5, #7c3aed)", 
              borderRadius: "24px", 
              padding: "30px", 
              color: "white", 
              marginBottom: "20px",
              boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.3)"
            }}
          >
            <h1 style={{ fontSize: "clamp(28px,5vw,42px)", marginBottom: "10px" }}>Billing Management</h1>
            <p style={{ opacity: 0.9 }}>Add multiple product quantities to update dynamic running subtotals and instantly export beautiful PDFs.</p>
          </motion.div>

          {/* Aggregated Revenue Summary Blocks with interactive hover glows */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "18px", marginBottom: "20px" }}>
            <motion.div 
              whileHover={{ 
                scale: 1.03, 
                y: -4,
                boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.16), 0 10px 10px -5px rgba(79, 70, 229, 0.1)" 
              }} 
              transition={{ type: "spring", stiffness: 300 }} 
              style={cardStyle}
            >
              <div>
                <p style={labelStyle}>Total Revenue</p>
                <h2 style={valueStyle}>₹ {totalRevenue.toLocaleString("en-IN")}</h2>
              </div>
              <div style={{ ...iconBox, background: "#4f46e5" }}><FaMoneyBillWave /></div>
            </motion.div>

            <motion.div 
              whileHover={{ 
                scale: 1.03, 
                y: -4,
                boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.16), 0 10px 10px -5px rgba(16, 185, 129, 0.1)" 
              }} 
              transition={{ type: "spring", stiffness: 300 }} 
              style={cardStyle}
            >
              <div>
                <p style={labelStyle}>Paid Invoices</p>
                <h2 style={valueStyle}>{paidCount}</h2>
              </div>
              <div style={{ ...iconBox, background: "#10b981" }}><FaCheckCircle /></div>
            </motion.div>

            <motion.div 
              whileHover={{ 
                scale: 1.03, 
                y: -4,
                boxShadow: "0 20px 25px -5px rgba(245, 158, 11, 0.16), 0 10px 10px -5px rgba(245, 158, 11, 0.1)" 
              }} 
              transition={{ type: "spring", stiffness: 300 }} 
              style={cardStyle}
            >
              <div>
                <p style={labelStyle}>Pending</p>
                <h2 style={valueStyle}>{pendingCount}</h2>
              </div>
              <div style={{ ...iconBox, background: "#f59e0b" }}><FaFileInvoiceDollar /></div>
            </motion.div>
          </div>

          {/* Master Invoices Data Table View */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ background: "white", borderRadius: "22px", padding: "20px", overflowX: "auto", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
              <h2 style={{ color: "#111827", margin: 0 }}>Recent Invoices</h2>
              <motion.button 
                whileHover={{ scale: 1.04, boxShadow: "0 6px 20px 0 rgba(79, 70, 229, 0.5)" }} 
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowModal(true)} 
                style={addBtn}
              >
                <FaPlus /> Create Invoice
              </motion.button>
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
              <motion.tbody layout>
                <AnimatePresence>
                  {invoices.map((invoice, index) => {
                    const invoiceTotal = calculateInvoiceTotal(invoice.items);
                    return (
                      <motion.tr 
                        key={invoice.id || index}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        style={{ borderBottom: "1px solid #e5e7eb" }}
                      >
                        <td style={tdStyle}>{invoice.id}</td>
                        <td style={tdStyle}><strong>{invoice.customer}</strong></td>
                        <td style={tdStyle}>
                          <div style={{ fontSize: "13px", color: "#4b5563", display: "flex", flexDirection: "column", gap: "4px" }}>
                            {invoice.items.map((it, idx) => (
                              <div key={idx}>
                                • {it.name} <span style={{ color: "#9ca3af", fontWeight: "600" }}>({it.qty}x)</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td style={tdStyle}>{invoice.date}</td>
                        <td style={tdStyle}><strong>₹ {invoiceTotal.toLocaleString("en-IN")}</strong></td>
                        <td style={tdStyle}>
                          <span style={{
                            background: invoice.status === "Paid" ? "#dcfce7" : "#fef3c7",
                            color: invoice.status === "Paid" ? "#166534" : "#92400e",
                            padding: "6px 14px", borderRadius: "20px", fontSize: "14px", fontWeight: "600", display: "inline-block"
                          }}>
                            {invoice.status}
                          </span>
                        </td>
                        <td style={tdStyle}>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleDownloadPDF(invoice)} style={downloadBtn} title="Download PDF">
                              <FaDownload />
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleDelete(invoice.id)} style={deleteBtn} title="Delete">
                              <FaTrash />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </motion.tbody>
            </table>
          </motion.div>
        </div>
      </div>

      {/* DETAILED INTERACTIVE INVOICE GENERATOR MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", padding: "15px", zIndex: 9999 }}
          >
            <motion.div 
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              style={{ background: "white", width: "100%", maxWidth: "650px", borderRadius: "24px", padding: "25px", position: "relative", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}
            >
              <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: "15px", right: "15px", width: "32px", height: "32px", border: "none", borderRadius: "50%", background: "#fee2e2", color: "#ef4444", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

              <h2 style={{ marginBottom: "20px", color: "#111827" }}>Create Detailed Invoice</h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <input type="text" placeholder="Invoice ID (e.g., INV004)" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} style={inputStyle} />
                <input type="text" placeholder="Customer Name" value={formData.customer} onChange={(e) => setFormData({ ...formData, customer: e.target.value })} style={inputStyle} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} style={inputStyle} />
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} style={inputStyle}>
                  <option>Pending</option>
                  <option>Paid</option>
                </select>
              </div>

              <hr style={{ border: "0", borderTop: "1px solid #e5e7eb", margin: "15px 0" }} />
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h4 style={{ color: "#374151", margin: 0 }}>Products Purchased</h4>
                <span style={{ fontSize: "14px", color: "#4f46e5", fontWeight: "700" }}>Running Total: ₹ {calculateInvoiceTotal(modalItems).toLocaleString("en-IN")}</span>
              </div>

              {/* Loop through each product row item mapping inside state */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <AnimatePresence initial={false}>
                  {modalItems.map((item, index) => {
                    const rowTotal = Number(item.qty || 0) * Number(item.price || 0);

                    return (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: "flex", gap: "8px", alignItems: "center", overflow: "hidden" }}
                      >
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

                        <div style={{ flex: 1.5, fontSize: "14px", fontWeight: "600", color: "#111827", textAlign: "right", paddingRight: "5px" }}>
                          ₹ {rowTotal.toLocaleString("en-IN")}
                        </div>
                        
                        {modalItems.length > 1 && (
                          <button type="button" onClick={() => handleRemoveItemRow(index)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "16px", padding: "0 4px" }}>✕</button>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, background: "#e2e8f0" }}
                whileTap={{ scale: 0.98 }}
                type="button" 
                onClick={handleAddItemRow} 
                style={{ background: "#f3f4f6", border: "1px dashed #d1d5db", padding: "10px 12px", borderRadius: "10px", cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "#4b5563", marginTop: "15px", marginBottom: "20px", display: "block", width: "100%", textAlign: "center" }}
              >
                + Add Another Product
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: "0 6px 20px 0 rgba(79, 70, 229, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddInvoice} 
                style={{ width: "100%", padding: "15px", border: "none", borderRadius: "14px", background: "#4f46e5", color: "white", fontSize: "16px", fontWeight: "600", cursor: "pointer" }}
              >
                Generate & Save Invoice
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* DESIGN & INTERFACE LAYOUT PROPERTIES WITH GLOW EFFECTS */
const cardStyle = { 
  background: "white", 
  borderRadius: "20px", 
  padding: "22px", 
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "center", 
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 10px 20px -5px rgba(79, 70, 229, 0.08)", 
  border: "1px solid rgba(229, 231, 235, 0.8)",
  transition: "box-shadow 0.3s ease"
};

const iconBox = { 
  width: "50px", 
  height: "50px", 
  borderRadius: "14px", 
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center", 
  color: "white", 
  fontSize: "20px",
  boxShadow: "inset 0 2px 4px rgba(255, 255, 255, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)"
};

const addBtn = { 
  padding: "12px 20px", 
  border: "none", 
  borderRadius: "14px", 
  background: "#4f46e5", 
  color: "white", 
  display: "flex", 
  alignItems: "center", 
  gap: "10px", 
  cursor: "pointer", 
  fontWeight: "600", 
  boxShadow: "0 4px 14px 0 rgba(79, 70, 229, 0.35)",
  transition: "box-shadow 0.2s ease"
};

const labelStyle = { color: "#6b7280", marginBottom: "4px", fontSize: "14px" };
const valueStyle = { fontSize: "26px", color: "#111827", fontWeight: "bold", margin: 0 };
const thStyle = { textAlign: "left", padding: "16px", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap", color: "#4b5563", fontSize: "14px", fontWeight: "600" };
const tdStyle = { padding: "16px", verticalAlign: "middle", color: "#1f2937", fontSize: "15px" };
const downloadBtn = { width: "36px", height: "36px", border: "none", borderRadius: "10px", background: "#dcfce7", color: "#10b981", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" };
const deleteBtn = { width: "36px", height: "36px", border: "none", borderRadius: "10px", background: "#fee2e2", color: "#ef4444", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" };
const inputStyle = { width: "100%", padding: "12px 14px", marginBottom: "12px", borderRadius: "12px", border: "1px solid #e5e7eb", outline: "none", fontSize: "14px", boxSizing: "border-box", background: "#f9fafb", transition: "border 0.2s" };

export default BillingPage;