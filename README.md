# MatrixBot API

REST API for MatrixBot statistics and metrics.

The API is used to receive bot statistics, update runtime data and expose metrics for monitoring.

## Tech stack

- Node.js
- Express.js
- JavaScript
- prom-client
- dotenv
- cors
- morgan

## Features

- Get bot statistics
- Update bot statistics
- Export metrics in Prometheus-compatible format
- Token-based API authorization
- Basic error handling and request logging

## API endpoints

```http
GET /api/statistics
POST /api/statistics
GET /api/metrics