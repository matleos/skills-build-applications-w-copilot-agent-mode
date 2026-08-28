import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('users').then(setUsers).catch((reason) => setError(reason.message))
  }, [])

  return <CollectionTable title="Athletes" columns={['Name', 'Username', 'Email']} rows={users.map((user) => [user.displayName, `@${user.username}`, user.email])} error={error} />
}

function CollectionTable({ title, columns, rows, error }) {
  return <section className="panel"><div className="panel-heading"><h2>{title}</h2><span>{rows.length} records</span></div>{error ? <p className="error">{error}</p> : <div className="table-wrap"><table><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={`${title}-${index}`}>{row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`}>{cell || '—'}</td>)}</tr>)}</tbody></table></div>}</section>
}
