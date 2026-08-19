import { useState } from "react";
import { getIntakes, saveIntakes, getLoggedUser } from "../utils/storage";
import { useParams, useNavigate } from "react-router-dom";

export default function EditIntake() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getLoggedUser();
  const intakes = getIntakes();
  const entry = intakes.find(i => i.id === Number(id));

  const [qty, setQty] = useState(entry?.quantity || "");

  const update = () => {
    if (!qty || qty <= 0) {
      alert("Please enter a valid quantity in ml");
      return;
    }
    
    entry.quantity = parseInt(qty);
    saveIntakes(intakes);
    navigate("/list");
  };

  const styles = `
    .edit-container {
      min-height: calc(100vh - 76px);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem 1rem;
    }

    .edit-card {
      background: white;
      border-radius: 20px;
      padding: 2rem;
      width: 100%;
      max-width: 500px;
      margin: auto;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .edit-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 30px 50px rgba(0,0,0,0.15);
    }

    .edit-title {
      text-align: center;
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: bold;
    }

    .edit-info {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 1rem;
      margin-bottom: 1.5rem;
      border-left: 4px solid #667eea;
    }

    .edit-info p {
      margin: 0;
      color: #555;
      font-size: 0.9rem;
    }

    .edit-info strong {
      color: #667eea;
    }

    .edit-label {
      font-weight: 600;
      color: #333;
      margin-bottom: 0.5rem;
      display: block;
      font-size: 0.95rem;
    }

    .edit-input {
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      padding: 0.75rem 1rem;
      transition: all 0.3s ease;
      font-size: 1rem;
    }

    .edit-input:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
      outline: none;
    }

    .edit-input::-webkit-inner-spin-button,
    .edit-input::-webkit-outer-spin-button {
      opacity: 0.5;
    }

    .edit-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 12px;
      padding: 0.75rem;
      font-weight: 600;
      font-size: 1.1rem;
      transition: all 0.3s ease;
      margin-top: 1rem;
      width: 100%;
      color: white;
    }

    .edit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .edit-btn:active {
      transform: translateY(0);
    }

    .btn-cancel {
      background: white;
      border: 2px solid #6c757d;
      color: #6c757d;
      border-radius: 12px;
      padding: 0.7rem;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.3s ease;
      margin-top: 0.5rem;
      width: 100%;
    }

    .btn-cancel:hover {
      background: #6c757d;
      color: white;
      transform: translateY(-2px);
    }

    .water-icon {
      text-align: center;
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .current-value {
      text-align: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.5rem;
      border-radius: 10px;
      margin-bottom: 1.5rem;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      .edit-card {
        padding: 1.5rem;
        margin: 0 1rem;
      }
      
      .edit-title {
        font-size: 1.5rem;
      }
      
      .edit-btn, .btn-cancel {
        font-size: 1rem;
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .edit-card {
      animation: fadeInUp 0.5s ease;
    }
  `;

  if (!entry) {
    return (
      <>
        <style>{styles}</style>
        <div className="edit-container">
          <div className="edit-card" style={{ textAlign: "center" }}>
            <div className="water-icon">⚠️</div>
            <h3 className="edit-title">Entry Not Found</h3>
            <p style={{ color: "#666", marginBottom: "1.5rem" }}>
              The intake entry you're looking for doesn't exist.
            </p>
            <button 
              className="btn btn-cancel" 
              onClick={() => navigate("/list")}
            >
              Back to List
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>

      <div className="edit-container">
        <div className="edit-card">
          <div className="water-icon">
            ✏️💧
          </div>
          
          <h3 className="edit-title">
            Edit Water Intake
          </h3>

          <div className="edit-info">
            <p>
              📅 <strong>Date:</strong> {entry.date}<br/>
              🕐 <strong>Time:</strong> {entry.time}
            </p>
          </div>

          <div className="current-value">
            Current: {entry.quantity} ml
          </div>

          <div className="mb-3">
            <label className="edit-label">
              New Quantity (ml)
            </label>
            <input
              type="number"
              className="form-control edit-input"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="Enter new quantity in ml"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  update();
                }
              }}
            />
          </div>

          <button 
            className="btn edit-btn" 
            onClick={update}
          >
            💾 Update Intake
          </button>

          <button 
            className="btn btn-cancel" 
            onClick={() => navigate("/list")}
          >
            ❌ Cancel
          </button>
        </div>
      </div>
    </>
  );
}