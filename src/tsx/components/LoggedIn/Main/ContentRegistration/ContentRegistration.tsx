/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import { match } from 'react-router-dom';

import Title from '../../../../template/Title';
import { Label, TextInput, FormSelect, TextArea } from '../../../../template/Form';
import Button from '../../../../template/Button';
import ErrorMessage from '../../../../template/ErrorMessage';
import { newContentRegistrationPage, editContentPage } from '../../../../data/pages';
import { registerContent, loadCategories, loadContent, editContent } from '../../../../data/apiClient';
import bytesOf from '../../../../modules/bytesOf';
import CapacityBar from '../../../../template/CapacityBar';
import SuccessMessage from '../../../../template/SuccessMessage';

const formStyle = css`
  & > *:first-child /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ {
    margin-top: 0;
  }
`;

type OptionItem = {
  value: string;
  text: string;
};

type NewContentRegistrationProps = {
  match?: match<{ id: string }>;
  mode: 'newRegistration' | 'edit';
};

const ContentRegistration = ({ match, mode }: NewContentRegistrationProps): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<string>('0');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(true);
  const [optionItems, setOptionItems] = useState<OptionItem[] | null>(null);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
  const [registable, setRegistable] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [isLoadingEditor, setIsLoadingEditor] = useState<boolean>(true);
  const [updated, setUpdated] = useState<boolean>(false);

  const onSetCategory = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCategory(e.target.value);
  };
  const onSetTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };
  const onSetContent = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
  };

  const onRegisterContentToDB = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSuccess(true);
    const data = await registerContent({
      category: selectedCategory,
      title: title,
      content: content,
    });
    if (!data || !data.successful) {
      setSuccess(false);
      return;
    }
    setSelectedCategory('0');
    setTitle('');
    setContent('');
  };

  const onEditContent = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!match) return;
    const { id } = match.params;
    setSuccess(true);
    setUpdated(false);
    const data = await editContent({
      id: id,
      category: selectedCategory,
      title: title,
      content: content,
    });
    if (!data || !data.success) {
      setSuccess(false);
      return;
    }
    setUpdated(true);
  };

  useEffect(() => {
    document.title = mode === 'newRegistration' ? newContentRegistrationPage.pageName : editContentPage.pageName;
  }, [mode]);

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
      const optionItemsOfCategory: OptionItem[] = categoriesData.map(({ id, title }) => ({ value: id, text: title }));
      setOptionItems(optionItemsOfCategory);
      setIsLoadingCategories(false);
    })();
    return () => {
      cancelTokenSource.cancel();
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    if (bytesOf(content) > 2240) {
      setRegistable(false);
    } else {
      setRegistable(true);
    }
  }, [content]);

  useEffect(() => {
    if (mode === 'newRegistration' || !match) return;
    let unmounted = false;
    const cancelTokenSource = axios.CancelToken.source();
    const { id } = match.params;
    (async () => {
      const contentData = await loadContent({ id: id }, cancelTokenSource);
      if (unmounted) return;
      if (contentData === null) {
        setNotFound(true);
        return;
      }
      setTitle(contentData.title);
      setSelectedCategory(contentData.category);
      setContent(contentData.content);
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
          {isLoadingCategories ? 'Loading...' : "You haven't registered any categories."}
        </p>
      )}
      {!isLoadingCategories && optionItems && (
        <FormSelect
          value={selectedCategory}
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
      <Title value={mode === 'newRegistration' ? newContentRegistrationPage.pageName : editContentPage.pageName} />
      <form css={formStyle} autoComplete="new-password">
        <Label htmlFor="Category" value="Category" />
        {SelectCategory}
        <Label htmlFor="Title" value="Title" />
        <TextInput type="text" placeholder="" value={title} onChange={onSetTitle} marginTop="0.5rem" id="Title" />
        <Label htmlFor="Content" value="Content" />
        <TextArea value={content} marginTop="0.5rem" onChange={onSetContent} id="Content" />
        <CapacityBar bytes={bytesOf(content)} />
        <Button
          as={registable ? 'submit' : 'blocked'}
          value={mode === 'newRegistration' ? 'Register' : 'Update'}
          onClick={mode === 'newRegistration' ? onRegisterContentToDB : onEditContent}
          additionalStyle={{ backgroundColor: '#0528c2', marginTop: '4rem' }}
        />
      </form>
      {!success && <ErrorMessage value="You must fill in all of the fields." />}
      {updated && <SuccessMessage value="Updated" />}
    </Fragment>
  );
};

export default ContentRegistration;
