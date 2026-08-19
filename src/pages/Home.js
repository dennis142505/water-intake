import { useState } from "react";
import { getIntakes, saveIntakes, getLoggedUser } from "../utils/storage";

export default function Home() {
  const [quantity, setQuantity] = useState("");
  const user = getLoggedUser();
  const today = new Date().toISOString().split("T")[0];

  const addIntake = () => {
    if (!quantity || quantity <= 0) {
      alert("Please enter a valid quantity in ml");
      return;
    }

    let intakes = getIntakes();
    let exists = intakes.find(
      i => i.user === user.username && i.date === today
    );

    if (exists) {
      alert("You already added today's intake.");
      return;
    }

    intakes.push({
      id: Date.now(),
      user: user.username,
      quantity: parseInt(quantity),
      date: today,
      time: new Date().toLocaleTimeString(),
    });

    saveIntakes(intakes);
    alert("Added successfully!");
    setQuantity("");
  };

  const styles = `
    .home-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }

    .home-card {
      background: white;
      border-radius: 20px;
      padding: 2rem;
      width: 100%;
      max-width: 450px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .home-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 30px 50px rgba(0,0,0,0.15);
    }

    .home-title {
      text-align: center;
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: bold;
    }

    .home-date {
      text-align: center;
      background: #f0f0f0;
      padding: 0.5rem;
      border-radius: 10px;
      margin-bottom: 1.5rem;
      font-size: 1rem;
      color: #667eea;
      font-weight: 600;
    }

    .home-label {
      font-weight: 600;
      color: #333;
      margin-bottom: 0.5rem;
      display: block;
      font-size: 0.95rem;
    }

    .home-input {
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      padding: 0.75rem 1rem;
      transition: all 0.3s ease;
      font-size: 1rem;
    }

    .home-input:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
      outline: none;
    }

    .home-input::-webkit-inner-spin-button,
    .home-input::-webkit-outer-spin-button {
      opacity: 0.5;
    }

    .home-btn {
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

    .home-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .home-btn:active {
      transform: translateY(0);
    }

    .water-icon {
      text-align: center;
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .info-text {
      text-align: center;
      margin-top: 1rem;
      font-size: 0.85rem;
      color: #999;
    }

    @media (max-width: 768px) {
      .home-card {
        padding: 1.5rem;
        margin: 1rem;
      }
      
      .home-title {
        font-size: 1.5rem;
      }
      
      .home-btn {
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

    .home-card {
      animation: fadeInUp 0.5s ease;
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <div className="home-container">
        <div className="home-card">
          <div className="water-icon">
            💧
          </div>
          
          <h3 className="home-title">
            Add Today's Water Intake
          </h3>
          
          <div className="home-date">
            📅 {today}
          </div>

          <div className="mb-3">
            <label className="home-label">
              Quantity (ml)
            </label>
            <input
              type="number"
              className="form-control home-input"
              placeholder="Enter quantity in ml"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addIntake();
                }
              }}
            />
          </div>

          <button 
            className="btn home-btn" 
            onClick={addIntake}
          >
            💧 Add Intake
          </button>
          
          <div className="info-text">
            Recommended daily intake: 2000-3000 ml
          </div>
        </div>
      </div>
    </>
  );
}