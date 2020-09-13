export interface LogObj {
  // A string containing information about where the log is printed (e.g. TrainingResolver)
  context: string;

  // The action that is done (e.g. getTrainings)
  action: string;

  // A unique identifier for every customer
  customerId?: string;

  // The ip from which the request came from
  ip?: string;

  // The request id that the gateway has assigned to the request
  requestId?: string;
}
