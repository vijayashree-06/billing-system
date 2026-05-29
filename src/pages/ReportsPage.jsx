// src/pages/ReportsPage.jsx

import { useState, useEffect } from "react";

import jsPDF from "jspdf";

import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";

import {
  FaChartBar,
  FaChartLine,
  FaFileInvoiceDollar,
  FaUsers,
  FaDownload,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] =
    useState("Monthly");

  const [activeBar, setActiveBar] =
    useState(null);

  const [isMobile, setIsMobile] =
    useState(window.innerWidth < 768);

  // RESPONSIVE

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        window.innerWidth < 768
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  // REPORT CARDS

  const reports = [
    {
      title: "Total Revenue",
      value: "₹2,45,000",
      growth: "+12%",
      icon: <FaChartLine />,
      color: "#4f46e5",
      bg: "#eef2ff",
      status: "up",
    },

    {
      title: "Invoices",
      value: "1,248",
      growth: "+8%",
      icon: (
        <FaFileInvoiceDollar />
      ),
      color: "#10b981",
      bg: "#dcfce7",
      status: "up",
    },

    {
      title: "Customers",
      value: "320",
      growth: "+5%",
      icon: <FaUsers />,
      color: "#f59e0b",
      bg: "#fef3c7",
      status: "up",
    },

    {
      title: "Expenses",
      value: "₹72,000",
      growth: "-3%",
      icon: <FaChartBar />,
      color: "#ef4444",
      bg: "#fee2e2",
      status: "down",
    },
  ];

  // CHART DATA

  const salesData = {
    Daily: [
      {
        month: "Mon",
        amount: 20,
      },

      {
        month: "Tue",
        amount: 35,
      },

      {
        month: "Wed",
        amount: 28,
      },

      {
        month: "Thu",
        amount: 40,
      },

      {
        month: "Fri",
        amount: 55,
      },

      {
        month: "Sat",
        amount: 48,
      },
    ],

    Weekly: [
      {
        month: "W1",
        amount: 60,
      },

      {
        month: "W2",
        amount: 75,
      },

      {
        month: "W3",
        amount: 50,
      },

      {
        month: "W4",
        amount: 95,
      },
    ],

    Monthly: [
      {
        month: "Jan",
        amount: 45,
      },

      {
        month: "Feb",
        amount: 70,
      },

      {
        month: "Mar",
        amount: 55,
      },

      {
        month: "Apr",
        amount: 90,
      },

      {
        month: "May",
        amount: 75,
      },

      {
        month: "Jun",
        amount: 110,
      },
    ],

    Yearly: [
      {
        month: "2021",
        amount: 220,
      },

      {
        month: "2022",
        amount: 340,
      },

      {
        month: "2023",
        amount: 410,
      },

      {
        month: "2024",
        amount: 520,
      },
    ],
  };

  // CURRENT DATA

  const currentChartData =
    salesData[selectedPeriod];

  // RECENT REPORTS

  const recentReports = [
    {
      name: "Monthly Revenue Report",
      date: "12 Jun 2026",
      status: "Completed",
    },

    {
      name: "Customer Activity Report",
      date: "10 Jun 2026",
      status: "Pending",
    },

    {
      name: "Invoice Summary",
      date: "08 Jun 2026",
      status: "Completed",
    },

    {
      name: "Expense Analysis",
      date: "06 Jun 2026",
      status: "Completed",
    },
  ];

  // DOWNLOAD REPORT

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text(
      "Billing System Report",
      20,
      20
    );

    doc.setFontSize(14);

    doc.text(
      `Report Type: ${selectedPeriod}`,
      20,
      40
    );

    let y = 60;

    currentChartData.forEach(
      (item) => {
        doc.text(
          `${item.month} : ₹${item.amount}k`,
          20,
          y
        );

        y += 12;
      }
    );

    doc.save(
      `${selectedPeriod}-Report.pdf`
    );
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
      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div
        style={{
          flex: 1,
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <TopNav title="Reports" />

        <div
          style={{
            padding: isMobile
              ? "12px"
              : "20px",

            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* HEADER */}

          <div
            style={{
              background:
                "linear-gradient(to right,#4f46e5,#7c3aed)",

              borderRadius: "22px",

              padding: isMobile
                ? "22px"
                : "30px",

              color: "white",

              marginBottom: "20px",
            }}
          >
            <h1
              style={{
                fontSize: isMobile
                  ? "28px"
                  : "42px",

                marginBottom: "10px",
              }}
            >
              Reports & Analytics
            </h1>

            <p
              style={{
                opacity: 0.9,
                lineHeight: "1.6",
                fontSize: isMobile
                  ? "14px"
                  : "16px",
              }}
            >
              Track revenue,
              invoices, customers,
              sales and analytics
            </p>
          </div>

          {/* TOP ACTIONS */}

          <div
            style={{
              display: "flex",

              flexDirection:
                isMobile
                  ? "column"
                  : "row",

              justifyContent:
                "space-between",

              alignItems:
                isMobile
                  ? "stretch"
                  : "center",

              gap: "15px",

              marginBottom: "20px",
            }}
          >
            {/* FILTER */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",

                background: "white",

                padding: "14px",

                borderRadius: "14px",

                boxShadow:
                  "0 4px 10px rgba(0,0,0,0.05)",
              }}
            >
              <FaCalendarAlt
                style={{
                  color: "#4f46e5",
                }}
              />

              <select
                value={selectedPeriod}
                onChange={(e) => {
                  setSelectedPeriod(
                    e.target.value
                  );

                  setActiveBar(null);
                }}
                style={{
                  border: "none",
                  outline: "none",
                  background:
                    "transparent",
                  width: "100%",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                <option>
                  Daily
                </option>

                <option>
                  Weekly
                </option>

                <option>
                  Monthly
                </option>

                <option>
                  Yearly
                </option>
              </select>
            </div>

            {/* DOWNLOAD */}

            <button
              onClick={handleDownload}
              style={{
                border: "none",

                padding:
                  "14px 18px",

                borderRadius:
                  "14px",

                background:
                  "#4f46e5",

                color: "white",

                display: "flex",

                justifyContent:
                  "center",

                alignItems:
                  "center",

                gap: "10px",

                cursor: "pointer",

                fontWeight:
                  "600",

                width: isMobile
                  ? "100%"
                  : "auto",
              }}
            >
              <FaDownload />
              Download Report
            </button>
          </div>

          {/* REPORT CARDS */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                isMobile
                  ? "1fr"
                  : "repeat(auto-fit,minmax(240px,1fr))",

              gap: "18px",

              marginBottom: "20px",
            }}
          >
            {reports.map(
              (report, index) => (
                <div
                  key={index}
                  style={{
                    background:
                      "white",

                    borderRadius:
                      "22px",

                    padding:
                      "22px",

                    boxShadow:
                      "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    style={{
                      display:
                        "flex",

                      justifyContent:
                        "space-between",

                      alignItems:
                        "center",

                      marginBottom:
                        "18px",
                    }}
                  >
                    <div
                      style={{
                        width:
                          "58px",

                        height:
                          "58px",

                        borderRadius:
                          "18px",

                        background:
                          report.bg,

                        color:
                          report.color,

                        display:
                          "flex",

                        justifyContent:
                          "center",

                        alignItems:
                          "center",

                        fontSize:
                          "22px",
                      }}
                    >
                      {report.icon}
                    </div>

                    <div
                      style={{
                        display:
                          "flex",

                        alignItems:
                          "center",

                        gap: "5px",

                        color:
                          report.status ===
                          "up"
                            ? "#10b981"
                            : "#ef4444",

                        fontWeight:
                          "600",
                      }}
                    >
                      {report.status ===
                      "up" ? (
                        <FaArrowUp />
                      ) : (
                        <FaArrowDown />
                      )}

                      {report.growth}
                    </div>
                  </div>

                  <p
                    style={{
                      color:
                        "#6b7280",

                      marginBottom:
                        "8px",
                    }}
                  >
                    {report.title}
                  </p>

                  <h2
                    style={{
                      fontSize: isMobile
                        ? "28px"
                        : "34px",

                      color:
                        "#111827",
                    }}
                  >
                    {report.value}
                  </h2>
                </div>
              )
            )}
          </div>

          {/* MAIN GRID */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                isMobile
                  ? "1fr"
                  : "2fr 1fr",

              gap: "20px",
            }}
          >
            {/* CHART */}

            <div
              style={{
                background: "white",

                borderRadius: "22px",

                padding:
                  isMobile
                    ? "18px"
                    : "24px",

                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)",

                overflowX: "auto",
              }}
            >
              {/* TOP */}

              <div
                style={{
                  display: "flex",

                  justifyContent:
                    "space-between",

                  alignItems:
                    "center",

                  marginBottom:
                    "25px",

                  flexWrap: "wrap",

                  gap: "10px",
                }}
              >
                <h2
                  style={{
                    fontSize:
                      "22px",
                    color:
                      "#111827",
                  }}
                >
                  {selectedPeriod} Sales
                  Analytics
                </h2>

                <button
                  style={{
                    border: "none",

                    background:
                      "#eef2ff",

                    color:
                      "#4f46e5",

                    padding:
                      "10px 14px",

                    borderRadius:
                      "12px",

                    fontWeight:
                      "600",

                    cursor:
                      "pointer",
                  }}
                >
                  View Details
                </button>
              </div>

              {/* CHART */}

              <div
                style={{
                  display: "flex",

                  alignItems:
                    "flex-end",

                  justifyContent:
                    "space-between",

                  gap:
                    isMobile
                      ? "8px"
                      : "15px",

                  height:
                    isMobile
                      ? "230px"
                      : "320px",
                }}
              >
                {currentChartData.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={index}
                      style={{
                        flex: 1,

                        display:
                          "flex",

                        flexDirection:
                          "column",

                        alignItems:
                          "center",

                        justifyContent:
                          "flex-end",

                        height:
                          "100%",
                      }}
                    >
                      {/* VALUE */}

                      <div
                        style={{
                          marginBottom:
                            "10px",

                          opacity:
                            activeBar ===
                            index
                              ? 1
                              : 0,

                          transition:
                            "0.3s",

                          background:
                            "#111827",

                          color:
                            "white",

                          padding:
                            "6px 10px",

                          borderRadius:
                            "10px",

                          fontSize:
                            "12px",

                          fontWeight:
                            "600",
                        }}
                      >
                        ₹
                        {item.amount}
                        k
                      </div>

                      {/* BAR */}

                      <div
                        onClick={() =>
                          setActiveBar(
                            activeBar ===
                              index
                              ? null
                              : index
                          )
                        }
                        style={{
                          width: "100%",

                          height:
                            isMobile
                              ? `${item.amount *
                                  0.9}px`
                              : `${item.amount *
                                  0.6}px`,

                          background:
                            activeBar ===
                            index
                              ? "linear-gradient(to top,#7c3aed,#c084fc)"
                              : "linear-gradient(to top,#4f46e5,#7c3aed)",

                          borderRadius:
                            "14px 14px 0 0",

                          cursor:
                            "pointer",

                          transition:
                            "0.3s",

                          display:
                            "flex",

                          justifyContent:
                            "center",

                          alignItems:
                            "flex-start",

                          color:
                            "white",

                          fontWeight:
                            "600",

                          paddingTop:
                            "10px",

                          fontSize:
                            isMobile
                              ? "11px"
                              : "14px",

                          transform:
                            activeBar ===
                            index
                              ? "scale(1.05)"
                              : "scale(1)",

                          boxShadow:
                            activeBar ===
                            index
                              ? "0 12px 20px rgba(124,58,237,0.3)"
                              : "none",
                        }}
                      >
                        {activeBar ===
                        index
                          ? `₹${item.amount}k`
                          : ""}
                      </div>

                      {/* MONTH */}

                      <p
                        style={{
                          marginTop:
                            "10px",

                          color:
                            "#6b7280",

                          fontWeight:
                            "600",

                          fontSize:
                            isMobile
                              ? "12px"
                              : "14px",
                        }}
                      >
                        {
                          item.month
                        }
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* RECENT REPORTS */}

            <div
              style={{
                background: "white",

                borderRadius: "22px",

                padding:
                  isMobile
                    ? "18px"
                    : "24px",

                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  fontSize:
                    "22px",

                  marginBottom:
                    "25px",

                  color:
                    "#111827",
                }}
              >
                Recent Reports
              </h2>

              {recentReports.map(
                (
                  report,
                  index
                ) => (
                  <div
                    key={index}
                    style={{
                      padding:
                        "16px",

                      borderRadius:
                        "18px",

                      background:
                        "#f9fafb",

                      marginBottom:
                        "15px",

                      cursor:
                        "pointer",

                      transition:
                        "0.3s",
                    }}
                  >
                    <h4
                      style={{
                        margin:
                          "0 0 8px 0",

                        color:
                          "#111827",

                        fontSize:
                          isMobile
                            ? "15px"
                            : "16px",
                      }}
                    >
                      {report.name}
                    </h4>

                    <p
                      style={{
                        margin:
                          "0 0 10px 0",

                        color:
                          "#6b7280",

                        fontSize:
                          "13px",
                      }}
                    >
                      {report.date}
                    </p>

                    <span
                      style={{
                        background:
                          report.status ===
                          "Completed"
                            ? "#dcfce7"
                            : "#fef3c7",

                        color:
                          report.status ===
                          "Completed"
                            ? "#166534"
                            : "#92400e",

                        padding:
                          "6px 12px",

                        borderRadius:
                          "20px",

                        fontSize:
                          "12px",

                        fontWeight:
                          "600",
                      }}
                    >
                      {
                        report.status
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;