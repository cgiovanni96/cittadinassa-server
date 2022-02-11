import { Base } from 'src/entities/base';

export type UUID = string;

export type BaseKeys = keyof Base;
export type Conditions<T> = {
  [P in keyof T]?: T[P];
};
