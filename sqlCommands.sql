/* create db */
create database webproLastAssignmentdb default charset utf8;
use webproLastAssignmentdb;

/* create tables */
create table userInfo (
  id int auto_increment not null primary key,
  name varchar(255) not null unique,
  password varchar(255) not null,
  authority int not null
  /* 
  administrator:1, 
  editor:2, 
  reader:4 
  */
);

create table categories (
  id int auto_increment not null primary key,
  name varchar(255) not null
);

create table contents (
  id int auto_increment not null primary key,
  category_id int not null,
  title varchar(255) not null,
  registrationDate varchar(255) not null,
  mainContents varchar(420) not null,
  foreign key (category_id)
    references categories(id)
);

/* create dbuser */
create user user identified by 'password';
grant all privileges on webproLastAssignmentdb.* to 'user'@'%' identified by 'password';

/* create user */
insert into userInfo (name, password, authority) values ('default@dhu', 'password', 7);