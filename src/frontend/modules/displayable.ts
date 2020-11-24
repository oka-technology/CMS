import { PageData } from '../data/pages';
import permissionArr from '../data/permissionArr';

const displayable = (pageData: PageData, permission: Permission): boolean => {
  return permissionArr.some(
    (elem) =>
      pageData.requiredPermission[elem] &&
      pageData.requiredPermission[elem] === permission[elem],
  );
};

export default displayable;
