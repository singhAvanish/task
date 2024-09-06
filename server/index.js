import express from 'express';
import cors from 'cors';
import userroutes from './routes/user.js';
import connectDB from './connect.js';
import courseroutes from './routes/course.js';
import homeroutes from './routes/home.js'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT;



connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());



app.use('/',homeroutes)

app.use('/user', userroutes);


app.use('/courses', courseroutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
