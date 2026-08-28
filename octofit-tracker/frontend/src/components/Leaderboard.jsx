import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setLeaders).catch((reason) => setError(reason.message)) }, [])
  return <section className="panel"><div className="panel-heading"><h2>Leaderboard</h2><span>Season standings</span></div>{error ? <p className="error">{error}</p> : <ol className="leaderboard">{leaders.sort((a, b) => a.rank - b.rank).map((leader) => <li key={leader._id}><span className="rank">{leader.rank}</span><span className="leader-name">Athlete {String(leader.user).slice(-4)}</span><b>{leader.points} pts</b></li>)}</ol>}</section>
}
