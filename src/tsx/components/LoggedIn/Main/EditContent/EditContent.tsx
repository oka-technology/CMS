/** @jsx jsx */
import { jsx } from '@emotion/core';
import { match } from 'react-router-dom';

type EditContentProps = {
  match: match;
  permission: Permission;
};

const EditContent = ({ permission }: EditContentProps): JSX.Element => {
  return (
    <div>test</div>
  )
}

export default EditContent;
