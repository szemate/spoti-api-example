import React from "react";

const SharedPlaylistDisplay = ({ playlistData }) => {
  if (!playlistData) {
    return null;
  }

  return (
    <div className="playlist-info">
      <div className="playlists">
        <h2>{playlistData.name}</h2>
        <p>
          <strong>Description: </strong>
          {playlistData.description}
        </p>
        <p>Total Tracks: {playlistData.tracks.total}</p>
        <img
          src={
            playlistData.images.length > 0
              ? playlistData.images[0].url
              : "https://res.cloudinary.com/teepublic/image/private/s--n4uagiOn--/c_crop,x_10,y_10/c_fit,h_799/c_crop,g_north_west,h_1051,w_1051,x_-171,y_-121/l_upload:v1507037314:production:blanks:gbajnunp66ec7xftnpq1/fl_layer_apply,g_north_west,x_-276,y_-220/b_rgb:ffffff/c_limit,f_jpg,h_630,q_90,w_630/v1539384919/production/designs/3309274_0.jpg"
          }
          alt=""
          style={{ width: "480px", height: "200px" }}
        />
      </div>
      <p>
        <strong>Tracks:</strong>
      </p>
      {playlistData.tracks.items.map((track, trackIndex) => (
        <div key={trackIndex}>
          <p>
            <strong>Track Name:</strong>
            {track.track.name}
          </p>
          {track.track.artists.map((artist, artistIndex) => (
            <p key={artistIndex}>
              <strong>Artist Name:</strong>
              {artist.name}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SharedPlaylistDisplay;
