import { Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="bg-white rounded shadow hover:shadow-xl transition duration-400 ease-in-out"
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="rounded-t w-full h-60 object-contain "
      />
      <div className="px-4 py-3">
        {/* Title left, star rating fixed on right */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-lg flex-1 break-words leading-tight">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-600 flex items-center gap-1 shrink-0">
            <Star size={18} color="#d19f15" fill="#faf200" /> 
            {movie.vote_average}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
