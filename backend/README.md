# Compiler Backend

This is a backend for compiler module built with Node.js, Express.js, and MongoDB.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [Main Dependencies](#main-dependencies)
- [API Endpoints](#api-endpoints)
- [Author](#author)
- [Project Status](#project-status)

## Description

A robust Node.js and Express-based backend for a code compilation and execution platform. This service manages user code submissions, processes test cases, and delivers execution results. Built with MongoDB for efficient data management and scalability.

## Features

- **Code Upload**: Support for uploading code snippets in various programming languages.
- **Test Case Input**: Users can provide custom test cases to validate their code.
- **Code Execution**: Processes and executes uploaded code against provided test cases.
- **Result Display**: Returns outputs from code execution, including success or error messages.
- **User Management**: Secure authentication and user data management using JWT and MongoDB.
- **Logging**: Comprehensive logging of user activities and code execution results.
- **Scalable Architecture**: Designed to handle multiple concurrent users and processes efficiently.
- **Error Handling**: Robust error handling and validation for user inputs and code execution processes.
- **Real-time Collaboration**: Authors can invite co-authors to collaborate in real-time on projects.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later recommended)
- MongoDB (Make sure it's installed and running)
- Yarn package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/iRootsOrg/CodeBase.git
```
2. Navigate to the backend directory:

```bash
cd CodeBase/backend
```
3. Install Dependencies

```bash
yarn install
```

## Folder Structure

The backend folder is structured as follows:

```bash
backend/
├── config/          # Configuration files (e.g., database connections, logger)
├── controllers/     # Controller files to handle business logic and request processing
├── logs/            # Log files to track application activities and errors
├── middlewares/     # Custom middleware functions for request processing
├── models/          # Mongoose models for MongoDB schema definitions
├── node_modules/    # Node.js modules (installed dependencies)
├── routes/          # Express route definitions
├── utils/           # Utility functions and helper methods
├── views/           # Views for templating 
├── .env             # Environment variables configuration file
├── index.js         # Entry point of the application
├── package.json     # Project metadata and dependencies
├── README.md        # Documentation and instructions for the project
└── yarn.lock        # Lock file for Yarn dependencies
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DATABASE_URL`

`JWT_SECRET`

`WSS_PORT`

`NODE_ENV`

`SESSION_SECRET`

## Running the Server

Development mode with hot-reloading:

```bash
yarn nodemon
```
Production mode:

```bash
node index.js
```

## Main Dependencies

- Express.js: Web application framework
- Mongoose: MongoDB object modeling
- JSON Web Token (jsonwebtoken): User authentication
- bcryptjs: Password hashing
- cors: Cross-Origin Resource Sharing
- dotenv: Environment variable management
- ejs: Templating engine
- express-fileupload: File upload functionality
- nodemailer: Email functionality
- Winston: Logging
- ws: WebSocket support

Development dependencies:
- nodemon: Auto-restarting the node application during development

## API Endpoints

### File Routes
- `POST /api/v1/file/upload`: Upload a file (requires authentication)
- `GET /api/v1/file/decode/:id`: Decode a file by ID

### User Routes
- `POST /api/v1/user/signup`: Register a new user
- `POST /api/v1/user/signin`: User login
- `POST /api/v1/user/start-editing-session`: Start an editing session (requires authentication)
- `POST /api/v1/user/join-editing-session`: Join an existing editing session (requires authentication)
- `POST /api/v1/user/assign-role`: Assign a role to a user
- `GET /api/v1/user/user-roles/:userId`: Get roles for a specific user
- `POST /api/v1/user/delete-role`: Remove a role from a user
- `POST /api/v1/user/add-coauthor`: Add a coauthor to a project (requires authentication)

### Review Routes
- `POST /api/v1/review/reviews`: Create a new review
- `POST /api/v1/review/reviews/:reviewId/comments/:commentId`: Add a comment to a specific review
- `GET /api/v1/review/reviews/:id`: Get a specific review by ID

### WebSocket Route
- `GET /wss`: This route is the main WebSocket route for real-time collaboration. It enables real-time collaboration and internally routes to `/websocket`.

### Health Check
- `GET /health-check`: Check if the WebSocket server is running

## Author

Himanshu - [GitHub Profile](https://github.com/17himanshu)

## Contributors

Himanshu - [GitHub Profile](https://github.com/17himanshu) <br>
Kunal Singla - [GitHub Profile](https://github.com/KS963000)

## Project Status

This project is currently in active development. At this time, we are not accepting external collaborations or contributions. The codebase is maintained internally by our team.

We appreciate your interest in the project. However, please note that pull requests or suggestions for changes from external contributors cannot be accepted at this stage of development.

For any queries or concerns about the project, please contact the project maintainers directly.




