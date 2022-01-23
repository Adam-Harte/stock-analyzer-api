import express from 'express';

import stockRoutes from './routes/stock';

const app = express();

app.use('/stock', stockRoutes);

app.listen(8080);
