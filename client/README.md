# Cute devs

> Find the cutest devs in the planet in one place

### Table of contents

- [Quick start](#quick-start)
- [What is this project](#what-is-this-project)
- [Technologies](#technologies)

## Quick start

The project is splited into client(This repository) and [server](https://github.com/Gers2017/cute-devs-server)

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
cd cute-devs-client
cd cute-devs-server
```

Install the dependencies for both

```bash
# Both client and server use the dev command
npm i
#or
yarn
```

Run the dev command

```bash
npm run dev
#or
yarn dev
```

Once that is done you can open the [client](http://localhost:3000/) and
explore the [server](http://localhost:4000/graphql)

## What is this project

The frontend for Cute devs, a platform to find the cutest developers in the planet
Covering the need of many to know more about the great developers
who make the software we all love and care.

If you don't find a cute dev, and you think it should be added,
make sure to open an issue

## Technologies

- Vite.js
- React
- Typescript
- Tailwindcss
- React router dom
- Urlq (GraphQL)
- Graphql Code Generator
- Formik
