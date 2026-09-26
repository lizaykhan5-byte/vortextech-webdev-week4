import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorState from '../components/ErrorState.jsx'
import LoadingState from '../components/LoadingState.jsx'
import { getPokemonDetails } from '../services/pokeApi.js'
import { formatLabel, formatPokemonId } from '../utils/pokemon.js'

function PokemonDetailsPage() {
  const { pokemonName } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadDetails() {
      setLoading(true)
      setError('')
      setPokemon(null)

      try {
        const result = await getPokemonDetails(pokemonName, controller.signal)
        setPokemon(result)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadDetails()
    return () => controller.abort()
  }, [pokemonName, retryKey])

  return (
    <section className="details-page">
      <Link className="back-link" to="/">← Back to all Pokémon</Link>

      {loading && <LoadingState variant="detail" />}
      {!loading && error && (
        <ErrorState message={error} onRetry={() => setRetryKey((key) => key + 1)} />
      )}

      {!loading && !error && pokemon && (
        <article className="pokemon-details">
          <div className="detail-visual">
            <span className="detail-ring" aria-hidden="true" />
            <img src={pokemon.image} alt={`${pokemon.name} official artwork`} width="475" height="475" />
            <span className="detail-id">{formatPokemonId(pokemon.id)}</span>
          </div>

          <div className="detail-copy">
            <p className="eyebrow">Pokédex record {formatPokemonId(pokemon.id)}</p>
            <h1>{pokemon.name}</h1>

            <div className="type-list" aria-label="Pokémon types">
              {pokemon.types.map((type) => (
                <span className={`type-badge type-${type}`} key={type}>{type}</span>
              ))}
            </div>

            <dl className="quick-facts">
              <div>
                <dt>Height</dt>
                <dd>{pokemon.height} m</dd>
              </div>
              <div>
                <dt>Weight</dt>
                <dd>{pokemon.weight} kg</dd>
              </div>
              <div>
                <dt>Base XP</dt>
                <dd>{pokemon.baseExperience ?? 'Unknown'}</dd>
              </div>
            </dl>

            <section className="abilities-section" aria-labelledby="abilities-title">
              <h2 id="abilities-title">Abilities</h2>
              <div className="ability-list">
                {pokemon.abilities.map((ability) => (
                  <span key={ability}>{formatLabel(ability)}</span>
                ))}
              </div>
            </section>

            <section className="stats-section" aria-labelledby="stats-title">
              <div className="section-heading-row">
                <h2 id="stats-title">Base stats</h2>
                <span>Max scale 180</span>
              </div>
              <div className="stat-list">
                {pokemon.stats.map((stat) => (
                  <div className="stat-row" key={stat.name}>
                    <div className="stat-label">
                      <span>{formatLabel(stat.name)}</span>
                      <strong>{stat.value}</strong>
                    </div>
                    <div
                      className="stat-track"
                      role="meter"
                      aria-label={`${formatLabel(stat.name)}: ${stat.value}`}
                      aria-valuemin="0"
                      aria-valuemax="180"
                      aria-valuenow={stat.value}
                    >
                      <span style={{ width: `${Math.min(100, (stat.value / 180) * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>
      )}
    </section>
  )
}

export default PokemonDetailsPage
