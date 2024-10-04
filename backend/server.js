import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import userRoute from './routes/user.route.js';
import connectToDb from './config/connectToDb.js';

dotenv.config();
const app = express();
connectToDb();
app.use(cors());
app.use(express.json());
app.use('/api/v1', userRoute);
const port = process.env.PORT || 8800;
app.get('/', (req, res) => {
  return res.status(200).send({
    message: 'Server is on',
  });
});
app.listen(port, () => {
  console.log('listening on port'.bgWhite + port);
});
