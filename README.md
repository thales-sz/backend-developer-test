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

To run the tests, at the root directory run:
   ```bash
   npm run test
    ```
    Or for coverage:
    ```bash
    npm run test:cov
    ```
    
**Do not forget to update the .env file with the correct credentials**

By running these commands the program will bring up 5 docker containers, 2 instances of the application running on port 3030, an nginx load balancer on port 9999, the postgres and redis databases.

All requests to the API must be made directly to Nginx on port **9999**

## Architecture

The solution adopts an architecture that includes an Nginx load balancer to distribute requests between two instances of the same application, guaranteeing the scalability and availability of the service. The PostgreSQL database is used for data persistence, with schemas and tables optimized for high concurrency operations. Redis is used for caching between the two instances, ensuring a better end-user experience in terms of performance, response time and avoiding unnecessary bandwidth consumption.

## API Documentation

Endpoint when running local: `http://localhost:9999`

- `GET /feed`: List existing publishe jobs.
Expected output:
 ```json
  [
    ...,
    {
        "id": "e73079f9-9571-4de8-b5f3-1f69fe8dadbb",
        "title": "Backend Developer",
        "description": "serviço bão",
        "company": "ABC Corp",
        "createdAt": "2024-02-15T23:02:17.539Z"
    },
    ...,
  ]
 ```
- `POST /feed`: Runs the lambda function responsible for updating the publications in the s3 bucket (Used on serverless environment for debugging)
- `GET /companies`: List existing companies.
Expected output:
```json
  [
    {
        "id": "90d19829-8621-411b-9695-29c5054abca4",
        "createdAt": "2024-02-16T21:35:53.623Z",
        "updatedAt": "2024-02-16T21:35:53.623Z",
        "name": "ABC Corp"
    },
    ...,
  ]
 ```
- `GET /companies/:company_id`: Fetch a specific company by ID.
Expected output:
```json
    {
        "id": "90d19829-8621-411b-9695-29c5054abca4",
        "createdAt": "2024-02-16T21:35:53.623Z",
        "updatedAt": "2024-02-16T21:35:53.623Z",
        "name": "ABC Corp"
    }
 ```
- `POST /job`: Create a job posting draft.
Input:
```json
    {
        "title": "Backend Developer",
        "description": "serviço bão",
        "location": "remote",
        "companyId": "8de43cf8-7612-4444-b960-8a1c9816a981",
        "notes": "notes" (Optional)
    }
 ```
Expected output:
```json
    {
        "title": "Backend Developer",
        "description": "serviço bão",
        "location": "remote",
        "notes": "notes",
        "company": {
            "id": "90d19829-8621-411b-9695-29c5054abca4",
            "createdAt": "2024-02-16T21:35:53.623Z",
            "updatedAt": "2024-02-16T21:35:53.623Z",
            "name": "ABC Corp"
        },
        "id": "a2aaa652-a90e-4a9a-9003-6a264edaaf57",
        "createdAt": "2024-02-16T21:52:55.984Z",
        "updatedAt": "2024-02-16T21:52:55.984Z",
        "status": "draft"
    }
 ```
- `PUT /job/:job_id/publish`: Publish a job posting draft.
- `PUT /job/:job_id`: Edit a job posting draft (title, location, description).
- `DELETE /job/:job_id`: Delete a job posting draft.
- `PUT /job/:job_id/archive`: Archive an active job posting.

### Bonus Questions

1. Discuss scalability solutions for the job moderation feature under high load conditions. Consider that over time the system usage grows significantly, to the point where we will have thousands of jobs published every hour. Consider the API will be able to handle the requests, but the serverless component will be overwhelmed with requests to moderate the jobs. This will affect the database connections and calls to the OpenAI API. How would you handle those issues and what solutions would you implement to mitigate the issues?

A: One approach is to horizontally scale the serverless component that handles job moderation. This involves adding more instances of the serverless component as the load increases. In addition, to reduce the load on the serverless component and the calls to the OpenAI API, you could implement a caching system for the moderation results between server instances, such as a Redis system with an SQS-like queue and also I would fine tune the queue.

2. Propose a strategy for delivering the job feed globally with sub-millisecond latency. Consider now that we need to provide a low latency endpoint that can serve the job feed content worldwide. Using AWS as a cloud provider, what technologies would you need to use to implement this feature and how would you do it?

A: The approahc is utilize Amazon CloudFront, AWS's global content delivery network (CDN) service. CloudFront caches content at edge locations around the world, reducing latency by serving content from the nearest edge location to the user.
We can also configure CloudFront to cache the job feed content and serve it globally with low latency.

## Notes

- Feel free to ask me any doubt at: thales.souz@outlook.com

## License

This project is licensed under the [MIT License](LICENSE).