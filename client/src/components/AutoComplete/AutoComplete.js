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
    <div>
      <div className="autocomplete">
        <div className="autocomplete-search-field">
          <img src={MovieIcon} alt="Movie icon" />
          {query.length === 0 ? (
            <input
              placeholder="Enter a movie name"
              onChange={(e) => {
                setQuery(e.target.value);
                setLoading(e.target.value.length >= 3);
              }}
              value={query}
            ></input>
          ) : null}
        </div>
        {query.length === 0 ? (
          <button disabled={true}>
            <img src={SearchIcon} alt="Search icon" />
          </button>
        ) : null}
      </div>
      {query.length !== 0 ? (
        <div className="results">
          <table>
            <tr className="border_bottom">
              <td>
                <img src={MovieIcon} alt="Movie icon" />
              </td>
              <td>
                <input
                  placeholder="Enter a movie name"
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setLoading(e.target.value.length >= 3);
                  }}
                  value={query}
                ></input>
                <p>Enter a movie name</p>
              </td>
            </tr>
            {movies.map((movie) => {
              return (
                <tr>
                  <td></td>
                  <td>
                    <p>{movie.title} </p>
                    <p>
                      {movie.vote_average}
                      {movie.release_date}
                    </p>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default AutoComplete;
