import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/electronics', (err) => {
  if (err) {
    console.log(err);
  }
});

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port);
