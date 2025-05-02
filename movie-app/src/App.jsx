import React, { useState, useEffect } from 'react';


const api_Key = '15642a6eda861eab12598a47d9d6ccf3';
const getAverage = (array) => array.reduce((sum, value) => sum + value, 0) / array.length;

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null)

  function handleMovieSelect(id) {
    setSelectedMovie(selectedMovie => id === selectedMovie ? null : id);
  }
  function handleMovieDeselect() {
    setSelectedMovie(null);
  }
  function handleAddToList(movie) {
    setSelectedMovies(selectedMovies => [...selectedMovies, movie]);
    handleMovieDeselect();
  }
  function handleRemoveFromList(movieId) {
    setSelectedMovies(selectedMovies =>
      selectedMovies.filter(movie => movie.id !== movieId)
    );
  }

  function MovieDetails({ selectedMovie, onDeselectMovie, onHandleToList }) {
    const [movieDetails, setMovieDetails] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      async function fetchMovie() {
        try {
          setLoading(true);
          const response = await fetch(` https://api.themoviedb.org/3/movie/${selectedMovie}?api_key=${api_Key}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setMovieDetails(data);
          if (data.total_results === 0) {
            throw new Error('No movies found');
          }
        } catch (err) {
          setError(err.message);
        }
        finally {
          setLoading(false);
        }
      }
      fetchMovie();
    }, [selectedMovie]);
    return (
      <>
        {loading ? <Loading /> : <div className='border p-2 mb-3'>
          <div className='row'>
            <div className='col-4'>
              {movieDetails.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                  className="card-img-top"
                  alt={movieDetails.title || movieDetails.name || "No Title"}
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
            <div className='col-8'>
              <h6>{movieDetails.title || movieDetails.name || "No Title"}</h6>
              <p className="card-text">
                <i className="bi bi-calendar2-date me-1"></i>{" "}
                {movieDetails.release_date ? new Date(movieDetails.release_date).getFullYear() : "Unknown Year"}
              </p>
              <p>
                <i className="bi bi-star-fill text-warning"></i>
                <span>{movieDetails.vote_average ? movieDetails.vote_average.toFixed(2) : 0}</span>
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 border-top p-3 mt-3'>
              <p>{movieDetails.overview}</p>
              <p>
                {movieDetails.genres?.map((genre) => <span key={genre.id} className='badge text-bg-primary me-1'>{genre.name}</span>)}
              </p>
              <button className='btn btn-success me-1' onClick={() => onHandleToList(movieDetails)}>Add to list</button>
              <button className='btn btn-danger' onClick={onDeselectMovie}>Close</button>
            </div>
          </div>
        </div>}

      </>
    )
  }
  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_Key}&query=${query}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.total_results === 0) {
          throw new Error('No movies found');
        }
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message);
      }
      finally {
        setLoading(false);
      }
    }
    if (query.length < 2) {
      setMovies([]);
      setError("");
      return
    }
    fetchMovies();
  }, [query]);

  const averageRating = getAverage(selectedMovies.map((movie) => movie.vote_average));
  const averageDuration = getAverage(selectedMovies.map((movie) => movie.runtime));

  return (
    <>
      <NavBar>
        <NavBrand />
        <NavSearch query={query} setQuery={setQuery} />
        <NavResult moviesLenght={movies.length} />
      </NavBar>
      <MainContent  >
        <div className="col-md-9">
          <ListContainer >
            {loading && <Loading />}
            {!loading && !error && <MovieCardComponent movies={movies} onSelectMovie={handleMovieSelect} selectedMovie={selectedMovie} onDeselectMovie={handleMovieDeselect} />}
            {error && <ErrorMessage message={error} />}
          </ListContainer>
        </div>
        <div className="col-md-3">
          <ListContainer >
            {selectedMovie ? (<MovieDetails onHandleToList={handleAddToList} selectedMovie={selectedMovie} onDeselectMovie={handleMovieDeselect} />)
              : (
                <>
                  <UserListSummary moviesLenght={selectedMovies.length} averageRating={averageRating} averageDuration={averageDuration} />
                  <SelectedMovieCard onHandleRemove={handleRemoveFromList} selectedMovies={selectedMovies} />
                </>
              )
            }
          </ListContainer>
        </div>
      </MainContent>
    </>
  )
}
function Loading() {
  return (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
function ErrorMessage({ message }) {
  return (
    < div className="alert alert-danger" role="alert">{message}</div>
  )
}
function NavBar({ children }) {
  return (
    <header>
      <nav className="bg-primary text-white p-2">
        <div className="container">
          <div className="row align-items-center">
            {children}
          </div>
        </div>
      </nav>
    </header>
  )
}
function NavBrand() {
  return (
    <div className="col-4"><i className='bi bi-camera-reels me-2'></i>Movie App</div>
  )
}
function NavSearch({ query, setQuery }) {
  return (
    <div className="col-4">
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="form-control" placeholder="Search Movie" />
    </div>
  )
}
function NavResult({ moviesLenght }) {
  return (
    <div className="col-4 text-end">
      <strong>{moviesLenght}</strong> Results Found
    </div>
  )
}
function MainContent({ children }) {
  return (
    <main className="container">
      <div className="row mt-2">
        {children}
      </div>
    </main>
  )
}
function ListContainer({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="movie-list">
      <button className='btn btn-sm btn-outline-primary mb-2' onClick={() => setIsOpen(val => !val)}><i className={isOpen ? 'bi bi-chevron-up' : 'bi bi-chevron-down'}></i></button>
      {
        isOpen &&
        children
      }
    </div>
  )
}
function MovieCardComponent({ movies, onSelectMovie, selectedMovie, onDeselectMovie }) {
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
function UserListSummary({ moviesLenght, averageRating, averageDuration }) {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h6>You Have {moviesLenght} Movie In Your List</h6>
        <div className='d-flex justify-content-between'>
          <p>
            <i className="bi bi-star-fill text-warning"></i>
            <span>{averageRating ? averageRating.toFixed(1) : 0}</span>
          </p>
          <p>
            <i className="bi bi-clock me-1"></i>
            <span>{averageDuration ? averageDuration.toFixed(2) : 0} Min</span>
          </p>
        </div>
      </div>
    </div>
  )
}
function SelectedMovieCard({ selectedMovies, onHandleRemove }) {
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
