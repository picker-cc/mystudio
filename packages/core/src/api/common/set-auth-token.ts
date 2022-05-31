import { Request, Response } from 'express';
import {AuthOptions} from "../../config";
import ms from "ms";


/**
 * 将authToken设置为cookie或响应标头，具体取决于配置设置。
 */
export function setAuthToken(options: {
  sessionToken: string;
  rememberMe?: boolean;
  authOptions: Required<AuthOptions>;
  req: Request;
  res: Response;
}) {
    const { sessionToken, rememberMe, authOptions, req, res } = options;

    const usingCookie =
        authOptions.tokenMethod === 'cookie' ||
        (Array.isArray(authOptions.tokenMethod) && authOptions.tokenMethod.includes('cookie'));
    const usingBearer =
        authOptions.tokenMethod === 'bearer' ||
        (Array.isArray(authOptions.tokenMethod) && authOptions.tokenMethod.includes('bearer'));

    if (usingCookie) {
        if (req.session) {
            if (rememberMe) {
                req.sessionOptions.maxAge = ms('1y');
            }
            req.session.token = sessionToken;
        }
    }
    if (usingBearer) {
        res.set(authOptions.authTokenHeaderKey, sessionToken);
    }

  // const { authToken, rememberMe, authOptions, req, res } = options;
  // res.set(authOptions.authTokenHeaderKey, authToken)
  // const { authToken, rememberMe, authOptions, req, res } = options;
  //
  // if (authOptions.tokenMethod === 'cookie') {
  //   if (_.has(req, 'session')) {
  //     if (rememberMe) {
  //       req.sessionOptions.maxAge = ms('1y');
  //     }
  //     req.session.token = authToken;
  //   }
  // } else {
  //   res.set(authOptions.authTokenHeaderKey, authToken);
  //   console.log(res);
  // }
}
