import { useState } from "react";
import { getIntakes, getLoggedUser } from "../utils/storage";

export default function Difference() {
  const user = getLoggedUser();
  const intakes = getIntakes().filter(i => i.user === user.username);

  const [d1, setD1] = useState("");
  const [d2, setD2] = useState("");
  const [difference, setDifference] = useState(null);

  const findDifference = () => {
    let a = intakes.find(i => i.date === d1);
    let b = intakes.find(i => i.date === d2);

    if (!a || !b) {
      alert("Entries for both dates must exist");
      return;
    }

    setDifference(Math.abs(a.quantity - b.quantity));
  };

  const styles = `
    .difference-container {
      min-height: calc(100vh - 76px);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem 1rem;
    }

    .difference-card {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .difference-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 30px 50px rgba(0,0,0,0.15);
    }

    .difference-title {
      font-size: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1.5rem;
      font-weight: bold;
    }

    .difference-label {
      font-weight: 600;
      color: #333;
      margin-bottom: 0.5rem;
      display: block;
    }

    .difference-input {
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      padding: 0.75rem 1rem;
      transition: all 0.3s ease;
      font-size: 1rem;
    }

    .difference-input:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
      outline: none;
    }

    .difference-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 12px;
      padding: 0.75rem;
      font-weight: 600;
      font-size: 1.1rem;
      transition: all 0.3s ease;
      margin-top: 1rem;
    }

    .difference-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .difference-alert {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 15px;
      color: white;
      padding: 1rem;
      margin-top: 1.5rem;
      animation: slideIn 0.5s ease;
    }

    .difference-alert h4 {
      margin: 0;
      font-size: 1.3rem;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .difference-card {
        padding: 1.5rem;
        margin: 0 1rem;
      }
      
      .difference-title {
        font-size: 1.5rem;
      }
      
      .difference-alert h4 {
        font-size: 1.1rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <div className="difference-container">
        <div className="difference-card">
          <h2 className="text-center difference-title">
            📊 Difference Between Two Dates
          </h2>

          <div className="mb-3">
            <label className="difference-label">
              📅 Select First Date
            </label>
            <input
              type="date"
              className="form-control difference-input"
              onChange={e => setD1(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="difference-label">
              📅 Select Second Date
            </label>
            <input
              type="date"
              className="form-control difference-input"
              onChange={e => setD2(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary w-100 difference-btn"
            onClick={findDifference}
          >
            🔍 Find Difference
          </button>

          {difference !== null && (
            <div className="alert difference-alert text-center">
              <h4>
                💧 Difference: {difference} ml
                <br />
                <small style={{ fontSize: "0.9rem", opacity: 0.9 }}>
                  ({Math.round(difference / 100) / 10} cups)
                </small>
              </h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
}