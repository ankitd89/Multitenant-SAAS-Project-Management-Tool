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
    user_id int,
    foreign key (user_id)
        references Users (user_id),
    project_name varchar(30),
    task_id int,
    task_name varchar(30),
    start_date DateTime,
    end_date DateTime,
    record_id int auto_increment primary key
);

Alter table Data_Table auto_increment = 5001;

#alter table Data_table modify column task_id int unique key;



create table Meta_Data (
    tenant_id int,
    extension_id int auto_increment primary key,
    extension_name varchar(30),
    extenstion_data_type varchar(30)
);

alter table meta_data modify extension_name varchar(30);

Alter table Meta_Data auto_increment = 7001;

create table record (
    record_id int,
    foreign key (record_id)
        references Data_Table (record_id),
    extension_id int,
    foreign key (extension_id)
        references Meta_Data (extension_id),
    value varchar(30)
);
INSERT INTO Meta_Data (`tenant_id`, `extension_id`, `extension_name`, `extenstion_data_type`) 
VALUES ('1', '7001', 'Duration', 'int'),
('1', '7002', 'Cost', 'int'),
('1', '7003', 'Risk', 'varchar'),
('1', '7004', 'Resource', 'varchar'),
('2', '7005', 'Desc', 'varchar'),
('2', '7006', 'Task_Type', 'varchar'),
('2', '7007', 'Assignee', 'varchar'),
('2', '7008', 'Status', 'varchar'),
('2', '7009', 'Priority', 'varchar'),
('3', '7010', 'Team_velocity', 'int'),
('3', '7011', 'Actual_points', 'int'),
('3', '7012', 'Points_Expected', 'int'),
('3', '7013', 'Point_Completed', 'int'),
('1', '7014', 'Percent_Complete', 'int');


