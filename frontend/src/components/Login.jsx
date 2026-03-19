import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Loader2, ArrowRight } from "lucide-react";
import { login } from "../api/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel">
      <h1 className="title">Welcome Back</h1>
      <p className="subtitle">Enter your credentials to access your account</p>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
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
          />
        </div>

        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="spinner" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          Don't have an account?{" "}
          <Link to="/register" className="link">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
