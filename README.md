# Pokemon Go Searchbase API

This is a CRUD application for managing Pokemon data for Pokemon Go. It allows you to list, search, page, and filter Pokemon data, and it is built with NestJS as the backend framework along with MSSQL database.

## Table of Contents
1. [Getting Started](#getting-started)
    1. [Prerequisites](#prerequisites)
    2. [Installation](#installation)
    3. [Running the Application](#run-app)
2. [API Documentation](#api-doc)
3. [Project Structure](#project-structure)
4. [Testing](#testing)
5. [License](###license)

## Getting Started
### Prerequisites
To run this application, you need to have the following software installed on your machine:

- Node.js (version 14.x or later)
- npm (Node Package Manager)
- Docker (with Docker Compose)
- Microsoft SQL Server

### Installation
1. Clone the repository to your local machine:

```bash
$ git clone https://github.com/your-username/pokemon-go-searchbase.git
$ cd pokemonGO
```
2. Install the project dependencies:
```bash
$ yarn install
```
### Running the Application
To run the application, use the following command:
```sh
docker-compose up --build
```
The server will start running on http://localhost:8080.

## API Documentation
The API documentation for this application can be accessed using Swagger/OpenAPI. After running the application, visit http://localhost:8080/docs to view the API documentation.

## Project Structure

## Testing
Unit tests are included to ensure the correctness and robustness of the application. To run the tests, use the following command:
```bash
$ yarn test
```

## License

This project is licensed under the MIT License.