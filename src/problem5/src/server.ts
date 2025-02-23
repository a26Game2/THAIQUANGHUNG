import express from 'express';
import bodyParser from 'body-parser';
import { connectDb } from './config/database';
import { ResourceController } from './controllers/resourceController';
import { createResourceRoutes } from './routes/resourceRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

(async () => {
  await connectDb();

  const resourceController = new ResourceController();
  const resourceRoutes = createResourceRoutes(resourceController);

  app.use('/resources', resourceRoutes);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
