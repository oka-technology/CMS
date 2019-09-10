type Permission = {
  viewer: boolean;
  editor: boolean;
  admin: boolean;
  [key: string]: boolean;
};
