import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ManageBorrowers() {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await api.get("/transactions/all/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransactions();
  }, []);

  // Safe helper functions


  const getBookTitle = (transaction) => {
    if (!transaction.book) return "Unknown Book";
    if (typeof transaction.book === "string") return transaction.book;
    return transaction.book?.title || "Unknown Book";
  };

  const markAsReturned = (id) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, return_date: new Date().toISOString() } : t
      )
    );
    setMessage("✅ Book marked as returned!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
        📚 Manage Borrowers
      </h1>
      {message && <p style={{ textAlign: "center", color: "green" }}>{message}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {transactions.length === 0 && (
          <p
            style={{
              gridColumn: "1/-1",
              textAlign: "center",
              color: "#7f8c8d",
            }}
          >
            No borrowed books yet
          </p>
        )}

        {transactions.map((t) => (
          <div
            key={t.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              background: "#fefefe",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ color: "#34495e" }}>{getBookTitle(t)}</h3>
            <p style={{ fontStyle: "italic", color: "#7f8c8d" }}>
              <strong>Borrowed by:</strong>{" "}
                {t.borrower_username || "Unknown"}
            </p>
            <p>
              <strong>Email:</strong> {t.borrower_email}
            </p>
            <p>Borrowed on: {t.borrow_date}</p>
            <p>Due date: {t.due_date}</p>
            <p>
              Returned:{" "}
              {t.return_date ? new Date(t.return_date).toLocaleDateString() : "❌ Not yet"}
            </p>
            {!t.return_date && (
              <button
                onClick={() => markAsReturned(t.id)}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "8px",
                  background: "#27ae60",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Mark as Returned
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
