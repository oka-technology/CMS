# CMS

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
