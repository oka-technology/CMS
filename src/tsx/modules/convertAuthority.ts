export const convertAuthorityNumToObject = (authority: number): Authority => {
  const authorityBinary: string = authority.toString(2);
  const admin: boolean = authorityBinary[2] === '1';
  const editor: boolean = authorityBinary[1] === '1';
  const viewer: boolean = authorityBinary[0] === '1';
  return { admin, editor, viewer };
};

export const convertAuthorityObjectToString = ({ admin, editor, viewer }: Authority): string => {
  const arr: string[] = [];
  admin ? arr.push('管理者') : null;
  editor ? arr.push('編集者') : null;
  viewer ? arr.push('閲覧者') : null;
  return arr.join(', ');
};

export const convertAuthorityNumToString = (authority: number): string => {
  const authorityBinary: string = authority.toString(2);
  const arr: string[] = [];
  authorityBinary[2] === '1' ? arr.push('管理者') : null;
  authorityBinary[1] === '1' ? arr.push('編集者') : null;
  authorityBinary[0] === '1' ? arr.push('閲覧者') : null;
  return arr.join(', ');
};
