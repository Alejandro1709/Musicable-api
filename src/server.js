import express from 'express';
import albums from './data/albums.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.get('/api/v1/albums', (req, res) => {
  res.status(200).json(albums);
});

app.get('/api/v1/albums/:slug', (req, res) => {
  const album = albums.find((album) => album.albumSlug === req.params.slug);

  if (!album) {
    return res.status(404).send('Album not found');
  }

  res.status(200).json(album);
});

app.post('/api/v1/albums', (req, res) => {
  const { albumTitle, albumReleaseDate, albumCover, albumAuthor } = req.body;

  const newAlbum = {
    id: albums.length + 1,
    albumTitle,
    albumSlug: albumTitle.toLowerCase().replace(/ /g, '-'),
    albumReleaseDate,
    albumCover,
    albumAuthor,
  };

  albums.push(newAlbum);

  res.status(201).json(newAlbum);
});

app.patch('/api/v1/albums/:slug', (req, res) => {
  const album = albums.find((album) => album.albumSlug === req.params.slug);

  if (!album) {
    return res.status(404).send('Album not found');
  }

  const { albumTitle, albumReleaseDate, albumCover, albumAuthor } = req.body;

  album.albumTitle = albumTitle;
  album.albumSlug = albumTitle.toLowerCase().replace(/ /g, '-');
  album.albumReleaseDate = albumReleaseDate;
  album.albumCover = albumCover;
  album.albumAuthor = albumAuthor;

  res.status(200).json(album);
});

app.delete('/api/v1/albums/:slug', (req, res) => {
  const album = albums.find((album) => album.albumSlug === req.params.slug);

  if (!album) {
    return res.status(404).send('Album not found');
  }

  const index = albums.indexOf(album);

  albums.splice(index, 1);

  res.status(200).json({ message: 'Album deleted' });
});

app.listen(2000, () => {
  console.log('Server listening on port 2000');
});
