# Deployment Guide

## Environment Variables

Required backend variables:

- `NODE_ENV=production`
- `PORT=5001`
- `CLIENT_URL`
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `GEMINI_API_KEY`
- `GEMINI_MODEL`
- `MAX_FILE_SIZE_MB`

## Docker

Build and run:

```bash
docker compose up --build
```

The API listens on port `5001`.

## MongoDB Atlas

1. Create an Atlas cluster.
2. Create a database user.
3. Add the deployment IP address to network access.
4. Copy the connection string into `MONGO_URI`.

## Production Notes

- Use a strong random `JWT_SECRET`.
- Restrict CORS through `CLIENT_URL`.
- Put the API behind TLS.
- Persist the `uploads` volume or replace local uploads with object storage.
- Configure real email delivery for password reset tokens before public launch.
