create database MultiTenantSaaS;
use MultiTenantSaaS;

create table Users (
    user_id int auto_increment primary key,
    email_id varchar(30),
    password varchar(30),
    tenant_id int
);


Alter table Users auto_increment = 1001;

#create table Tenants (
 #   tenant_id int primary key,
  #  tenant_name varchar(30)
#);

#insert into Tenants values (1,"Gantter");
#insert into Tenants values (2,"Kanban");
#insert into Tenants values (3,"Easy Backlog");


create table Data_Table (
    tenant_id int,
   # foreign key (tenant_id)
    #    references Tenants (tenant_id),
    user_id int,
    foreign key (user_id)
        references Users (user_id),
    project_name varchar(10),
    task_id int,
    task_name varchar(20),
    start_date DateTime,
    end_date DateTime,
    record_id int auto_increment primary key
);

Alter table Data_Table auto_increment = 5001;

#alter table Data_table modify column task_id int unique key;



create table Meta_Data (
    tenant_id int,
    extension_id int auto_increment primary key,
    extension_name varchar(10),
    extenstion_data_type varchar(20)
);

Alter table Meta_Data auto_increment = 7001;

create table record (
    record_id int,
    foreign key (record_id)
        references Data_Table (record_id),
    extension_id int,
    foreign key (extension_id)
        references Meta_Data (extension_id),
    value varchar(10)
);



