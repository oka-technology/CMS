/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, Fragment, useEffect, useMemo } from 'react';
import axios from 'axios';
import { match, Prompt } from 'react-router-dom';

import Title from '../../../../template/Title';
import {
  Label,
  TextInput,
  FormSelect,
  TextArea,
} from '../../../../template/Form';
import Button from '../../../../template/Button';
import ErrorMessage from '../../../../template/ErrorMessage';
import {
  newContentRegistrationPage,
  editContentPage,
} from '../../../../data/pages';
import {
  registerContent,
  loadCategories,
  loadContent,
  editContent,
} from '../../../../data/apiClient';
import bytesOf from '../../../../modules/bytesOf';
import CapacityBar from '../../../../template/CapacityBar';
import SuccessMessage from '../../../../template/SuccessMessage';
import sameObj from '../../../../modules/sameObj';

const formStyle = css`
  & > *:first-child /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ {
    margin-top: 0;
  }
`;

const MESSAGE_WHEN_UNSAVED =
  "You haven't save. Are you sure you want to leave this page?";

type ContentInfo = {
  category: string;
  title: string;
  content: string;
};

type OptionItem = {
  value: string;
  text: string;
};

type NewContentRegistrationProps = {
  match?: match<{ id: string }>;
  mode: 'newRegistration' | 'edit';
};

const ContentRegistration = ({
  match,
  mode,
}: NewContentRegistrationProps): JSX.Element => {
  const [currContent, setCurrContent] = useState<ContentInfo>({
    category: '0',
    title: '',
    content: '',
  });
  const [prevContent, setPrevContent] = useState<ContentInfo>({
    category: '0',
    title: '',
    content: '',
  });
  const [success, setSuccess] = useState<boolean>(true);
  const [optionItems, setOptionItems] = useState<OptionItem[] | null>(null);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
  const [registable, setRegistable] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [isLoadingEditor, setIsLoadingEditor] = useState<boolean>(true);
  const [updated, setUpdated] = useState<boolean>(false);

  const isBlocking = useMemo(() => {
    return !sameObj(currContent, prevContent);
  }, [currContent, prevContent]);

  const onSetCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setCurrContent((curr) => ({ ...curr, category: category }));
  };
  const onSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setCurrContent((curr) => ({ ...curr, title: title }));
    setRegistable(bytesOf(title) < 256);
  };
  const onSetContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setCurrContent((curr) => ({ ...curr, content: content }));
    setRegistable(bytesOf(content) < 2241);
  };

  const onRegisterContentToDB = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSuccess(true);
    const data = await registerContent(currContent);
    if (!data || !data.successful) {
      setSuccess(false);
      return;
    }
    setCurrContent({ category: '0', title: '', content: '' });
  };

  const onUpdateContent = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!match) return;
    const { id } = match.params;
    setSuccess(true);
    setUpdated(false);
    const data = await editContent({
      id: id,
      category: currContent.category,
      title: currContent.title,
      content: currContent.content,
    });
    if (!data || !data.success) {
      setSuccess(false);
      return;
    }
    setPrevContent(currContent);
    setUpdated(true);
  };

  useEffect(() => {
    let unmounted: boolean = false;
    const cancelTokenSource = axios.CancelToken.source();
    (async () => {
      const categoriesData = await loadCategories(null, cancelTokenSource);
      if (unmounted) return;
      if (!categoriesData) {
        setOptionItems(null);
        setIsLoadingCategories(false);
        return;
      }
      const optionItemsOfCategory: OptionItem[] = categoriesData.map(
        ({ id, title }) => ({
          value: id,
          text: title,
        }),
      );
      setOptionItems(optionItemsOfCategory);
      setIsLoadingCategories(false);
    })();
    return () => {
      cancelTokenSource.cancel();
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    document.title =
      mode === 'newRegistration'
        ? newContentRegistrationPage.pageName
        : editContentPage.pageName;
  }, [mode]);

  useEffect(() => {
    const event = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = MESSAGE_WHEN_UNSAVED;
    };
    if (isBlocking) {
      window.addEventListener('beforeunload', event);
    }
    return () => {
      window.removeEventListener('beforeunload', event);
    };
  }, [isBlocking]);

  useEffect(() => {
    let unmounted = false;
    setCurrContent({ category: '0', title: '', content: '' });
    setPrevContent({ category: '0', title: '', content: '' });
    setUpdated(false);
    if (mode === 'newRegistration' || !match) return;
    const cancelTokenSource = axios.CancelToken.source();
    const { id } = match.params;
    (async () => {
      const contentData = await loadContent({ id: id }, cancelTokenSource);
      if (unmounted) return;
      if (contentData === null) {
        setNotFound(true);
        return;
      }
      setCurrContent(contentData);
      setPrevContent(contentData);
      setIsLoadingEditor(false);
    })();
    return () => {
      unmounted = true;
      cancelTokenSource.cancel();
    };
  }, [match, mode]);

  const SelectCategory = (
    <Fragment>
      {(isLoadingCategories || !optionItems) && (
        <p
          css={css`
            font-size: 1.6rem;
            height: 3.4rem;
            margin-top: 0.5rem;
          `}
        >
          {isLoadingCategories
            ? 'Loading...'
            : "You haven't registered any categories."}
        </p>
      )}
      {!isLoadingCategories && optionItems && (
        <FormSelect
          value={currContent.category}
          onChange={onSetCategory}
          marginTop="0.5rem"
          optionItems={optionItems}
          id="Category"
        />
      )}
    </Fragment>
  );

  if (notFound) {
    return <Title value="404 Not Found" />;
  }

  if (mode === 'edit' && isLoadingEditor) {
    return (
      <p
        css={css`
          font-size: 1.6rem;
        `}
      >
        Loading...
      </p>
    );
  }

  return (
    <Fragment>
      <Prompt when={isBlocking} message={MESSAGE_WHEN_UNSAVED} />
      <Title
        value={
          mode === 'newRegistration'
            ? newContentRegistrationPage.pageName
            : editContentPage.pageName
        }
      />
      <form css={formStyle} autoComplete="new-password">
        <Label htmlFor="Category" value="Category" />
        {SelectCategory}
        <Label htmlFor="Title" value="Title" />
        <TextInput
          type="text"
          placeholder=""
          value={currContent.title}
          onChange={onSetTitle}
          marginTop="0.5rem"
          id="Title"
        />
        <Label htmlFor="Content" value="Content" />
        <TextArea
          value={currContent.content}
          marginTop="0.5rem"
          onChange={onSetContent}
          id="Content"
        />
        <CapacityBar bytes={bytesOf(currContent.content)} />
        <Button
          as={registable ? 'submit' : 'blocked'}
          value={mode === 'newRegistration' ? 'Register' : 'Update'}
          onClick={
            mode === 'newRegistration' ? onRegisterContentToDB : onUpdateContent
          }
          additionalStyle={{ backgroundColor: '#0528c2', marginTop: '4rem' }}
        />
      </form>
      {!success && <ErrorMessage value="You must fill in all of the fields." />}
      {updated && <SuccessMessage value="Updated" />}
    </Fragment>
  );
};

export default ContentRegistration;
