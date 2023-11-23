import React from "react";

function FetchButton() {
  // TODO: This is boiler plate code to demonstrate how to get access token

  function getPlaylistData(playlistId) {
    const apiUrl = "https://api.spotify.com/v1/playlists/" + playlistId;

    return fetch(apiUrl, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          return Promise.reject(data.error);
        }
        return {
          title: data.name,
          tracks: data.tracks.items.map((item) => ({
            title: item.track.name,
            artist: item.track.artists.map((artist) => artist.name).join(", "),
          })),
        };
      });
  }

  return (
    <div>
      <button onClick={getPlaylistData}>Get playlist</button>
    </div>
  );
}

export default FetchButton;
