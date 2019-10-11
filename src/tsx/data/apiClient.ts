import axios, { CancelTokenSource } from 'axios';

const API_PATH_PREFIX = './api/';

type MethodType = 'post' | 'get';

const createApi = <T, U>(method: MethodType, fileName: string) => {
  const endpoint = API_PATH_PREFIX + fileName;
  return async (params: T, cancelTokenSource?: CancelTokenSource): Promise<U | null> => {
    try {
      const { data } = await axios({
        method: method,
        url: endpoint,
        data: method === 'post' && params,
        params: method === 'get' && params,
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      });
      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return null;
    }
  };
};

type PayloadCheckWhetherLoggedIn = {
  loggedIn: boolean;
  userID: string;
  permission: string;
};

export const checkWhetherLoggedIn = createApi<null, PayloadCheckWhetherLoggedIn>('get', 'checkWhetherLoggedIn.php');

type ParamsRegisterContent = {
  category: string;
  title: string;
  content: string;
};

type PayloadRegisterContent = {
  successful: boolean;
};

export const registerContent = createApi<ParamsRegisterContent, PayloadRegisterContent>('post', 'registerContent.php');

export type PayloadLoadCategories = {
  id: string;
  title: string;
};

export const loadCategories = createApi<null, PayloadLoadCategories[]>('get', 'categories.php');

export type PayloadLoadContentList = {
  id: string;
  category: string;
  title: string;
  registrationDate: string;
};

export const loadContentList = createApi<null, PayloadLoadContentList[]>('get', 'contentList.php');

type ParamsRegisterCategory = {
  categoryName: string;
};

type PayloadRegisterCategory = {
  successful: boolean;
};

export const registerCategory = createApi<ParamsRegisterCategory, PayloadRegisterCategory>(
  'post',
  'registerCategory.php',
);

type ParamsRegisterUser = {
  email: string;
  password: string;
  adminPermission: boolean;
  editorPermission: boolean;
  viewerPermission: boolean;
};

type PayloadRegisterUser = {
  successful: boolean;
};

export const registerUser = createApi<ParamsRegisterUser, PayloadRegisterUser>('post', 'registerUser.php');

export type PayloadLoadUser = {
  id: string;
  name: string;
  permission: string;
};

export const loadUser = createApi<null, PayloadLoadUser[]>('get', 'userList.php');

type ParamsLoadContent = {
  id: string;
};

type PayloadLoadContent = {
  title: string;
  category: string;
  content: string;
};

export const loadContent = createApi<ParamsLoadContent, PayloadLoadContent>('get', 'content.php');

type ParamsEditContent = {
  id: string;
  category: string;
  title: string;
  content: string;
};

type PayloadEditContent = {
  success: boolean;
};

export const editContent = createApi<ParamsEditContent, PayloadEditContent>('post', 'editContent.php');

type ParamsLogin = {
  email: string;
  password: string;
};

type PayloadLogin = {
  loggedIn: boolean;
  userID: string;
  permission: string;
};

export const login = createApi<ParamsLogin, PayloadLogin>('post', 'loginProcess.php');

type PayloadLogout = {
  loggedIn: boolean;
  userID: string;
  permission: string;
};

export const logout = createApi<null, PayloadLogout>('post', 'logoutProcess.php');
