# CMS

## About

This was originally created as submission of assignment for my university. I had to create this only in PHP. After my submitting this, I rearchitected this with React.js for my learning.

## How to use

After installing Node.js

- If you want to develop, execute below

```sh
npm i
npm run build:dev
docker-compose up
```

Visit `localhost:8080` on your browser.

- Or if you want to export production files, execute below

```sh
npm i
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
