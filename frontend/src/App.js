import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import ScoreLookup from './components/ScoreLookup.tsx';


import ScoreLevels from './components/ScoreLevels.tsx';
import TopStudents from './components/TopStudents.tsx';

const menuItems = [
  { path: '/search-scores', label: 'Search Scores' },
  { path: '/score-levels', label: 'Score Levels' },
  { path: '/top-students', label: 'Top 10 Students' },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <div style={{ width: '220px', background: 'linear-gradient(to bottom, #ffe259, #3a8dde)', color: '#222', padding: '30px 0 0 0', minHeight: '100%' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.3rem', marginBottom: '30px', textAlign: 'center' }}>Menu</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {menuItems.map((item) => (
          <li
            key={item.path}
            style={{
              padding: '12px 30px',
              cursor: 'pointer',
              fontWeight: location.pathname === item.path ? 'bold' : 'normal',
              background: location.pathname === item.path ? 'rgba(0,0,0,0.10)' : 'none',
              borderLeft: location.pathname === item.path ? '4px solid #1428a0' : '4px solid transparent',
              transition: 'background 0.2s, border-left 0.2s',
            }}
          >
            <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Header */}
        <div style={{ background: '#1428a0', color: 'white', padding: '20px 0', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
          G-Scores
        </div>
        <div style={{ display: 'flex', flex: 1 }}>
          {/* Sidebar */}
          <Sidebar />
          {/* Main Content */}
          <div style={{ flex: 1, background: '#f7f8fa', padding: '40px 30px', overflowY: 'auto' }}>
            <Routes>
              <Route path="/search-scores" element={<ScoreLookup />} />
              <Route path="/score-levels" element={<ScoreLevels />} />
              <Route path="/top-students" element={<TopStudents />} />
            
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;