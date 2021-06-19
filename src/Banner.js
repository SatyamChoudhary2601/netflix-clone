import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";
function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const request_movie = async () => {
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request?.data?.results[
          Math.floor(Math.random() * request?.data?.results?.length - 1)
        ]
      );
    };
    request_movie();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                    )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        {/* title */}
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__button">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_desc">{truncate(movie?.overview, 500)}</h1>
        {/* desc */}
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  );
}

export default Banner;
