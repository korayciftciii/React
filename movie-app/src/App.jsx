import React, { useState, useEffect } from 'react';

const movie_selected_list = [
];
const api_Key = '15642a6eda861eab12598a47d9d6ccf3';
const query = 'last';
const getAverage = (array) => array.reduce((sum, value) => sum + value, 0) / array.length;

export default function App() {
  const [selectedMovies, setSelectedMovies] = useState(movie_selected_list);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_Key}&query=${query}`)
      const data = await response.json();
      setMovies(data.results || []);
      setLoading(false);
    }
    fetchMovies();
  }, []);

  const averageRating = getAverage(selectedMovies.map((movie) => movie.rating));
  const averageDuration = getAverage(selectedMovies.map((movie) => movie.duration));

  return (
    <>
      <NavBar>
        <NavBrand />
        <NavSearch />
        <NavResult moviesLenght={movies.length} />
      </NavBar>
      <MainContent  >
        <div className="col-md-9">
          <ListContainer >
            {loading ? <Loading /> : <MovieCardComponent movies={movies} />}
          </ListContainer>
        </div>
        <div className="col-md-3">
          <ListContainer >
            <UserListSummary moviesLenght={selectedMovies.length} averageRating={averageRating} averageDuration={averageDuration} />
            <SelectedMovieCard selectedMovies={selectedMovies} />
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
function NavSearch() {
  return (
    <div className="col-4">
      <input type="text" className="form-control" placeholder="Search Movie" />
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
function MovieCardComponent({ movies }) {
  return ((
    <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4">
      {movies.map((movie) => (
        <div className="col mb-2" key={movie.id}>
          <div className="card h-100">
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
              <button className="btn btn-primary mt-auto">Add to Selected</button>
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
            <span>{averageDuration ? averageDuration : 0} Min</span>
          </p>
        </div>
      </div>
    </div>
  )
}
function SelectedMovieCard({ selectedMovies }) {
  return (
    selectedMovies.map((selectedMovies) => (
      <div className="card mb-2" key={selectedMovies.Id}>
        <div className="row">
          <div className="col-4">
            <img src={selectedMovies.Poster} alt={selectedMovies.Title} className="img-fluid rounded-start" />
          </div>
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{selectedMovies.Title}</h5>
              <div className="d-flex justify-content-between">
                <p className="card-text"><i className='bi bi-clock me-1'></i> {selectedMovies.duration.toString()} min</p>
                <p className="card-text"><i className='bi bi-star-fill text-warning'></i> {selectedMovies.rating.toString()}</p>
              </div>
              <button className="btn btn-danger">Remove</button>
            </div>
          </div>
        </div>
      </div>
    ))
  );
}
