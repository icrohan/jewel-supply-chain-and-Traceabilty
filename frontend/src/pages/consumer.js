import { useState } from "react";
import contract from "../contract";

export default function Consumer() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [goldId, setGoldId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📝 REGISTER (local only)
  const register = () => {
    localStorage.setItem("consumer", JSON.stringify({ userId, password }));
    alert("✅ Registered");
  };

  // 🔐 LOGIN
  const login = () => {
    const saved = JSON.parse(localStorage.getItem("consumer"));

    if (!saved) return alert("Register first");

    if (saved.userId === userId && saved.password === password) {
      setIsLoggedIn(true);
      alert("✅ Login Successful");
    } else {
      alert("❌ Invalid credentials");
    }
  };

  // 🔍 CHECK GOLD
  const check = async () => {
    try {
      setLoading(true);

      const res = await contract.methods.getGold(goldId).call();

      setData({
        goldId: res[0],
        purity: res[1],
        weight: res[2],
        hallmark: res[3],
        origin: res[4],
        result: res[5],
        confidence: res[6],
        manufacturer: res[7],
        verified: res[8],
        timestamp: res[9],
      });

    } catch (err) {
      console.error(err);
      alert("❌ Gold not found");
      setData(null);
    }

    setLoading(false);
  };

  return (
    <div style={container}>
      <div style={cardMain}>
        <h1 style={title}>👁️ Consumer Panel</h1>
        <p style={subtitle}>Check Gold Authenticity</p>

        {!isLoggedIn ? (
          <>
            <h3 style={sectionTitle}>Register / Login</h3>

            <input
              placeholder="User ID"
              onChange={(e) => setUserId(e.target.value)}
              style={input}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              style={input}
            />

            <div style={buttonGroup}>
              <button onClick={register} style={btnGreen}>
                📝 Register
              </button>

              <button onClick={login} style={btnBlue}>
                🔐 Login
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 style={sectionTitle}>Search Gold</h3>

            <input
              placeholder="Enter Gold ID"
              value={goldId}
              onChange={(e) => setGoldId(e.target.value)}
              style={input}
            />

            <button onClick={check} style={btnBlueBig}>
              {loading ? "Checking..." : "🔍 Check Gold"}
            </button>

            {data && (
              <div style={dataCard}>
                <h3 style={{ marginBottom: "15px" }}>Gold Details</h3>

                <div style={row}><span>ID</span><b>{data.goldId}</b></div>
                <div style={row}><span>Purity</span><b>{data.purity}</b></div>
                <div style={row}><span>Weight</span><b>{data.weight}</b></div>
                <div style={row}><span>Hallmark</span><b>{data.hallmark}</b></div>
                <div style={row}><span>Origin</span><b>{data.origin}</b></div>
                <div style={row}><span>Manufacturer</span><b>{data.manufacturer}</b></div>
                <div style={row}><span>Confidence</span><b>{data.confidence}%</b></div>

                <div style={statusRow}>
                  Status:{" "}
                  {data.verified ? (
                    <span style={verified}>✅ Verified</span>
                  ) : (
                    <span style={notVerified}>❌ Not Verified</span>
                  )}
                </div>

                <div style={time}>
                  {new Date(data.timestamp * 1000).toLocaleString()}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #1e3c72, #2a5298)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardMain = {
  background: "#fff",
  padding: "40px",
  borderRadius: "20px",
  width: "90%",
  maxWidth: "550px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const title = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#1e3c72",
};

const subtitle = {
  color: "#555",
  marginBottom: "30px",
};

const sectionTitle = {
  marginBottom: "20px",
};

const input = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const buttonGroup = {
  display: "flex",
  gap: "10px",
  marginTop: "20px",
};

const btnGreen = {
  flex: 1,
  padding: "10px",
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const btnBlue = {
  ...btnGreen,
  background: "#2196F3",
};

const btnBlueBig = {
  width: "100%",
  marginTop: "15px",
  padding: "12px",
  background: "#2196F3",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
};

const dataCard = {
  marginTop: "20px",
  padding: "20px",
  borderRadius: "15px",
  background: "#f4f6f8",
  textAlign: "left",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
};

const statusRow = {
  marginTop: "15px",
  textAlign: "center",
  fontWeight: "bold",
};

const verified = { color: "green" };
const notVerified = { color: "red" };

const time = {
  marginTop: "10px",
  fontSize: "12px",
  color: "#777",
  textAlign: "center",
};