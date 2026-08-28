import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">O</span><span>OctoFit</span></div>
        <p className="eyebrow">TRAINING HQ</p>
        <nav className="nav-list" aria-label="Primary navigation">
          <NavLink to="/" end>Overview</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/users">Athletes</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>
        <div className="sidebar-note"><strong>Keep moving.</strong><span>Small sessions become big progress.</span></div>
      </aside>
      <main className="content">
        <Header />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function Header() {
  const location = useLocation()
  const title = location.pathname === '/' ? 'Overview' : location.pathname.slice(1).replace('-', ' ')
  return <header className="topbar"><div><p className="eyebrow">THURSDAY, AUGUST 28</p><h1>{title}</h1></div><div className="status"><span className="status-dot" />Live training data</div></header>
}

function Overview() {
  return <div className="overview"><section className="hero-banner"><div><p className="eyebrow">YOUR WEEK IN MOTION</p><h2>Make today<br /><em>count.</em></h2><p>Track the work, celebrate the wins, and keep your team moving forward.</p><NavLink className="primary-link" to="/activities">View activity <span aria-hidden="true">→</span></NavLink></div><div className="hero-number">04<span>active sessions</span></div></section><div className="metrics"><Metric label="Training minutes" value="170" detail="+18% this week" /><Metric label="Team points" value="2,735" detail="Across 2 teams" /><Metric label="Current rank" value="#01" detail="Keep the lead" /></div><div className="overview-grid"><Activities /><Leaderboard /></div></div>
}

function Metric({ label, value, detail }) {
  return <article className="metric"><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>
}

export default App
