import { HttpStatus } from '@nestjs/common';

export const mapping: Record<number, string> = {
  200: 'success',
  400: 'bad',
  500: 'error',
};
