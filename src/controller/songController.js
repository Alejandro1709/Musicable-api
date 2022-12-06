import db from '../db/index.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

export const getSongs = catchAsync(async (req, res, next) => {
  const { rows } = await db.query('SELECT * FROM songs;');
  res.status(200).json(rows);
});

export const getSong = catchAsync(async (req, res, next) => {
  const { rows } = await db.query('SELECT * FROM songs WHERE songSlug = $1;', [
    req.params.songSlug,
  ]);

  const song = rows[0];

  if (!song) {
    return next(new AppError('No song found with that Slug', 404));
  }

  res.status(200).json(song);
});

export const createSong = catchAsync(async (req, res, next) => {
  const { songName, songLength, songAuthor } = req.body;

  const songSlug = songName.toLowerCase().replace(/ /g, '-');

  await db.query(
    'INSERT INTO songs (songName, songSlug, songLength, songauthor) VALUES ($1, $2, $3, $4);',
    [songName, songSlug, songLength, songAuthor]
  );

  res.status(201).json({
    status: 'success',
    data: {
      songName,
      songSlug,
      songLength,
      songAuthor,
    },
  });
});
