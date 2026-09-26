function LoadingState({ variant = 'grid' }) {
  if (variant === 'detail') {
    return (
      <section className="detail-skeleton" aria-label="Loading Pokémon details" aria-busy="true">
        <div className="skeleton skeleton--art" />
        <div className="detail-skeleton-copy">
          <div className="skeleton skeleton--eyebrow" />
          <div className="skeleton skeleton--title" />
          <div className="skeleton skeleton--line" />
          <div className="skeleton skeleton--line skeleton--short" />
        </div>
      </section>
    )
  }

  return (
    <div className="pokemon-grid" aria-label="Loading Pokémon" aria-busy="true">
      {Array.from({ length: 12 }, (_, index) => (
        <div className="pokemon-card pokemon-card--skeleton" key={index}>
          <div className="skeleton skeleton--image" />
          <div className="skeleton skeleton--number" />
          <div className="skeleton skeleton--name" />
        </div>
      ))}
    </div>
  )
}

export default LoadingState
