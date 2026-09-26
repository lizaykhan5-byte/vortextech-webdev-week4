import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="fatal-error">
          <span className="status-orb" aria-hidden="true" />
          <h1>The Pokédex needs a quick reset.</h1>
          <p>An unexpected display error occurred. Reload the page to try again.</p>
          <button type="button" className="button button--primary" onClick={() => window.location.reload()}>
            Reload page
          </button>
        </main>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
