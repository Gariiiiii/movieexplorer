import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "0766efba65359a442a070a27e7c2d492";

const MovieDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [movieRes, castRes, videoRes] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        ),
      ]);

      setDetails(movieRes.data);
      setCast(castRes.data.cast.slice(0, 5));
      const trailer = videoRes.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      setTrailerKey(trailer?.key);
    };

    fetchData();
  }, [id]);

  const formatRuntime = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}hr ${mins}min`;
  };

  if (!details) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-8 grid md:grid-cols-2 gap-10 bg-white h-screen">
      {/* Left side: Movie Info */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{details.title}</h1>
        <p className="text-gray-700">{details.overview}</p>
        <p>
          <strong>Release Date:</strong> {details.release_date}
        </p>
        <p>
          <strong>Rating:</strong> {details.vote_average}/10
        </p>
        <p>
          <strong>Runtime:</strong> {formatRuntime(details.runtime)}
        </p>
        <p>
          <strong>Genres:</strong>{" "}
          {details.genres.map((g) => g.name).join(", ")}
        </p>
        <div>
          <strong>Top Cast:</strong>
          <ul className="list-disc ml-5">
            {cast.map((actor) => (
              <li key={actor.id}>
                {actor.name} as {actor.character}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right side: Trailer */}
      <div className="flex justify-center items-start">
        {trailerKey ? (
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Movie Trailer"
            allowFullScreen
            className="rounded-lg shadow-lg w-full h-[300px] md:h-[400px]"
          ></iframe>
        ) : (
          <p className="text-gray-500">Trailer not available</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
