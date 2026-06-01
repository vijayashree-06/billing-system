// src/pages/ProductsPage.jsx

import { useState, useEffect } from "react";

import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";

import {
  FaBoxOpen,
  FaPlus,
  FaSearch,
  FaTrash,
  FaEdit,
  FaRupeeSign,
  FaLayerGroup,
  FaWarehouse,
} from "react-icons/fa";

function ProductsPage() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const categories = [
    "Electronics",
    "Furniture",
    "Accessories",
    "Clothing",
    "Books",
    "Grocery",
  ];

  // PERSISTENCE STATE WITH LOCALSTORAGE
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("dashboard_products");
    if (savedProducts) {
      try {
        return JSON.parse(savedProducts);
      } catch (error) {
        console.error("Error parsing local storage data", error);
      }
    }
    // Default initial data if localStorage is empty
    return [
      {
        id: 1,
        name: "Laptop",
        category: "Electronics",
        price: 65000,
        stock: 12,
        status: "Available",
      },
      {
        id: 2,
        name: "Smart Phone",
        category: "Electronics",
        price: 25000,
        stock: 8,
        status: "Available",
      },
      {
        id: 3,
        name: "Office Chair",
        category: "Furniture",
        price: 4500,
        stock: 0,
        status: "Out of Stock",
      },
      {
        id: 4,
        name: "Printer",
        category: "Accessories",
        price: 12000,
        stock: 5,
        status: "Available",
      },
    ];
  });

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "Available",
  });

  // SAVE TO LOCALSTORAGE AUTOMATICALLY WHENEVER PRODUCTS STATE CHANGES
  useEffect(() => {
    localStorage.setItem("dashboard_products", JSON.stringify(products));
  }, [products]);

  // SEARCH FILTER
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // ADD / UPDATE PRODUCT
  const handleAddProduct = () => {
    if (
      !formData.name ||
      !formData.category ||
      formData.price === "" ||
      formData.stock === ""
    ) {
      alert("Fill all fields");
      return;
    }

    // UPDATE EXISTING PRODUCT
    if (editId) {
      const updatedProducts = products.map((product) =>
        product.id === editId
          ? {
              ...formData,
              id: editId,
              price: Number(formData.price),
              stock: Number(formData.stock),
            }
          : product
      );

      setProducts(updatedProducts);
      alert("Product Updated Successfully");
    } 
    // ADD NEW PRODUCT
    else {
      setProducts([
        ...products,
        {
          id: Date.now(),
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        },
      ]);

      alert("Product Added Successfully");
    }

    // RESET FORM DATA
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      status: "Available",
    });
    setEditId(null);
    setShowModal(false);
  };

  // DELETE
  const handleDelete = (id) => {
    const updated = products.filter((product) => product.id !== id);
    setProducts(updated);
  };

  // EDIT
  const handleEdit = (product) => {
    setFormData(product);
    setEditId(product.id);
    setShowModal(true);
  };

  // STATS Calculation
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (acc, item) => acc + Number(item.stock || 0),
    0
  );

  const outOfStock = products.filter(
    (item) => item.status === "Out of Stock" || Number(item.stock) === 0
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
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <TopNav title="Products" />

        <div style={{ padding: "20px" }}>
          {/* HEADER */}
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
              Product Management
            </h1>
            <p style={{ opacity: 0.9 }}>
              Manage products, inventory and stock details
            </p>
          </div>

          {/* STATS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: "18px",
              marginBottom: "20px",
            }}
          >
            {/* TOTAL PRODUCTS */}
            <div style={cardStyle}>
              <div>
                <p style={labelStyle}>Total Products</p>
                <h2 style={valueStyle}>{totalProducts}</h2>
              </div>
              <div style={{ ...iconBox, background: "#4f46e5" }}>
                <FaBoxOpen />
              </div>
            </div>

            {/* TOTAL STOCK */}
            <div style={cardStyle}>
              <div>
                <p style={labelStyle}>Total Stock</p>
                <h2 style={valueStyle}>{totalStock}</h2>
              </div>
              <div style={{ ...iconBox, background: "#10b981" }}>
                <FaWarehouse />
              </div>
            </div>

            {/* OUT OF STOCK */}
            <div style={cardStyle}>
              <div>
                <p style={labelStyle}>Out Of Stock</p>
                <h2 style={valueStyle}>{outOfStock}</h2>
              </div>
              <div style={{ ...iconBox, background: "#ef4444" }}>
                <FaLayerGroup />
              </div>
            </div>
          </div>

          {/* PRODUCTS TABLE DISPLAY */}
          <div
            style={{
              background: "white",
              borderRadius: "22px",
              padding: "20px",
              overflowX: "auto",
            }}
          >
            {/* SEARCH AND ADD ACTION ACTIONS */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              {/* SEARCH */}
              <div style={{ position: "relative", width: "100%", maxWidth: "320px" }}>
                <FaSearch
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "14px",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search product..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 14px 14px 42px",
                    borderRadius: "14px",
                    border: "1px solid #d1d5db",
                    outline: "none",
                    fontSize: "15px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* ADD PRODUCT TRIGGER */}
              <button
                onClick={() => {
                  setShowModal(true);
                  setEditId(null);
                  setFormData({
                    name: "",
                    category: "",
                    price: "",
                    stock: "",
                    status: "Available",
                  });
                }}
                style={addBtn}
              >
                <FaPlus />
                Add Product
              </button>
            </div>

            {/* TABLE STRUCTURE */}
            <table style={{ width: "100%", minWidth: "900px", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  <th style={thStyle}>Product</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Price</th>
                  <th style={thStyle}>Stock</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={product.id || index}>
                    {/* PRODUCT NAME */}
                    <td style={tdStyle}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                          style={{
                            width: "45px",
                            height: "45px",
                            borderRadius: "12px",
                            background: "#eef2ff",
                            color: "#4f46e5",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <FaBoxOpen />
                        </div>
                        <span>{product.name}</span>
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td style={tdStyle}>{product.category}</td>

                    {/* PRICE */}
                    <td style={tdStyle}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <FaRupeeSign style={{ fontSize: "13px" }} />
                        {product.price}
                      </div>
                    </td>

                    {/* STOCK */}
                    <td style={tdStyle}>{product.stock}</td>

                    {/* STATUS */}
                    <td style={tdStyle}>
                      <span
                        style={{
                          background: product.status === "Available" ? "#dcfce7" : "#fee2e2",
                          color: product.status === "Available" ? "#166534" : "#991b1b",
                          padding: "6px 14px",
                          borderRadius: "20px",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        {product.status}
                      </span>
                    </td>

                    {/* ROW ACTIONS */}
                    <td style={tdStyle}>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={() => handleEdit(product)} style={editBtn}>
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(product.id)} style={deleteBtn}>
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

      {/* MODAL ARCHITECTURE */}
      {showModal && (
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
              maxWidth: "500px",
              borderRadius: "24px",
              padding: "25px",
              position: "relative",
            }}
          >
            {/* CLOSE ACTION */}
            <button
              onClick={() => setShowModal(false)}
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

            <h2 style={{ marginBottom: "20px" }}>
              {editId ? "Edit Product" : "Add Product"}
            </h2>

            {/* PRODUCT NAME INPUT */}
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={inputStyle}
            />

            {/* CATEGORY SELECTOR */}
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={inputStyle}
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* PRICE INPUT */}
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              style={inputStyle}
            />

            {/* STOCK INPUT */}
            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              style={inputStyle}
            />

            {/* STATUS SELECTOR */}
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={inputStyle}
            >
              <option>Available</option>
              <option>Out of Stock</option>
            </select>

            {/* CONFIRMATION SUBMIT */}
            <button
              onClick={handleAddProduct}
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                borderRadius: "14px",
                background: "#4f46e5",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              {editId ? "Update Product" : "Add Product"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* INTERFACE STYLES */
const cardStyle = {
  background: "white",
  borderRadius: "20px",
  padding: "22px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const labelStyle = { color: "#6b7280", marginBottom: "8px" };
const valueStyle = { fontSize: "32px", color: "#111827" };

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

export default ProductsPage;