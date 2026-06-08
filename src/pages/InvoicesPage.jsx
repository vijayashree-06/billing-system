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
  FaImage,
} from "react-icons/fa";

// STABLE BASE64 DATA STREAMS FOR MODAL/PDF GRAPHICS
const placeholderImages = {
  mouse: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%234f46e5' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' style='background:%23e0e7ff'><rect x='5' y='2' width='14' height='20' rx='7' ry='7'></rect><path d='M12 2v6'></path></svg>",
  keyboard: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%23059669' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' style='background:%23d1fae5'><rect x='2' y='4' width='20' height='16' rx='2' ry='2'></rect><path d='M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 16h10'></path></svg>",
  monitor: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%23d97706' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' style='background:%23fef3c7'><rect x='2' y='3' width='20' height='14' rx='2' ry='2'></rect><line x1='8' y1='21' x2='16' y2='21'></line><line x1='12' y1='17' x2='12' y2='21'></line></svg>",
  generic: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' style='background:%23f1f5f9'><path d='M12.89 21.661c-.563.593-1.413.593-1.976 0l-8.618-9.083c-2.31-2.434-2.31-6.38 0-8.814a6.002 6.002 0 0 1 8.618 0l1.086 1.144 1.086-1.144a6.002 6.002 0 0 1 8.618 0c2.31 2.434 2.31 6.38 0 8.814l-8.618 9.083z'></path></svg>"
};

const initialInvoices = [
  {
    id: "INV-1001",
    customer: "Arun Kumar",
    status: "Paid",
    date: "12 May 2026",
    products: [
      { name: "Wireless Mouse", qty: 2, price: 1500, img: placeholderImages.mouse },
      { name: "Mechanical Keyboard", qty: 1, price: 9500, img: placeholderImages.keyboard },
    ],
  },
  {
    id: "INV-1002",
    customer: "Priya Stores",
    status: "Pending",
    date: "15 May 2026",
    products: [{ name: "27-inch Monitor", qty: 1, price: 8200, img: placeholderImages.monitor }],
  },
  {
    id: "INV-1003",
    customer: "Vijay Enterprises",
    status: "Paid",
    date: "18 May 2026",
    products: [
      { name: "Office Accessories Kit", qty: 2, price: 8000, img: placeholderImages.generic },
    ],
  },
];

function InvoicesPage() {
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem("local_invoices");
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  useEffect(() => {
    localStorage.setItem("local_invoices", JSON.stringify(invoices));
  }, [invoices]);

  const [search, setSearch] = useState("");
  const [modalMode, setModalMode] = useState(null); 
  const [activeInvoice, setActiveInvoice] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [customer, setCustomer] = useState("");
  const [status, setStatus] = useState("Pending");
  const [products, setProducts] = useState([{ name: "", qty: 1, price: 0, img: "" }]);

  const pdfTemplateRef = useRef(null);
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculateTotal = (prodList) => {
    return prodList.reduce((sum, item) => sum + item.qty * Number(item.price || 0), 0);
  };

  const calculatePaidTotal = () => {
    const totalPaid = invoices
      .filter((i) => i.status === "Paid")
      .reduce((sum, i) => sum + calculateTotal(i.products), 0);
    return totalPaid >= 100000 ? `₹${(totalPaid / 100000).toFixed(1)}L` : `₹${totalPaid.toLocaleString("en-IN")}`;
  };

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.customer.toLowerCase().includes(search.toLowerCase())
  );

  const openCreateModal = () => {
    setCustomer("");
    setStatus("Pending");
    setProducts([{ name: "", qty: 1, price: 0, img: "" }]);
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

  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = field === "name" || field === "img" ? value : Number(value);
    setProducts(updated);
  };

  const addProductRow = () => {
    setProducts([...products, { name: "", qty: 1, price: 0, img: "" }]);
  };

  const removeProductRow = (index) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const handleSaveInvoice = () => {
    if (!customer.trim() || products.some((p) => !p.name.trim() || p.price <= 0)) {
      alert("Please check your entries. All item names must be filled with a valid pricing rate.");
      return;
    }

    const sanitizedProducts = products.map((p) => ({
      ...p,
      img: p.img.trim() || placeholderImages.generic
    }));

    if (modalMode === "create") {
      const newInv = {
        id: "INV-" + Math.floor(1000 + Math.random() * 9000),
        customer,
        status,
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        products: sanitizedProducts,
      };
      setInvoices([newInv, ...invoices]);
    } else if (modalMode === "edit") {
      setInvoices(
        invoices.map((inv) =>
          inv.id === activeInvoice.id ? { ...inv, customer, status, products: sanitizedProducts } : inv
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
      <style>{`
        @keyframes modalFadeUp {
          from { opacity: 0; transform: translate3d(0, 40px, 0) scale(0.98); }
          to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes overlayFade {
          from { opacity: 0; background: rgba(9, 9, 11, 0); }
          to { opacity: 1; background: rgba(9, 9, 11, 0.7); }
        }
        @keyframes rowEntrance {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes beamScan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        
        .animated-row {
          animation: rowEntrance 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        
        .header-glow-btn {
          position: relative;
          background: #ffffff !important;
          color: #1e1b4b !important;
          z-index: 1;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
          box-shadow: 0 4px 14px rgba(255, 255, 255, 0.1) !important;
        }
        .header-glow-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 255, 255, 0.25) !important;
        }

        .stat-card-glow {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
          background: rgba(24, 24, 27, 0.65) !important;
          backdrop-filter: blur(12px);
        }
        .stat-card-glow:hover {
          transform: translateY(-4px);
          background: rgba(32, 32, 37, 0.8) !important;
          border-color: rgba(99, 102, 241, 0.4) !important;
          box-shadow: 0 15px 30px -10px rgba(99, 102, 241, 0.15) !important;
        }

        .action-btn-glow { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important; }
        .action-btn-glow:hover { transform: scale(1.12); }
        .btn-view-glow:hover { background: #4f46e5 !important; color: #ffffff !important; }
        .btn-edit-glow:hover { background: #d97706 !important; color: #ffffff !important; }
        .btn-download-glow:hover { background: #16a34a !important; color: #ffffff !important; }
        .btn-delete-glow:hover { background: #dc2626 !important; color: #ffffff !important; }

        .modal-save-glow {
          transition: all 0.3s ease !important;
          background: linear-gradient(135deg, #6366f1, #4f46e5) !important;
        }
        .modal-save-glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4) !important;
        }
        
        .table-row-hover { transition: background 0.25s ease; }
        .table-row-hover:hover { background: rgba(255, 255, 255, 0.03) !important; }

        /* CYBER MATRIX TECH BACKGROUND CONFIGS */
        .matrix-grid-overlay {
          position: fixed; inset: 0; z-index: 1; pointer-events: none;
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
        }
        .matrix-radial-glow {
          position: fixed; inset: 0; z-index: 2; pointer-events: none;
          background: radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 15% 80%, rgba(147, 51, 234, 0.06) 0%, transparent 60%);
        }
        .light-sweep-beam {
          position: fixed; top: 0; left: 25%; width: 50%; height: 40vh; z-index: 3; pointer-events: none;
          background: linear-gradient(to bottom, rgba(99, 102, 241, 0.02), transparent);
          opacity: 0.7; transform: translateY(-100%);
          animation: beamScan 9s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-track { background: #18181b; border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 10px; }
      `}</style>

      {/* MATRIX BACKGROUND COMPONENT TILES */}
      <div className="matrix-grid-overlay" />
      <div className="matrix-radial-glow" />
      <div className="light-sweep-beam" />

      <div style={{ height: "100vh", position: "sticky", top: 0, zIndex: 100, flexShrink: 0 }}>
        <Sidebar />
      </div>

      <div style={styles.mainContent}>
        
        {/* HEADER HERO BANNER */}
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
          <div style={{ position: "absolute", top: "-40px", right: "-30px", width: "190px", height: "190px", background: "rgba(255,255,255,0.03)", borderRadius: "50%" }}></div>
          <div style={{ position: "absolute", bottom: "-50px", right: "120px", width: "130px", height: "130px", background: "rgba(255,255,255,0.02)", borderRadius: "50%" }}></div>
        </div>

        {/* METRICS DASHBOARD GRID */}
        <div style={{...styles.statsGrid, gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))"}}>
          <div className="stat-card-glow" style={styles.statCard}>
            <div style={styles.statIconBlue}><FaFileInvoiceDollar /></div>
            <div>
              <h2 style={styles.statValue}>{invoices.length}</h2>
              <p style={styles.statLabel}>Total Counter</p>
            </div>
          </div>

          <div className="stat-card-glow" style={styles.statCard}>
            <div style={styles.statIconGreen}><FaCheckCircle /></div>
            <div>
              <h2 style={styles.statValue}>{calculatePaidTotal()}</h2>
              <p style={styles.statLabel}>Paid Sum</p>
            </div>
          </div>

          <div className="stat-card-glow" style={styles.statCard}>
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

        {/* DATA LEDGER TABLE */}
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Invoice ID</th>
                <th style={styles.th}>Customer Name</th>
                <th style={styles.th}>Items Preview</th>
                <th style={styles.th}>Total Value</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Issued Date</th>
                <th style={styles.th}>Action Grid</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, rIndex) => (
                <tr key={invoice.id} className="table-row-hover animated-row" style={{ ...styles.tr, animationDelay: `${rIndex * 0.05}s` }}>
                  <td style={{ ...styles.td, color: "#818cf8", fontWeight: "700" }}>{invoice.id}</td>
                  <td style={{ ...styles.td, fontWeight: "600", color: "#f4f4f5" }}>{invoice.customer}</td>
                  
                  <td style={{ ...styles.td, maxWidth: "260px" }}>
                    <div style={styles.productNamesString}>
                      {invoice.products.map((p) => p.name).join(", ")}
                    </div>
                  </td>

                  <td style={{ ...styles.td, fontWeight: "700", color: "#f4f4f5" }}>₹{calculateTotal(invoice.products).toLocaleString("en-IN")}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        background: invoice.status === "Paid" ? "rgba(22, 101, 52, 0.2)" : "rgba(153, 27, 27, 0.2)",
                        color: invoice.status === "Paid" ? "#4ade80" : "#f87171",
                        border: invoice.status === "Paid" ? "1px solid rgba(74, 222, 128, 0.3)" : "1px solid rgba(248, 113, 113, 0.3)"
                      }}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td style={{ ...styles.td, color: "#a1a1aa" }}>{invoice.date}</td>
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
                  <td colSpan="7" style={{ ...styles.td, textAlign: "center", color: "#71717a", padding: "60px" }}>
                    No valid billing profiles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL ARCHITECTURE */}
        {modalMode && (
          <div style={{ ...styles.modalOverlay, animation: "overlayFade 0.25s ease forwards" }}>
            <div style={{ ...styles.modal, maxWidth: modalMode === "view" ? "620px" : "740px", animation: "modalFadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
              <h2 style={styles.modalTitle}>
                {modalMode === "create" && "Formulate New Invoice"}
                {modalMode === "view" && `Statement View Profile — ${activeInvoice?.id}`}
                {modalMode === "edit" && `Modify Document Entry — ${activeInvoice?.id}`}
              </h2>

              {modalMode === "view" ? (
                <div>
                  <div style={styles.viewMetaBox}>
                    <p style={{ margin: 0 }}><strong>Recipient:</strong> <br/><span style={{color: "#a1a1aa"}}>{activeInvoice.customer}</span></p>
                    <p style={{ margin: 0 }}><strong>Issuance Date:</strong> <br/><span style={{color: "#a1a1aa"}}>{activeInvoice.date}</span></p>
                    <p style={{ margin: "10px 0 0 0", gridColumn: "1 / -1" }}>
                      <strong>Status:</strong>{" "}
                      <span
                        style={{
                          ...styles.status,
                          background: activeInvoice.status === "Paid" ? "rgba(22, 101, 52, 0.2)" : "rgba(153, 27, 27, 0.2)",
                          color: activeInvoice.status === "Paid" ? "#4ade80" : "#f87171",
                          border: activeInvoice.status === "Paid" ? "1px solid rgba(74, 222, 128, 0.3)" : "1px solid rgba(248, 113, 113, 0.3)"
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
                        <tr style={{ background: "#27272a" }}>
                          <th style={{...styles.innerTh, width: "60px"}}>Item</th>
                          <th style={styles.innerTh}>Product Name</th>
                          <th style={{...styles.innerTh, textAlign: "center"}}>Qty</th>
                          <th style={{...styles.innerTh, textAlign: "right"}}>Unit Cost</th>
                          <th style={{...styles.innerTh, textAlign: "right"}}>Line Aggregate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeInvoice.products.map((p, i) => (
                          <tr key={i} style={{ borderBottom: "1px solid #27272a" }}>
                            <td style={styles.innerTd}>
                              <img 
                                src={p.img || placeholderImages.generic} 
                                alt="" 
                                style={{ width: "40px", height: "40px", borderRadius: "8px", border: "1px solid #3f3f46" }}
                              />
                            </td>
                            <td style={{...styles.innerTd, fontWeight: "600", color: "#f4f4f5"}}>{p.name}</td>
                            <td style={{...styles.innerTd, textAlign: "center", color: "#a1a1aa"}}>{p.qty}</td>
                            <td style={{...styles.innerTd, textAlign: "right", color: "#a1a1aa"}}>₹{p.price.toLocaleString("en-IN")}</td>
                            <td style={{...styles.innerTd, textAlign: "right", fontWeight: "700", color: "#818cf8"}}>₹{(p.qty * p.price).toLocaleString("en-IN")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div style={styles.grandTotalSection}>
                    <p style={{ margin: 0, color: "#a1a1aa", fontSize: "14px", fontWeight: "600" }}>Grand Payable Amount</p>
                    <h3 style={{ margin: 0, fontSize: "24px", fontWeight: "800", color: "#818cf8" }}>₹{calculateTotal(activeInvoice.products).toLocaleString("en-IN")}</h3>
                  </div>

                  <div style={styles.modalBtnContainer}>
                    <button style={styles.cancelBtn} onClick={() => setModalMode(null)}>Close Window</button>
                    <button className="modal-save-glow" style={styles.createBtn} onClick={() => { setModalMode(null); triggerPdfDownload(activeInvoice); }}>
                      <FaDownload /> Print Layout
                    </button>
                  </div>
                </div>
              ) : (
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
                    <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#f4f4f5" }}>Inventory Order Rows</h3>
                    <button type="button" style={styles.smallAddRowBtn} onClick={addProductRow}>
                      <FaPlus /> Add Line
                    </button>
                  </div>

                  <div className="custom-scroll" style={styles.productFormScrollArea}>
                    {products.map((prod, index) => (
                      <div key={index} style={{ borderBottom: "1px dashed #3f3f46", paddingBottom: "14px", marginBottom: "14px" }}>
                        <div style={styles.productFormRow}>
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
                              width: "44px",
                              height: "44px",
                              borderRadius: "12px",
                              opacity: products.length === 1 ? 0.3 : 1,
                              flexShrink: 0,
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                        
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" }}>
                          <div style={{ position: "relative", flex: 1 }}>
                            <FaImage style={{ position: "absolute", left: "12px", top: "11px", color: "#a1a1aa" }} />
                            <input
                              type="text"
                              placeholder="Paste custom Image Web URL (Optional)..."
                              value={prod.img && !prod.img.startsWith("data:") ? prod.img : ""}
                              onChange={(e) => handleProductChange(index, "img", e.target.value)}
                              style={{ ...styles.modalInput, marginBottom: 0, paddingLeft: "36px", height: "38px", fontSize: "12px" }}
                            />
                          </div>
                          {prod.img && (
                            <img src={prod.img} alt="" style={{ width: "36px", height: "36px", borderRadius: "6px", border: "1px solid #3f3f46" }} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ textAlign: "right", padding: "16px 0" }}>
                    <p style={{ margin: "0 0 4px 0", color: "#a1a1aa", fontSize: "13px", fontWeight: "600" }}>Estimated Total Matrix</p>
                    <h4 style={{ margin: 0, color: "#f4f4f5", fontSize: "20px", fontWeight: "800" }}>
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

      {/* OFF-SCREEN PDF RENDER CANVAS */}
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
                  <th style={{ padding: "12px", borderBottom: "2px solid #e5e7eb", color: "#374151", width: "50px" }}>Item</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #e5e7eb", color: "#374151" }}>Inventory Product Description</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #e5e7eb", textAlign: "center", color: "#374151" }}>Quantity</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #e5e7eb", textAlign: "right", color: "#374151" }}>Rate Value</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #e5e7eb", textAlign: "right", color: "#374151" }}>Line Sum Total</th>
                </tr>
              </thead>
              <tbody>
                {pdfData.products.map((item, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "12px" }}>
                      <img src={item.img || placeholderImages.generic} alt="" style={{ width: "32px", height: "32px", borderRadius: "6px" }} />
                    </td>
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

// STYLE PROPERTIES DEFINITIONS
const styles = {
  pageContainer: { display: "flex", height: "100vh", background: "linear-gradient(135deg, #09090b 0%, #18181b 100%)", overflow: "hidden", fontFamily: "system-ui, -apple-system, sans-serif", position: "relative" },
  mainContent: { flex: 1, height: "100vh", overflowY: "auto", overflowX: "hidden", padding: "40px 30px", boxSizing: "border-box", position: "relative", zIndex: 5 },
  header: { position: "relative", background: "linear-gradient(135deg, #1e1b4b 0%, #311042 100%)", border: "1px solid rgba(99, 102, 241, 0.2)", padding: "36px 40px", borderRadius: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", flexWrap: "wrap", marginBottom: "32px", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)", overflow: "hidden" },
  heading: { fontSize: "36px", fontWeight: "800", color: "#ffffff", marginBottom: "6px", margin: 0, letterSpacing: "-0.02em" },
  subText: { color: "#a5b4fc", fontSize: "15px", margin: 0, fontWeight: "500" },
  addButton: { border: "none", padding: "14px 24px", borderRadius: "14px", cursor: "pointer", fontWeight: "700", display: "flex", alignItems: "center", gap: "10px" },
  statsGrid: { display: "grid", gap: "24px", marginBottom: "32px", position: "relative", zIndex: 10 },
  statCard: { padding: "24px", borderRadius: "20px", border: "1px solid rgba(63, 63, 70, 0.4)", display: "flex", alignItems: "center", gap: "20px", cursor: "pointer" },
  statIconBlue: { width: "56px", height: "56px", borderRadius: "14px", background: "rgba(99, 102, 241, 0.15)", color: "#818cf8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 },
  statIconGreen: { width: "56px", height: "56px", borderRadius: "14px", background: "rgba(34, 197, 94, 0.15)", color: "#4ade80", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 },
  statIconOrange: { width: "56px", height: "56px", borderRadius: "14px", background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 },
  statValue: { fontSize: "28px", fontWeight: "800", color: "#ffffff", marginBottom: "2px", margin: 0, letterSpacing: "-0.01em" },
  statLabel: { color: "#a1a1aa", margin: 0, fontSize: "14px", fontWeight: "500" },
  searchContainer: { background: "rgba(24, 24, 27, 0.6)", backdropFilter: "blur(8px)", borderRadius: "16px", border: "1px solid rgba(63, 63, 70, 0.4)", padding: "14px 20px", display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px", position: "relative", zIndex: 10 },
  searchIcon: { color: "#71717a", fontSize: "16px" },
  searchInput: { border: "none", outline: "none", width: "100%", fontSize: "15px", color: "#ffffff", fontWeight: "500", background: "transparent" },
  tableWrapper: { width: "100%", overflowX: "auto", background: "rgba(24, 24, 27, 0.7)", backdropFilter: "blur(16px)", borderRadius: "20px", border: "1px solid rgba(63, 63, 70, 0.4)", boxShadow: "0 20px 40px -20px rgba(0,0,0,0.7)", position: "relative", zIndex: 10 },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "950px" },
  th: { textAlign: "left", padding: "16px 20px", background: "rgba(39, 39, 42, 0.4)", color: "#a1a1aa", fontWeight: "600", fontSize: "13px", borderBottom: "1px solid #3f3f46", textTransform: "uppercase", letterSpacing: "0.05em" },
  tr: { borderBottom: "1px solid rgba(63, 63, 70, 0.3)" },
  td: { padding: "16px 20px", fontSize: "14px", color: "#d4d4d8", verticalAlign: "middle" },
  productNamesString: { fontWeight: "600", color: "#e4e4e7", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: "14px" },
  status: { padding: "5px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", display: "inline-block" },
  actionContainer: { display: "flex", gap: "8px" },
  viewButton: { border: "none", width: "36px", height: "36px", borderRadius: "10px", background: "#27272a", color: "#a1a1aa", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "14px" },
  editButton: { border: "none", width: "36px", height: "36px", borderRadius: "10px", background: "rgba(217, 119, 6, 0.15)", color: "#fbbf24", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "14px" },
  downloadButton: { border: "none", width: "36px", height: "36px", borderRadius: "10px", background: "rgba(22, 163, 74, 0.15)", color: "#4ade80", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "14px" },
  deleteButton: { border: "none", width: "36px", height: "36px", borderRadius: "10px", background: "rgba(220, 38, 38, 0.15)", color: "#f87171", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "14px" },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" },
  modal: { background: "#18181b", border: "1px solid #27272a", width: "100%", borderRadius: "24px", padding: "36px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", position: "relative", boxSizing: "border-box", maxHeight: "90vh", overflowY: "auto" },
  modalTitle: { margin: "0 0 24px 0", fontSize: "22px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" },
  viewMetaBox: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", background: "#27272a", padding: "20px", borderRadius: "16px", marginBottom: "24px", border: "1px solid #3f3f46" },
  sectionDividerHeading: { margin: "24px 0 12px 0", fontSize: "14px", fontWeight: "700", color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.05em" },
  innerTable: { width: "100%", borderCollapse: "collapse", marginTop: "8px", minWidth: "500px" },
  innerTh: { padding: "10px 12px", fontSize: "12px", fontWeight: "600", color: "#a1a1aa", borderBottom: "2px solid #3f3f46" },
  innerTd: { padding: "12px", fontSize: "14px", color: "#d4d4d8", verticalAlign: "middle" },
  grandTotalSection: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(34, 197, 94, 0.1)", padding: "18px 24px", borderRadius: "16px", marginTop: "20px", border: "1px dashed #22c55e" },
  modalBtnContainer: { display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "28px", borderTop: "1px solid #27272a", paddingTop: "20px" },
  cancelBtn: { border: "1px solid #3f3f46", background: "transparent", color: "#a1a1aa", padding: "12px 20px", borderRadius: "12px", cursor: "pointer", fontWeight: "600", fontSize: "14px" },
  createBtn: { border: "none", color: "#ffffff", padding: "12px 22px", borderRadius: "12px", cursor: "pointer", fontWeight: "700", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" },
  inputLabelField: { display: "block", fontSize: "13px", fontWeight: "600", color: "#a1a1aa", marginBottom: "6px" },
  modalInput: { width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid #3f3f46", background: "#27272a", color: "#ffffff", fontSize: "14px", outline: "none", marginBottom: "20px", boxSizing: "border-box", fontWeight: "500" },
  smallAddRowBtn: { border: "none", background: "rgba(99, 102, 241, 0.15)", color: "#818cf8", padding: "8px 14px", borderRadius: "10px", cursor: "pointer", fontWeight: "700", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" },
  productFormScrollArea: { maxHeight: "240px", overflowY: "auto", paddingRight: "4px", marginBottom: "20px" },
  productFormRow: { display: "flex", gap: "10px", alignItems: "center" }
};

const pdfStyles = {
  pdfPageCanvas: { padding: "20px", background: "#ffffff", fontFamily: "system-ui, sans-serif" },
  invoiceHeaderSection: { display: "flex", justifyContent: "space-between", alignItems: "top", marginBottom: "10px" }
};

export default InvoicesPage;