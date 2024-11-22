# Home Library

## Project Overview

Home Library is a Node.js and NestJS-based application designed to manage a personal library. This project includes modules for handling users, tracks, artists, albums, and favorites, providing a comprehensive system for organizing and interacting with your home library collection. The application also integrates Swagger for API documentation.

## Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- [NestJS](https://nestjs.com/)
- [Docker](https://www.docker.com/get-started/)

## Setup and Installation

> Please wait until the current process is executed before starting the next one.

1.  **Clone the repository:**
```bash
git clone https://github.com/DenHelloWorld/nodejs2024Q3-service.git
```
2.  **Go to folder:**
```bash
cd nodejs2024Q3-service
```
3.  **Switch branch:**
```bash
git checkout home-lib-2
```
4.  **Install dependencies:**
```bash
npm install
```

5.  **Set environment variables:** Create a `.env` file in the project root and configure it based on your setup. For example:
    - `PORT=4000`
    - `POSTGRES_HOST=localhost`
    - `POSTGRES_PORT=5432`
    - `POSTGRES_USER=myuser`
    - `POSTGRES_PASSWORD=mypassword`
    - `POSTGRES_DB=mydatabase`
    - `DATABASE_URL=postgres://myuser:mypassword@db:5432/mydatabase`
6.  **Run the application:**

    - **Development mode:**

      > [Docker](https://www.docker.com/get-started/) must be installed and running on your device

```bash
npm run docker:up
```
```bash
npm run migration:generate
```
```bash
npm run migration:run
```
```bash
npm run test
```
```bash
npm run docker:down:cleanDb
```

## API Documentation

Swagger is used for API documentation. To view the API docs, navigate to `http://localhost:<PORT>/doc` after starting the application.

## Scripts

- `npm run build` - Builds the application.
- `npm run format` - Formats code using Prettier.
- `npm run lint` - Runs ESLint on the source code.
- `npm run docker:build` - Starts the application in development mode with live reloading from docker container.
- `npm run test` - Runs unit tests with Jest.
- `npm run vulnerabilities` - Runs vulnerabilities scanning.

## Technologies Used

- **NestJS** - A progressive Node.js framework.
- **TypeORM** - An ORM for managing database operations.
- **Swagger** - For generating and viewing API documentation.
- **Jest** - For unit and end-to-end testing.
- **ESLint & Prettier** - For code linting and formatting.
- **Docker** - For containerizing the application.

## Project Structure

- `src/features/` - Contains the feature modules (`user`, `track`, `artist`, `album`, and `favs`).
- `src/app.module.ts` - The root module that imports all feature modules.
- `doc/api.yaml` - Swagger documentation file.
- `src/migrations` - Generated typeorm schemes.

## License

This project is UNLICENSED.
