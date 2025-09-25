# Nearsure.NetReactApp

Sample application to show skills and approaches around .NET Core + React apps.

## Application Overview

This is a simple product management application that allows users to create, read, update, and delete products. The application is built with a .NET Core backend, a React frontend, and uses Keycloak for authentication.

## Technologies Used

*   **Backend:** .NET Core, ASP.NET Core, Entity Framework Core
*   **Frontend:** React, TypeScript, Tailwind CSS
*   **Database:** PostgreSQL
*   **Authentication:** Keycloak
*   **Logging and Monitoring:** Elasticsearch, Kibana
*   **Containerization:** Docker, Docker Compose

## Getting Started

To run the application locally, you will need to have Docker and Docker Compose installed.

1.  Clone the repository.
2.  Run the following command to start the application:

    ```bash
    docker-compose up -d
    ```

3.  The application will be available at `http://localhost:3000`.

## Services

The `docker-compose.yml` file defines the following services:

*   `db`: A PostgreSQL database.
*   `elasticsearch`: Elasticsearch for storing and searching data, likely logs.
*   `kibana`: Kibana for visualizing data from Elasticsearch.
*   `api`: The .NET Core backend API.
*   `client`: The React frontend.
*   `keycloak`: Keycloak for identity and access management.

## API Endpoints

The following API endpoints are available:

*   `GET /api/products`: Retrieves a list of all products.
*   `POST /api/products`: Creates a new product.

## Authentication

The application uses Keycloak for authentication. A default realm, client, and user are created when the application is started.

*   **Keycloak URL:** `http://localhost:8181`
*   **Realm:** `nearsure`
*   **Client ID:** `nearsure-client`
*   **User:** `user`
*   **Password:** `password`