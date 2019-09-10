export const convertPermissionNumToObject = (permission: number): Permission => {
  const permissionBinary: string = permission.toString(2);
  const admin: boolean = permissionBinary[2] === '1';
  const editor: boolean = permissionBinary[1] === '1';
  const viewer: boolean = permissionBinary[0] === '1';
  return { admin, editor, viewer };
};

export const convertPermissionObjectToString = ({ admin, editor, viewer }: Permission): string => {
  const arr: string[] = [];
  admin ? arr.push('管理者') : null;
  editor ? arr.push('編集者') : null;
  viewer ? arr.push('閲覧者') : null;
  return arr.join(', ');
};

export const convertPermissionNumToString = (permission: number): string => {
  const permissionBinary: string = permission.toString(2);
  const arr: string[] = [];
  permissionBinary[2] === '1' ? arr.push('管理者') : null;
  permissionBinary[1] === '1' ? arr.push('編集者') : null;
  permissionBinary[0] === '1' ? arr.push('閲覧者') : null;
  return arr.join(', ');
};
