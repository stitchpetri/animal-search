import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { getAnimals, searchAnimals } from "../services/api"; 
import AnimalCard from "../components/AnimalCard";
import '../css/Home.css'

function Home() {

    const [searchQuery, setSearchQuery] = useState("");
    const [animals, setAnimals] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAnimals = async () => {
            try {
                const animals = await getAnimals()
            
                setAnimals(animals)
                
            } catch (err) {
                console.log(err)
                setError("Failed to load animals...")
            }
            finally{
                setLoading(false)
            }
        }

        loadAnimals();

    }, [])


    const handleSearch = async (e) => {
        e.preventDefault();
        if(!searchQuery.trim()) return
        if (loading) return
        setLoading(true)
        try {
            const searchResults = await searchAnimals(searchQuery)
            setAnimals(searchResults)
            setError(null)
        }catch(err){
            console.log(err)
            setError("Failed to search for animals")
        } finally {
            setLoading(false)
        }
        
    }


    return (
        <div className="home">
            
            <form onSubmit={handleSearch} className="search-form">
                <input  
                    type="text" 
                    placeholder="Search for animals..." 
                    className="search-input"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    />
                <button type="submit" className="search-button">
                    Search
                </button>

            </form>

            {/* Show loading or error messages */}
            {loading && <p className="loading">Loading animals...</p>}
            {error && <p className="error-message">{error}</p>}

            {/* Render Animal Cards properly */}
            <div className="animal-grid">
                {animals.length > 0 ? (
                    animals.map((animal) => (
                        <AnimalCard animal={animal} key={animal.name} /> // Use name instead of id
                    ))
                ) : (
                    !loading && <p>No animals found.</p>
                )}
            </div>


            {/* <div className="movies-grid">
                {movies.map(
                (movie) => (
                    movie.title.toLowerCase().startsWith(searchQuery) && (
                        <MovieCard movie={movie} key={movie.id} />
                    ))
                )}

            </div> */}

            <footer>
                 <p> 
                    Copyright 2025
                </p>
            </footer>
        </div>
    );
}

export default Home;