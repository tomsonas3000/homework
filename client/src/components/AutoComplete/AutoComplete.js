import React, { useEffect, useState } from "react";
import MovieIcon from "../../icons/movie.svg";
import SearchIcon from "../../icons/search.svg";
import axios from "axios";

const AutoComplete = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 3) {
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=1b5726d6f7f5bea9a47bce98c8d55b13&language=en-US&query=${query}`
          )
          .then((res) => {
            setMovies(res.data.results.slice(0, 8));
            setLoading(false);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="autocomplete">
      <div className="autocomplete-search-field">
        <img src={MovieIcon} alt="Movie icon" />
        <input
          placeholder="Enter a movie name"
          onChange={(e) => {
            setQuery(e.target.value);
            setLoading(e.target.value.length >= 3);
          }}
          value={query}
        ></input>
        <button>
          <img src={SearchIcon} alt="Search icon" />
        </button>
      </div>

      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
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
      )}
    </div>
  );
};

export default AutoComplete;
