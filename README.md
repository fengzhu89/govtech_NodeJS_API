# GovTech Node.js API Asessment

Teachers need a system where they can perform administrative functions for their students. Teachers and students are identified by their email addresses.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)  suggest `node version 10` and `npm` are installed
- [MySQL](https://dev.mysql.com/downloads/mysql/)

### Setup and install

1. Clone the repository:

```bash
git clone https://github.com/fengzhu89/govtech_NodeJS_API.git
```

2. Install dependencies:

```bash
cd ${path-to-project}
npm install
```

3. Modify `/config/db.config.js` file to use the database configuration that setup locally.

5. Start the server:

```bash
npm start
```
6. Hit the server to test running `curl localhost:3001` and expect a message `"Welcome to Aministrative Tool"` response 

### RUN test

```bash
npm test
```
### Main API routes

| Method | Route                         | Description                                                       |
| :----- | :---------------------------- | :---------------------------------------------------------------- |
| POST   | /api/register                 | Register one or more students to a specified teacher              |
| GET    | /api/commonstudents           | Retrieve a list of students common to a given list of teachers    |
| POST   | /api/suspend                  | Suspend a specified student                                       |
| POST   | /api/retrievefornotifications | Retrieve a list of students who can receive a given notification  |
