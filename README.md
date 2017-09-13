# letstalk_test

Install node

Setup backend

Open a terminal in the project folder

Install mysql
initiate data

run in mysql

backend/data/letstalk_test.sql

CREATE USER 'letstalk_test'@'localhost' IDENTIFIED VIA mysql_native_password USING '***';
GRANT USAGE ON *.* TO 'letstalk_test'@'localhost' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;GRANT ALL PRIVILEGES ON `letstalk_test`.* TO 'letstalk_test'@'localhost';

node backend/bin/automigrate.js

cd backend
npm install
node start

Setup frontend

Open a terminal in the project folder

cd frontend
npm install
node start