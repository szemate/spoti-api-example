require('dotenv').config();
const express = require('express');
const spotify = require('./spotify');

const port = process.env.PORT ?? 5000;

const app = express();

app.get('/playlists/:id', (req, res) => {
  const playlistId = req.params.id;

  spotify.getAccessToken()
    .then((accessToken) => spotify.getPlaylistData(playlistId, accessToken))
    .then((playlistData) => {
      const { title, tracks } = playlistData;
      console.log('title:', title);
      console.log('tracks:', tracks);

      res.send(playlistData);
    })
    .catch((error) => {
      console.error(error);

      if (error.status === 404) {
        res.status(404).send({ message: 'Not Found' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
});

app.listen(port, () => {
  console.log('Listening on port', port);
});
