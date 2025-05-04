export default function MovieCardComponent({ movies, onSelectMovie, selectedMovie, onDeselectMovie }) {
    return ((
        <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4">
            {movies.map((movie) => (
                <div className="col mb-2" key={movie.id} onClick={() => onSelectMovie(movie.id)}>
                    <div className={selectedMovie === movie.id ? "card selected-movie h-100" : "card movie h-100"}>
                        {movie.poster_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                className="card-img-top"
                                alt={movie.title || movie.name || "No Title"}
                            />
                        ) : (
                            <div
                                className="card-img-top bg-secondary text-white d-flex align-items-center justify-content-center"
                                style={{ height: "660px" }}
                            >
                                No Image Available
                            </div>
                        )}
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{movie.title || movie.name || "No Title"}</h5>
                            <p className="card-text">
                                <i className="bi bi-calendar2-date me-1"></i>{" "}
                                {movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown Year"}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ))
}