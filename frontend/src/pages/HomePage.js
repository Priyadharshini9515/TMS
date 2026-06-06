import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <div className="home-dashboard animate-fade-in">
      <header className="page-header">
        <h1>Command Center</h1>
        <p>System Overview & Rapid Action Portal</p>
      </header>

      <div className="bento-grid-centered">
        {/* Quick Action Card - Centered and Smaller */}
        <div className="glass-card bento-card welcome-card custom-small-card">
          <h2>Welcome, {user?.username || 'Guest'}</h2>
          <p className="role-chip">{user?.role || 'Visitor'}</p>
          <p style={{ marginTop: 15, color: 'var(--text-muted)' }}>
            System state: <span style={{ color: '#10B981', fontWeight: 600 }}>Active - Quantum Ready</span>
          </p>
          {!isAuthenticated ? (
            <Link to="/login" className="btn-premium" style={{ marginTop: 20 }}>
              ACCESS SYSTEM
            </Link>
          ) : (
            <Link to="/complaints/new" className="btn-premium" style={{ marginTop: 20 }}>
              RAISE COMPLAINT
            </Link>
          )}
        </div>
      </div>

      {user?.role === 'SuperAdmin' && (
        <div className="glass-card system-overview animate-fade-in centered-section" style={{ marginTop: '2rem' }}>
          <h3>Administrative Summary</h3>
          <p style={{ marginBottom: 20, color: 'var(--text-muted)' }}>All master systems are operational. Configuration nodes are locked.</p>
          <div className="admin-grid">
            <div className="admin-chip">Departments : {6}</div>
            <div className="admin-chip">Regional Blocks : {4}</div>
            <div className="admin-chip">Active Users : {12}</div>
          </div>
        </div>
      )}

      <style>{`
        .home-dashboard {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .bento-grid-centered {
          display: flex;
          justify-content: center;
          width: 100%;
          margin-bottom: 2rem;
        }

        .custom-small-card {
          max-width: 450px;
          width: 100%;
          text-align: center;
          padding: 2.5rem;
        }

        .centered-section {
          max-width: 800px;
          width: 100%;
          text-align: center;
        }
        
        .role-chip {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(0, 242, 255, 0.1);
          color: var(--accent-primary);
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border: 1px solid rgba(0, 242, 255, 0.2);
          margin-top: 5px;
        }

        .admin-grid {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .admin-chip {
          background: rgba(124, 58, 237, 0.1);
          color: #A78BFA;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 600;
          border: 1px solid rgba(124, 58, 237, 0.2);
          font-size: 0.9rem;
        }

        @media (max-width: 640px) {
          .page-header h1 { font-size: 2rem; }
          .admin-grid { flex-direction: column; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
