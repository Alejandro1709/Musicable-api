import db from '../db/index.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

export const getAlbumSongs = catchAsync(async (req, res, next) => {
  const { rows } = await db.query(
    'SELECT album_songs.id, albums.id AS albumId, albumSlug, albumTitle, albumCover, albumAuthor, songs.id AS songId, songName  FROM album_songs LEFT JOIN albums ON album_songs.album_id = albums.id LEFT JOIN songs ON album_songs.song_id = songs.id;'
  );

  const albumSongs = rows;

  if (!albumSongs) {
    return next(new AppError('No songs found for this album', 404));
  }

  res.status(200).json(albumSongs);
});

export const getAlbumSongsByAlbumSlug = catchAsync(async (req, res, next) => {
  const { rows } = await db.query(
    'SELECT album_songs.id, albums.id AS albumId, albumSlug, albumTitle, albumCover, albumAuthor, songs.id AS songId, songName  FROM album_songs LEFT JOIN albums ON album_songs.album_id = albums.id LEFT JOIN songs ON album_songs.song_id = songs.id WHERE albumSlug = $1;',
    [req.params.albumSlug]
  );

  const albumSongs = rows;

  if (!albumSongs) {
    return next(new AppError('No songs found for this album', 404));
  }

  res.status(200).json(albumSongs);
});

export const createAlbumSong = catchAsync(async (req, res, next) => {
  const { albumId, songId } = req.body;

  await db.query(
    'INSERT INTO album_songs (album_id, song_id) VALUES ($1, $2);',
    [albumId, songId]
  );

  res.status(201).json({
    status: 'success',
    data: {
      albumId,
      songId,
    },
  });
});
