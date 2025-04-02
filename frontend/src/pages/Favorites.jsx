import '../css/Favorites.css'
import { useAnimalContext } from '../contexts/AnimalContext'
import AnimalCard from '../components/AnimalCard'

function Favorites() {
    const {favorites} = useAnimalContext();

    if(favorites){
        return (
           <div>
            <h2 className="favorites">Favorites</h2>
           
           <div className="animal-grid">
               {favorites.map((animal) => (
                    <AnimalCard animal={animal} key={animal.name} /> // Use name instead of id
                ))}
            </div>
            </div>
            );
    }

    return <div className="favorites-empty">
        <h2> No favorites added yet! </h2>
        <p> Find some animals and click the heart to add to favorites!</p>
        
    </div>
}

export default Favorites