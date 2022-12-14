import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import albumRoutes from './routes/album.routes.js';
import songRoutes from './routes/song.routes.js';
import albumSongsRoutes from './routes/albumSongs.routes.js';
import { PORT, NODE_ENV } from './config/index.js';
import { globalErrorHandler, notFound } from './middlewares/errorMiddleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/albums', albumRoutes);
app.use('/api/v1/songs', songRoutes);
app.use('/api/v1/musicables', albumSongsRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.all('*', notFound);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
