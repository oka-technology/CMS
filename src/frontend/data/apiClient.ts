const API_PATH_PREFIX = 'http://localhost:8080/api/';

type MethodType = 'POST' | 'GET';

const createApi = <T extends Record<string, any>, U>(
  method: MethodType,
  fileName: string,
) => {
  const endpoint = new URL(API_PATH_PREFIX + fileName);
  return async (params: T): Promise<U | null> => {
    const searchParams = new URLSearchParams(params);
    if (method === 'GET') {
      endpoint.search = searchParams.toString();
    }
    try {
      return (await (
        await fetch(endpoint.toString(), {
          method: method,
          body: method === 'POST' ? JSON.stringify(params) : undefined,
        })
      ).json()) as U;
    } catch (error) {
      return null;
    }
  };
};

type PayloadCheckWhetherLoggedIn = {
  loggedIn: boolean;
  userID: string;
  permission: string;
};

export const checkWhetherLoggedIn = createApi<
  Record<string, never>,
  PayloadCheckWhetherLoggedIn
>('GET', 'checkWhetherLoggedIn.php');

type ParamsRegisterContent = {
  category: string;
  title: string;
  content: string;
};

type PayloadRegisterContent = {
  successful: boolean;
};

export const registerContent = createApi<
  ParamsRegisterContent,
  PayloadRegisterContent
>('POST', 'registerContent.php');

export type PayloadLoadCategories = {
  id: string;
  title: string;
};

export const loadCategories = createApi<
  Record<string, never>,
  PayloadLoadCategories[]
>('GET', 'categories.php');

export type PayloadLoadContentList = {
  id: string;
  category: string;
  title: string;
  registrationDate: string;
};

export const loadContentList = createApi<
  Record<string, never>,
  PayloadLoadContentList[]
>('GET', 'contentList.php');

type ParamsRegisterCategory = {
  categoryName: string;
};

type PayloadRegisterCategory = {
  successful: boolean;
};

export const registerCategory = createApi<
  ParamsRegisterCategory,
  PayloadRegisterCategory
>('POST', 'registerCategory.php');

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

export const registerUser = createApi<ParamsRegisterUser, PayloadRegisterUser>(
  'POST',
  'registerUser.php',
);

export type PayloadLoadUser = {
  id: string;
  name: string;
  permission: string;
};

export const loadUser = createApi<Record<string, never>, PayloadLoadUser[]>(
  'GET',
  'userList.php',
);

type ParamsLoadContent = {
  id: string;
};

type PayloadLoadContent = {
  title: string;
  category: string;
  content: string;
};

export const loadContent = createApi<ParamsLoadContent, PayloadLoadContent>(
  'GET',
  'content.php',
);

type ParamsEditContent = {
  id: string;
  category: string;
  title: string;
  content: string;
};

type PayloadEditContent = {
  success: boolean;
};

export const editContent = createApi<ParamsEditContent, PayloadEditContent>(
  'POST',
  'editContent.php',
);

type ParamsLogin = {
  email: string;
  password: string;
};

type PayloadLogin = {
  loggedIn: boolean;
  userID: string;
  permission: string;
};

export const login = createApi<ParamsLogin, PayloadLogin>(
  'POST',
  'loginProcess.php',
);

type PayloadLogout = {
  loggedIn: boolean;
  userID: string;
  permission: string;
};

export const logout = createApi<Record<string, never>, PayloadLogout>(
  'POST',
  'logoutProcess.php',
);
