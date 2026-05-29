// src/pages/CustomersPage.jsx

import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";

import {
  FaUsers,
  FaUserPlus,
  FaSearch,
  FaTrash,
  FaEdit,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function CustomersPage() {
  const [showModal, setShowModal] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [customers, setCustomers] =
    useState([
      {
        id: 1,
        name: "Arjun Kumar",
        email: "arjun@gmail.com",
        phone: "+91 9876543210",
        location: "Chennai",
        status: "Active",
      },

      {
        id: 2,
        name: "Rahul Sharma",
        email: "rahul@gmail.com",
        phone: "+91 9876543211",
        location: "Bangalore",
        status: "Inactive",
      },

      {
        id: 3,
        name: "Kavin Raj",
        email: "kavin@gmail.com",
        phone: "+91 9876543212",
        location: "Hyderabad",
        status: "Active",
      },

      {
        id: 4,
        name: "Priya",
        email: "priya@gmail.com",
        phone: "+91 9876543213",
        location: "Mumbai",
        status: "Active",
      },
    ]);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      location: "",
      status: "Active",
    });

  // FILTER

  const filteredCustomers =
    customers.filter((customer) =>
      customer.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // ADD CUSTOMER

  const handleAddCustomer = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.location
    ) {
      alert("Please fill all fields");
      return;
    }

    setCustomers([
      ...customers,

      {
        id: Date.now(),
        ...formData,
      },
    ]);

    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      status: "Active",
    });

    setShowModal(false);
  };

  // DELETE

  const handleDelete = (id) => {
    const updated =
      customers.filter(
        (customer) =>
          customer.id !== id
      );

    setCustomers(updated);
  };

  // STATS

  const activeCustomers =
    customers.filter(
      (customer) =>
        customer.status ===
        "Active"
    ).length;

  const inactiveCustomers =
    customers.filter(
      (customer) =>
        customer.status ===
        "Inactive"
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

      <div
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <TopNav title="Customers" />

        <div
          style={{
            padding: "20px",
          }}
        >
          {/* HEADER */}

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
              Customer Management
            </h1>

            <p
              style={{
                opacity: 0.9,
              }}
            >
              Manage customer
              information and track
              business relationships
            </p>
          </div>

          {/* STATS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(240px,1fr))",
              gap: "18px",
              marginBottom: "20px",
            }}
          >
            {/* TOTAL */}

            <div style={cardStyle}>
              <div>
                <p style={labelStyle}>
                  Total Customers
                </p>

                <h2 style={valueStyle}>
                  {customers.length}
                </h2>
              </div>

              <div
                style={{
                  ...iconBox,
                  background:
                    "#4f46e5",
                }}
              >
                <FaUsers />
              </div>
            </div>

            {/* ACTIVE */}

            <div style={cardStyle}>
              <div>
                <p style={labelStyle}>
                  Active
                </p>

                <h2 style={valueStyle}>
                  {
                    activeCustomers
                  }
                </h2>
              </div>

              <div
                style={{
                  ...iconBox,
                  background:
                    "#10b981",
                }}
              >
                <FaUserPlus />
              </div>
            </div>

            {/* INACTIVE */}

            <div style={cardStyle}>
              <div>
                <p style={labelStyle}>
                  Inactive
                </p>

                <h2 style={valueStyle}>
                  {
                    inactiveCustomers
                  }
                </h2>
              </div>

              <div
                style={{
                  ...iconBox,
                  background:
                    "#ef4444",
                }}
              >
                <FaUsers />
              </div>
            </div>
          </div>

          {/* CUSTOMER TABLE */}

          <div
            style={{
              background: "white",
              borderRadius: "22px",
              padding: "20px",
              overflowX: "auto",
            }}
          >
            {/* TOP */}

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
              {/* SEARCH */}

              <div
                style={{
                  position:
                    "relative",
                  width: "100%",
                  maxWidth: "320px",
                }}
              >
                <FaSearch
                  style={{
                    position:
                      "absolute",
                    top: "50%",
                    left: "14px",
                    transform:
                      "translateY(-50%)",
                    color: "#9ca3af",
                  }}
                />

                <input
                  type="text"
                  placeholder="Search customer..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    padding:
                      "14px 14px 14px 42px",
                    borderRadius:
                      "14px",
                    border:
                      "1px solid #d1d5db",
                    outline: "none",
                    fontSize: "15px",
                    boxSizing:
                      "border-box",
                  }}
                />
              </div>

              {/* BUTTON */}

              <button
                onClick={() =>
                  setShowModal(true)
                }
                style={addBtn}
              >
                <FaUserPlus />
                Add Customer
              </button>
            </div>

            {/* TABLE */}

            <table
              style={{
                width: "100%",
                minWidth: "950px",
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
                    Name
                  </th>

                  <th style={thStyle}>
                    Email
                  </th>

                  <th style={thStyle}>
                    Phone
                  </th>

                  <th style={thStyle}>
                    Location
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
                {filteredCustomers.map(
                  (
                    customer,
                    index
                  ) => (
                    <tr key={index}>
                      {/* NAME */}

                      <td style={tdStyle}>
                        <div
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: "12px",
                          }}
                        >
                          <div
                            style={{
                              width:
                                "45px",
                              height:
                                "45px",
                              borderRadius:
                                "50%",
                              background:
                                "#4f46e5",
                              color:
                                "white",
                              display:
                                "flex",
                              justifyContent:
                                "center",
                              alignItems:
                                "center",
                              fontWeight:
                                "600",
                            }}
                          >
                            {customer.name.charAt(
                              0
                            )}
                          </div>

                          <span>
                            {
                              customer.name
                            }
                          </span>
                        </div>
                      </td>

                      {/* EMAIL */}

                      <td style={tdStyle}>
                        <div
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: "8px",
                          }}
                        >
                          <FaEnvelope
                            style={{
                              color:
                                "#6b7280",
                            }}
                          />

                          {
                            customer.email
                          }
                        </div>
                      </td>

                      {/* PHONE */}

                      <td style={tdStyle}>
                        <div
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: "8px",
                          }}
                        >
                          <FaPhoneAlt
                            style={{
                              color:
                                "#6b7280",
                            }}
                          />

                          {
                            customer.phone
                          }
                        </div>
                      </td>

                      {/* LOCATION */}

                      <td style={tdStyle}>
                        <div
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: "8px",
                          }}
                        >
                          <FaMapMarkerAlt
                            style={{
                              color:
                                "#ef4444",
                            }}
                          />

                          {
                            customer.location
                          }
                        </div>
                      </td>

                      {/* STATUS */}

                      <td style={tdStyle}>
                        <span
                          style={{
                            background:
                              customer.status ===
                              "Active"
                                ? "#dcfce7"
                                : "#fee2e2",

                            color:
                              customer.status ===
                              "Active"
                                ? "#166534"
                                : "#991b1b",

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
                            customer.status
                          }
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td style={tdStyle}>
                        <div
                          style={{
                            display:
                              "flex",
                            gap: "10px",
                          }}
                        >
                          {/* EDIT */}

                          <button
                            style={
                              editBtn
                            }
                          >
                            <FaEdit />
                          </button>

                          {/* DELETE */}

                          <button
                            onClick={() =>
                              handleDelete(
                                customer.id
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
            {/* CLOSE */}

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
              }}
            >
              Add Customer
            </h2>

            {/* INPUTS */}

            <input
              type="text"
              placeholder="Customer Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              style={inputStyle}
            />

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email:
                    e.target.value,
                })
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone:
                    e.target.value,
                })
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Location"
              value={
                formData.location
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location:
                    e.target.value,
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
                Active
              </option>

              <option>
                Inactive
              </option>
            </select>

            {/* BUTTON */}

            <button
              onClick={
                handleAddCustomer
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
              Add Customer
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

export default CustomersPage;