import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Loader2, ArrowRight } from "lucide-react";
import { register } from "../api/auth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const data = await register(username, password);
      localStorage.setItem("token", data.token);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to register");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
      <h1 className="title">Create Account</h1>
      <p className="subtitle">Join us to experience the premium dashboard</p>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="username">Username</label>
          <User className="input-icon" />
          <input
            id="username"
            type="text"
            className="form-input"
            placeholder="johndoe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <Lock className="input-icon" />
          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
          <Lock className="input-icon" />
          <input
            id="confirmPassword"
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button type="submit" className="btn" disabled={isLoading || success}>
          {isLoading ? (
            <>
              <Loader2 className="spinner" />
              Creating Account...
            </>
          ) : (
            <>
              Register
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          Already have an account?{" "}
          <Link to="/login" className="link">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
