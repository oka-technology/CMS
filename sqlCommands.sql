/* create db */
create database webroLastAssignmentdb default charset utf8;
use webroLastAssignmentdb;

/* create tables */
create table userInfo (
  id int auto_increment not null primary key,
  name varchar(255) not null,
  password varchar(255) not null,
  authority_id int not null,
);

create table authority (
  id int auto_increment not null primary key,
  name varchar(255) not null
);
insert into authority (name) values ("管理者");
insert into authority (name) values ("編集者");
insert into authority (name) values ("閲覧者");

create table userInfo_authority (
  userInfo_id int not null,
  authority_id int not null
  foreign key (userInfo_id)
    references userInfo(id),
  foreign key (authority_id)
    references authority(id)
);

create table contents (
  id int auto_increment not null primary key,
  category_id int not null
  title varchar(255) not null,
  registrationDate varchar(255) not null,
  mainContents varchar(420) not null,
  foreign key (category_id)
    references categories(id)
);

create table categories (
  id int auto_increment not null primary key,
  name varchar(255) not null
);
