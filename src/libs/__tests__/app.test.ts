import { createTerminus } from '@godaddy/terminus';
import { Application } from 'express';
import http from 'http';
import kill from 'kill-port';
import mongoose from 'mongoose';
import { killPort, listenServer } from '../app';
import { error } from '../log';

jest.mock('http');
jest.mock('express');
jest.mock('@godaddy/terminus');
jest.mock('mongoose', () => ({
  connection: {
    close: jest.fn(),
  },
}));
jest.mock('kill-port', () => jest.fn());
jest.mock('../log', () => ({
  error: jest.fn(),
  log: jest.fn(),
}));

describe('test killPort()', () => {
  afterEach(() => {
    process.env.NODE_ENV = undefined;
    kill.mockClear();
    error.mockClear();
  });

  it.each([
    { nodeEnv: 'development', expected: 1 },
    { nodeEnv: '', expected: 0 },
  ])('[#$#] should call kill() $expected times (NODE_ENV="$nodeEnv")', ({ nodeEnv, expected }) => {
    process.env.NODE_ENV = nodeEnv;

    killPort(12345);
    expect(kill).toHaveBeenCalledTimes(expected);

    if (expected > 0) {
      expect(kill).toHaveBeenCalledWith(12345);
    }
  });

  it.each([
    { nodeEnv: 'development', expected: 1 },
    { nodeEnv: '', expected: 0 },
  ])('[#$#] should throw the error $expected times (NODE_ENV="$nodeEnv")', ({ nodeEnv, expected }) => {
    const err = Error('Just error...');

    process.env.NODE_ENV = nodeEnv;

    kill.mockImplementationOnce(() => {
      throw err;
    });

    killPort(12345);
    expect(error).toHaveBeenCalledTimes(expected);

    if (expected > 0) {
      expect(error).toHaveBeenCalledWith(err);
    }
  });
});

describe('test listenServer()', () => {
  it('should call listenServer with callback signals', () => {
    const app = {} as Application;
    const listen = jest.fn();
    const callback = jest.fn();
    const server = { listen };

    http.createServer.mockImplementationOnce(() => server);
    mongoose.connection.close.mockImplementationOnce(() => jest.fn());
    createTerminus.mockImplementationOnce(async (_, { onSignal, onShutdown }) => {
      await onSignal();
      await onShutdown();
    });

    listenServer(app, 12345, callback);

    expect(http.createServer).toHaveBeenCalledTimes(1);
    expect(http.createServer).toHaveBeenCalledWith(app);

    expect(listen).toHaveBeenCalledTimes(1);
    expect(listen).toHaveBeenCalledWith(12345, '0.0.0.0', callback);

    expect(createTerminus).toHaveBeenCalledTimes(1);
    expect(createTerminus).toHaveBeenCalledWith(server, expect.any(Object));

    expect(mongoose.connection.close).toHaveBeenCalledTimes(1);
  });
});
