import React from 'react';
import '../styles/Profile.css';
import { FaMedal, FaTrophy, FaStar, FaCrown } from 'react-icons/fa';

function StatCard({ value, label, color }) {
  return (
    <div className="stat-card">
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${value}%`, backgroundColor: color }}></div>
      </div>
      <span className="stat-value">{value}%</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function Badge({ type, count, icon }) {
  return (
    <div className="badge">
      <div className="badge-icon">{icon}</div>
      <span className="badge-count">{count}</span>
      <span className="badge-type">{type}</span>
    </div>
  );
}

function Profile() {
  const user = {
    name: "Avi Patil",
    class: "10th",
    location: "Mumbai",
    profilePic: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
  };

  const stats = [
    { value: 75, label: "Computer Science", color: "#4ba8eb" },
    { value: 60, label: "Mathematics", color: "#51af07" },
    { value: 40, label: "Science", color: "#6d08c3" },
  ];

  const badges = [
    { type: "Bronze", count: 5, icon: <FaMedal color="#CD7F32" /> },
    { type: "Silver", count: 3, icon: <FaTrophy color="#C0C0C0" /> },
    { type: "Gold", count: 2, icon: <FaStar color="#FFD700" /> },
    { type: "Platinum", count: 1, icon: <FaCrown color="#E5E4E2" /> },
  ];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.profilePic} alt={user.name} className="profile-pic" />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>Class: {user.class} | Location: {user.location}</p>
        </div>
      </div>

      <div className="stats-container">
        <h3>Learning Progress</h3>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>

      <div className="badges-container">
        <h3>Badges Earned</h3>
        <div className="badges-grid">
          {badges.map((badge, index) => (
            <Badge key={index} {...badge} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;