export const convertPermissionNumToObject = (
  permission: number,
): Permission => {
  const permissionBinary: string = permission.toString(2).padStart(3, '0');
  const admin: boolean = permissionBinary[2] === '1';
  const editor: boolean = permissionBinary[1] === '1';
  const viewer: boolean = permissionBinary[0] === '1';
  return { admin, editor, viewer };
};

export const convertPermissionObjectToString = ({
  admin,
  editor,
  viewer,
}: Permission): string => {
  const arr: string[] = [];
  admin ? arr.push('Admin') : null;
  editor ? arr.push('Editor') : null;
  viewer ? arr.push('Viewer') : null;
  return arr.join(', ');
};

export const convertPermissionNumToString = (permission: number): string => {
  const permissionBinary: string = permission.toString(2).padStart(3, '0');
  const arr: string[] = [];
  permissionBinary[2] === '1' ? arr.push('Admin') : null;
  permissionBinary[1] === '1' ? arr.push('Editor') : null;
  permissionBinary[0] === '1' ? arr.push('Viewer') : null;
  return arr.join(', ');
};
