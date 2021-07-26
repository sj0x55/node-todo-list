function parseArgs(args: string[], unknownMessage: string): string[] {
  const nonEptyArgs = args.filter((args) => args);

  if (nonEptyArgs.length > 0) {
    return nonEptyArgs;
  } else {
    return [unknownMessage];
  }
}

export function log(...args: string[]): void {
  console.log('[LOG] %s', ...parseArgs(args, 'Unknown message'));
}

export function error(...args: (string | Error)[]): void {
  console.log('[ERROR] %s', ...parseArgs(args.map(String), 'Unknown error'));
}
