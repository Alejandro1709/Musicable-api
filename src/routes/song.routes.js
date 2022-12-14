import { Router } from 'express';
import { getSongs, getSong, createSong } from '../controller/songController.js';

const router = Router();

router.route('/').get(getSongs).post(createSong);

router.route('/:songSlug').get(getSong);

export default router;
