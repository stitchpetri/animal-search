import '../css/AnimalCard.css'
import { useAnimalContext } from '../contexts/AnimalContext';

function AnimalCard({animal}) {

    const {isFavorite, addToFavorites, removeFromFavorites} = useAnimalContext()
    const favorite = isFavorite(animal.name)

    function onFavorite(e){
        e.preventDefault();
        console.log(favorite)
        if (favorite) removeFromFavorites(animal.name)
        else addToFavorites(animal)
    }

    return <div className="animal-card">

        <div className="animal-poster">
            {animal.image && <img src={animal.image} alt={animal.title}/>}
            <div className="animal-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavorite}>
                ♥️
                </button>

            </div>
        </div>

        <div className="animal-info">
            <h3>{animal.name}</h3>
            <p>{animal.taxonomy.scientific_name}</p>
        </div>

    </div>    
}

export default AnimalCard;