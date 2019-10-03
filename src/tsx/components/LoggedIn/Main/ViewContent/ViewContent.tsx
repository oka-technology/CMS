/** @jsx jsx */
import { jsx } from '@emotion/core';
import { match } from 'react-router-dom';
import { useState, Fragment, useEffect } from 'react';

import Title from '../../../../template/Title';

type ViewContentProps = {
  match: match<{ id: string }>;
  permission: Permission;
};

const ViewContent = ({ permission, match }: ViewContentProps): JSX.Element => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { id } = match.params;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {

  }, []);

  return (
    <Fragment>
      <Title value={title} />
      <p>{content}</p>
    </Fragment>
  );
};

export default ViewContent;
