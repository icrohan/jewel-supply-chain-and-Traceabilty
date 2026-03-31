import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      <div style={card}>
        <h1 style={title}>🪙 GoldChain</h1>
        <p style={subtitle}>
          Blockchain-Based Gold Verification System
        </p>

        <div style={grid}>
          <div style={box} onClick={() => navigate("/manufacturer")}>
            <h2>🏭</h2>
            <h3>Manufacturer</h3>
            <p>Upload gold details to blockchain</p>
          </div>

          <div style={box} onClick={() => navigate("/retailer")}>
            <h2>🛍️</h2>
            <h3>Retailer</h3>
            <p>Verify gold authenticity</p>
          </div>

          <div style={box} onClick={() => navigate("/consumer")}>
            <h2>👁️</h2>
            <h3>Consumer</h3>
            <p>Check gold information</p>
          </div>
        </div>
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
  textAlign: "center",
  width: "80%",
  maxWidth: "900px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const title = {
  fontSize: "40px",
  fontWeight: "bold",
  marginBottom: "10px",
  color: "#1e3c72",
};

const subtitle = {
  fontSize: "18px",
  color: "#555",
  marginBottom: "40px",
};

const grid = {
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  flexWrap: "wrap",
};

const box = {
  flex: "1",
  minWidth: "220px",
  background: "#f4f6f8",
  padding: "25px",
  borderRadius: "15px",
  cursor: "pointer",
  transition: "0.3s",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
};