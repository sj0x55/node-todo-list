type KillResult = {
  stdout: string;
};

declare module 'kill-port' {
  function killPort(port: number, method?: string): Promise<KillResult>;
  export = killPort;
}
