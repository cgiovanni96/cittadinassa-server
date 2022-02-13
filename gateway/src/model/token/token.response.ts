import { BaseResponse } from '../global/base.response';
import { UUID } from '../global/type';

export class Created extends BaseResponse<{ token: string }> {}
export class Decoded extends BaseResponse<{ userId: UUID }> {}
export class Destroyed extends BaseResponse<{ destroyed: boolean }> {}
