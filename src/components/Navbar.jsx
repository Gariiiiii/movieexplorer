import axios from "axios";
import { Clapperboard, Search } from "lucide-react";
import React, { useState, useEffect } from "react";

const API_KEY = "0766efba65359a442a070a27e7c2d492";

function Navbar({ setMovies, allMovies }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() === "") {
        if (allMovies.length > 0) {
          setMovies(allMovies);
        }
      } else {
        searchMovies(query);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, allMovies]);

  const searchMovies = async (q) => {
    try {
      const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${q}`;
      const res = await axios.get(SEARCH_URL);
      setMovies(res.data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <nav className="bg-[#1c1c1c] sticky text-white px-6 py-4 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-3">
      <h1 className="flex items-center gap-2 text-xl font-bold tracking-widest">
        <Clapperboard size={30} color="#817EC4" /> Mini Movie Explorer
      </h1>

      <div className="relative w-full md:w-64">
        <Search
          size={18}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-1 rounded-md text-white border border-gray-400 border-dashed transition duration-400 ease-in-out hover:border-gray-300 w-full md:w-64"
        />{" "}
      </div>
    </nav>
  );
}

export default Navbar;
