// Log levels (https://github.com/pinojs/pino/blob/HEAD/docs/api.md#loggerlevel-string-gettersetter):
export enum LogLevel {
  Fatal = 'fatal', // 60
  Error = 'error', // 50
  Warn = 'warn', // 40
  Info = 'info', // 30
  Debug = 'debug', // 20
  Trace = 'trace', // 10
  Silent = 'silent' // Infinity
}
