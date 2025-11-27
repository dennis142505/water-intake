import { useState } from "react";
import { getIntakes, saveIntakes, getLoggedUser } from "../utils/storage";

export default function Home() {
  const [quantity, setQuantity] = useState("");
  const user = getLoggedUser();
  const today = new Date().toISOString().split("T")[0];

  const addIntake = () => {
    let intakes = getIntakes();
    let exists = intakes.find(
      i => i.user === user.username && i.date === today
    );

    if (exists) {
      alert("You already added today’s intake.");
      return;
    }

    intakes.push({
      id: Date.now(),
      user: user.username,
      quantity,
      date: today,
      time: new Date().toLocaleTimeString(),
    });

    saveIntakes(intakes);
    alert("Added successfully!");
    // input field blank
    setQuantity("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Add Today's Water Intake</h3>

        <div className="mb-3">
          <label className="form-label">Quantity (ml)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter quantity in ml"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={addIntake}>
          Add Intake
        </button>
      </div>
    </div>
  );
}
