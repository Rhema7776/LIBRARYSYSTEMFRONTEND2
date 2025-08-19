// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function StaffDashboard() {
//   const [borrowedBooks, setBorrowedBooks] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchBorrowedBooks = async () => {
//       try {
//         const token = localStorage.getItem("access_token");
//         const res = await api.get("/transactions/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         // Only show borrowed books not returned
//         setBorrowedBooks(res.data.filter(t => !t.return_date));
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchBorrowedBooks();
//   }, []);

//   const sendReminder = async (transaction) => {
//     try {
//       // For demo, we just simulate sending an email/message
//       // In production, connect backend API for email notifications
//       setMessage(`📧 Reminder sent to ${transaction.member.user.username} for "${transaction.book.title}"`);
//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       setMessage("❌ Failed to send reminder");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>🛠 Staff Dashboard</h1>
//       {message && <p style={{ textAlign: "center", color: "green" }}>{message}</p>}

//       <div style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//         gap: "20px"
//       }}>
//         {borrowedBooks.length === 0 && <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#7f8c8d" }}>No active borrowed books</p>}

//         {borrowedBooks.map((t) => (
//           <div key={t.id} style={{
//             border: "1px solid #ccc",
//             borderRadius: "10px",
//             padding: "15px",
//             background: "#fefefe",
//             boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
//           }}>
//             <h3 style={{ color: "#34495e" }}>{t.book.title}</h3>
//             <p style={{ fontStyle: "italic", color: "#7f8c8d" }}>Borrowed by: {t.member.user.username}</p>
//             <p>Borrowed on: {t.borrow_date}</p>
//             <p>Due date: {t.due_date}</p>
//             <button
//               onClick={() => sendReminder(t)}
//               style={{
//                 marginTop: "10px",
//                 width: "100%",
//                 padding: "8px",
//                 background: "#2980b9",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer"
//               }}
//             >
//               Send Reminder
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function StaffDashboard() {
//   const [borrowedBooks, setBorrowedBooks] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchBorrowedBooks = async () => {
//       try {
//         const token = localStorage.getItem("access_token");
//         const res = await api.get("/transactions/all/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setBorrowedBooks(res.data.filter(t => !t.return_date));
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchBorrowedBooks();
//   }, []);

//   const sendReminder = (transaction) => {
//     const username = typeof transaction.member === "string" 
//       ? transaction.member 
//       : transaction.member?.user?.username || "Unknown";

//     setMessage(`📧 Reminder sent to ${username} for "${transaction.book?.title || "Unknown"}"`);
//     setTimeout(() => setMessage(""), 3000);
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
//       <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>🛠 Staff Dashboard</h1>
//       {message && <p style={{ textAlign: "center", color: "green" }}>{message}</p>}

//       <div style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//         gap: "20px"
//       }}>
//         {borrowedBooks.length === 0 && <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#7f8c8d" }}>No active borrowed books</p>}

//         {borrowedBooks.map((t) => {
//           const username = typeof t.member === "string" 
//             ? t.member 
//             : t.member?.user?.username || "Unknown";

//           return (
//             <div key={t.id} style={{
//               border: "1px solid #ccc",
//               borderRadius: "10px",
//               padding: "15px",
//               background: "#fefefe",
//               boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
//             }}>
//               <h3 style={{ color: "#34495e" }}>{t.book?.title || "Unknown Book"}</h3>
//               <p style={{ fontStyle: "italic", color: "#7f8c8d" }}>Borrowed by: {username}</p>
//               <p>Borrowed on: {t.borrow_date}</p>
//               <p>Due date: {t.due_date}</p>
//               <button
//                 onClick={() => sendReminder(t)}
//                 style={{
//                   marginTop: "10px",
//                   width: "100%",
//                   padding: "8px",
//                   background: "#2980b9",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "5px",
//                   cursor: "pointer"
//                 }}
//               >
//                 Send Reminder
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function StaffDashboard() {
//   const [borrowedBooks, setBorrowedBooks] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchBorrowedBooks = async () => {
//       try {
//         const token = localStorage.getItem("access_token");
//         const res = await api.get("/transactions/all/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setBorrowedBooks(res.data.filter(t => !t.return_date));
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchBorrowedBooks();
//   }, []);

//   const sendReminder = (transaction) => {
//     const username = typeof transaction.member === "string" 
//       ? transaction.member 
//       : transaction.member?.user?.username || "Unknown";

//     setMessage(`📧 Reminder sent to ${username} for "${transaction.book?.title || "Unknown"}"`);
//     setTimeout(() => setMessage(""), 3000);
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
//       <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>🛠 Staff Dashboard</h1>
//       {message && <p style={{ textAlign: "center", color: "green" }}>{message}</p>}

//       <div style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//         gap: "20px"
//       }}>
//         {borrowedBooks.length === 0 && <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#7f8c8d" }}>No active borrowed books</p>}

//         {borrowedBooks.map((t) => {
//           const username = typeof t.member === "string" 
//             ? t.member 
//             : t.member?.user?.username || "Unknown";

//           return (
//             <div key={t.id} style={{
//               border: "1px solid #ccc",
//               borderRadius: "10px",
//               padding: "15px",
//               background: "#fefefe",
//               boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
//             }}>
//               <h3 style={{ color: "#34495e" }}>{t.book?.title || "Unknown Book"}</h3>
//               <p style={{ fontStyle: "italic", color: "#7f8c8d" }}>Borrowed by: {username}</p>
//               <p>Borrowed on: {t.borrow_date}</p>
//               <p>Due date: {t.due_date}</p>
//               <button
//                 onClick={() => sendReminder(t)}
//                 style={{
//                   marginTop: "10px",
//                   width: "100%",
//                   padding: "8px",
//                   background: "#2980b9",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "5px",
//                   cursor: "pointer"
//                 }}
//               >
//                 Send Reminder
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import api from "../api/axios";

export default function StaffDashboard() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await api.get("/transactions/all/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBorrowedBooks(res.data.filter((t) => !t.return_date));
      } catch (err) {
        console.error(err);
      }
    };
    fetchBorrowedBooks();
  }, []);

  const sendReminder = (transaction) => {
    const username = transaction.member || "Unknown";

    setMessage(
      `📧 Reminder sent to ${username} for "${transaction.book?.title || "Unknown"}"`
    );
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#2c3e50",
        }}
      >
        🛠 Staff Dashboard
      </h1>
      {message && (
        <p style={{ textAlign: "center", color: "green" }}>{message}</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {borrowedBooks.length === 0 && (
          <p
            style={{
              gridColumn: "1/-1",
              textAlign: "center",
              color: "#7f8c8d",
            }}
          >
            No active borrowed books
          </p>
        )}

        {borrowedBooks.map((t) => {
          const username = t.member || "Unknown";

          return (
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
              <h3 style={{ color: "#34495e" }}>
                {t.book?.title || "Unknown Book"}
              </h3>
              <p style={{ fontStyle: "italic", color: "#7f8c8d" }}>
                Borrowed by: {username}
              </p>
              <p>Borrowed on: {t.borrow_date}</p>
              <p>Due date: {t.due_date}</p>
              <button
                onClick={() => sendReminder(t)}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "8px",
                  background: "#2980b9",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Send Reminder
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// just added this