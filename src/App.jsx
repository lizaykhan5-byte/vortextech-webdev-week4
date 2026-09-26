import { Route, Routes } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Header from './components/Header.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import PokemonDetailsPage from './pages/PokemonDetailsPage.jsx'

function App() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <div className="app-shell">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon/:pokemonName" element={<PokemonDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <p>
            Live Pokémon data provided by{' '}
            <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">
              PokéAPI
            </a>
            .
          </p>
          <p>Built by Aleeza Muqadas for VortexTech - Week 4.</p>
        </footer>
      </div>
    </ErrorBoundary>
  )
}

export default App
