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

  const [modalItems, setModalItems] = useState([{ name: "", qty: 1, price: "" }]);

  useEffect(() => {
    localStorage.setItem("billing_invoices_v4", JSON.stringify(invoices));
  }, [invoices]);

  const calculateInvoiceTotal = (items) => {
    return items.reduce((sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0), 0);
  };

  const handleAddItemRow = () => {
    setModalItems([...modalItems, { name: "", qty: 1, price: "" }]);
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...modalItems];
    if (field === "qty" || field === "price") {
      updated[index][field] = value === "" ? "" : Number(value);
    } else {
      updated[index][field] = value;
    }

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

  const handleDownloadPDF = (invoice) => {
    try {
      const doc = new jsPDF();
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

      doc.setTextColor(17, 24, 39);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Billed To:", 15, 55);

      doc.setFont("helvetica", "normal");
      doc.text(`Customer Name : ${invoice.customer}`, 15, 63);
      doc.text(`Payment Status : ${invoice.status}`, 15, 70);

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
      alert("Could not generate PDF.");
    }
  };

  const totalRevenue = invoices.reduce((acc, inv) => acc + calculateInvoiceTotal(inv.items), 0);
  const paidCount = invoices.filter((i) => i.status === "Paid").length;
  const pendingCount = invoices.filter((i) => i.status === "Pending").length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const cardFadeVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 85 } }
  };

  return (
    <div style={backgroundWrapperStyle}>
      <Sidebar />

      <div style={{ flex: 1, minWidth: 0, zIndex: 1 }}>
        <TopNav title="Billing" />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ padding: "24px" }}
        >
          {/* Hero Banner with Modern Gradient */}
          <motion.div 
            variants={cardFadeVariants}
            style={{ 
              background: "linear-gradient(135deg, rgba(79, 70, 229, 0.85), rgba(124, 58, 237, 0.85))", 
              borderRadius: "24px", 
              padding: "35px", 
              color: "white", 
              marginBottom: "24px",
              backdropFilter: "blur(12px)",
              boxShadow: "0 20px 40px -15px rgba(79, 70, 229, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.15)"
            }}
          >
            <h1 style={{ fontSize: "clamp(26px,4vw,38px)", marginBottom: "8px", fontWeight: "800", letterSpacing: "-0.5px" }}>Billing Hub</h1>
            <p style={{ opacity: 0.9, margin: 0, fontSize: "15px" }}>Add products dynamically, observe live state totals, and download receipts with glassmorphic styles.</p>
          </motion.div>

          {/* Glassmorphic Metric KPI Grid */}
          <motion.div 
            variants={cardFadeVariants}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "20px", marginBottom: "24px" }}
          >
            <motion.div whileHover={{ scale: 1.03, y: -4, backgroundColor: "rgba(255,255,255,0.16)" }} style={glassCardStyle}>
              <div>
                <p style={labelStyle}>Total Revenue</p>
                <h2 style={valueStyle}>₹ {totalRevenue.toLocaleString("en-IN")}</h2>
              </div>
              <div style={{ ...iconBox, background: "linear-gradient(135deg, #4f46e5, #6366f1)" }}><FaMoneyBillWave /></div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03, y: -4, backgroundColor: "rgba(255,255,255,0.16)" }} style={glassCardStyle}>
              <div>
                <p style={labelStyle}>Paid Invoices</p>
                <h2 style={valueStyle}>{paidCount}</h2>
              </div>
              <div style={{ ...iconBox, background: "linear-gradient(135deg, #10b981, #34d399)" }}><FaCheckCircle /></div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03, y: -4, backgroundColor: "rgba(255,255,255,0.16)" }} style={glassCardStyle}>
              <div>
                <p style={labelStyle}>Pending Action</p>
                <h2 style={valueStyle}>{pendingCount}</h2>
              </div>
              <div style={{ ...iconBox, background: "linear-gradient(135deg, #f59e0b, #fbbf24)" }}><FaFileInvoiceDollar /></div>
            </motion.div>
          </motion.div>

          {/* Glassmorphic Data Table Section Container */}
          <motion.div 
            variants={cardFadeVariants}
            style={{ 
              background: "rgba(255, 255, 255, 0.08)", 
              borderRadius: "24px", 
              padding: "24px", 
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
              <h2 style={{ color: "#ffffff", margin: 0, fontWeight: "700", letterSpacing: "-0.3px" }}>Recent Invoices</h2>
              <motion.button 
                whileHover={{ scale: 1.04, boxShadow: "0 8px 25px rgba(99, 102, 241, 0.5)" }} 
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowModal(true)} 
                style={addBtn}
              >
                <FaPlus /> Create Invoice
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              {invoices.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "50px 10px", textAlign: "center" }}
                >
                  <img 
                    src="https://www.gstatic.com/images/branding/product/2x/receipt_48dp.png" 
                    alt="Empty collection state logo" 
                    style={{ width: "70px", height: "70px", marginBottom: "15px", filter: "drop-shadow(0px 8px 16px rgba(255,255,255,0.2))" }}
                  />
                  <h3 style={{ color: "#ffffff", margin: "0 0 6px 0", fontWeight: "600" }}>No Invoices Records Logged</h3>
                  <p style={{ color: "#cbd5e1", margin: 0, fontSize: "14px" }}>Generate transactional layouts to view records inside this system.</p>
                </motion.div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", minWidth: "850px", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "rgba(255, 255, 255, 0.06)" }}>
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
                              exit={{ opacity: 0, x: 10 }}
                              transition={{ duration: 0.2 }}
                              style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
                            >
                              <td style={tdStyle}>{invoice.id}</td>
                              <td style={tdStyle}><strong style={{ color: "#ffffff" }}>{invoice.customer}</strong></td>
                              <td style={tdStyle}>
                                <div style={{ fontSize: "13px", color: "#e2e8f0", display: "flex", flexDirection: "column", gap: "4px" }}>
                                  {invoice.items.map((it, idx) => (
                                    <div key={idx}>
                                      • {it.name} <span style={{ color: "#94a3b8", fontWeight: "600" }}>({it.qty}x)</span>
                                    </div>
                                  ))}
                                </div>
                              </td>
                              <td style={tdStyle}>{invoice.date}</td>
                              <td style={tdStyle}><strong style={{ color: "#6366f1" }}>₹ {invoiceTotal.toLocaleString("en-IN")}</strong></td>
                              <td style={tdStyle}>
                                <span style={{
                                  background: invoice.status === "Paid" ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)",
                                  color: invoice.status === "Paid" ? "#34d399" : "#fbbf24",
                                  padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "600", display: "inline-block",
                                  border: invoice.status === "Paid" ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(245, 158, 11, 0.3)"
                                }}>
                                  {invoice.status}
                                </span>
                              </td>
                              <td style={tdStyle}>
                                <div style={{ display: "flex", gap: "10px" }}>
                                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleDownloadPDF(invoice)} style={downloadBtn}>
                                    <FaDownload />
                                  </motion.button>
                                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleDelete(invoice.id)} style={deleteBtn}>
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
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* DETAILED INTERACTIVE INVOICE GENERATOR MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(8px)", display: "flex", justifyContent: "center", alignItems: "center", padding: "15px", zIndex: 9999 }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 25 }}
              transition={{ type: "spring", duration: 0.35 }}
              style={{ background: "#1e293b", width: "100%", maxWidth: "650px", borderRadius: "24px", padding: "25px", position: "relative", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: "15px", right: "15px", width: "32px", height: "32px", border: "none", borderRadius: "50%", background: "rgba(239, 68, 68, 0.2)", color: "#f87171", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>✕</button>

              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px", background: "rgba(255,255,255,0.03)", padding: "14px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <img 
                  src="https://www.gstatic.com/images/branding/product/2x/receipt_48dp.png" 
                  alt="Invoice Setup Document" 
                  style={{ width: "42px", height: "42px" }} 
                />
                <div>
                  <h2 style={{ margin: 0, color: "#ffffff", fontSize: "18px", fontWeight: "700" }}>Create Detailed Invoice</h2>
                  <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>Generate dynamic running itemized receipts</p>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <input type="text" placeholder="Invoice ID" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} style={inputStyle} />
                <input type="text" placeholder="Customer Name" value={formData.customer} onChange={(e) => setFormData({ ...formData, customer: e.target.value })} style={inputStyle} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} style={inputStyle} />
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} style={selectStyle}>
                  <option>Pending</option>
                  <option>Paid</option>
                </select>
              </div>

              <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "15px 0" }} />
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h4 style={{ color: "#cbd5e1", margin: 0 }}>Products Purchased</h4>
                <span style={{ fontSize: "14px", color: "#818cf8", fontWeight: "700" }}>Running Total: ₹ {calculateInvoiceTotal(modalItems).toLocaleString("en-IN")}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <AnimatePresence initial={false}>
                  {modalItems.map((item, index) => {
                    const rowTotal = Number(item.qty || 0) * Number(item.price || 0);

                    return (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ display: "flex", gap: "8px", alignItems: "center" }}
                      >
                        <select 
                          value={item.name} 
                          onChange={(e) => handleItemChange(index, "name", e.target.value)} 
                          style={{ ...selectStyle, marginBottom: 0, flex: 3 }}
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
                          style={{ ...inputStyle, marginBottom: 0, flex: 1.5, background: "rgba(255,255,255,0.05)", color: "#94a3b8" }} 
                          readOnly 
                        />

                        <div style={{ flex: 1.5, fontSize: "14px", fontWeight: "600", color: "#ffffff", textAlign: "right", paddingRight: "5px" }}>
                          ₹ {rowTotal.toLocaleString("en-IN")}
                        </div>
                        
                        {modalItems.length > 1 && (
                          <button type="button" onClick={() => handleRemoveItemRow(index)} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: "16px" }}>✕</button>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              <motion.button 
                whileHover={{ scale: 1.01, background: "rgba(255,255,255,0.08)" }}
                whileTap={{ scale: 0.99 }}
                type="button" 
                onClick={handleAddItemRow} 
                style={{ background: "transparent", border: "1px dashed rgba(255,255,255,0.2)", padding: "10px 12px", borderRadius: "12px", cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "#cbd5e1", marginTop: "15px", marginBottom: "20px", display: "block", width: "100%" }}
              >
                + Add Another Product
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(79, 70, 229, 0.4)" }}
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

/* DESIGN ARCHITECTURE PROPERTIES WITH GLASSMORPHIC GLOW EFFECTS */
const backgroundWrapperStyle = { 
  display: "flex", 
  minHeight: "100vh", 
  overflowX: "hidden",
  backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed"
};

const glassCardStyle = { 
  background: "rgba(255, 255, 255, 0.07)", 
  borderRadius: "20px", 
  padding: "22px", 
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "center", 
  backdropFilter: "blur(14px)",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
};

const iconBox = { 
  width: "48px", 
  height: "48px", 
  borderRadius: "14px", 
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center", 
  color: "white", 
  fontSize: "18px"
};

const addBtn = { 
  padding: "12px 22px", 
  border: "none", 
  borderRadius: "14px", 
  background: "#4f46e5", 
  color: "white", 
  display: "flex", 
  alignItems: "center", 
  gap: "10px", 
  cursor: "pointer", 
  fontWeight: "600",
  boxShadow: "0 4px 14px 0 rgba(79, 70, 229, 0.3)"
};

const labelStyle = { color: "#94a3b8", marginBottom: "4px", fontSize: "14px", fontWeight: "500" };
const valueStyle = { fontSize: "26px", color: "#ffffff", fontWeight: "800", margin: 0 };
const thStyle = { textAlign: "left", padding: "16px", borderBottom: "1px solid rgba(255,255,255,0.12)", whiteSpace: "nowrap", color: "#cbd5e1", fontSize: "14px", fontWeight: "600" };
const tdStyle = { padding: "16px", verticalAlign: "middle", color: "#e2e8f0", fontSize: "14px" };
const downloadBtn = { width: "36px", height: "36px", border: "none", borderRadius: "10px", background: "rgba(16, 185, 129, 0.15)", color: "#34d399", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" };
const deleteBtn = { width: "36px", height: "36px", border: "none", borderRadius: "10px", background: "rgba(239, 68, 68, 0.15)", color: "#f87171", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" };

const inputStyle = { width: "100%", padding: "12px 14px", marginBottom: "12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", outline: "none", fontSize: "14px", boxSizing: "border-box", background: "rgba(255,255,255,0.05)", color: "#ffffff" };
const selectStyle = { ...inputStyle, color: "#ffffff", background: "#1e293b" };

export default BillingPage;