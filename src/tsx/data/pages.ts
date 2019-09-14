type PageData = {
  pageName: string;
  pageInfo: PageInfo;
};

type PageInfo = {
  path: string;
  requiredPermission: Permission;
};

export const TOP_PAGE_PATH: string = '/home';
export const LOGIN_PAGE_PATH: string = '/login';
export const usersPage: PageData = {
  pageName: 'Users',
  pageInfo: {
    path: `${TOP_PAGE_PATH}/users`,
    requiredPermission: {
      admin: true,
      editor: false,
      viewer: false,
    },
  }
};
export const newUserRegistrationPage: PageData = {
  pageName: 'New User Registration',
  pageInfo: {
    path: `${TOP_PAGE_PATH}/newUserRegistration`,
    requiredPermission: {
      admin: true,
      editor: false,
      viewer: false,
    },
  }
};
export const contentList: PageData = {
  pageName: 'Content List',
  pageInfo: {
    path: `${TOP_PAGE_PATH}/contentList`,
    requiredPermission: {
      admin: false,
      editor: true,
      viewer: true,
    },
  }
};
export const newContentRegistrationPage: PageData = {
  pageName: 'New Content Registration',
  pageInfo: {
    path: `${TOP_PAGE_PATH}/newContentRegistration`,
    requiredPermission: {
      admin: false,
      editor: true,
      viewer: false,
    },
  }
};
export const categoriesPage: PageData = {
  pageName: 'Categories',
  pageInfo: {
    path: `${TOP_PAGE_PATH}/categories`,
    requiredPermission: {
      admin: false,
      editor: true,
      viewer: false,
    },
  }
};
export const newCategoryRegistrationPage: PageData = {
  pageName: 'New Category Registration',
  pageInfo: {
    path: `${TOP_PAGE_PATH}/newCategoryRegistration`,
    requiredPermission: {
      admin: false,
      editor: true,
      viewer: false,
    },
  }
};
export const pagesAfterLoggedIn: PageData[] = [
  usersPage, newUserRegistrationPage, contentList, newContentRegistrationPage, categoriesPage, newCategoryRegistrationPage
]
