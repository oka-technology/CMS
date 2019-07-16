FROM php:7.3.4-apache

RUN apt-get update \
  && apt-get -y install mysql-client \
  && apt-get clean

RUN docker-php-ext-install pdo_mysql
