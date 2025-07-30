import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";

const API_KEY = "0766efba65359a442a070a27e7c2d492";

function Home() {
  const [movies, setMovies] = useState([]); // Always an array
  const [allMovies, setAllMovies] = useState([]); // Backup of popular movies
  const [loading, setLoading] = useState(true);

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
      const res = await axios.get(URL);
      setMovies(res.data.results || []);
      setAllMovies(res.data.results || []);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar setMovies={setMovies} allMovies={allMovies} />

      <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="col-span-full text-center text-gray-600">Loading...</p>
        ) : movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No movies found
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
