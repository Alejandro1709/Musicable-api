import { Router } from 'express';
import {
  getAlbumSongs,
  getAlbumSongsByAlbumSlug,
  createAlbumSong,
} from '../controller/albumSongsController.js';

const router = Router();

router.route('/').get(getAlbumSongs).post(createAlbumSong);

router.route('/:albumSlug').get(getAlbumSongsByAlbumSlug);

export default router;
