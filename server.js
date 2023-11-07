const express = require('express');

require('dotenv').config()

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const port = process.env.PORT ?? 5000;

const app = express();

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

async function getPlaylistTitle(playlistId, token) {
  const apiUrl = 'https://api.spotify.com/v1/playlists/' + playlistId;

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  const data = await response.json();
  console.debug(data);

  return response.ok ? data.name : Promise.reject(data.error);
}

async function getPlaylistTracks(playlistId, token) {
  const apiUrl = 'https://api.spotify.com/v1/playlists/' + playlistId + '/tracks';

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

  return data.items.map((item) => {
    return {
      title: item.track.name,
      artists: item.track.artists.map(((artist) => artist.name)),
    }
  });
}

app.get('/playlists/:id', async (req, res) => {
  const playlistId = req.params.id;

  try {
    const token = await getAccessToken();
    const title = await getPlaylistTitle(playlistId, token);
    const tracks = await getPlaylistTracks(playlistId, token);

    res.send({ title, tracks });
  } catch (error) {
    console.error(error);

    if (error.status === 404) {
      res.status(404).send({ message: 'Not Found' });
    } else {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
});

app.listen(port, () => {
  console.log('Listening on port', port);
});
