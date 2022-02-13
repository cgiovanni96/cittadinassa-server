import { HttpStatus } from '@nestjs/common';

export const mapping: Record<number, string> = {
  0: 'disabled',
  200: 'success',
  400: 'bad',
  500: 'error',
};
