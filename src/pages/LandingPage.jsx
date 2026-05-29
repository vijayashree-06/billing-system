// src/pages/LandingPage.jsx

import { useNavigate } from "react-router-dom";

import {
  FaChartLine,
  FaFileInvoice,
  FaUsers,
  FaShieldAlt,
  FaMobileAlt,
  FaCloud,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaFileInvoice />,
      title: "Smart Invoice Management",
      desc: "Create and manage invoices instantly with modern workflow.",
      color: "#4f46e5",
    },

    {
      icon: <FaUsers />,
      title: "Customer Management",
      desc: "Track customers and maintain business records efficiently.",
      color: "#10b981",
    },

    {
      icon: <FaChartLine />,
      title: "Analytics Dashboard",
      desc: "Visualize revenue growth and transactions beautifully.",
      color: "#f59e0b",
    },

    {
      icon: <FaShieldAlt />,
      title: "Secure Billing",
      desc: "Keep your billing data protected and secure.",
      color: "#ef4444",
    },

    {
      icon: <FaMobileAlt />,
      title: "Fully Responsive",
      desc: "Works perfectly on desktop, tablet and mobile devices.",
      color: "#06b6d4",
    },

    {
      icon: <FaCloud />,
      title: "Cloud Ready",
      desc: "Future-ready scalable billing management architecture.",
      color: "#8b5cf6",
    },
  ];

  const stats = [
    {
      value: "10K+",
      label: "Invoices Generated",
    },

    {
      value: "5K+",
      label: "Happy Customers",
    },

    {
      value: "99%",
      label: "System Reliability",
    },

    {
      value: "24/7",
      label: "Business Access",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        overflowX: "hidden",
      }}
    >
      {/* NAVBAR */}

      <nav
        style={{
          width: "100%",
          padding: "18px 6%",
          background: "white",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          boxSizing: "border-box",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "800",
            color: "#4f46e5",
          }}
        >
          BillFlow
        </h1>

        <div
          style={{
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          {/* LOGIN */}

          <button
            onClick={() =>
              navigate("/login")
            }
            style={loginBtn}
          >
            Login
          </button>

          {/* REGISTER */}

          <button
            onClick={() =>
              navigate("/register")
            }
            style={primaryBtn}
          >
            Register
          </button>
        </div>
      </nav>

      {/* HERO */}

      <section
        style={{
          padding:
            "80px 6% 60px 6%",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "50px",
          alignItems: "center",
        }}
      >
        {/* LEFT */}

        <div>
          <div
            style={{
              background: "#eef2ff",
              color: "#4f46e5",
              width: "fit-content",
              padding: "10px 18px",
              borderRadius: "30px",
              fontWeight: "600",
              marginBottom: "25px",
            }}
          >
            Modern Billing Solution
          </div>

          <h1
            style={{
              fontSize:
                "clamp(42px,6vw,72px)",
              lineHeight: "1.1",
              fontWeight: "800",
              color: "#111827",
              marginBottom: "24px",
            }}
          >
            Smart Billing
            <br />

            Management
            <span
              style={{
                color: "#4f46e5",
              }}
            >
              {" "}
              System
            </span>
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#6b7280",
              lineHeight: "1.8",
              marginBottom: "30px",
              maxWidth: "650px",
            }}
          >
            Modern responsive billing
            platform for invoices,
            customers, payments,
            analytics and business
            management.
          </p>

          {/* BUTTONS */}

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() =>
                navigate("/register")
              }
              style={heroPrimaryBtn}
            >
              Get Started
              <FaArrowRight />
            </button>

            <button
              onClick={() =>
                navigate("/login")
              }
              style={heroSecondaryBtn}
            >
              Login
            </button>
          </div>

          {/* FEATURES */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "18px",
              marginTop: "35px",
            }}
          >
            {[
              "Responsive UI",
              "Invoice Tracking",
              "Analytics Dashboard",
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "10px",
                  color: "#374151",
                  fontWeight: "500",
                }}
              >
                <FaCheckCircle
                  style={{
                    color:
                      "#10b981",
                  }}
                />

                {item}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}

        <div
          style={{
            display: "flex",
            justifyContent:
              "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              background: "white",
              borderRadius: "30px",
              padding: "25px",
              boxShadow:
                "0 10px 35px rgba(0,0,0,0.08)",
            }}
          >
            {/* STATS */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2,1fr)",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              {stats.map(
                (stat, index) => (
                  <div
                    key={index}
                    style={{
                      background:
                        "#f9fafb",
                      padding:
                        "20px",
                      borderRadius:
                        "18px",
                    }}
                  >
                    <h2
                      style={{
                        color:
                          "#4f46e5",
                        fontSize:
                          "28px",
                        marginBottom:
                          "8px",
                      }}
                    >
                      {
                        stat.value
                      }
                    </h2>

                    <p
                      style={{
                        color:
                          "#6b7280",
                      }}
                    >
                      {
                        stat.label
                      }
                    </p>
                  </div>
                )
              )}
            </div>

            {/* CHART */}

            <div
              style={{
                background:
                  "#f9fafb",
                borderRadius: "20px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "flex-end",
                  height: "180px",
                  gap: "12px",
                }}
              >
                {[60, 90, 120, 80, 150].map(
                  (
                    height,
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
                      }}
                    >
                      <div
                        style={{
                          width:
                            "100%",
                          maxWidth:
                            "45px",
                          height: `${height}px`,
                          background:
                            "linear-gradient(to top,#4f46e5,#a78bfa)",
                          borderRadius:
                            "12px 12px 0 0",
                        }}
                      />

                      <span
                        style={{
                          marginTop:
                            "10px",
                          color:
                            "#6b7280",
                          fontWeight:
                            "600",
                        }}
                      >
                        {
                          [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                          ][index]
                        }
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section
        style={{
          padding:
            "40px 6% 80px 6%",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          <h2
            style={{
              fontSize:
                "clamp(34px,5vw,50px)",
              marginBottom: "15px",
              color: "#111827",
            }}
          >
            Powerful Features
          </h2>

          <p
            style={{
              color: "#6b7280",
              fontSize: "18px",
            }}
          >
            Everything you need for
            your business
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "24px",
          }}
        >
          {features.map(
            (feature, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  borderRadius: "24px",
                  padding: "28px",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    width: "65px",
                    height: "65px",
                    borderRadius:
                      "18px",
                    background: `${feature.color}15`,
                    color:
                      feature.color,
                    display: "flex",
                    justifyContent:
                      "center",
                    alignItems:
                      "center",
                    fontSize: "24px",
                    marginBottom:
                      "22px",
                  }}
                >
                  {feature.icon}
                </div>

                <h3
                  style={{
                    fontSize: "24px",
                    marginBottom:
                      "14px",
                    color: "#111827",
                  }}
                >
                  {feature.title}
                </h3>

                <p
                  style={{
                    color: "#6b7280",
                    lineHeight: "1.8",
                    fontSize: "15px",
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* CTA */}

      <section
        style={{
          padding:
            "20px 6% 80px 6%",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(to right,#4f46e5,#7c3aed)",
            borderRadius: "32px",
            padding: "60px 30px",
            textAlign: "center",
            color: "white",
          }}
        >
          <h2
            style={{
              fontSize:
                "clamp(34px,5vw,54px)",
              marginBottom: "20px",
            }}
          >
            Ready To Grow
            Your Business?
          </h2>

          <p
            style={{
              fontSize: "18px",
              opacity: 0.9,
              maxWidth: "750px",
              margin:
                "0 auto 30px auto",
              lineHeight: "1.8",
            }}
          >
            Start managing invoices,
            customers and payments
            today.
          </p>

          <button
            onClick={() =>
              navigate("/register")
            }
            style={{
              padding:
                "16px 30px",
              border: "none",
              borderRadius: "16px",
              background: "white",
              color: "#4f46e5",
              fontWeight: "700",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Create Account
          </button>
        </div>
      </section>

      {/* FOOTER */}

      <footer
        style={{
          background: "#111827",
          padding: "30px 6%",
          textAlign: "center",
          color: "#9ca3af",
        }}
      >
        <h2
          style={{
            color: "white",
            marginBottom: "12px",
          }}
        >
          BillFlow
        </h2>

        <p>
          Modern Billing Management
          System © 2026
        </p>
      </footer>
    </div>
  );
}

const primaryBtn = {
  padding: "12px 22px",
  border: "none",
  borderRadius: "12px",
  background: "#4f46e5",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
};

const loginBtn = {
  padding: "12px 22px",
  border:
    "1px solid #d1d5db",
  borderRadius: "12px",
  background: "white",
  color: "#111827",
  fontWeight: "600",
  cursor: "pointer",
};

const heroPrimaryBtn = {
  padding: "16px 28px",
  border: "none",
  borderRadius: "16px",
  background: "#4f46e5",
  color: "white",
  fontWeight: "700",
  fontSize: "16px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const heroSecondaryBtn = {
  padding: "16px 28px",
  borderRadius: "16px",
  border:
    "1px solid #d1d5db",
  background: "white",
  color: "#111827",
  fontWeight: "700",
  fontSize: "16px",
  cursor: "pointer",
};

export default LandingPage;