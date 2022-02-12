import { BaseResponse } from '../global/base.response';

export class Sent extends BaseResponse<{ mailed: boolean }> {}
