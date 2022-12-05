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
  const { albumTitle, albumCover } = req.body;

  const { rows } = await db.query(
    'UPDATE albums SET albumTitle = $1, albumCover = $2 WHERE id = $3 RETURNING *;',
    [albumTitle, albumCover, req.params.id]
  );

  const album = rows[0];

  if (!album) {
    return next(new AppError('No album found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      id: album.id,
      albumTitle,
      albumCover,
    },
  });
});

export const deleteAlbum = catchAsync(async (req, res, next) => {
  const { rows } = await db.query('DELETE FROM albums WHERE id = $1;', [
    req.params.id,
  ]);

  const album = rows[0];

  if (!album) {
    return next(new AppError('No album found with that ID', 404));
  }

  res.status(200).json({ message: 'Album deleted' });
});
