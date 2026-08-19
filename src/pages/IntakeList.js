import { useState } from "react";
import { getIntakes, saveIntakes, getLoggedUser } from "../utils/storage";
import { Link } from "react-router-dom";

export default function IntakeList() {
  const user = getLoggedUser();
  const all = getIntakes().filter(i => i.user === user.username);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const paginated = all.slice((page - 1) * perPage, page * perPage);

  const deleteEntry = (id) => {
    let updated = all.filter(i => i.id !== id);
    saveIntakes(updated);
    window.location.reload();
  };

  const styles = `
    .intake-container {
      min-height: calc(100vh - 76px);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem 1rem;
    }

    .intake-wrapper {
      max-width: 800px;
      margin: 0 auto;
    }

    .intake-header {
      background: white;
      border-radius: 15px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }

    .intake-header h3 {
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: bold;
      font-size: 1.8rem;
    }

    .intake-card {
      background: white;
      border-radius: 15px;
      padding: 1.25rem;
      margin-bottom: 1rem;
      box-shadow: 0 5px 15px rgba(0,0,0,0.08);
      transition: all 0.3s ease;
      border: none;
    }

    .intake-card:hover {
      transform: translateX(5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }

    .intake-date {
      font-size: 1.1rem;
      font-weight: 600;
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    .intake-quantity {
      font-size: 1rem;
      color: #555;
      margin-bottom: 0;
    }

    .intake-quantity strong {
      font-size: 1.2rem;
      color: #333;
    }

    .intake-time {
      color: #999;
      font-size: 0.85rem;
    }

    .btn-edit {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 8px;
      padding: 0.4rem 1rem;
      color: white;
      transition: all 0.3s ease;
      margin-right: 0.5rem;
    }

    .btn-edit:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(102, 126, 234, 0.4);
      color: white;
    }

    .btn-delete {
      background: white;
      border: 2px solid #dc3545;
      border-radius: 8px;
      padding: 0.35rem 1rem;
      color: #dc3545;
      transition: all 0.3s ease;
    }

    .btn-delete:hover {
      background: #dc3545;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(220, 53, 69, 0.3);
    }

    .pagination-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 10px;
      padding: 0.5rem 1.5rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .pagination-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .pagination-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .empty-state {
      background: white;
      border-radius: 15px;
      padding: 3rem;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }

    .empty-state h4 {
      color: #667eea;
      margin-bottom: 1rem;
    }

    .empty-state p {
      color: #666;
      margin-bottom: 1.5rem;
    }

    .btn-add {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 10px;
      padding: 0.6rem 1.5rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-add:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .intake-card {
      animation: fadeIn 0.5s ease;
    }

    @media (max-width: 768px) {
      .intake-header h3 {
        font-size: 1.3rem;
      }
      
      .intake-card {
        padding: 1rem;
      }
      
      .intake-date {
        font-size: 0.95rem;
      }
      
      .btn-edit, .btn-delete {
        padding: 0.3rem 0.8rem;
        font-size: 0.85rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <div className="intake-container">
        <div className="intake-wrapper">
          <div className="intake-header">
            <h3>💧 Your Daily Water Intake</h3>
          </div>

          {paginated.length === 0 ? (
            <div className="empty-state">
              <h4>📭 No entries yet</h4>
              <p>Start tracking your water intake today!</p>
              <Link to="/" className="btn btn-add">
                ➕ Add Your First Entry
              </Link>
            </div>
          ) : (
            <>
              {paginated.map(i => (
                <div key={i.id} className="intake-card">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="intake-date">
                        📅 {i.date}
                      </div>
                      <div className="intake-quantity">
                        💧 <strong>{i.quantity} ml</strong> 
                        <span className="intake-time"> — 🕐 {i.time}</span>
                      </div>
                    </div>

                    <div>
                      <Link 
                        className="btn btn-edit" 
                        to={`/edit/${i.id}`}
                      >
                        ✏️ Edit
                      </Link>

                      <button
                        className="btn btn-delete"
                        onClick={() => deleteEntry(i.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {all.length > perPage && (
                <div className="d-flex justify-content-center mt-4">
                  <button
                    className="btn pagination-btn me-2"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    ◀ Prev
                  </button>

                  <button
                    className="btn pagination-btn"
                    disabled={(page * perPage) >= all.length}
                    onClick={() => setPage(page + 1)}
                  >
                    Next ▶
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}