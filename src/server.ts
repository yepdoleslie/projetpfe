import * as dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { connectDB } from '../config/database';
import log from './utils/logger';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/healthcheck', (_, res) => {
    res.status(200).send({ msg: 'All is Ok '});
});

const PORT = process.env.PORT;

// Database Connection
connectDB();

app.listen(PORT, () => {
    log.info(`Server is running on port ${PORT}`);
});