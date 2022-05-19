import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import pollRouter from './routers/pollRouter.js';
import choiceRouter from './routers/choiceRouter.js';


const app = express();

app.use(express.json());
app.use(cors());
app.use(pollRouter);
app.use(choiceRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("The server is running on port " + PORT));

