# Cute devs

> Find the cutest devs in the planet in one place

### Table of contents

- [Quick start](#quick-start)
  - [Install the dependencies](#install-the-dependencies) 
  - [Using the .example files](#using-the-.example-files)
  - [Run the dev command](#run-the-dev-command)
- [What is this project](#what-is-this-project)
- [Technologies](#technologies)
- [Why not yarn workspaces or lerna](#why-not-yarn-workspaces-or-lerna)

## Quick start

The project is separated into client(This repository) and [server](https://github.com/Gers2017/cute-devs-server)

It is highly recommended that you **clone both repositories inside the same directory**
Otherwise you might have to move through multiple directories to run the project

In order to start developing we first need to clone both repositories

```bash
# Use git clone or the Github Desktop app
# Clone the client repository
git clone https://github.com/Gers2017/cute-devs-client.git

# Clone the server repository
git clone https://github.com/Gers2017/cute-devs-server.git
```

Access both projects in your local environment

```bash
cd client
cd server
```

### Install the dependencies

```bash
# Both client and server use the dev command
npm i
#or
yarn
```

### Using the .example files 
To configure typeorm there's a file named `ormconfig.example.js`
You'll need to create a copy with the name `ormconfig.js`
**providing your own data** about you local database like the user, password and database name

The process is the same for the .env.example files just make a copy and rename it as 
`.env`


### Run the dev command
To start developing you'll need to cd into both client and server and run the following command
in different terminals

```bash
npm run dev
#or
yarn dev
```

Once that is done you can open the [client](http://localhost:3000/) and
explore the [server](http://localhost:4000/graphql)

## What is this project

The monorepo for Cute devs, a platform to find the cutest developers in the planet
Covering the need of many to know more about the great developers
who make the software we all love and care.

## Technologies

- **Frontend**
  - Vite.js
  - React
  - Typescript
  - Tailwindcss (for styling)
  - React router dom
  - Urlq (GraphQL client)
  - Graphql Code Generator
- **Backend**
  - typeorm
  - typegraphql
  - typescript
  - apollo server
  - express
  - jsonwebtoken


## Why not yarn workspaces or lerna
Because I want to keep the project simple and because of graphql code generator