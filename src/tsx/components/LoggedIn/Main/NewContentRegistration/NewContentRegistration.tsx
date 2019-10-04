/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, Fragment, useEffect } from 'react';
import axios from 'axios';

import Title from '../../../../template/Title';
import { Label, TextInput, FormSelect, TextArea } from '../../../../template/Form';
import Button from '../../../../template/Button';
import ErrorMessage from '../../../../template/ErrorMessage';
import { newContentRegistrationPage } from '../../../../data/pages';
import { registerContent, loadCategories } from '../../../../data/apiClient';
import bytesOf from '../../../../modules/bytesOf';
import CapacityBar from './CapacityBar';

const formStyle = css`
  & > *:first-child /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ {
    margin-top: 0;
  }
`;

type OptionItem = {
  value: string;
  text: string;
};

const NewContentRegistration = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<string>('0');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(true);
  const [optionItems, setOptionItems] = useState<OptionItem[] | null>(null);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
  const [canRegister, setCanRegister] = useState<boolean>(true);

  const onSetCategory = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCategory(e.target.value);
  };
  const onSetTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };
  const onSetContent = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
  };

  const registerContentToDB = async (e: React.MouseEvent<HTMLElement>) => {
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

  useEffect(() => {
    document.title = newContentRegistrationPage.pageName;
  }, []);

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
      setCanRegister(false);
    } else {
      setCanRegister(true);
    }
  }, [content]);

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

  return (
    <Fragment>
      <Title value={newContentRegistrationPage.pageName} />
      <form css={formStyle} autoComplete="new-password">
        <Label htmlFor="Category" value="Category" />
        {SelectCategory}
        <Label htmlFor="Title" value="Title" />
        <TextInput type="text" placeholder="" value={title} onChange={onSetTitle} marginTop="0.5rem" id="Title" />
        <Label htmlFor="Content" value="Content" />
        <TextArea value={content} marginTop="0.5rem" onChange={onSetContent} id="Content" />
        <CapacityBar bytes={bytesOf(content)} />
        <Button
          as={canRegister ? 'submit' : 'blocked'}
          value="Register"
          onClick={registerContentToDB}
          additionalStyle={{ backgroundColor: '#0528c2', marginTop: '4rem' }}
        />
      </form>
      {!success && <ErrorMessage value="You must fill in all of the fields." />}
    </Fragment>
  );
};

export default NewContentRegistration;
