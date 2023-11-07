require('dotenv').config();
const express = require('express');
const spotify = require('./spotify');

const port = process.env.PORT ?? 5000;

const app = express();

app.get('/playlists/:id', async (req, res) => {
  const playlistId = req.params.id;

  try {
    const token = await spotify.getAccessToken();
    const title = await spotify.getPlaylistTitle(playlistId, token);
    const tracks = await spotify.getPlaylistTracks(playlistId, token);

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
