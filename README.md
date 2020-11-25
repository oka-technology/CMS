# CMS

## About

This was originally created as submission of assignment for my university. I had to create this only in PHP. After my submitting this, I rearchitected this with React.js for my learning.

## How to use

After installing Node.js and Docker,

- If you want to develop, execute below

```sh
npm i
docker-compose up -d
npm run build:dev
```

Visit <http://localhost:8080> on your browser.
When to stop development, execute below

```sh
docker-compose down
```

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
