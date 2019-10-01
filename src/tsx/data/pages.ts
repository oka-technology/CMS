type PageData = {
  pageName: string;
  path: string;
  requiredPermission: Permission;
};

const createPageData = (pageName: string, requiredPermission: Permission): PageData => {
  return {
    pageName: pageName,
    path: `${TOP_PAGE_PATH}/${pageName.replace(/ /g, '')}`,
    requiredPermission: requiredPermission,
  };
};

export const TOP_PAGE_PATH: string = '/home';
export const LOGIN_PAGE_PATH: string = '/login';
export const usersPage: PageData = createPageData('Users', {
  admin: true,
  editor: false,
  viewer: false,
});
export const newUserRegistrationPage: PageData = createPageData('New User Registration', {
  admin: true,
  editor: false,
  viewer: false,
});
export const contentListPage: PageData = createPageData('Content List', {
  admin: false,
  editor: true,
  viewer: true,
});
export const newContentRegistrationPage: PageData = createPageData('New Content Registration', {
  admin: false,
  editor: true,
  viewer: false,
});
export const categoriesPage: PageData = createPageData('Categories', {
  admin: false,
  editor: true,
  viewer: false,
});
export const newCategoryRegistrationPage: PageData = createPageData('New Category Registration', {
  admin: false,
  editor: true,
  viewer: false,
});

export const arrayOfPagesInSidebar: PageData[] = [
  usersPage,
  newUserRegistrationPage,
  contentListPage,
  newContentRegistrationPage,
  categoriesPage,
  newCategoryRegistrationPage,
];
