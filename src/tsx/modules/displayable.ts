import { PageData } from '../data/pages';
import permissions from '../data/permissions';

const displayable = (pageData: PageData, permission: Permission): boolean => {
  return permissions.some(
    (elem: string) => pageData.requiredPermission[elem] && pageData.requiredPermission[elem] === permission[elem],
  );
};

export default displayable;
