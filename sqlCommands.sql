/* create db */
create database webproLastAssignmentdb default charset utf8;
use webproLastAssignmentdb;

/* create tables */
create table userInfo (
  id int auto_increment not null primary key,
  name varchar(255) not null,
  password varchar(255) not null,
  authority_id int not null
);

create table authority (
  id int auto_increment not null primary key,
  name varchar(255) not null
);
insert into authority (name) values ("administrator");
insert into authority (name) values ("editor");
insert into authority (name) values ("reader");

create table userInfo_authority (
  userInfo_id int not null,
  authority_id int not null,
  foreign key (userInfo_id)
    references userInfo(id),
  foreign key (authority_id)
    references authority(id)
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
