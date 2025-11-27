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

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Difference Between Two Dates</h2>

        <div className="mb-3">
          <label className="form-label">Select First Date</label>
          <input
            type="date"
            className="form-control"
            onChange={e => setD1(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Select Second Date</label>
          <input
            type="date"
            className="form-control"
            onChange={e => setD2(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={findDifference}
        >
          Find Difference
        </button>

        {difference !== null && (
          <div className="alert alert-info text-center mt-4">
            <h4>Difference: {difference} ml</h4>
          </div>
        )}
      </div>
    </div>
  );
}
