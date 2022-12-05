import albums from '../data/albums.js';
import catchAsync from '../utils/catchAsync.js';

export const getAlbums = catchAsync(async (req, res, next) => {
  res.status(200).json(albums);
});

export const getAlbum = catchAsync(async (req, res, next) => {
  const album = albums.find((album) => album.albumSlug === req.params.slug);

  if (!album) {
    return res.status(404).send('Album not found');
  }

  res.status(200).json(album);
});

export const createAlbum = catchAsync(async (req, res, next) => {
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

export const updateAlbum = catchAsync(async (req, res, next) => {
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

export const deleteAlbum = catchAsync(async (req, res, next) => {
  const album = albums.find((album) => album.albumSlug === req.params.slug);

  if (!album) {
    return res.status(404).send('Album not found');
  }

  const index = albums.indexOf(album);

  albums.splice(index, 1);

  res.status(200).json({ message: 'Album deleted' });
});
