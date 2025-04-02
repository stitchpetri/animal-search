import '../css/MovieCard.css'

function MovieCard({movie}) {

    function onFavorite(){
        alert("favorited" + movie.title)
    }

    return <div className="movie-card">
        <div className="movie-poster">
            <img src={movie.url} alt={movie.title}/>
            <div className="movie-overlay">
                <button className="favorite-button" onClick={onFavorite}>
                    🤍
                </button>

            </div>
        </div>

        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
        </div>

    </div>    
}

export default MovieCard;