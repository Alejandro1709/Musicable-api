import albums from '../data/albums.js';
import db from '../db/index.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

export const getAlbums = catchAsync(async (req, res, next) => {
  const { rows } = await db.query('SELECT * FROM albums;');
  res.status(200).json(rows);
});

export const getAlbum = catchAsync(async (req, res, next) => {
  const { rows } = await db.query('SELECT * FROM albums WHERE id = $1;', [
    req.params.id,
  ]);

  const album = rows[0];

  if (!album) {
    return next(new AppError('No album found with that ID', 404));
  }

  res.status(200).json(album);
});

export const createAlbum = catchAsync(async (req, res, next) => {
  const { albumTitle, albumCover } = req.body;

  const albumSlug = albumTitle.toLowerCase().replace(/ /g, '-');

  const { rows } = await db.query(
    'INSERT INTO albums (albumTitle, albumSlug, albumCover) VALUES ($1, $2, $3);',
    [albumTitle, albumSlug, albumCover]
  );

  res.status(201).json({
    status: 'success',
    data: {
      id: rows[0].id,
      albumTitle,
      albumSlug,
      albumCover,
    },
  });
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
