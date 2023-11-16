import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function PlaylistFetcher() {
  const navigate = useNavigate();
  const [playlistId, setPlaylistId] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistItems, setPlaylistItems] = useState([]);

  function handleClick(event) {
    event.preventDefault();

    // See: https://developer.spotify.com/documentation/web-api/reference/get-playlist
    fetch('https://api.spotify.com/v1/playlists/' + playlistId, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    })
      .then((response) => {
        // The response code is 401 if the access token has expired
        if (response.status === 401) {
          localStorage.removeItem('access_token');
          navigate('/login');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data && !data.error) {
          const name = data.name;
          const items = data.tracks.items.map((item) => ({
            title: item.track.name,
            // In Spotify each track has multiple artists, join them into one string
            artist: item.track.artists.map(((artist) => artist.name)).join(', '),
          }));

          setPlaylistName(name);
          setPlaylistItems(items);
        }
      });
  }

  // The user is not logged in
  if (!localStorage.getItem('access_token')) {
    return <Navigate to='/login' />
  }

  return (
    <>
      <header>
        <form>
          <input
            type="text"
            placeholder="Playlist ID"
            value={playlistId}
            onChange={(event) => setPlaylistId(event.target.value)}
          />
          <button
            type="submit"
            onClick={handleClick}
          />
        </form>
      </header>
      <main>
        <h2>{playlistName}</h2>
        <section>
          {playlistItems.map((item, idx) => (
            <div key={idx}>{item.artist} - {item.title}</div>
          ))}
        </section>
      </main>
    </>
  );
}
