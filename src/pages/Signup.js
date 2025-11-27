import { useState } from "react";
import { getUsers, saveUsers } from "../utils/storage";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = () => {
    let users = getUsers();

    if (users.find(u => u.username === form.username)) {
      alert("User already exists");
      return;
    }

    users.push(form);
    saveUsers(users);

    alert("Signup successful!");
    navigate("/login", { state: form }); // Autofill login
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Sign Up</h3>

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            className="form-control"
            placeholder="Enter username"
            onChange={e => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={handleSignup}>
          Sign Up
        </button>

        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </small>
        </div>
      </div>
    </div>
  );
}
