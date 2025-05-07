import React, { useState, useEffect } from 'react';


export function useMovieDetails(id) {
    const api_Key = '15642a6eda861eab12598a47d9d6ccf3';
    const [movieDetails, setMovieDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        async function fetchMovie() {
            try {
                setLoading(true);
                const response = await fetch(` https://api.themoviedb.org/3/movie/${id}?api_key=${api_Key}`);
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
    }, [id]);
    return { movieDetails, loading, error };
}