export const convertAuthorityNumToObject = (authority: number): Authority => {
  const authorityBinary: string = authority.toString(2);
  const admin: boolean = authorityBinary[2] === '1';
  const editor: boolean = authorityBinary[1] === '1';
  const viewer: boolean = authorityBinary[0] === '1';
  return { admin, editor, viewer };
};

export const convertAuthorityObjectToString = ({ admin, editor, viewer }: Authority): string => {
  const arr = [];
  admin ? arr.push('管理者') : null;
  editor ? arr.push('編集者') : null;
  viewer ? arr.push('閲覧者') : null;
  return arr.join(', ');
};
