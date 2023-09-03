import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { User } from '@/modules/user/entities';
import { ApiResponseCodeEnum } from '@/helper/enums';
import { SessionInfo } from 'express-session';

// 扩展 Express 的 Request Response 对象的属性
declare module 'express' {
  interface Response extends ExpressResponse {
    resMsg: string;
    success: boolean;
    apiResponseCode: ApiResponseCodeEnum;
  }

  interface Request extends ExpressRequest {
    user: User;
    session: SessionInfo;
  }
}
