import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <span className="not-found-code">404</span>
      <p className="eyebrow">Route not found</p>
      <h1>This record is missing.</h1>
      <p>The page you requested is not part of this Pokédex.</p>
      <Link className="button button--primary" to="/">Return to the index</Link>
    </section>
  )
}

export default NotFoundPage
