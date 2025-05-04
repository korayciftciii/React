
export default function SelectedMovieCard({ selectedMovies, onHandleRemove }) {
    return (
        selectedMovies.map((selectedMovies) => (
            <div className="card mb-2" key={selectedMovies.Id}>
                <div className="row">
                    <div className="col-4">
                        {selectedMovies.poster_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w500${selectedMovies.poster_path}`}
                                className="card-img-top img-fluid rounded-start"
                                alt={selectedMovies.title || selectedMovies.name || "No Title"}
                            />
                        ) : (
                            <div
                                className="card-img-top bg-secondary text-white d-flex align-items-center justify-content-center"
                                style={{ height: "660px" }}
                            >
                                No Image Available
                            </div>
                        )}
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">{selectedMovies.title || selectedMovies.name || "No Title"}</h5>
                            <div className="d-flex justify-content-between">
                                <p>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <span>{selectedMovies.vote_average ? selectedMovies.vote_average.toFixed(2) : 0}</span>
                                </p>
                                <p>
                                    <i className="bi bi-stars text-warning"></i>
                                    <span>{selectedMovies.userRating ? selectedMovies.userRating.toFixed(2) : 0}</span>
                                </p>
                                <p>
                                    <i className='bi bi-hourglass text-warning me-1'></i>
                                    <span>{selectedMovies?.runtime ? `${selectedMovies.runtime} Min.` : 'Not Found'}</span>
                                </p>
                            </div>
                            <button className="btn btn-danger" onClick={() => onHandleRemove(selectedMovies.id)}>Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        ))
    );
}
