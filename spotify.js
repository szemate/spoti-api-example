const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
function getAccessToken() {
  const apiUrl = 'https://accounts.spotify.com/api/token';
  const encodedCredentials = Buffer.from(clientId + ':' + clientSecret).toString('base64');

  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + encodedCredentials,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        return Promise.reject(data.error);
      }
      return data.access_token;
    });
};

// https://developer.spotify.com/documentation/web-api/reference/get-playlist
function getPlaylistData(playlistId, accessToken) {
  const apiUrl = 'https://api.spotify.com/v1/playlists/' + playlistId;

  return fetch(apiUrl, {
    headers: {
      Authorization: 'Bearer ' + accessToken,
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
          artist: item.track.artists.map(((artist) => artist.name)).join(', '),
        })),
      };
    });
}

module.exports = {
  getAccessToken,
  getPlaylistData,
};
