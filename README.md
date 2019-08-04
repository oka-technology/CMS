# Webpro last assignment

## Default user

- Email: default@dhu
- password: password

## Table

### userInfo table

- id(auto increment)
- name
- password
- authority

### categories table

- id(auto increment)
- name

### contents table

- id(auto increment)
- category_id(referenced to categories.id)
- title
- registrationDate
- mainContents
