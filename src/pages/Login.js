import { useState } from "react";
import { getUsers, setLoggedUser } from "../utils/storage";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const login = () => {
    if (!form.username || !form.password) {
      alert("Please enter both username and password");
      return;
    }
    
    let users = getUsers();
    let found = users.find(
      (u) =>
        u.username === form.username && u.password === form.password
    );

    if (found) {
      setLoggedUser(found);
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  const styles = `
    .login-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }

    .login-card {
      background: white;
      border-radius: 20px;
      padding: 2rem;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .login-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 30px 50px rgba(0,0,0,0.15);
    }

    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .water-icon {
      font-size: 4rem;
      margin-bottom: 0.5rem;
    }

    .login-title {
      font-size: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: bold;
      margin: 0;
    }

    .login-subtitle {
      color: #666;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }

    .login-label {
      font-weight: 600;
      color: #333;
      margin-bottom: 0.5rem;
      display: block;
      font-size: 0.95rem;
    }

    .login-input {
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      padding: 0.75rem 1rem;
      transition: all 0.3s ease;
      font-size: 1rem;
    }

    .login-input:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
      outline: none;
    }

    .login-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 12px;
      padding: 0.75rem;
      font-weight: 600;
      font-size: 1.1rem;
      transition: all 0.3s ease;
      width: 100%;
      margin-top: 1rem;
      color: white;
    }

    .login-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .login-btn:active {
      transform: translateY(0);
    }

    .signup-link {
      text-align: center;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #e0e0e0;
      color: #666;
    }

    .signup-text {
      cursor: pointer;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .signup-text:hover {
      opacity: 0.8;
      transform: translateX(2px);
    }

    .demo-credentials {
      background: #f8f9fa;
      border-radius: 10px;
      padding: 0.75rem;
      margin-top: 1.5rem;
      font-size: 0.85rem;
      text-align: center;
      border-left: 3px solid #667eea;
    }

    .demo-credentials p {
      margin: 0;
      color: #666;
    }

    .demo-credentials strong {
      color: #667eea;
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

    .login-card {
      animation: fadeInUp 0.5s ease;
    }

    @media (max-width: 768px) {
      .login-card {
        padding: 1.5rem;
        margin: 1rem;
      }
      
      .login-title {
        font-size: 1.5rem;
      }
      
      .water-icon {
        font-size: 3rem;
      }
      
      .login-btn {
        font-size: 1rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="water-icon">💧</div>
            <h3 className="login-title">Water Tracker</h3>
            <p className="login-subtitle">Track your daily water intake</p>
          </div>

          <div className="mb-3">
            <label className="login-label">
              👤 Username
            </label>
            <input
              className="form-control login-input"
              type="text"
              placeholder="Enter your username"
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  login();
                }
              }}
            />
          </div>

          <div className="mb-3">
            <label className="login-label">
              🔒 Password
            </label>
            <input
              className="form-control login-input"
              type="password"
              placeholder="Enter your password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  login();
                }
              }}
            />
          </div>

          <button
            className="btn login-btn"
            onClick={login}
          >
            🚀 Login
          </button>

          <div className="signup-link">
            <p>
              Don't have an account?{" "}
              <span
                role="button"
                className="signup-text"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </p>
          </div>

          <div className="demo-credentials">
            <p>
              <strong>💡 Demo Credentials:</strong><br />
              Username: <strong>demo</strong> | Password: <strong>demo123</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}