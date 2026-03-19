import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Shield, Clock, Loader2 } from "lucide-react";
import { getProfile } from "../api/auth";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const data = await getProfile(token);
        setProfile(data.user || data);
      } catch (err) {
        setError(err.message || "Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <Loader2 className="spinner" style={{ width: "3rem", height: "3rem", borderColor: "rgba(255,255,255,0.1)", borderTopColor: "var(--accent-primary)" }} />
        <p style={{ color: "var(--text-secondary)" }}>Loading your premium dashboard...</p>
      </div>
    );
  }

  return (
    <div className="glass-panel dashboard-card">
      <div className="profile-header">
        <div className="avatar">
          {profile?.username?.charAt(0).toUpperCase() || "U"}
        </div>
        <div className="profile-info">
          <h2>Welcome back, {profile?.username || "User"}</h2>
          <p>Here's an overview of your account</p>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      <div className="info-grid">
        <div className="info-item">
          <div className="info-label">
            <User size={16} /> Username
          </div>
          <div className="info-value">{profile?.username || "N/A"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">
            <Shield size={16} /> Account Status
          </div>
          <div className="info-value" style={{ color: "var(--success)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--success)", boxShadow: "0 0 10px var(--success)" }}></div>
            Active & Verified
          </div>
        </div>
        <div className="info-item" style={{ gridColumn: "1 / -1" }}>
          <div className="info-label">
            <Clock size={16} /> Latest Session Activity
          </div>
          <div className="info-value" style={{ fontSize: "1rem" }}>
            Currently secure. All systems operational.
          </div>
        </div>
      </div>

      <button onClick={handleLogout} className="btn btn-secondary" style={{ marginTop: "1rem" }}>
        <LogOut size={18} />
        Sign Out Securely
      </button>
    </div>
  );
};

export default Dashboard;
