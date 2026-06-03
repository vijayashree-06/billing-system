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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // DYNAMIC FORM STATES
  const [customer, setCustomer] = useState("");
  const [status, setStatus] = useState("Pending");
  const [products, setProducts] = useState([{ name: "", qty: 1, price: 0 }]);

  // HIDDEN TEMPLATE REF FOR PDF GENERATION
  const pdfTemplateRef = useRef(null);
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      {/* ADVANCED GLOW ARCHITECTURE STYLESHEET */}
      <style>{`
        @keyframes modalFadeUp {
          from { opacity: 0; transform: translate3d(0, 24px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes overlayFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* THE MAIN HEADER HERO NEON TRIGGER BUTTON */
        .header-glow-btn {
          position: relative;
          background: #ffffff !important;
          color: #4f46e5 !important;
          z-index: 1;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
          box-shadow: 0 4px 14px rgba(255, 255, 255, 0.3) !important;
        }
        .header-glow-btn:hover {
          transform: translate3d(0, -3px, 0) !important;
          box-shadow: 
            0 0 0 2px rgba(255, 255, 255, 0.4),
            0 8px 24px rgba(255, 255, 255, 0.55),
            0 16px 40px rgba(255, 255, 255, 0.35) !important;
        }

        /* METRIC/SUM CARD NEON RADIANCE SYSTEM */
        .stat-card-glow {
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        
        /* Indigo Total Counter Card Glow */
        .total-card-glow {
          box-shadow: 0 4px 20px -2px rgba(79, 70, 229, 0.06) !important;
        }
        .total-card-glow:hover {
          transform: translate3d(0, -6px, 0);
          border-color: rgba(79, 70, 229, 0.3) !important;
          box-shadow: 
            0 10px 25px -5px rgba(79, 70, 229, 0.15),
            0 20px 40px -10px rgba(79, 70, 229, 0.25) !important;
        }

        /* Emerald Paid Sum Card Glow */
        .paid-card-glow {
          box-shadow: 0 4px 20px -2px rgba(16, 185, 129, 0.06) !important;
        }
        .paid-card-glow:hover {
          transform: translate3d(0, -6px, 0);
          border-color: rgba(16, 185, 129, 0.3) !important;
          box-shadow: 
            0 10px 25px -5px rgba(16, 185, 129, 0.15),
            0 20px 40px -10px rgba(16, 185, 129, 0.25) !important;
        }

        /* Amber Pending Clearances Card Glow */
        .pending-card-glow {
          box-shadow: 0 4px 20px -2px rgba(245, 158, 11, 0.06) !important;
        }
        .pending-card-glow:hover {
          transform: translate3d(0, -6px, 0);
          border-color: rgba(245, 158, 11, 0.3) !important;
          box-shadow: 
            0 10px 25px -5px rgba(245, 158, 11, 0.15),
            0 20px 40px -10px rgba(245, 158, 11, 0.25) !important;
        }

        /* ACTION ROW GRID INTERACTIONS */
        .action-btn-glow {
          position: relative;
          z-index: 1;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .action-btn-glow:hover {
          transform: translate3d(0, -3px, 0) scale(1.08);
        }
        .btn-view-glow:hover {
          background: #4f46e5 !important;
          color: #ffffff !important;
          box-shadow: 0 6px 20px rgba(79, 70, 229, 0.5) !important;
        }
        .btn-edit-glow:hover {
          background: #d97706 !important;
          color: #ffffff !important;
          box-shadow: 0 6px 20px rgba(217, 119, 6, 0.5) !important;
        }
        .btn-download-glow:hover {
          background: #16a34a !important;
          color: #ffffff !important;
          box-shadow: 0 6px 20px rgba(22, 163, 74, 0.5) !important;
        }
        .btn-delete-glow:hover {
          background: #dc2626 !important;
          color: #ffffff !important;
          box-shadow: 0 6px 20px rgba(220, 38, 38, 0.5) !important;
        }

        /* MODAL INTERFACES ACCENT SAVE ACTUATORS */
        .modal-save-glow {
          position: relative;
          z-index: 1;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
          background: linear-gradient(135deg, #4f46e5, #7c3aed) !important;
          box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35) !important;
        }
        .modal-save-glow:hover {
          transform: translate3d(0, -3px, 0) !important;
          filter: brightness(1.08);
          box-shadow: 
            0 0 0 1px rgba(124, 58, 237, 0.3),
            0 8px 20px rgba(79, 70, 229, 0.5),
            0 16px 36px rgba(124, 58, 237, 0.4) !important;
        }
        
        .table-row-hover {
          transition: background 0.2s ease;
        }
        .table-row-hover:hover {
          background: #f8fafc !important;
        }

        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      {/* FIXED SIDEBAR WRAPPER */}
      <div style={{ height: "100vh", position: "sticky", top: 0, zIndex: 100, flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* MAIN SCROLLABLE DASHBOARD CORES */}
      <div style={styles.mainContent}>
        
        {/* HEADER HERO BANNER WITH DECORATIVE BACKGROUND VECTORS */}
        <div style={styles.header}>
          <div style={{ position: "relative", zIndex: 2 }}>
            <h1 style={styles.heading}>Invoices</h1>
            <p style={styles.subText}>Manage, look inside, modify and track transactions flawlessly</p>
          </div>
          <button 
            className="header-glow-btn"
            style={styles.addButton} 
            onClick={openCreateModal}
          >
            <FaPlus /> Create Invoice
          </button>
          <div style={{ position: "absolute", top: "-40px", right: "-30px", width: "190px", height: "190px", background: "rgba(255,255,255,0.08)", borderRadius: "50%" }}></div>
          <div style={{ position: "absolute", bottom: "-50px", right: "120px", width: "130px", height: "130px", background: "rgba(255,255,255,0.05)", borderRadius: "50%" }}></div>
        </div>

        {/* METRICS DASHBOARD GRID HOUSING RADIANT TOTAL SUM SUMMARY BUTTON CARDS */}
        <div style={{...styles.statsGrid, gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))"}}>
          {/* TOTAL COUNTER METRIC CARD */}
          <div className="stat-card-glow total-card-glow" style={styles.statCard}>
            <div style={styles.statIconBlue}><FaFileInvoiceDollar /></div>
            <div>
              <h2 style={styles.statValue}>{invoices.length}</h2>
              <p style={styles.statLabel}>Total Counter</p>
            </div>
          </div>

          {/* PAID SUM METRIC CARD */}
          <div className="stat-card-glow paid-card-glow" style={styles.statCard}>
            <div style={styles.statIconGreen}><FaCheckCircle /></div>
            <div>
              <h2 style={styles.statValue}>{calculatePaidTotal()}</h2>
              <p style={styles.statLabel}>Paid Sum</p>
            </div>
          </div>

          {/* PENDING CLEARANCES METRIC CARD */}
          <div className="stat-card-glow pending-card-glow" style={styles.statCard}>
            <div style={styles.statIconOrange}><FaClock /></div>
            <div>
              <h2 style={styles.statValue}>{invoices.filter((i) => i.status === "Pending").length}</h2>
              <p style={styles.statLabel}>Pending Clearances</p>
            </div>
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
                <tr key={invoice.id} className="table-row-hover" style={styles.tr}>
                  <td style={{ ...styles.td, color: "#4f46e5", fontWeight: "700" }}>{invoice.id}</td>
                  <td style={{ ...styles.td, fontWeight: "600", color: "#0f172a" }}>{invoice.customer}</td>
                  <td style={{ ...styles.td, fontWeight: "700" }}>₹{calculateTotal(invoice.products).toLocaleString("en-IN")}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        background: invoice.status === "Paid" ? "#dcfce7" : "#ffe4e6",
                        color: invoice.status === "Paid" ? "#166534" : "#991b1b",
                      }}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td style={{ ...styles.td, color: "#64748b" }}>{invoice.date}</td>
                  <td style={styles.td}>
                    <div style={styles.actionContainer}>
                      <button className="action-btn-glow btn-view-glow" style={styles.viewButton} onClick={() => openViewModal(invoice)} title="View Item Details">
                        <FaEye />
                      </button>
                      <button className="action-btn-glow btn-edit-glow" style={styles.editButton} onClick={() => openEditModal(invoice)} title="Edit Records">
                        <FaEdit />
                      </button>
                      <button className="action-btn-glow btn-download-glow" style={styles.downloadButton} onClick={() => triggerPdfDownload(invoice)} title="Extract PDF Document">
                        <FaDownload />
                      </button>
                      <button className="action-btn-glow btn-delete-glow" style={styles.deleteButton} onClick={() => deleteInvoice(invoice.id)} title="Erase Permanently">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ ...styles.td, textAlign: "center", color: "#94a3b8", padding: "60px" }}>
                    No valid billing profiles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* UNIFIED INTERACTIVE INTERFACE MODAL (CREATE / VIEW / EDIT) */}
        {modalMode && (
          <div style={{ ...styles.modalOverlay, animation: "overlayFade 0.2s ease forwards" }}>
            <div style={{ ...styles.modal, maxWidth: modalMode === "view" ? "580px" : "680px", animation: "modalFadeUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}>
              <h2 style={styles.modalTitle}>
                {modalMode === "create" && "Formulate New Invoice"}
                {modalMode === "view" && `Statement View Profile — ${activeInvoice?.id}`}
                {modalMode === "edit" && `Modify Document Entry — ${activeInvoice?.id}`}
              </h2>

              {modalMode === "view" ? (
                // VIEWING LAYOUT
                <div>
                  <div style={styles.viewMetaBox}>
                    <p style={{ margin: 0 }}><strong>Recipient:</strong> <br/><span style={{color: "#334155"}}>{activeInvoice.customer}</span></p>
                    <p style={{ margin: 0 }}><strong>Issuance Date:</strong> <br/><span style={{color: "#334155"}}>{activeInvoice.date}</span></p>
                    <p style={{ margin: "10px 0 0 0", gridColumn: "1 / -1" }}>
                      return <strong>Status:</strong>{" "}
                      <span
                        style={{
                          ...styles.status,
                          background: activeInvoice.status === "Paid" ? "#dcfce7" : "#ffe4e6",
                          color: activeInvoice.status === "Paid" ? "#166534" : "#991b1b",
                        }}
                      >
                        {activeInvoice.status}
                      </span>
                    </p>
                  </div>

                  <h3 style={styles.sectionDividerHeading}>Purchased Inventory Specifications</h3>
                  <div style={{overflowX: "auto"}}>
                    <table style={styles.innerTable}>
                      <thead>
                        <tr style={{ background: "#f8fafc" }}>
                          <th style={styles.innerTh}>Product / Description</th>
                          <th style={{...styles.innerTh, textAlign: "center"}}>Qty</th>
                          <th style={{...styles.innerTh, textAlign: "right"}}>Unit Cost</th>
                          <th style={{...styles.innerTh, textAlign: "right"}}>Line Aggregate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeInvoice.products.map((p, i) => (
                          <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{...styles.innerTd, fontWeight: "600"}}>{p.name}</td>
                            <td style={{...styles.innerTd, textAlign: "center", color: "#64748b"}}>{p.qty}</td>
                            <td style={{...styles.innerTd, textAlign: "right"}}>₹{p.price.toLocaleString("en-IN")}</td>
                            <td style={{...styles.innerTd, textAlign: "right", fontWeight: "700", color: "#0f172a"}}>₹{(p.qty * p.price).toLocaleString("en-IN")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div style={styles.grandTotalSection}>
                    <p style={{ margin: 0, color: "#64748b", fontSize: "14px", fontWeight: "600" }}>Grand Payable Amount</p>
                    <h3 style={{ margin: 0, fontSize: "24px", fontWeight: "800", color: "#4f46e5" }}>₹{calculateTotal(activeInvoice.products).toLocaleString("en-IN")}</h3>
                  </div>

                  <div style={styles.modalBtnContainer}>
                    <button style={styles.cancelBtn} onClick={() => setModalMode(null)}>Close Window</button>
                    <button className="modal-save-glow" style={styles.createBtn} onClick={() => { setModalMode(null); triggerPdfDownload(activeInvoice); }}>
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

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#1e293b" }}>Inventory Order Rows</h3>
                    <button type="button" style={styles.smallAddRowBtn} onClick={addProductRow}>
                      <FaPlus /> Add Line
                    </button>
                  </div>

                  <div className="custom-scroll" style={styles.productFormScrollArea}>
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
                          style={{ ...styles.modalInput, flex: 1, marginBottom: 0, textAlign: "center" }}
                        />
                        <input
                          type="number"
                          placeholder="Price"
                          min="0"
                          value={prod.price || ""}
                          onChange={(e) => handleProductChange(index, "price", e.target.value)}
                          style={{ ...styles.modalInput, flex: 1.5, marginBottom: 0, textAlign: "right" }}
                        />
                        <button
                          type="button"
                          disabled={products.length === 1}
                          onClick={() => removeProductRow(index)}
                          style={{
                            ...styles.deleteButton,
                            width: "46px",
                            height: "46px",
                            borderRadius: "12px",
                            opacity: products.length === 1 ? 0.3 : 1,
                            flexShrink: 0,
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div style={{ textAlign: "right", padding: "20px 0", borderTop: "1px dashed #e2e8f0" }}>
                    <p style={{ margin: "0 0 4px 0", color: "#64748b", fontSize: "13px", fontWeight: "600" }}>Estimated Total Matrix</p>
                    <h4 style={{ margin: 0, color: "#0f172a", fontSize: "20px", fontWeight: "800" }}>
                      ₹{calculateTotal(products).toLocaleString("en-IN")}
                    </h4>
                  </div>

                  <div style={styles.modalBtnContainer}>
                    <button style={styles.cancelBtn} onClick={() => setModalMode(null)}>Discard Updates</button>
                    <button className="modal-save-glow" style={styles.createBtn} onClick={handleSaveInvoice}>
                      {modalMode === "create" ? "Generate Document" : "Apply Transformations"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* HIDDEN OFF-SCREEN RENDERING ENGINE FOR HTML2PDF */}
      {pdfData && (
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
          <div ref={pdfTemplateRef} style={pdfStyles.pdfPageCanvas}>
            <div style={pdfStyles.invoiceHeaderSection}>
              <div>
                <h1 style={{ margin: "0 0 5px 0", color: "#4f46e5", letterSpacing: "-0.03em" }}>INVOICE RECORD</h1>
                <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>System Ledger Output Sheet</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <h2 style={{ margin: 0, color: "#111827" }}>{pdfData.id}</h2>
                <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>Date: {pdfData.date}</p>
              </div>
            </div>

            <hr style={{ border: "0", borderTop: "2px solid #e5e7eb", margin: "20px 0" }} />

            <div style={{ marginBottom: "30px" }}>
              <p style={{ margin: "0 0 5px 0", textTransform: "uppercase", fontSize: "11px", color: "#9ca3af", fontWeight: "bold", letterSpacing: "0.05em" }}>Billed Destination Recipient</p>
              <h3 style={{ margin: "0 0 5px 0", fontSize: "18px", color: "#111827" }}>{pdfData.customer}</h3>
              <p style={{ margin: 0, fontSize: "14px" }}>Account Status Token: <strong style={{color: pdfData.status === "Paid" ? "#16a34a" : "#d97706"}}>{pdfData.status.toUpperCase()}</strong></p>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "30px" }}>
              <thead>
                <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
                  <th style={{ padding: "12px", borderBottom: "2px solid #e5e7eb", color: "#374151" }}>Inventory Product Description</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #e5e7eb", textAlign: "center", color: "#374151" }}>Quantity</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #e5e7eb", textAlign: "right", color: "#374151" }}>Rate Value</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #e5e7eb", textAlign: "right", color: "#374151" }}>Line Sum Total</th>
                </tr>
              </thead>
              <tbody>
                {pdfData.products.map((item, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "12px", color: "#111827", fontWeight: "500" }}>{item.name}</td>
                    <td style={{ padding: "12px", textAlign: "center", color: "#4b5563" }}>{item.qty}</td>
                    <td style={{ padding: "12px", textAlign: "right", color: "#4b5563" }}>₹{item.price.toLocaleString("en-IN")}</td>
                    <td style={{ padding: "12px", textAlign: "right", color: "#111827", fontWeight: "700" }}>₹{(item.qty * item.price).toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ textAlign: "right", marginTop: "40px", padding: "20px", background: "#f9fafb", borderRadius: "12px" }}>
              <p style={{margin: "0 0 4px 0", color: "#6b7280", fontSize: "13px", fontWeight: "600"}}>Grand Summary Total</p>
              <h2 style={{ margin: 0, color: "#4f46e5", fontSize: "26px", fontWeight: "800" }}>₹{calculateTotal(pdfData.products).toLocaleString("en-IN")}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// STYLE MATRIX
const styles = {
  pageContainer: { display: "flex", height: "100vh", background: "#f8fafc", overflow: "hidden", fontFamily: "system-ui, -apple-system, sans-serif" },
  mainContent: { flex: 1, height: "100vh", overflowY: "auto", overflowX: "hidden", padding: "40px 30px", boxSizing: "border-box" },
  header: { 
    position: "relative",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)", 
    padding: "36px 40px", 
    borderRadius: "24px", 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    gap: "20px", 
    flexWrap: "wrap", 
    marginBottom: "32px",
    boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.25)",
    overflow: "hidden"
  },
  heading: { fontSize: "36px", fontWeight: "800", color: "#ffffff", marginBottom: "6px", margin: 0, letterSpacing: "-0.02em" },
  subText: { color: "rgba(255,255,255,0.85)", fontSize: "15px", margin: 0, fontWeight: "500" },
  addButton: { border: "none", background: "#ffffff", color: "#4f46e5", padding: "14px 24px", borderRadius: "14px", cursor: "pointer", fontWeight: "700", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.06)", transition: "all 0.2s ease" },
  statsGrid: { display: "grid", gap: "24px", marginBottom: "32px" },
  statCard: { background: "#ffffff", padding: "24px", borderRadius: "20px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "20px", transition: "all 0.3s ease", cursor: "pointer" },
  statIconBlue: { width: "56px", height: "56px", borderRadius: "14px", background: "rgba(79, 70, 229, 0.08)", color: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 },
  statIconGreen: { width: "56px", height: "56px", borderRadius: "14px", background: "rgba(16, 185, 129, 0.08)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 },
  statIconOrange: { width: "56px", height: "56px", borderRadius: "14px", background: "rgba(245, 158, 11, 0.08)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 },
  statValue: { fontSize: "28px", fontWeight: "800", color: "#0f172a", marginBottom: "2px", margin: 0, letterSpacing: "-0.01em" },
  statLabel: { color: "#64748b", margin: 0, fontSize: "14px", fontWeight: "500" },
  searchContainer: { background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "14px 20px", display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" },
  searchIcon: { color: "#94a3b8", fontSize: "16px" },
  searchInput: { border: "none", outline: "none", width: "100%", fontSize: "15px", color: "#0f172a", fontWeight: "500" },
  tableWrapper: { width: "100%", overflowX: "auto", background: "#ffffff", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "900px" },
  th: { textAlign: "left", padding: "16px 20px", background: "#f8fafc", color: "#475569", fontSize: "13px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.03em", borderBottom: "1px solid #e2e8f0" },
  tr: { borderBottom: "1px solid #f1f5f9", transition: "background 0.2s ease" },
  td: { padding: "18px 20px", color: "#334155", fontSize: "15px", verticalAlign: "middle" },
  status: { padding: "6px 12px", borderRadius: "30px", fontSize: "12px", fontWeight: "700", display: "inline-block" },
  actionContainer: { display: "flex", gap: "8px" },
  viewButton: { border: "none", background: "#f1f5f9", color: "#4f46e5", width: "36px", height: "36px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", transition: "all 0.2s ease" },
  editButton: { border: "none", background: "#f1f5f9", color: "#d97706", width: "36px", height: "36px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", transition: "all 0.2s ease" },
  downloadButton: { border: "none", background: "#f1f5f9", color: "#16a34a", width: "36px", height: "36px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", transition: "all 0.2s ease" },
  deleteButton: { border: "none", background: "#fff1f2", color: "#dc2626", width: "36px", height: "36px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", transition: "all 0.2s ease" },
  modalOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(15, 23, 42, 0.3)", backdropFilter: "blur(6px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
  modal: { width: "92%", background: "#ffffff", padding: "36px", borderRadius: "24px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)", boxSizing: "border-box" },
  modalTitle: { fontSize: "24px", fontWeight: "800", marginBottom: "24px", color: "#0f172a", margin: 0, letterSpacing: "-0.01em" },
  inputLabelField: { display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "8px", letterSpacing: "0.01em" },
  modalInput: { width: "100%", padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: "12px", marginBottom: "20px", outline: "none", fontSize: "15px", boxSizing: "border-box", background: "#f8fafc", color: "#0f172a", fontWeight: "500", transition: "border 0.2s" },
  smallAddRowBtn: { border: "none", background: "rgba(79, 70, 229, 0.08)", color: "#4f46e5", padding: "8px 14px", borderRadius: "10px", cursor: "pointer", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" },
  productFormScrollArea: { maxHeight: "220px", overflowY: "auto", marginBottom: "20px", paddingRight: "4px" },
  productFormRow: { display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" },
  viewMetaBox: { background: "#f8fafc", border: "1px solid #e2e8f0", padding: "18px", borderRadius: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "24px", fontSize: "14px", color: "#64748b" },
  sectionDividerHeading: { fontSize: "15px", fontWeight: "700", color: "#334155", marginBottom: "14px", paddingBottom: "4px" },
  innerTable: { width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px", minWidth: "450px" },
  innerTh: { padding: "12px", color: "#475569", fontWeight: "700", fontSize: "12px", textTransform: "uppercase" },
  innerTd: { padding: "14px 12px", color: "#334155" },
  grandTotalSection: { textAlign: "right", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #e2e8f0" },
  modalBtnContainer: { display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "28px" },
  cancelBtn: { padding: "14px 22px", border: "none", borderRadius: "12px", background: "#f1f5f9", cursor: "pointer", fontWeight: "600", color: "#475569", fontSize: "15px" },
  createBtn: { padding: "14px 24px", border: "none", borderRadius: "12px", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white", cursor: "pointer", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)" },
};

const pdfStyles = {
  pdfPageCanvas: { padding: "40px", width: "170mm", background: "white", fontFamily: "Helvetica, Arial, sans-serif", color: "#111827" },
  invoiceHeaderSection: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
};

export default InvoicesPage;