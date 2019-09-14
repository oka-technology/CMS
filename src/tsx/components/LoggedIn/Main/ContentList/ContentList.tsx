/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment } from 'react';

import Title from '../../../../template/Title';
import Button from '../../../../template/Button';
import { newContentRegistrationPage } from '../../../../data/pages';

type ContentListProps = {
  permission: Permission;
};

const ContentList = ({ permission }: ContentListProps): JSX.Element => {
  return (
    <Fragment>
      <Title value="Content list" additionalStyle={permission.editor ? { float: 'left' } : undefined} />
      {permission.editor ? (
        <Button
          as="routerLink"
          to={newContentRegistrationPage.path}
          value="New registration"
          additionalStyle={{
            backgroundColor: '#e87c00',
            width: '15rem',
            margin: '0 0 0 auto',
            position: 'sticky',
            top: '8rem',
          }}
        />
      ) : null}
    </Fragment>
    // <h1 class="main__pageTitle">コンテンツ</h1>
    // <?php if($convertedAuthority[1] == 1){ echo '<a class="main__addButton" href="addContents.php">新規登録</a>'; } ?>
    // <ul class="list">
    //   <li class="list__row">
    //     <ul class="row">
    //       <li class="row__item--title--thin">ID</li>
    //       <li class="row__item--title">カテゴリ</li>
    //       <li class="row__item--title">タイトル</li>
    //       <li class="row__item--title">登録日</li>
    //     </ul>
    //   </li>
    //   // <?= $contentsHTML ?>
    // </ul>
  );
};

export default ContentList;
