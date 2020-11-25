# CMS

## このプロジェクトについて

これは元々大学の課題として作られました。課題ではPHPで提出する必要があったため最初はPHPで作り、提出した後に自分の勉強のためにフロントエンドの部分をReactとTypeScriptを使って書き直しました。

## 使用技術

### フロントエンド

- TypeScript
- React
- webpack

### サーバーサイド

- PHP
- Docker
- MySQL

## 使い方

Node.jsとDockerをあらかじめインストールしておいてください

### 開発時

以下のコマンドを実行してください

```sh
npm i
docker-compose up -d
npm run build:dev
```

<http://localhost:8080>で動かすことができます。
サーバーの起動中はうまく動きません。Errorと出た場合はしばらく時間をおいてからブラウザをリロードしてください(初回は特に時間がかかります)。

もし開発を終了したい時は、`Ctrl + C` でwebpackのビルドを止めた上で以下のコマンドを実行してDockerを終了してください

```sh
docker-compose down
```

### 本番時

以下のコマンドを実行してください

```sh
npm i
docker-compose up -d
npm run build:pro
```

`dist`フォルダに出力されます
終了時のコマンドは開発の時と同じです

## デフォルトのユーザー

- Email: default@okatechnology
- password: password

## データベースのテーブル一覧

### userInfo テーブル

- id(auto increment)
- name
- password
- permission

### categories テーブル

- id(auto increment)
- name

### content テーブル

- id(auto increment)
- category_id(referenced to categories.id)
- title
- registrationDate
- mainContent

## About

This was originally created as submission of assignment for my university. I had to create this only in PHP. After my submitting this, I rearchitected this with React and TypeScript for my learning.

## How to use

After installing Node.js and Docker,

### Development

Execute below

```sh
npm i
docker-compose up -d
npm run build:dev
```

Then, visit <http://localhost:8080> on your browser.
When to stop development, execute below

```sh
docker-compose down
```

### Production

Execute below

```sh
npm i
docker-compose up -d
npm run build:pro
```

Files will be exported to `dist` folder

## Default user

- Email: default@dhu
- password: password

## Table

### userInfo table

- id(auto increment)
- name
- password
- permission

### categories table

- id(auto increment)
- name

### content table

- id(auto increment)
- category_id(referenced to categories.id)
- title
- registrationDate
- mainContent
