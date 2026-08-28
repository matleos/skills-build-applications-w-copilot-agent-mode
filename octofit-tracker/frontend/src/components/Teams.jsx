import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((reason) => setError(reason.message)) }, [])
  return <section className="panel"><div className="panel-heading"><h2>Teams</h2><span>{teams.length} active teams</span></div>{error ? <p className="error">{error}</p> : <div className="team-grid">{teams.map((team) => <article className="team" key={team._id}><h3>{team.name}</h3><p>{team.description || 'Ready for the next challenge.'}</p><strong>{team.members?.length || 0} members</strong></article>)}</div>}</section>
}
