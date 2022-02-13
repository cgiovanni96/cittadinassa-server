import { HttpStatus } from '@nestjs/common';
import { mapping } from './mapping';
import { Response } from './type';

export const genMessage = (base: string, code: number) => {
  return `${base}_${mapping[code]}`;
};

export const response = (message: string, code: HttpStatus, data: any): Response => {
  return {
    status: code,
    message: genMessage(message, code),
    data: data,
  };
};
