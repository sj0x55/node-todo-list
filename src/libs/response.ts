export function msg(msg: string) {
  return { msg };
}

export function error(error: string | Error) {
  return { error: `${error}` };
}
