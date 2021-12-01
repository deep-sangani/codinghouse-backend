import dotenv from 'dotenv';
import express from 'express';
import Server from './server';
dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT || 4000;
new Server(app);
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
