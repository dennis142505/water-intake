import { useState } from "react";
import { getIntakes, saveIntakes, getLoggedUser } from "../utils/storage";
import { useParams, useNavigate } from "react-router-dom";

export default function EditIntake() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getLoggedUser();
  const intakes = getIntakes();
  const entry = intakes.find(i => i.id === Number(id));

  const [qty, setQty] = useState(entry.quantity);

  const update = () => {
    entry.quantity = qty;
    saveIntakes(intakes);
    navigate("/list");
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4" style={{ maxWidth: "500px", margin: "auto" }}>
        <h2 className="text-center mb-4">Edit Intake</h2>

        <div className="mb-3">
          <label className="form-label">Quantity (ml)</label>
          <input
            type="number"
            className="form-control"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={update}>
          Update
        </button>
      </div>
    </div>
  );
}
