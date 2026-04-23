/**
 * DREAMER Admin Panel
 * View and manage all registrations from the contact form
 */

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Registration {
  id: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  registrationType: string;
  timestamp: string;
  notes?: string;
}

export default function AdminPanel() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    fetchRegistrations();
    // Refresh every 30 seconds
    const interval = setInterval(fetchRegistrations, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/registrations", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch registrations");
      }

      const data = await response.json();
      setRegistrations(data);
    } catch (error) {
      toast.error("Error loading registrations: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const filteredData = registrations.filter(reg => {
    const matchesSearch =
      reg.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" || reg.registrationType === filterType;

    return matchesSearch && matchesFilter;
  });

  const handleExportCSV = () => {
    const headers = ["Company", "Email", "Phone", "City", "Country", "Type", "Registered"];
    const rows = filteredData.map(reg => [
      reg.company,
      reg.email,
      reg.phone,
      reg.city,
      reg.country,
      reg.registrationType,
      new Date(reg.timestamp).toLocaleDateString(),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dreamer-registrations-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--dreamer-navy)",
      color: "white",
      padding: "40px 20px",
      fontFamily: "'Montserrat', sans-serif",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 48,
            marginBottom: 8,
            color: "white",
          }}>
            Admin Dashboard
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
            Manage and view all wholesale partner registrations
          </p>
        </div>

        {/* Stats Bar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20,
          marginBottom: 40,
        }}>
          {[
            { label: "Total Registrations", value: registrations.length, color: "var(--dreamer-blue)" },
            { label: "This Month", value: registrations.filter(r => {
              const regDate = new Date(r.timestamp);
              const now = new Date();
              return regDate.getMonth() === now.getMonth() && regDate.getFullYear() === now.getFullYear();
            }).length, color: "var(--dreamer-gold)" },
            { label: "Boutiques", value: registrations.filter(r => r.registrationType === "boutique").length, color: "rgba(161,193,216,0.7)" },
            { label: "Distributors", value: registrations.filter(r => r.registrationType === "distributor").length, color: "rgba(201,169,110,0.7)" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: "rgba(161,193,216,0.05)",
                border: `1px solid ${stat.color}`,
                padding: 20,
                borderRadius: 8,
              }}
            >
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 8 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, color: stat.color }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div style={{
          display: "flex",
          gap: 20,
          marginBottom: 30,
          flexWrap: "wrap",
          alignItems: "center",
        }}>
          <input
            type="text"
            placeholder="Search by company, email or city..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: 250,
              padding: "12px 16px",
              background: "rgba(161,193,216,0.1)",
              border: "1px solid rgba(161,193,216,0.2)",
              borderRadius: 6,
              color: "white",
              fontFamily: "'Montserrat', sans-serif",
            }}
          />
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            style={{
              padding: "12px 16px",
              background: "rgba(161,193,216,0.1)",
              border: "1px solid rgba(161,193,216,0.2)",
              borderRadius: 6,
              color: "white",
              fontFamily: "'Montserrat', sans-serif",
              cursor: "pointer",
            }}
          >
            <option value="all">All Types</option>
            <option value="boutique">Boutiques</option>
            <option value="distributor">Distributors</option>
            <option value="other">Other</option>
          </select>
          <button
            onClick={handleExportCSV}
            style={{
              padding: "12px 24px",
              background: "var(--dreamer-blue)",
              border: "none",
              color: "var(--dreamer-navy)",
              borderRadius: 6,
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 13,
              transition: "opacity 0.3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Export CSV
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,0.5)" }}>
            Loading registrations...
          </div>
        ) : filteredData.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,0.5)" }}>
            No registrations found
          </div>
        ) : (
          <div style={{
            overflowX: "auto",
            border: "1px solid rgba(161,193,216,0.1)",
            borderRadius: 8,
          }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13,
            }}>
              <thead>
                <tr style={{ background: "rgba(161,193,216,0.05)", borderBottom: "1px solid rgba(161,193,216,0.1)" }}>
                  {["Company", "Email", "Phone", "City", "Country", "Type", "Registered"].map(header => (
                    <th
                      key={header}
                      style={{
                        padding: 16,
                        textAlign: "left",
                        fontWeight: 600,
                        color: "var(--dreamer-blue)",
                        textTransform: "uppercase",
                        fontSize: 11,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((reg, i) => (
                  <tr
                    key={reg.id}
                    style={{
                      borderBottom: "1px solid rgba(161,193,216,0.05)",
                      background: i % 2 === 0 ? "transparent" : "rgba(161,193,216,0.02)",
                      transition: "background 0.3s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(161,193,216,0.1)")}
                    onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(161,193,216,0.02)")}
                  >
                    <td style={{ padding: 16, color: "white" }}>{reg.company}</td>
                    <td style={{ padding: 16, color: "rgba(255,255,255,0.7)" }}>
                      <a href={`mailto:${reg.email}`} style={{ color: "var(--dreamer-blue)", textDecoration: "none" }}>
                        {reg.email}
                      </a>
                    </td>
                    <td style={{ padding: 16, color: "rgba(255,255,255,0.7)" }}>
                      <a href={`tel:${reg.phone}`} style={{ color: "var(--dreamer-blue)", textDecoration: "none" }}>
                        {reg.phone}
                      </a>
                    </td>
                    <td style={{ padding: 16, color: "rgba(255,255,255,0.7)" }}>{reg.city}</td>
                    <td style={{ padding: 16, color: "rgba(255,255,255,0.7)" }}>{reg.country}</td>
                    <td style={{ padding: 16 }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 12px",
                          background: reg.registrationType === "boutique" ? "rgba(161,193,216,0.2)" : "rgba(201,169,110,0.2)",
                          color: reg.registrationType === "boutique" ? "var(--dreamer-blue)" : "var(--dreamer-gold)",
                          borderRadius: 4,
                          fontSize: 11,
                          textTransform: "capitalize",
                        }}
                      >
                        {reg.registrationType}
                      </span>
                    </td>
                    <td style={{ padding: 16, color: "rgba(255,255,255,0.5)" }}>
                      {new Date(reg.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid rgba(161,193,216,0.1)", color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
          Showing {filteredData.length} of {registrations.length} registrations
        </div>
      </div>
    </div>
  );
}
