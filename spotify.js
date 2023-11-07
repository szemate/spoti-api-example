const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
async function getAccessToken() {
  const apiUrl = 'https://accounts.spotify.com/api/token';
  const encodedCredentials = Buffer.from(clientId + ':' + clientSecret).toString('base64');

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + encodedCredentials,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  console.debug(data);

  return response.ok ? data.access_token : Promise.reject(data.error);
};

// https://developer.spotify.com/documentation/web-api/reference/get-playlist
async function getPlaylistData(playlistId, token) {
  const apiUrl = 'https://api.spotify.com/v1/playlists/' + playlistId;

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  const data = await response.json();
  console.debug(data);

  if (!response.ok) {
    return Promise.reject(data.error);
  }

  return {
    title: data.name,
    tracks: data.tracks.items.map((item) => ({
      title: item.track.name,
      artist: item.track.artists.map(((artist) => artist.name)).join(', '),
    })),
  };
}

module.exports = {
  getAccessToken,
  getPlaylistData,
};
