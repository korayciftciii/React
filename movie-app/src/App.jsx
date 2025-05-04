import React, { useState, useEffect } from 'react';
import { useMovies } from './hooks/useMovies';
import { getAverage } from './Helper';
import { useLocalStorage } from './hooks/useLocalStorage';

import Pagination from './components/Pagination';
import { Loading } from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import MainContent from './components/MainContent';
import ListContainer from './components/ListContainer';

import NavBar from './components/NavBar/NavBar';
import NavBrand from './components/NavBar/NavBrand';
import NavSearch from './components/NavBar/NavSearch';
import NavResult from './components/NavBar/NavResult';

import MovieCardComponent from './components/Movies/MovieCardComponent';
import UserListSummary from './components/userList/UserListSummary';
import SelectedMovieCard from './components/Movies/SelectedMovieCard';

import MovieDetails from './components/MovieDetails/MovieDetails';


export default function App() {
  const [query, setQuery] = useState('');
  const [selectedMovies, setSelectedMovies] = useLocalStorage([], 'selectedMovies');
  const [selectedMovie, setSelectedMovie] = useState(null)
  const { movies, loading, error, currentPage, totalPages, total_results, nextPage, prevPage } = useMovies(query);

  function handleMovieSelect(id) {
    setSelectedMovie(selectedMovie => id === selectedMovie ? null : id);
  }
  function handleMovieDeselect() {
    setSelectedMovie(null);
  }
  function handleAddToList(movie, userRating) {
    const movieWithUserRating = { ...movie, userRating }
    setSelectedMovies(selectedMovies => [...selectedMovies, movieWithUserRating]);
    handleMovieDeselect();
  }
  function handleRemoveFromList(movieId) {
    setSelectedMovies(selectedMovies =>
      selectedMovies.filter(movie => movie.id !== movieId)
    );
  }

  const averageRating = getAverage(selectedMovies.map((movie) => movie.vote_average));
  const averageUserRating = getAverage(selectedMovies.map((movie) => movie.userRating));
  const averageDuration = getAverage(selectedMovies.map((movie) => movie.runtime));

  return (
    <>
      <NavBar>
        <NavBrand />
        <NavSearch query={query} setQuery={setQuery} />
        <NavResult moviesLenght={total_results} />
      </NavBar>
      <MainContent  >
        <div className="col-md-9">
          <ListContainer >
            {loading && <Loading />}
            {!loading && !error && (
              <>
                {
                  movies.length > 0 && (
                    <>
                      <MovieCardComponent movies={movies} onSelectMovie={handleMovieSelect} selectedMovie={selectedMovie} onDeselectMovie={handleMovieDeselect} />
                      <Pagination nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} totalPages={totalPages} />
                    </>
                  )
                }
              </>
            )}

            {error && <ErrorMessage message={error} />}
          </ListContainer>
        </div>
        <div className="col-md-3">
          <ListContainer >
            {selectedMovie ? (<MovieDetails onHandleToList={handleAddToList} selectedMovie={selectedMovie} onDeselectMovie={handleMovieDeselect} selectedMovies={selectedMovies} />)
              : (
                <>
                  <UserListSummary moviesLenght={selectedMovies.length} averageRating={averageRating} averageDuration={averageDuration} averageUserRating={averageUserRating} />
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

