SELECT
  album_songs.id,
  albums.id AS albumId,
  albumTitle,
  albumCover,
  albumAuthor,
  songs.id AS songId,
  songName
FROM
  album_songs
  LEFT JOIN albums ON album_songs.album_id = albums.id
  LEFT JOIN songs ON album_songs.song_id = songs.id;