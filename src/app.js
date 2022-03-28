import express from 'express';
const app = express();

import boletoRoute from './routes/TicketRoute.js';

app.use('/boleto', boletoRoute);
app.listen(8080, () => console.log('Running server on port 8080'));

export default app;