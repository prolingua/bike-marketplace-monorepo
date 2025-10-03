import express from 'express';
import cors from 'cors';
import routeListings from './routes/listings.js'; // Note the `.js` if using ES modules
import { setupSwagger } from '../swagger.js';
import { env } from '../lib/env';

const app = express();

app.use(cors()); // ✅ This allows requests from any origin
app.use('/listings', routeListings);

// ✅ Swagger docs
setupSwagger(app);

app.get('/', (_req, res) => {
  res.send('🚲 BikeMarket backend is live!');
});

app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}`);
  console.log(`Swagger docs available at http://localhost:${env.PORT}/api-docs`);
});
