import {createContext, useState, useContext, useEffect} from "react"

const AnimalContext = createContext()

export const useAnimalContext = () => useContext(AnimalContext)

export const AnimalProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")

        if(storedFavs) setFavorites(JSON.parse(storedFavs))

    },[])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (animal) => {
        setFavorites(prev => [...prev, animal])
    }

    const removeFromFavorites = (animalName) => {

        setFavorites(prev => prev.filter(animal => animal.name !== animalName))
    }

    const isFavorite = (animalName) => {
        return favorites.some(animal => animal.name === animalName)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <AnimalContext.Provider value={value}>
        {children}
    </AnimalContext.Provider>
}