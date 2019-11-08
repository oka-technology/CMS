import permissionArr from '../data/permissionArr';
type PermissionTypeNames = typeof permissionArr[number];

declare global {
  type Permission = {
    [key in PermissionTypeNames]: boolean;
  };
}
