/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { match } from 'react-router-dom';
import { useState, Fragment, useEffect } from 'react';

import Title from '../../../../template/Title';
import axios from 'axios';
import { loadContent } from '../../../../data/apiClient';

const contentStyle = css`
  font-size: 1.6rem;
`;

type ViewContentProps = {
  match: match<{ id: string }>;
};

const ViewContent = ({ match }: ViewContentProps): JSX.Element => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { id } = match.params;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    let unmounted = false;
    const cancelTokenSource = axios.CancelToken.source();
    (async () => {
      const contentData = await loadContent({ id: id }, cancelTokenSource);
      if (unmounted) return;
      if (contentData === null) {
        setTitle('404 Not Found');
        return;
      }
      setTitle(contentData.title);
      setContent(contentData.content);
    })();
    return () => {
      unmounted = true;
      cancelTokenSource.cancel();
    };
  }, [id]);

  const convertedContent: JSX.Element[] = content.split('\n').map((row, index, arr) => {
    return index + 1 !== arr.length ? (
      <Fragment key={index}>
        {row}
        <br />
      </Fragment>
    ) : (
      <Fragment key={index}>{row}</Fragment>
    );
  });

  return (
    <Fragment>
      <Title value={title} />
      <p css={contentStyle}>{convertedContent}</p>
    </Fragment>
  );
};

export default ViewContent;
