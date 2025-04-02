
import './App.css'
import './components/MovieCard.jsx'
import MovieCard from './components/MovieCard.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Favorites.jsx'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import { AnimalProvider } from './contexts/AnimalContext.jsx'

function App() {
  return (
    <AnimalProvider>
      
      <NavBar /> 
      <main className="main-context">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>

    </AnimalProvider>
  )
}


export default App
