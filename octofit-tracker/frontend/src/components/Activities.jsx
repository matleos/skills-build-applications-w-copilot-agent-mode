import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'



export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('activities').then(setActivities).catch((reason) => setError(reason.message)) }, [])
  return <section className="panel"><div className="panel-heading"><h2>Recent activity</h2><span>{activities.length} sessions</span></div>{error ? <p className="error">{error}</p> : <div className="activity-list">{activities.map((activity) => <article className="activity" key={activity._id}><div><strong>{activity.type}</strong><small>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Recently completed'}</small></div><b>{activity.durationMinutes} min</b></article>)}</div>}</section>
}
