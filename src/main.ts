import dotenv from 'dotenv';
import express from 'express';
import { AddressInfo } from 'net';

dotenv.config();

const app = express();

const listener = app.listen(Number(process.env.PORT), () => {
  const { port } = listener.address() as AddressInfo;
  console.log(`Node server started on port ${port}`);

  app.get('/', ({ res }) => {
    res.status(200).send('OK');
  });
});
