import { HttpStatus } from '@nestjs/common';

export class Response {
  status: HttpStatus;
  message: string;
  data: any;
}

export type PR = Promise<Response>;
