/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Title from '../../../../template/Title';
import { Label, TextInput, FormSelect, TextArea } from '../../../../template/Form';
import Button from '../../../../template/Button';
import ErrorMessage from '../../../../template/ErrorMessage';
import { TOP_PAGE_PATH, newContentRegistrationPage } from '../../../../data/pages';

const formStyle = css`
  & > *:first-child /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ {
    margin-top: 0;
  }
`;

type AddUserProps = {
  permission: Permission;
};

type ResultsOfAddUserApi = {
  successful: boolean;
};

type PostParams = {
  category: string;
  title: string;
  content: string;
};

type CategoriesInfo = {
  id: string;
  title: string;
};

type OptionItem = {
  value: string;
  text: string;
};

const NewContentRegistration = ({ permission }: AddUserProps): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<string>('0');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [unsuccessful, setUnsuccessful] = useState<boolean>(false);
  const [optionItemsData, setOptionItemsData] = useState<OptionItem[] | 'Error'>();
  const SelectCategory = (): JSX.Element => {
    if (!optionItemsData) {
      return (
        <p
          css={css`
            font-size: 1.6rem;
            height: 3.4rem;
            margin-top: 0.5rem;
          `}
        >
          Loading...
        </p>
      );
    } else if (optionItemsData === 'Error') {
      return (
        <p
          css={css`
            font-size: 1.6rem;
            height: 3.4rem;
            margin-top: 0.5rem;
          `}
        >
          Error
        </p>
      );
    } else {
      return (
        <FormSelect
          value={selectedCategory}
          onChange={onSetCategory}
          marginTop="0.5rem"
          optionItems={optionItemsData}
          id="Category"
        />
      );
    }
  };

  const onSetCategory = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCategory(e.target.value);
  };
  const onSetTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };
  const onSetContent = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
  };

  const registerContentToDB = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    setUnsuccessful(false);
    const params: PostParams = {
      category: selectedCategory,
      title: title,
      content: content,
    };
    axios
      .post('./api/registerContent.php', params)
      .then((result) => {
        const data: ResultsOfAddUserApi = result.data;
        if (!data.successful) {
          setUnsuccessful(true);
        } else {
          setSelectedCategory('0');
          setTitle('');
          setContent('');
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = newContentRegistrationPage.pageName;
    (async () => {
      try {
        const { data } = await axios.get('./api/categories.php');
        const categoriesData: CategoriesInfo[] = data;
        const optionItemsOfCategory: OptionItem[] = categoriesData.map(({ id, title }) => {
          return { value: id, text: title };
        });
        setOptionItemsData(optionItemsOfCategory);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        setOptionItemsData('Error');
      }
    })();
  }, []);

  return (
    <Fragment>
      <Title value={newContentRegistrationPage.pageName} />
      <form css={formStyle} autoComplete="new-password">
        <Label htmlFor="Category" value="Category" />
        <SelectCategory />
        <Label htmlFor="Title" value="Title" />
        <TextInput type="text" placeholder="" value={title} onChange={onSetTitle} marginTop="0.5rem" id="Title" />
        <Label htmlFor="Content" value="Content" />
        <TextArea value={content} marginTop="0.5rem" onChange={onSetContent} id="Content" />
        <Button
          as="submit"
          value="Register"
          onClick={registerContentToDB}
          additionalStyle={{ backgroundColor: '#0528c2', marginTop: '4rem' }}
        />
      </form>
      {unsuccessful ? <ErrorMessage value="You must fill in all of the fields." /> : null}
      {permission.editor ? null : <Redirect to={TOP_PAGE_PATH} />}
    </Fragment>
  );
};

export default NewContentRegistration;
