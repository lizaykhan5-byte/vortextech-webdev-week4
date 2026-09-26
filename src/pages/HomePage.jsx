import { useEffect, useMemo, useState } from 'react'
import ErrorState from '../components/ErrorState.jsx'
import LoadingState from '../components/LoadingState.jsx'
import PokemonCard from '../components/PokemonCard.jsx'
import { getPokemonList } from '../services/pokeApi.js'

const PAGE_SIZE = 18

function HomePage() {
  const [pokemon, setPokemon] = useState([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadPokemon() {
      setLoading(true)
      setError('')

      try {
        const result = await getPokemonList({ signal: controller.signal })
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

    loadPokemon()
    return () => controller.abort()
  }, [retryKey])

  const filteredPokemon = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase().replace(/^#/, '')

    if (!normalizedQuery) return pokemon

    return pokemon.filter((item) => (
      item.name.includes(normalizedQuery) || String(item.id).includes(normalizedQuery)
    ))
  }, [pokemon, query])

  const totalPages = Math.max(1, Math.ceil(filteredPokemon.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const visiblePokemon = filteredPokemon.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  function handleSearch(event) {
    setQuery(event.target.value)
    setPage(1)
  }

  return (
    <>
      <section className="explorer-intro">
        <div>
          <p className="eyebrow">Kanto field database</p>
          <h1>Find your Pokémon.</h1>
          <p className="intro-copy">
            Search the original 151 by name or Pokédex number, then open any record for live stats and abilities.
          </p>
        </div>
        <div className="database-status" aria-label="Database status: live">
          <span aria-hidden="true" />
          Live API
        </div>
      </section>

      <section className="explorer-panel" aria-labelledby="explorer-heading">
        <div className="toolbar">
          <div>
            <p className="toolbar-label" id="explorer-heading">Pokémon index</p>
            <p className="result-count" aria-live="polite">
              {loading ? 'Syncing records…' : `${filteredPokemon.length} ${filteredPokemon.length === 1 ? 'record' : 'records'}`}
            </p>
          </div>

          <label className="search-box">
            <span className="sr-only">Search Pokémon by name or number</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m21 21-4.3-4.3m2.3-5.2A7.5 7.5 0 1 1 4 11.5a7.5 7.5 0 0 1 15 0Z" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={handleSearch}
              placeholder="Search name or #025"
              autoComplete="off"
            />
          </label>
        </div>

        {loading && <LoadingState />}

        {!loading && error && (
          <ErrorState message={error} onRetry={() => setRetryKey((key) => key + 1)} />
        )}

        {!loading && !error && visiblePokemon.length > 0 && (
          <div className="pokemon-grid">
            {visiblePokemon.map((item) => (
              <PokemonCard key={item.id} pokemon={item} />
            ))}
          </div>
        )}

        {!loading && !error && visiblePokemon.length === 0 && (
          <section className="state-panel state-panel--empty">
            <span className="empty-orb" aria-hidden="true" />
            <div>
              <h2>No matching Pokémon</h2>
              <p>Try another name or use a number from 1 to 151.</p>
              <button type="button" className="button button--secondary" onClick={() => setQuery('')}>
                Clear search
              </button>
            </div>
          </section>
        )}

        {!loading && !error && filteredPokemon.length > PAGE_SIZE && (
          <nav className="pagination" aria-label="Pokémon pages">
            <button
              type="button"
              className="button button--secondary"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              type="button"
              className="button button--secondary"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </nav>
        )}
      </section>
    </>
  )
}

export default HomePage
