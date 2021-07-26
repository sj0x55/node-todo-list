import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import ip from 'ip';
import mongoose from 'mongoose';
import { getCorsConfig, getDBConfig } from './configs';
import { homeController } from './controllers/home';
import { killPort, listenServer } from './libs/app';
import { error } from './libs/log';
import { errorHandler, notFoundHandler } from './middlewares/app';
import todosApi from './routes/api/todos';

(async () => {
  try {
    dotenv.config();

    const PORT = parseInt(<string>process.env.PORT, 10) || 3000;
    const ipAddress = ip.address();
    const app = express();
    const dbConfig = getDBConfig();
    const corsConfig = getCorsConfig(PORT, ipAddress);

    await mongoose.connect(dbConfig.url, dbConfig.options);
    await killPort(PORT);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors(corsConfig));

    app.get('/', homeController);

    // API v1
    app.use('/api/v1/todos', todosApi());

    // Errors handling
    app.use(notFoundHandler);
    app.use(errorHandler);

    listenServer(app, PORT, () => {
      console.log(`Server listening at http://${ipAddress}:${PORT}`);
    });
  } catch (err) {
    error(err);
    process.exit();
  }
})();
