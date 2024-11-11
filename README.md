# Home Library

## Project Overview

Home Library is a Node.js and NestJS-based application designed to manage a personal library. This project includes modules for handling users, tracks, artists, albums, and favorites, providing a comprehensive system for organizing and interacting with your home library collection. The application also integrates Swagger for API documentation.

## Prerequisites

- Node.js and npm
- NestJS CLI (for development)

## Setup and Installation

1.  **Clone the repository:**
    - `git clone <repository-url>`
    - `cd nodejs2024Q3-service`
2.  **Install dependencies:**
    - `npm install`
3.  **Set environment variables:** Create a `.env` file in the project root and configure it based on your setup. For example:
    - `PORT=4000`
4.  **Run the application:**

    - **Development mode:**

      - `npm run start:dev`

    - **Production mode:**

      - `npm run build`
      - `npm run start:prod`

## API Documentation

Swagger is used for API documentation. To view the API docs, navigate to `http://localhost:<PORT1>/doc` after starting the application.

## Scripts

- `npm run build` - Builds the application.
- `npm run format` - Formats code using Prettier.
- `npm run lint` - Runs ESLint on the source code.
- `npm run start` - Starts the application in production mode.
- `npm run start:dev` - Starts the application in development mode with live reloading.
- `npm run test` - Runs unit tests with Jest.
- Additional test scripts for debugging, coverage, and authentication-related tests are also included.

## Technologies Used

- **NestJS** - A progressive Node.js framework.
- **TypeORM** - An ORM for managing database operations.
- **Swagger** - For generating and viewing API documentation.
- **Jest** - For unit and end-to-end testing.
- **ESLint & Prettier** - For code linting and formatting.

## Project Structure

- `src/features/` - Contains the feature modules (`user`, `track`, `artist`, `album`, and `favs`).
- `src/app.module.ts` - The root module that imports all feature modules.
- `src/doc/api.yaml` - Swagger documentation file.

## License

This project is UNLICENSED.
