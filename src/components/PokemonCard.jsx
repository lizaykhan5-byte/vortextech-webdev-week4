import { Link } from 'react-router-dom'
import { formatPokemonId, getArtworkUrl } from '../utils/pokemon.js'

function PokemonCard({ pokemon }) {
  return (
    <article className="pokemon-card">
      <Link className="pokemon-card-link" to={`/pokemon/${pokemon.name}`} aria-label={`View ${pokemon.name} details`}>
        <div className="pokemon-card-visual">
          <span className="card-scanline" aria-hidden="true" />
          <img
            src={getArtworkUrl(pokemon.id)}
            alt={`${pokemon.name} official artwork`}
            width="220"
            height="220"
            loading="lazy"
          />
        </div>
        <div className="pokemon-card-copy">
          <span className="pokemon-number">{formatPokemonId(pokemon.id)}</span>
          <h2>{pokemon.name}</h2>
          <span className="view-label">View details <span aria-hidden="true">→</span></span>
        </div>
      </Link>
    </article>
  )
}

export default PokemonCard
