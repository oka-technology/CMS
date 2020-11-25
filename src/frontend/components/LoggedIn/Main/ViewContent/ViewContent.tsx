import { match } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Title from '../../../../template/Title';
import { loadContent } from '../../../../data/apiClient';
import styled from 'styled-components';

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
    void (async () => {
      const contentData = await loadContent({ id: id });
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
    };
  }, [id]);

  return (
    <>
      <Title value={title} />
      <Contents>
        {content
          .split('\n')
          .flatMap((row, i) => [row, <br key={`contents-row-${i}`} />])
          .slice(0, -1)}
      </Contents>
    </>
  );
};

export default ViewContent;

const Contents = styled.p`
  font-size: 1.6rem;
`;
