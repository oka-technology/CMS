export type PageData = {
  pageName: string;
  path: string;
  requiredPermission: Permission;
};

const createPageData = (
  pageName: string,
  location: string,
  needId: boolean,
  requiredPermission: Permission,
): PageData => {
  const path = location + pageName.replace(/ /g, '') + (needId ? '/:id' : '');
  return {
    pageName: pageName,
    path: path,
    requiredPermission: requiredPermission,
  };
};

export const TOP_PAGE_PATH = '/home';
export const LOGIN_PAGE_PATH = '/login';
export const usersPage: PageData = createPageData(
  'Users',
  `${TOP_PAGE_PATH}/`,
  false,
  {
    admin: true,
    editor: false,
    viewer: false,
  },
);
export const newUserRegistrationPage: PageData = createPageData(
  'New User Registration',
  `${TOP_PAGE_PATH}/`,
  false,
  {
    admin: true,
    editor: false,
    viewer: false,
  },
);
export const contentListPage: PageData = createPageData(
  'Content List',
  `${TOP_PAGE_PATH}/`,
  false,
  {
    admin: false,
    editor: true,
    viewer: true,
  },
);
export const newContentRegistrationPage: PageData = createPageData(
  'New Content Registration',
  `${TOP_PAGE_PATH}/`,
  false,
  {
    admin: false,
    editor: true,
    viewer: false,
  },
);
export const categoriesPage: PageData = createPageData(
  'Categories',
  `${TOP_PAGE_PATH}/`,
  false,
  {
    admin: false,
    editor: true,
    viewer: false,
  },
);
export const newCategoryRegistrationPage: PageData = createPageData(
  'New Category Registration',
  `${TOP_PAGE_PATH}/`,
  false,
  {
    admin: false,
    editor: true,
    viewer: false,
  },
);
export const viewContentPage: PageData = createPageData(
  'View',
  `${contentListPage.path}/`,
  true,
  {
    admin: false,
    editor: false,
    viewer: true,
  },
);
export const editContentPage: PageData = createPageData(
  'Edit',
  `${contentListPage.path}/`,
  true,
  {
    admin: false,
    editor: true,
    viewer: false,
  },
);

export const arrayOfPagesInSidebar: PageData[] = [
  usersPage,
  newUserRegistrationPage,
  contentListPage,
  newContentRegistrationPage,
  categoriesPage,
  newCategoryRegistrationPage,
];
