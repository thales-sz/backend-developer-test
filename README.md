# Backend Developer Test - Plooral

This repository contains the solution to the backend developer test for Plooral. The focus of this project is to assess back-end knowledge with a focus on organizational and architectural skills. The task is to create a Nodejs API for a job management application.

## Overview

The challenge consists of creating an API using the HTTP protocol for requests, which consist of creating posts, viewing them, updating and deleting them. In addition, it is necessary to implement a caching system for viewing job posts, which are stored in a S3 bucket and periodically updated by a lambda function.

## Technologies

- **Programming Language**: TypeScript (Node.js 20.x)
- **Database**: Postgres (Data persistence) + Redis (Caching)
- **Storage**: AWS S3 Bucket
- **Containerization**: Docker + Docker compose

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository: 
    ```bash
    git clone git@github.com:thales-sz/backend-developer-test.git
    ```
2. Navigate to the directory and change branch:
    ```bash
    cd backend-developer-test
    git checkout thales-chagas
    ```
3. Make sure to use the latest version:
    ```bash
    git pull origin thales-chagas
    ```
4. Navigate to the root directory API and run:
   ```bash
   cd api
   docker compose up --build
    ```

By running these commands the program will bring up 5 docker containers, 2 instances of the application running on port 3030, an nginx load balancer on port 9999, the postgres and redis databases.

All requests to the API must be made directly to Nginx on port **9999**

## Architecture

The solution adopts an architecture that includes an Nginx load balancer to distribute requests between two instances of the same application, guaranteeing the scalability and availability of the service. The PostgreSQL database is used for data persistence, with schemas and tables optimized for high concurrency operations. Redis is used for caching between the two instances, ensuring a better end-user experience in terms of performance, response time and avoiding unnecessary bandwidth consumption.

## API Documentation

Endpoint when running local: `http://localhost:9999`

- `GET /feed`: List existing publishe jobs.
- `POST /feed`: Runs the lambda function responsible for updating the publications in the s3 bucket (Used on serverless environment)
- `GET /companies`: List existing companies.
- `GET /companies/:company_id`: Fetch a specific company by ID.
- `POST /job`: Create a job posting draft.
- `PUT /job/:job_id/publish`: Publish a job posting draft.
- `PUT /job/:job_id`: Edit a job posting draft (title, location, description).
- `DELETE /job/:job_id`: Delete a job posting draft.
- `PUT /job/:job_id/archive`: Archive an active job posting.

## License

This project is licensed under the [MIT License](LICENSE).