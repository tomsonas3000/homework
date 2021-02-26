import React, { useEffect, useState, useRef } from "react";
import MovieIcon from "../../icons/movie.svg";
import SearchIcon from "../../icons/search.svg";
import axios from "axios";

const AutoComplete = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState("");
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  useEffect(() => {
    query.length > 0
      ? inputRef2?.current?.focus()
      : inputRef1?.current?.focus();
    setMovies([]);
    setSelectedMovie("");
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
          {query.length === 0 || selectedMovie ? (
            <input
              placeholder="Enter a movie name"
              onChange={(e) => {
                setQuery(e.target.value);
                setLoading(e.target.value.length >= 3);
              }}
              value={selectedMovie ? selectedMovie : ""}
              ref={inputRef1}
            ></input>
          ) : null}
        </div>
        {query.length === 0 || selectedMovie ? (
          <button disabled={true}>
            <img src={SearchIcon} alt="Search icon" />
          </button>
        ) : null}
      </div>
      {query.length !== 0 && !selectedMovie ? (
        <div className="results">
          <table>
            <tbody>
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
                    ref={inputRef2}
                  ></input>
                  <p>Enter a movie name</p>
                </td>
              </tr>
              {!isLoading ? (
                movies.map((movie) => {
                  return (
                    <tr key={movie.id}>
                      <td></td>
                      <td onClick={() => setSelectedMovie(movie.title)}>
                        <p className="title">{movie?.title} </p>
                        <p className="details">
                          {movie?.vote_average} Rating,{" "}
                          {movie?.release_date?.substring(0, 4)}
                        </p>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td></td>
                  <td>
                    <p className="loading">Loading...</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default AutoComplete;
