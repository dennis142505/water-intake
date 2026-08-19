import { useState } from "react";
import { getUsers, saveUsers } from "../utils/storage";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!form.username || !form.password) {
      alert("Please fill in all fields");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (form.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    let users = getUsers();

    if (users.find(u => u.username === form.username)) {
      alert("Username already exists. Please choose a different one.");
      return;
    }

    users.push({ username: form.username, password: form.password });
    saveUsers(users);

    alert("Signup successful! Please login.");
    navigate("/login");
  };

  const styles = `
    .signup-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }

    .signup-card {
      background: white;
      border-radius: 20px;
      padding: 2rem;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .signup-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 30px 50px rgba(0,0,0,0.15);
    }

    .signup-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .water-icon {
      font-size: 4rem;
      margin-bottom: 0.5rem;
      animation: wave 2s ease-in-out infinite;
    }

    @keyframes wave {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(10deg); }
    }

    .signup-title {
      font-size: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: bold;
      margin: 0;
    }

    .signup-subtitle {
      color: #666;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }

    .signup-label {
      font-weight: 600;
      color: #333;
      margin-bottom: 0.5rem;
      display: block;
      font-size: 0.95rem;
    }

    .signup-input {
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      padding: 0.75rem 1rem;
      transition: all 0.3s ease;
      font-size: 1rem;
    }

    .signup-input:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
      outline: none;
    }

    .signup-input.error {
      border-color: #dc3545;
      animation: shake 0.3s ease;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }

    .password-requirements {
      font-size: 0.75rem;
      color: #999;
      margin-top: 0.25rem;
    }

    .password-requirements.valid {
      color: #28a745;
    }

    .signup-btn {
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

    .signup-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .signup-btn:active {
      transform: translateY(0);
    }

    .login-link {
      text-align: center;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #e0e0e0;
      color: #666;
    }

    .login-link a {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .login-link a:hover {
      opacity: 0.8;
      transform: translateX(2px);
      display: inline-block;
    }

    .terms-text {
      text-align: center;
      font-size: 0.7rem;
      color: #999;
      margin-top: 1rem;
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

    .signup-card {
      animation: fadeInUp 0.5s ease;
    }

    @media (max-width: 768px) {
      .signup-card {
        padding: 1.5rem;
        margin: 1rem;
      }
      
      .signup-title {
        font-size: 1.5rem;
      }
      
      .water-icon {
        font-size: 3rem;
      }
      
      .signup-btn {
        font-size: 1rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <div className="water-icon">💧✨</div>
            <h3 className="signup-title">Create Account</h3>
            <p className="signup-subtitle">Join us to track your water intake</p>
          </div>

          <div className="mb-3">
            <label className="signup-label">
              👤 Username
            </label>
            <input
              className="form-control signup-input"
              placeholder="Choose a username"
              onChange={e => setForm({ ...form, username: e.target.value })}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSignup();
                }
              }}
            />
          </div>

          <div className="mb-3">
            <label className="signup-label">
              🔒 Password
            </label>
            <input
              type="password"
              className="form-control signup-input"
              placeholder="Create a password"
              onChange={e => setForm({ ...form, password: e.target.value })}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSignup();
                }
              }}
            />
            <div className="password-requirements">
              {form.password && form.password.length < 6 && (
                <span>⚠️ Password must be at least 6 characters</span>
              )}
              {form.password && form.password.length >= 6 && (
                <span className="valid">✓ Password strength: Good</span>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label className="signup-label">
              ✓ Confirm Password
            </label>
            <input
              type="password"
              className={`form-control signup-input ${confirmPassword && form.password !== confirmPassword ? 'error' : ''}`}
              placeholder="Confirm your password"
              onChange={e => setConfirmPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSignup();
                }
              }}
            />
            {confirmPassword && form.password !== confirmPassword && (
              <div className="password-requirements" style={{ color: "#dc3545" }}>
                ⚠️ Passwords do not match
              </div>
            )}
          </div>

          <button className="btn signup-btn" onClick={handleSignup}>
            🚀 Sign Up
          </button>

          <div className="login-link">
            <small>
              Already have an account?{" "}
              <Link to="/login">Login here</Link>
            </small>
          </div>

          <div className="terms-text">
            By signing up, you agree to our Terms of Service
          </div>
        </div>
      </div>
    </>
  );
}