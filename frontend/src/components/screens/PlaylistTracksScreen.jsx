import React, { useEffect } from "react";
import { useParams } from "react-router-dom";


// import PlaylistTracksFilterModal from "../dialogs/PlaylistTracksFilterModal";

function PlaylistTracksScreen() {
  const [playlistData, setPlaylistData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();
  const playListId = params.id;

  const fetchPlaylist = async () => {
    e.preventDefault();
    setLoading(true);

    const myAccessToken = localStorage.getItem("access_token");
    const myTokenType = localStorage.getItem("token_type");

    const playListParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${myTokenType} ${myAccessToken}`,
      },
    };

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playListId}`,
        playListParameters
      );

      if (!response.ok) {
        throw new Error("Failed to fetch playlist data");
      }

      const data = await response.json();
      setPlaylistData(data);
    } catch (error) {
      console.error("Error fetching playlist data:", error);
      setError("Failed to fetch playlist data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);
    
  return (
    <div className=" bg-orange-200 grow">
      <h2>PlaylistTracksScreen</h2>

      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      <SharedPlaylistDisplay playlistData={playlistData} />
    </div>
  );
}

export default PlaylistTracksScreen;
