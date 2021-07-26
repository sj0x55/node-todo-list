import { createTerminus } from '@godaddy/terminus';
import { Application } from 'express';
import http from 'http';
import kill from 'kill-port';
import mongoose from 'mongoose';
import { error, log } from '../libs/log';

export async function killPort(port: number): Promise<void> {
  if (process.env.NODE_ENV === 'development') {
    try {
      await kill(port); // After re-run the server during the watch mode the port may be busy.
    } catch (err) {
      error(err);
    }
  }
}

export async function listenServer(app: Application, port: number, callback?: () => void): Promise<void> {
  const server = http.createServer(app);
  const onSignal = async () => {
    log('Server is starting cleanup');

    mongoose.connection.close(false, () => {
      log('MongoDB connection closed.');
    });
  };
  const onShutdown = async () => {
    log('Cleanup finished, server is shutting down');
  };

  createTerminus(server, { signal: 'SIGINT', onSignal, onShutdown, logger: error });
  server.listen(port, '0.0.0.0', callback);
}
