import React, { useState } from 'react';
const movie_list = [
  {
    Id: "769",
    Title: "GoodFellas",
    Year: "1990",
    Poster:
      "https://image.tmdb.org/t/p/original/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
  },
  {
    Id: "120",
    Title: "The Lord of the Rings",
    Year: "2001",
    Poster:
      "https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
  },
  {
    Id: "27205",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://image.tmdb.org/t/p/original/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
  },
  {
    Id: "105",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://image.tmdb.org/t/p/original/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg",
  }
];

const movie_selected_list = [
  {
    Id: "769",
    Title: "GoodFellas",
    Year: "1990",
    Poster:
      "https://image.tmdb.org/t/p/original/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    duration: 120,
    rating: 4.5,
  },
  {
    Id: "120",
    Title: "The Lord of the Rings",
    Year: "2001",
    Poster:
      "https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    duration: 120,
    rating: 5.5,
  }
];

const getAverage = (array) => array.reduce((sum, value) => sum + value, 0) / array.length;

export default function App() {
  const [selectedMovies, setSelectedMovies] = useState(movie_selected_list);
  const [movies, setMovies] = useState(movie_list);
  const averageRating = getAverage(movie_selected_list.map((movie) => movie.rating))
  const averageDuration = getAverage(movie_selected_list.map((movie) => movie.duration))
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
            <MovieCardComponent movies={movies} />
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
      {

        movies.map((movie) => (
          <div className='col mb-2' key={movie.Id}>
            <div className="card">
              <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
              <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text"><i className='bi bi-calendar2-date me-1'></i> {movie.Year}</p>
                <button className="btn btn-primary">Add to Selected</button>
              </div>
            </div>
          </div>
        )
        )

      }
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
            <span>{averageRating.toFixed(1)}</span>
          </p>
          <p>
            <i className="bi bi-clock me-1"></i>
            <span>{averageDuration} Min</span>
          </p>
        </div>
      </div>
    </div>
  )
}
function SelectedMovieCard({ selectedMovies }) {
  return (
    selectedMovies.map((selectedMovie) => (
      <div className="card mb-2" key={selectedMovie.Id}>
        <div className="row">
          <div className="col-4">
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} className="img-fluid rounded-start" />
          </div>
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{selectedMovie.Title}</h5>
              <div className="d-flex justify-content-between">
                <p className="card-text"><i className='bi bi-clock me-1'></i> {selectedMovie.duration.toString()} min</p>
                <p className="card-text"><i className='bi bi-star-fill text-warning'></i> {selectedMovie.rating.toString()}</p>
              </div>
              <button className="btn btn-danger">Remove</button>
            </div>
          </div>
        </div>
      </div>
    ))
  );
}