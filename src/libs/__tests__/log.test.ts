import { error, log } from '../log';

let consoleLogSpy;

beforeAll(() => {
  consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
});

afterEach(() => {
  consoleLogSpy.mockClear();
});

afterAll(() => {
  consoleLogSpy.mockRestore();
});

test('should log unknown message', () => {
  log('');
  expect(consoleLogSpy).toHaveBeenCalledTimes(1);
  expect(consoleLogSpy).toHaveBeenCalledWith('[LOG] %s', 'Unknown message');
});

test('should log unknown error', () => {
  error('');
  expect(consoleLogSpy).toHaveBeenCalledTimes(1);
  expect(consoleLogSpy).toHaveBeenCalledWith('[ERROR] %s', 'Unknown error');
});

test('should log message', () => {
  log('test msg');
  expect(consoleLogSpy).toHaveBeenCalledTimes(1);
  expect(consoleLogSpy).toHaveBeenCalledWith('[LOG] %s', 'test msg');
});

test('should log error', () => {
  error('test error');
  expect(consoleLogSpy).toHaveBeenCalledTimes(1);
  expect(consoleLogSpy).toHaveBeenCalledWith('[ERROR] %s', 'test error');
});
