import React, { useState, useEffect } from 'react';
import { Loading } from '../Loading';
import StarRating from '../StarRatingComponent';
import { useMovieDetails } from '../../hooks/useMovieDetails';

export default function MovieDetails({ selectedMovie, onDeselectMovie, onHandleToList, selectedMovies }) {

    const isAddedToList = selectedMovies.map(m => m.id).includes(selectedMovie);
    const [userRating, setUserRating] = useState(null);
    const { movieDetails, loading, error } = useMovieDetails(selectedMovie);
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
                        <>
                            <div className='my-4'>
                                <StarRating maxRating={5} color={'#fcc419'} width={20} height={20} setUserRating={setUserRating} />
                            </div>
                        </>
                        {
                            isAddedToList ? (<span className='badge text-bg-warning me-1'>Had already in the list</span>) : (<button className='btn btn-success me-1' onClick={() => onHandleToList(movieDetails, userRating)}>Add to list</button>)
                        }

                        <button className='btn btn-danger' onClick={onDeselectMovie}>Close</button>
                    </div>
                </div>
            </div>}

        </>
    )
}
