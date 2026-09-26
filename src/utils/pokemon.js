export function getPokemonIdFromUrl(url) {
  const parts = url.split('/').filter(Boolean)
  return Number(parts.at(-1))
}

export function getArtworkUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export function formatPokemonId(id) {
  return `#${String(id).padStart(3, '0')}`
}

export function formatLabel(value) {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
