# LetsTalk coding test

The project has frontend and backend divide, both developed in [node](https://nodejs.org/). The api calls to backend are managed by a proxy in the front. Both apps must be running at the same time to work.

The frontend is based in [React](https://facebook.github.io/react/) framework with [React bootstrap](https://react-bootstrap.github.io/) to implement responsiveness.

The backend is based in [Loopback](https://loopback.io/) framework, which is an Rest framework (more secure and easy to expose apis).

## Setup backend

Open a terminal in the project folder

Install [mysql](http://www.mysql.com)

To initiate db letstalk_test in mysql you have to import

```bash
backend/data/letstalk_test.sql
```

Then run in SQL the next script to create a new user

```sql
CREATE USER 'letstalk_test'@'localhost' IDENTIFIED VIA mysql_native_password USING '***';
GRANT USAGE ON *.* TO 'letstalk_test'@'localhost' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;GRANT ALL PRIVILEGES ON `letstalk_test`.* TO 'letstalk_test'@'localhost';
```

To put data in the db you have to use the next script

```bash
node backend/bin/automigrate.js
```

This script can take a long time, so be patient.

Now you can install

```bash
cd backend
npm install
node start
```

## Setup frontend

Open another terminal in the project folder

```bash
cd frontend
npm install
node start
```