import { useState } from "react";
import contract from "../contract";

export default function Retailer() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [goldId, setGoldId] = useState("");
  const [goldData, setGoldData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📝 REGISTER
  const register = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const account = accounts[0];

      localStorage.setItem("retailer", JSON.stringify({
        userId,
        password,
        account
      }));

      await contract.methods
        .registerRetailer()
        .send({ from: account });

      alert("✅ Registered Successfully");

    } catch (err) {
      console.error(err);
      alert("❌ Registration Failed");
    }
  };

  // 🔐 LOGIN
  const login = () => {
    const data = JSON.parse(localStorage.getItem("retailer"));

    if (!data) return alert("Please register first");

    if (data.userId === userId && data.password === password) {
      setIsLoggedIn(true);
      alert("✅ Login Successful");
    } else {
      alert("❌ Invalid credentials");
    }
  };

  // 🔍 FETCH GOLD DETAILS
  const fetchGold = async () => {
    try {
      const data = await contract.methods.getGold(goldId).call();

      setGoldData({
        goldId: data[0],
        purity: data[1],
        weight: data[2],
        hallmark: data[3],
        origin: data[4],
        result: data[5],
        confidence: data[6],
        manufacturer: data[7],
        verified: data[8],
        timestamp: data[9],
      });

    } catch (err) {
      console.error(err);
      alert("❌ Error fetching gold data");
    }
  };

  // ✅ VERIFY
  const verify = async () => {
    try {
      setLoading(true);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const account = accounts[0];

      await contract.methods
        .verifyGold(goldId)
        .send({ from: account });

      alert("✅ Gold Verified!");

      fetchGold(); // refresh data

    } catch (err) {
      console.error(err);
      alert("❌ Verification failed");
    }

    setLoading(false);
  };

  return (
  <div style={container}>
    <div style={cardMain}>
      <h1 style={title}>🛍️ Retailer Panel</h1>
      <p style={subtitle}>Verify & Validate Gold on Blockchain</p>

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
          <h3 style={sectionTitle}>Verify Gold</h3>

          <input
            placeholder="Enter Gold ID"
            value={goldId}
            onChange={(e) => setGoldId(e.target.value)}
            style={input}
          />

          <button onClick={fetchGold} style={btnBlueBig}>
            🔍 Fetch Details
          </button>

          {/* 🔥 DATA CARD */}
          {goldData && (
            <div style={dataCard}>
              <h3 style={{ marginBottom: "15px" }}>Gold Details</h3>

              <div style={row}><span>Gold ID</span><b>{goldData.goldId}</b></div>
              <div style={row}><span>Purity</span><b>{goldData.purity}</b></div>
              <div style={row}><span>Weight</span><b>{goldData.weight}</b></div>
              <div style={row}><span>Hallmark</span><b>{goldData.hallmark}</b></div>
              <div style={row}><span>Origin</span><b>{goldData.origin}</b></div>
              <div style={row}><span>Manufacturer</span><b>{goldData.manufacturer}</b></div>

              <div style={statusRow}>
                Status:{" "}
                {goldData.verified ? (
                  <span style={verified}>✅ Verified</span>
                ) : (
                  <span style={notVerified}>❌ Not Verified</span>
                )}
              </div>
            </div>
          )}

          <button onClick={verify} disabled={loading} style={btnGreenBig}>
            {loading ? "⏳ Verifying..." : "✅ Verify Gold"}
          </button>
        </>
      )}
    </div>
  </div>
);
}

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
  color: "#333",
};

const input = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px",
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
  cursor: "pointer",
};

const btnGreenBig = {
  width: "100%",
  marginTop: "20px",
  padding: "14px",
  fontSize: "16px",
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const dataCard = {
  marginTop: "20px",
  padding: "20px",
  borderRadius: "15px",
  background: "#f4f6f8",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  textAlign: "left",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
};

const statusRow = {
  marginTop: "15px",
  fontWeight: "bold",
  textAlign: "center",
};

const verified = {
  color: "green",
};

const notVerified = {
  color: "red",
};