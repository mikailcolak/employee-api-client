import { AxiosResponse } from 'axios';
import * as company from './company';
import * as employee from './employee';

type ValueOf<T> = T[keyof T];
type Handlers = ValueOf<typeof company & typeof employee>;

const lookup = {
  company,
  employee
};

type handlerType = typeof company & typeof employee;

export type HandlerType = keyof handlerType;
export type TargetType = keyof typeof lookup | "";

export type ApiRequestHandlerProvider<T> =
  (target: keyof typeof lookup, handler: HandlerType)
    => (...args : Parameters<Handlers>)
      => Promise<AxiosResponse<any>>;

export const apiRequestHandlerProvider : ApiRequestHandlerProvider<unknown> = (target: TargetType, operation: HandlerType) => {
  if (target === "") throw new Error("Target should be provided.");
  if (target in lookup && operation in lookup[target]) {
    return (lookup[target] as any)[operation];
  }
}
