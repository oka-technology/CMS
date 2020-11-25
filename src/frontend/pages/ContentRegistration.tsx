import { useState, useEffect, useMemo } from 'react';
import { Prompt, useParams } from 'react-router-dom';

import Title from '../template/Title';
import { Label, TextInput, FormSelect, TextArea } from '../template/Form';
import Button from '../template/Button';
import ErrorMessage from '../template/ErrorMessage';
import { newContentRegistrationPage, editContentPage } from '../data/pages';
import {
  registerContent,
  loadCategories,
  loadContent,
  editContent,
} from '../data/apiClient';
import bytesOf from '../modules/bytesOf';
import CapacityBar from '../template/CapacityBar';
import SuccessMessage from '../template/SuccessMessage';
import sameObj from '../modules/sameObj';
import styled from 'styled-components';
import SubmitButtonInner from '../template/SubmitButtonInner';

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
  mode: 'newRegistration' | 'edit';
};

const ContentRegistration = ({
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

  const { id } = useParams<{ id?: string }>();

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
    if (id === undefined) return;
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
    let unmounted = false;
    void (async () => {
      const categoriesData = await loadCategories({});
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
    if (mode === 'newRegistration' || id === undefined) return;
    void (async () => {
      const contentData = await loadContent({ id });
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
    };
  }, [id, mode]);

  const SelectCategory = (
    <>
      {(isLoadingCategories || !optionItems) && (
        <LoadingStatus>
          {isLoadingCategories
            ? 'Loading...'
            : "You haven't registered any categories."}
        </LoadingStatus>
      )}
      {!isLoadingCategories && optionItems && (
        <FormSelect
          value={currContent.category}
          onChange={onSetCategory}
          optionItems={optionItems}
          id="Category"
        />
      )}
    </>
  );

  if (notFound) {
    return <Title value="404 Not Found" />;
  }

  if (mode === 'edit' && isLoadingEditor) {
    return <LoadingStatus>Loading...</LoadingStatus>;
  }

  return (
    <>
      <Prompt when={isBlocking} message={MESSAGE_WHEN_UNSAVED} />
      <Title
        value={
          mode === 'newRegistration'
            ? newContentRegistrationPage.pageName
            : editContentPage.pageName
        }
      />
      <Form autoComplete="new-password">
        <Label htmlFor="Category" value="Category" />
        {SelectCategory}
        <Label htmlFor="Title" value="Title" />
        <TitleInput
          type="text"
          placeholder=""
          value={currContent.title}
          onChange={onSetTitle}
          id="Title"
        />
        <Label htmlFor="Content" value="Content" />
        <ContentsTextArea
          value={currContent.content}
          onChange={onSetContent}
          id="Content"
        />
        <CapacityBar bytes={bytesOf(currContent.content)} />
        {registable ? (
          <RegisterButton>
            <SubmitButtonInner
              type="submit"
              onClick={
                mode === 'newRegistration'
                  ? onRegisterContentToDB
                  : onUpdateContent
              }
              value={mode === 'newRegistration' ? 'Register' : 'Update'}
            />
          </RegisterButton>
        ) : (
          <RegisterButton blocked={true}>
            {mode === 'newRegistration' ? 'Register' : 'Update'}
          </RegisterButton>
        )}
      </Form>
      {!success && (
        <ErrorMessage>You must fill in all of the fields.</ErrorMessage>
      )}
      {updated && <SuccessMessage>Updated</SuccessMessage>}
    </>
  );
};

export default ContentRegistration;

const LoadingStatus = styled.p`
  font-size: 1.6rem;
  height: 3.4rem;
  margin-top: 0.5rem;
`;

const Form = styled.form`
  & > *:first-child {
    margin-top: 0;
  }
`;

const RegisterButton = styled(Button)`
  background-color: #0528c2;
  margin-top: 4rem;
`;

const TitleInput = styled(TextInput)`
  margin-top: 0.5rem;
`;

const ContentsTextArea = styled(TextArea)`
  margin-top: 0.5rem;
`;
