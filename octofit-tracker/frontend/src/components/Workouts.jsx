import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((reason) => setError(reason.message)) }, [])
  return <section className="panel"><div className="panel-heading"><h2>Workout library</h2><span>{workouts.length} plans</span></div>{error ? <p className="error">{error}</p> : <div className="workout-grid">{workouts.map((workout) => <article className="workout" key={workout._id}><span className={`tag ${workout.difficulty}`}>{workout.difficulty}</span><h3>{workout.title}</h3><p>{workout.description}</p><strong>{workout.durationMinutes} minutes</strong></article>)}</div>}</section>
}
