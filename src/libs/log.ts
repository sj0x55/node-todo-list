export function log(...args: string[]): void {
  console.log(`[LOG]`, ...args);
}

export function error(...args: (string | Error)[]): void {
  console.log(`[ERROR]`, ...args.map(String));
}
