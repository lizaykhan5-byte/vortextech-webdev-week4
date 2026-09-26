import { Link, NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Pokédex Explorer home">
          <span className="brand-lens" aria-hidden="true">
            <span />
          </span>
          <span>
            <strong>Pokédex</strong>
            <small>Explorer</small>
          </span>
        </Link>

        <nav aria-label="Primary navigation">
          <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/" end>
            Explore
          </NavLink>
          <a className="nav-link" href="https://pokeapi.co/" target="_blank" rel="noreferrer">
            API source <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
