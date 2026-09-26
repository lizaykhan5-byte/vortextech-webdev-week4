import { getArtworkUrl, getPokemonIdFromUrl } from '../utils/pokemon.js'

const API_BASE_URL = 'https://pokeapi.co/api/v2'

async function request(path, signal) {
  let response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      signal,
      headers: { Accept: 'application/json' },
    })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new Error('The live API is unavailable. Check your connection and try again.')
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('That Pokémon record could not be found.')
    }
    throw new Error(`The API returned an error (${response.status}). Please try again.`)
  }

  return response.json()
}

export async function getPokemonList({ limit = 151, signal } = {}) {
  const data = await request(`/pokemon?limit=${limit}&offset=0`, signal)

  return data.results.map((item) => ({
    id: getPokemonIdFromUrl(item.url),
    name: item.name,
  }))
}

export async function getPokemonDetails(nameOrId, signal) {
  const normalizedValue = encodeURIComponent(String(nameOrId).trim().toLowerCase())
  const data = await request(`/pokemon/${normalizedValue}`, signal)

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default
      || data.sprites.front_default
      || getArtworkUrl(data.id),
    types: data.types.map(({ type }) => type.name),
    height: Number((data.height / 10).toFixed(1)),
    weight: Number((data.weight / 10).toFixed(1)),
    baseExperience: data.base_experience,
    abilities: data.abilities.map(({ ability }) => ability.name),
    stats: data.stats.map(({ base_stat: value, stat }) => ({
      name: stat.name,
      value,
    })),
  }
}
