// src/pages/InvoicesPage.jsx

import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/layout/Sidebar";
import html2pdf from "html2pdf.js";

import {
  FaSearch,
  FaFileInvoiceDollar,
  FaDownload,
  FaEye,
  FaTrash,
  FaPlus,
  FaCheckCircle,
  FaClock,
  FaEdit,
} from "react-icons/fa";

// INITIAL MOCK DATA WITH PRODUCTS
const initialInvoices = [
  {
    id: "INV-1001",
    customer: "Arun Kumar",
    status: "Paid",
    date: "12 May 2026",
    products: [
      { name: "Wireless Mouse", qty: 2, price: 1500 },
      { name: "Mechanical Keyboard", qty: 1, price: 9500 },
    ],
  },
  {
    id: "INV-1002",
    customer: "Priya Stores",
    status: "Pending",
    date: "15 May 2026",
    products: [{ name: "27-inch Monitor", qty: 1, price: 8200 }],
  },
  {
    id: "INV-1003",
    customer: "Vijay Enterprises",
    status: "Paid",
    date: "18 May 2026",
    products: [
      { name: "Office Chair", qty: 2, price: 8000 },
      { name: "Desk Mat", qty: 2, price: 3200 },
    ],
  },
  {
    id: "INV-1004",
    customer: "Kavin Traders",
    status: "Pending",
    date: "20 May 2026",
    products: [{ name: "USB-C Hub", qty: 3, price: 2250 }],
  },
];

function InvoicesPage() {
  // PERSISTENCE STATE
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem("local_invoices");
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  useEffect(() => {
    localStorage.setItem("local_invoices", JSON.stringify(invoices));
  }, [invoices]);

  // SEARCH & MODAL CONTROL STATES
  const [search, setSearch] = useState("");
  const [modalMode, setModalMode] = useState(null); // 'create' | 'view' | 'edit' | null
  const [activeInvoice, setActiveInvoice] = useState(null);

  // DYNAMIC FORM STATES
  const [customer, setCustomer] = useState("");
  const [status, setStatus] = useState("Pending");
  const [products, setProducts] = useState([{ name: "", qty: 1, price: 0 }]);

  // HIDDEN TEMPLATE REF FOR PDF GENERATION
  const pdfTemplateRef = useRef(null);
  const [pdfData, setPdfData] = useState(null);

  // HELPER FOR CALCULATING TOTAL AMOUNT FROM PRODUCT ARRAYS
  const calculateTotal = (prodList) => {
    return prodList.reduce((sum, item) => sum + item.qty * Number(item.price || 0), 0);
  };

  // HELPER FOR STATS CARDS TOTALS
  const calculatePaidTotal = () => {
    const totalPaid = invoices
      .filter((i) => i.status === "Paid")
      .reduce((sum, i) => sum + calculateTotal(i.products), 0);
    return totalPaid >= 100000 ? `₹${(totalPaid / 100000).toFixed(1)}L` : `₹${totalPaid.toLocaleString("en-IN")}`;
  };

  // FILTER LOGIC
  const filteredInvoices = invoices.filter((invoice) =>
    invoice.customer.toLowerCase().includes(search.toLowerCase())
  );

  // MODAL MANAGEMENT OPENERS
  const openCreateModal = () => {
    setCustomer("");
    setStatus("Pending");
    setProducts([{ name: "", qty: 1, price: 0 }]);
    setModalMode("create");
  };

  const openViewModal = (invoice) => {
    setActiveInvoice(invoice);
    setModalMode("view");
  };

  const openEditModal = (invoice) => {
    setActiveInvoice(invoice);
    setCustomer(invoice.customer);
    setStatus(invoice.status);
    setProducts([...invoice.products]);
    setModalMode("edit");
  };

  // DYNAMIC PRODUCT ROW ACTIONS
  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = field === "name" ? value : Number(value);
    setProducts(updated);
  };

  const addProductRow = () => {
    setProducts([...products, { name: "", qty: 1, price: 0 }]);
  };

  const removeProductRow = (index) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  // CRUD CORE ACTIONS
  const handleSaveInvoice = () => {
    if (!customer.trim() || products.some((p) => !p.name.trim() || p.price <= 0)) {
      alert("Please check your entries. All item names must be filled with a valid pricing rate.");
      return;
    }

    if (modalMode === "create") {
      const newInv = {
        id: "INV-" + Math.floor(1000 + Math.random() * 9000),
        customer,
        status,
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        products,
      };
      setInvoices([newInv, ...invoices]);
    } else if (modalMode === "edit") {
      setInvoices(
        invoices.map((inv) =>
          inv.id === activeInvoice.id ? { ...inv, customer, status, products } : inv
        )
      );
    }
    setModalMode(null);
  };

  const deleteInvoice = (id) => {
    if (window.confirm("Are you sure you want to drop this record?")) {
      setInvoices(invoices.filter((inv) => inv.id !== id));
    }
  };

  // PDF DOWNLOAD TRIGGER
  const triggerPdfDownload = (invoice) => {
    setPdfData(invoice);
    setTimeout(() => {
      const element = pdfTemplateRef.current;
      const options = {
        margin: 15,
        filename: `${invoice.id}_${invoice.customer.replace(/\s+/g, "_")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      html2pdf().from(element).save().then(() => setPdfData(null));
    }, 150);
  };

  return (
    <div style={styles.pageContainer}>
      <Sidebar />

      <div style={styles.mainContent}>
        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.heading}>Invoices</h1>
            <p style={styles.subText}>Manage, look inside, modify and track transactions flawlessly</p>
          </div>
          <button style={styles.addButton} onClick={openCreateModal}>
            <FaPlus /> Create Invoice
          </button>
        </div>

        {/* METRICS DASHBOARD */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIconBlue}><FaFileInvoiceDollar /></div>
            <h2 style={styles.statValue}>{invoices.length}</h2>
            <p style={styles.statLabel}>Total Counter</p>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIconGreen}><FaCheckCircle /></div>
            <h2 style={styles.statValue}>{calculatePaidTotal()}</h2>
            <p style={styles.statLabel}>Paid Sum</p>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIconOrange}><FaClock /></div>
            <h2 style={styles.statValue}>{invoices.filter((i) => i.status === "Pending").length}</h2>
            <p style={styles.statLabel}>Pending Clearances</p>
          </div>
        </div>

        {/* UTILITY SEARCH BAR */}
        <div style={styles.searchContainer}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search customer lookup..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* CORE DATA LEDGER */}
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Invoice ID</th>
                <th style={styles.th}>Customer Name</th>
                <th style={styles.th}>Total Value</th>
                <th style={styles.th}>Clearance Status</th>
                <th style={styles.th}>Issued Date</th>
                <th style={styles.th}>Action Grid</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} style={styles.tr}>
                  <td style={styles.td}>{invoice.id}</td>
                  <td style={styles.td}>{invoice.customer}</td>
                  <td style={styles.td}>₹{calculateTotal(invoice.products).toLocaleString("en-IN")}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        background: invoice.status === "Paid" ? "#dcfce7" : "#fef3c7",
                        color: invoice.status === "Paid" ? "#166534" : "#92400e",
                      }}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td style={styles.td}>{invoice.date}</td>
                  <td style={styles.td}>
                    <div style={styles.actionContainer}>
                      <button style={styles.viewButton} onClick={() => openViewModal(invoice)} title="View Item Details">
                        <FaEye />
                      </button>
                      <button style={styles.editButton} onClick={() => openEditModal(invoice)} title="Edit Records">
                        <FaEdit />
                      </button>
                      <button style={styles.downloadButton} onClick={() => triggerPdfDownload(invoice)} title="Extract PDF Document">
                        <FaDownload />
                      </button>
                      <button style={styles.deleteButton} onClick={() => deleteInvoice(invoice.id)} title="Erase Permanently">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ ...styles.td, textAlign: "center", color: "#9ca3af", padding: "40px" }}>
                    No valid billing profiles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* UNIFIED INTERACTIVE INTERFACE MODAL (CREATE / VIEW / EDIT) */}
        {modalMode && (
          <div style={styles.modalOverlay}>
            <div style={{ ...styles.modal, maxWidth: modalMode === "view" ? "550px" : "650px" }}>
              <h2 style={styles.modalTitle}>
                {modalMode === "create" && "Formulate New Invoice"}
                {modalMode === "view" && `Statement View Profile — ${activeInvoice?.id}`}
                {modalMode === "edit" && `Modify Document Entry — ${activeInvoice?.id}`}
              </h2>

              {modalMode === "view" ? (
                // VIEWING LAYOUT
                <div>
                  <div style={styles.viewMetaBox}>
                    <p><strong>Recipient:</strong> {activeInvoice.customer}</p>
                    <p><strong>Issuance Date:</strong> {activeInvoice.date}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        style={{
                          ...styles.status,
                          background: activeInvoice.status === "Paid" ? "#dcfce7" : "#fef3c7",
                          color: activeInvoice.status === "Paid" ? "#166534" : "#92400e",
                        }}
                      >
                        {activeInvoice.status}
                      </span>
                    </p>
                  </div>

                  <h3 style={styles.sectionDividerHeading}>Purchased Inventory Specifications</h3>
                  <table style={styles.innerTable}>
                    <thead>
                      <tr style={{ background: "#f3f4f6" }}>
                        <th style={styles.innerTh}>Product / Description</th>
                        <th style={styles.innerTh}>Qty</th>
                        <th style={styles.innerTh}>Unit Cost</th>
                        <th style={styles.innerTh}>Line Aggregate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeInvoice.products.map((p, i) => (
                        <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                          <td style={styles.innerTd}>{p.name}</td>
                          <td style={styles.innerTd}>{p.qty}</td>
                          <td style={styles.innerTd}>₹{p.price.toLocaleString("en-IN")}</td>
                          <td style={styles.innerTd}>₹{(p.qty * p.price).toLocaleString("en-IN")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div style={styles.grandTotalSection}>
                    <h3>Grand Payable: ₹{calculateTotal(activeInvoice.products).toLocaleString("en-IN")}</h3>
                  </div>

                  <div style={styles.modalBtnContainer}>
                    <button style={styles.cancelBtn} onClick={() => setModalMode(null)}>Close Window</button>
                    <button style={styles.createBtn} onClick={() => { setModalMode(null); triggerPdfDownload(activeInvoice); }}>
                      <FaDownload /> Print Layout
                    </button>
                  </div>
                </div>
              ) : (
                // INPUT ENGINE FOR BOTH CREATE AND EDIT MODES
                <div>
                  <label style={styles.inputLabelField}>Customer System Identity Name</label>
                  <input
                    type="text"
                    placeholder="E.g., John Doe Retailers"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    style={styles.modalInput}
                  />

                  <label style={styles.inputLabelField}>Process State Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} style={styles.modalInput}>
                    <option value="Pending">Pending Processing</option>
                    <option value="Paid">Cleared / Paid</option>
                  </select>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <h3 style={{ margin: 0, fontSize: "16px", color: "#374151" }}>Inventory Order Rows</h3>
                    <button type="button" style={styles.smallAddRowBtn} onClick={addProductRow}>
                      <FaPlus /> Add Line
                    </button>
                  </div>

                  <div style={styles.productFormScrollArea}>
                    {products.map((prod, index) => (
                      <div key={index} style={styles.productFormRow}>
                        <input
                          type="text"
                          placeholder="Product Name"
                          value={prod.name}
                          onChange={(e) => handleProductChange(index, "name", e.target.value)}
                          style={{ ...styles.modalInput, flex: 3, marginBottom: 0 }}
                        />
                        <input
                          type="number"
                          placeholder="Qty"
                          min="1"
                          value={prod.qty}
                          onChange={(e) => handleProductChange(index, "qty", e.target.value)}
                          style={{ ...styles.modalInput, flex: 1, marginBottom: 0 }}
                        />
                        <input
                          type="number"
                          placeholder="Price"
                          min="0"
                          value={prod.price || ""}
                          onChange={(e) => handleProductChange(index, "price", e.target.value)}
                          style={{ ...styles.modalInput, flex: 1.5, marginBottom: 0 }}
                        />
                        <button
                          type="button"
                          disabled={products.length === 1}
                          onClick={() => removeProductRow(index)}
                          style={{
                            ...styles.deleteButton,
                            width: "44px",
                            height: "44px",
                            borderRadius: "12px",
                            opacity: products.length === 1 ? 0.4 : 1,
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div style={{ textAlign: "right", padding: "15px 0", borderTop: "1px solid #e5e7eb" }}>
                    <h4 style={{ margin: 0, color: "#1f2937", fontSize: "16px" }}>
                      Estimated Matrix Total: ₹{calculateTotal(products).toLocaleString("en-IN")}
                    </h4>
                  </div>

                  <div style={styles.modalBtnContainer}>
                    <button style={styles.cancelBtn} onClick={() => setModalMode(null)}>Discard Updates</button>
                    <button style={styles.createBtn} onClick={handleSaveInvoice}>
                      {modalMode === "create" ? "Generate Document" : "Apply Transformations"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* HIDDEN OFF-SCREEN COMPONENT INCHARGE OF RENDERING DOM DATA TO HTML2PDF */}
      {pdfData && (
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
          <div ref={pdfTemplateRef} style={pdfStyles.pdfPageCanvas}>
            <div style={pdfStyles.invoiceHeaderSection}>
              <div>
                <h1 style={{ margin: "0 0 5px 0", color: "#4f46e5" }}>INVOICE RECORD</h1>
                <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>System Ledger Output Sheet</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <h2 style={{ margin: 0 }}>{pdfData.id}</h2>
                <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>Date: {pdfData.date}</p>
              </div>
            </div>

            <hr style={{ border: "0", borderTop: "2px solid #e5e7eb", margin: "20px 0" }} />

            <div style={{ marginBottom: "30px" }}>
              <p style={{ margin: "0 0 5px 0", textTransform: "uppercase", fontSize: "12px", color: "#9ca3af", fontWeight: "bold" }}>Billed Destination Recipient</p>
              <h3 style={{ margin: "0 0 5px 0", fontSize: "18px" }}>{pdfData.customer}</h3>
              <p style={{ margin: 0 }}>Account Status Token: <strong>{pdfData.status.toUpperCase()}</strong></p>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "30px" }}>
              <thead>
                <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
                  <th style={{ padding: "12px", borderBottom: "2px solid #e5e7eb" }}>Inventory Product Description</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #e5e7eb", textAlign: "center" }}>Quantity</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #e5e7eb", textAlign: "right" }}>Rate Value</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #e5e7eb", textAlign: "right" }}>Line Sum Total</th>
                </tr>
              </thead>
              <tbody>
                {pdfData.products.map((item, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "12px" }}>{item.name}</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>{item.qty}</td>
                    <td style={{ padding: "12px", textAlign: "right" }}>₹{item.price.toLocaleString("en-IN")}</td>
                    <td style={{ padding: "12px", textAlign: "right" }}>₹{(item.qty * item.price).toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ textAlign: "right", marginTop: "40px", padding: "15px", background: "#f9fafb", borderRadius: "10px" }}>
              <h2 style={{ margin: 0, color: "#111827" }}>Grand Summary Total: ₹{calculateTotal(pdfData.products).toLocaleString("en-IN")}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// STYLES MATRIX EXTENSIONS
const styles = {
  pageContainer: { display: "flex", minHeight: "100vh", background: "#f3f4f6", fontFamily: "system-ui, sans-serif" },
  mainContent: { flex: 1, padding: "30px", overflowX: "hidden" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", flexWrap: "wrap", marginBottom: "30px" },
  heading: { fontSize: "40px", fontWeight: "800", color: "#111827", marginBottom: "8px", margin: 0 },
  subText: { color: "#6b7280", fontSize: "15px", margin: 0 },
  addButton: { border: "none", background: "#4f46e5", color: "white", padding: "14px 22px", borderRadius: "14px", cursor: "pointer", fontWeight: "700", display: "flex", alignItems: "center", gap: "10px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "30px" },
  statCard: { background: "white", padding: "24px", borderRadius: "22px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" },
  statIconBlue: { width: "60px", height: "60px", borderRadius: "16px", background: "#eef2ff", color: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", marginBottom: "18px" },
  statIconGreen: { width: "60px", height: "60px", borderRadius: "16px", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", marginBottom: "18px" },
  statIconOrange: { width: "60px", height: "60px", borderRadius: "16px", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", marginBottom: "18px" },
  statValue: { fontSize: "32px", fontWeight: "800", color: "#111827", marginBottom: "8px", margin: 0 },
  statLabel: { color: "#6b7280", margin: 0 },
  searchContainer: { background: "white", borderRadius: "16px", padding: "14px 18px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "30px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" },
  searchIcon: { color: "#6b7280" },
  searchInput: { border: "none", outline: "none", width: "100%", fontSize: "15px" },
  tableWrapper: { width: "100%", overflowX: "auto", background: "white", borderRadius: "22px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "900px" },
  th: { textAlign: "left", padding: "18px", background: "#f9fafb", color: "#374151", fontSize: "14px" },
  tr: { borderBottom: "1px solid #e5e7eb" },
  td: { padding: "18px", color: "#111827", fontWeight: "500" },
  status: { padding: "6px 14px", borderRadius: "30px", fontSize: "13px", fontWeight: "700" },
  actionContainer: { display: "flex", gap: "8px" },
  viewButton: { border: "none", background: "#e0e7ff", color: "#4f46e5", width: "38px", height: "38px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  editButton: { border: "none", background: "#fef3c7", color: "#d97706", width: "38px", height: "38px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  downloadButton: { border: "none", background: "#dcfce7", color: "#16a34a", width: "38px", height: "38px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  deleteButton: { border: "none", background: "#fee2e2", color: "#dc2626", width: "38px", height: "38px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  modalOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
  modal: { width: "95%", background: "white", padding: "30px", borderRadius: "22px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)", boxSizing: "border-box" },
  modalTitle: { fontSize: "24px", fontWeight: "700", marginBottom: "20px", color: "#111827", margin: 0 },
  inputLabelField: { display: "block", fontSize: "13px", fontWeight: "600", color: "#4b5563", marginBottom: "6px" },
  modalInput: { width: "100%", padding: "12px 14px", border: "1px solid #d1d5db", borderRadius: "12px", marginBottom: "16px", outline: "none", fontSize: "15px", boxSizing: "border-box", background: "#f9fafb" },
  smallAddRowBtn: { border: "none", background: "#e0e7ff", color: "#4f46e5", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" },
  productFormScrollArea: { maxVerticalHeight: "220px", overflowY: "auto", marginBottom: "15px", paddingRight: "4px" },
  productFormRow: { display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px" },
  viewMetaBox: { background: "#f9fafb", padding: "15px", borderRadius: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" },
  sectionDividerHeading: { fontSize: "16px", color: "#374151", marginBottom: "10px", borderBottom: "1px dashed #e5e7eb", paddingBottom: "6px" },
  innerTable: { width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" },
  innerTh: { padding: "10px", color: "#4b5563", fontWeight: "600" },
  innerTd: { padding: "10px", color: "#111827" },
  grandTotalSection: { textAlign: "right", marginTop: "15px", color: "#111827" },
  modalBtnContainer: { display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "20px" },
  cancelBtn: { padding: "12px 18px", border: "none", borderRadius: "12px", background: "#e5e7eb", cursor: "pointer", fontWeight: "600", color: "#374151" },
  createBtn: { padding: "12px 18px", border: "none", borderRadius: "12px", background: "#4f46e5", color: "white", cursor: "pointer", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" },
};

// COMPACT SPECIFIC CSS RULES DEVOTED EXCLUSIVELY FOR EMBEDDED ENGINE EXPORTS
const pdfStyles = {
  pdfPageCanvas: { padding: "40px", width: "170mm", background: "white", fontFamily: "Helvetica, Arial, sans-serif", color: "#111827" },
  invoiceHeaderSection: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
};

export default InvoicesPage;