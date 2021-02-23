import React, { useEffect, useState } from "react";
import axios from "axios";

const AutoComplete = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 3) {
        console.log("wtf");
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
    <div className="container">
      <input
        placeholder="Enter a movie name"
        onChange={(e) => {
          setQuery(e.target.value);
          setLoading(true);
        }}
        value={query}
      ></input>
      <button>Ieskoti</button>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
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
      )}
    </div>
  );
};

export default AutoComplete;
