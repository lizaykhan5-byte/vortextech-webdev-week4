function ErrorState({ message, onRetry }) {
  return (
    <section className="state-panel state-panel--error" role="alert">
      <span className="state-icon" aria-hidden="true">!</span>
      <div>
        <h2>We could not reach the Pokédex.</h2>
        <p>{message || 'Please check your internet connection and try again.'}</p>
        {onRetry && (
          <button type="button" className="button button--primary" onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    </section>
  )
}

export default ErrorState
