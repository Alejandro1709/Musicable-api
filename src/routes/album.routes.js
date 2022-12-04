import { Router } from 'express';
import {
  getAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from '../controller/albumController.js';

const router = Router();

router.route('/').get(getAlbums).post(createAlbum);

router.route('/:slug').get(getAlbum).put(updateAlbum).delete(deleteAlbum);

export default router;
