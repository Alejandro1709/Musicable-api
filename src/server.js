import express from 'express';
import { PORT, NODE_ENV } from './config/index.js';
import morgan from 'morgan';
import albumRoutes from './routes/album.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/albums', albumRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
