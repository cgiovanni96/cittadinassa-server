import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponse } from 'src/model/global/base.response';

const handleResponse = (res: BaseResponse<any> | string) => {
  if (typeof res === 'string') return res;
  if (res.status < 400) return res.data;

  throw new HttpException(undefined, res.status);
};

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((res) => handleResponse(res)));
  }
}
