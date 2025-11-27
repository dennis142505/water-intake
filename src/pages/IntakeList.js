import { useState } from "react";
import { getIntakes, saveIntakes, getLoggedUser } from "../utils/storage";
import { Link } from "react-router-dom";

export default function IntakeList() {
  const user = getLoggedUser();
  const all = getIntakes().filter(i => i.user === user.username);
//  current page store
  const [page, setPage] = useState(1);
  const perPage = 5;
 //5item slice
  const paginated = all.slice((page - 1) * perPage, page * perPage);

  const deleteEntry = (id) => {
    let updated = all.filter(i => i.id !== id);
    saveIntakes(updated);
    window.location.reload();
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Your Daily Water Intake</h3>

      {paginated.map(i => (
        <div key={i.id} className="card p-3 mb-3 shadow-sm">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1">{i.date}</h6>
              <p className="mb-0">{i.quantity} ml — <small>{i.time}</small></p>
            </div>

            <div>
              <Link className="btn btn-sm btn-outline-primary me-2" to={`/edit/${i.id}`}>
                Edit
              </Link>

              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteEntry(i.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-primary me-2"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <button
          className="btn btn-primary"
          disabled={(page * perPage) >= all.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
