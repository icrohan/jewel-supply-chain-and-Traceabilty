import { useState } from "react";
import contract from "../contract";

export default function Manufacturer() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 GOLD DATA
  const [goldId, setGoldId] = useState("");
  const [purity, setPurity] = useState("");
  const [weight, setWeight] = useState("");
  const [hallmark, setHallmark] = useState("");
  const [origin, setOrigin] = useState("");

  // 📝 REGISTER
  const register = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const account = accounts[0];

      localStorage.setItem("manufacturer", JSON.stringify({
        userId,
        password,
        account
      }));

      await contract.methods
        .registerManufacturer()
        .send({ from: account });

      alert("✅ Registered");

    } catch (err) {
      alert("❌ Registration Failed");
    }
  };

  // 🔐 LOGIN
  const login = () => {
    const data = JSON.parse(localStorage.getItem("manufacturer"));

    if (!data) return alert("Register first");

    if (data.userId === userId && data.password === password) {
      setIsLoggedIn(true);
      alert("✅ Login Success");
    } else {
      alert("❌ Invalid");
    }
  };

  // 🚀 UPLOAD
  const upload = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const account = accounts[0];

      if (!goldId || !purity || !weight || !hallmark || !origin) {
        return alert("Fill all fields");
      }

      await contract.methods
        .uploadGold(
          goldId,
          purity,
          weight,
          hallmark,
          origin,
          "REAL",
          95
        )
        .send({ from: account });

      alert("✅ Gold Uploaded");

      setGoldId("");
      setPurity("");
      setWeight("");
      setHallmark("");
      setOrigin("");

    } catch (err) {
      console.error(err);
      alert("❌ Upload Failed");
    }
  };

  return (
  <div style={container}>
    <div style={card}>
      <h1 style={title}>🏭 Manufacturer Panel</h1>
      <p style={subtitle}>Upload & Manage Gold on Blockchain</p>

      {!isLoggedIn ? (
        <>
          <h3 style={sectionTitle}>Register / Login</h3>

          <input
            placeholder="User ID"
            onChange={(e) => setUserId(e.target.value)}
            style={input}
          />
          <br />

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
          <h3 style={sectionTitle}>Gold Details</h3>

          <input
            placeholder="Gold ID"
            value={goldId}
            onChange={(e) => setGoldId(e.target.value)}
            style={input}
          />

          <input
            placeholder="Purity (22K/24K)"
            value={purity}
            onChange={(e) => setPurity(e.target.value)}
            style={input}
          />

          <input
            placeholder="Weight (grams)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={input}
          />

          <input
            placeholder="Hallmark Number"
            value={hallmark}
            onChange={(e) => setHallmark(e.target.value)}
            style={input}
          />

          <input
            placeholder="Origin (Location/Mine)"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            style={input}
          />

          <button onClick={upload} style={btnGreenBig}>
            🚀 Upload Gold
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

const card = {
  background: "#fff",
  padding: "40px",
  borderRadius: "20px",
  width: "90%",
  maxWidth: "500px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const title = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#1e3c72",
  marginBottom: "10px",
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
  justifyContent: "space-between",
  marginTop: "20px",
};

const btnGreen = {
  padding: "10px 20px",
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  flex: 1,
  marginRight: "10px",
};

const btnBlue = {
  ...btnGreen,
  background: "#2196F3",
  marginRight: "0",
};

const btnGreenBig = {
  marginTop: "20px",
  width: "100%",
  padding: "14px",
  fontSize: "16px",
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};