FROM php:7.3.4-apache

RUN apt-get update \
  && apt-get -y install mysql-client vim \
  && apt-get clean

RUN docker-php-ext-install pdo_mysql

RUN a2enmod rewrite

RUN mkdir /var/www/html/session
