import React, { useState, useEffect } from 'react';

export function useMovies(query) {
    const api_Key = '';
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [total_results, setTotalResults] = useState(0);

    function nextPage() {
        setCurrentPage(currentPage + 1);
    }
    function prevPage() {
        setCurrentPage(currentPage - 1);
    }
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function fetchMovies(page) {
            try {
                setLoading(true);
                setError("");
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_Key}&query=${query}&page=${page}`, { signal: signal });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                if (data.total_results === 0) {
                    throw new Error('No movies found');
                }
                setMovies(data.results || []);
                setTotalPages(data.total_pages);
                setTotalResults(data.total_results);
            } catch (err) {

                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    setError(err.message);
                }

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
        fetchMovies(currentPage);
        return () => {
            controller.abort();
        }
    }, [query, currentPage]);
    return { movies, loading, error, currentPage, totalPages, total_results, nextPage, prevPage };
}