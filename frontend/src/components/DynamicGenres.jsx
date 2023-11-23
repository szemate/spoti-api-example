import React, { useEffect, useState } from "react";


const genresUrl =
  "https://api.spotify.com/v1/recommendations/available-genre-seeds";

function GenreFilter() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      const accessToken = localStorage.getItem("access_token");

      try {
        const response = await fetch(genresUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }

    fetchGenres();
  }, []);

  return (
    <div>
      
      <h2>
        <strong>Filter Your Tracks</strong>
      </h2>
      <h4>
        <strong>Genre</strong>
      </h4>

      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">filter by</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreFilter;
