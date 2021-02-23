import React, { useEffect, useState } from "react";
import axios from "axios";

const AutoComplete = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=1b5726d6f7f5bea9a47bce98c8d55b13&language=en-US&query=${query}`
      )
      .then((res) => {
        setMovies(res.data.results);
      });
  }, [query]);

  return (
    <div className="container">
      <input
        placeholder="Enter a movie name"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      ></input>
      <button>Ieskoti</button>
      <ul>
        {movies.map((movie) => {
          return (
            <li>
              <h4>{movie.original_title}</h4>
              <p>{movie.overview}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AutoComplete;
