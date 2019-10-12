# CMS

## About

This was originally created as submission of assignment for my university. I had to create this only in PHP. After I submitting this, I rearchitected this with React.js for my learning.

## How to use

```sh
NODE_ENV=production webpack
docker-compose up
```

Visit ``localhost:8080`` on your browser.

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
