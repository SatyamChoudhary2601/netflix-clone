import React, { useState, useEffect } from "react";
import instance from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseURL = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      const movie_request = await instance.get(fetchUrl);
      setMovies(movie_request?.data?.results);
      return movie_request;
    };
    fetchMovie();
  }, [fetchUrl]);


  const option = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const clickHandler = (movie) => {

    if (trailerUrl) {
      setTrailerUrl("");

    } else {

      movieTrailer(movie?.name || movie?.original_title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {/* several row POster  */}
        {movies?.map((movie) => (
          <img
            src={`${baseURL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onClick={(e) => clickHandler(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            key={movie.id}
          />
        ))}
      </div>
      {/* container --> poster*/}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={option} />}
    </div>
  );
}

export default Row;
