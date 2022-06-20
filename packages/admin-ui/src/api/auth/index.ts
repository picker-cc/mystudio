import { useMessage } from '/@/hooks/web/useMessage';
// import { t } from '/@/hooks/web/useI18n';
import { useI18n } from '/@/hooks/web/useI18n';
import {client} from "/@/api/graphql-client";
import {ATTEMPT_LOGIN, GET_CURRENT_USER} from "/@/api/data/definitions/auth-definitions";
const { createErrorModal } = useMessage();

/**
 * @description: user login api
 */
export async function loginApi(username: string, password: string) {
  const { data } = await client.executeMutation({
    query: ATTEMPT_LOGIN,
    variables: {
      username,
      password,
    },
  });
  const { t } = useI18n();
  if (data.login.errorCode) {
    // createErrorModal({ title: '错误提示', content: '用户验证失败' });
    const errMessage = t('sys.api.' + data.login.errorCode);
    createErrorModal({
      title: t('sys.api.errorTip'),
      content: errMessage
    })
    // const msg = t('sys.api.' + data.login.errorCode);
    // createMessage.error(msg);
  } else {
    return data.login;
  }
}
export async function me() {
  const { data } = await client.executeMutation({
    query: GET_CURRENT_USER,
  });
  return data.me;
}

// export async function getUserProfile() {
//   const { data } = await client.executeQuery({
//     query: QueryUserProfile,
//   });
//   return data.userProfile;
// }
