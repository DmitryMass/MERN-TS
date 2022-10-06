import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import router from './routes/auth.route';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/auth', router);

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI!);
        app.listen(process.env.PORT || 5050, () => {
            console.log(`Server on port ${process.env.PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
