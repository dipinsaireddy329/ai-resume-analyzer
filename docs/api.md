# API Documentation

Base URL: `/api`

## Auth

- `POST /auth/register`
  - Body: `{ "name": "...", "email": "...", "password": "..." }`
  - Returns: JWT and user.

- `POST /auth/login`
  - Body: `{ "email": "...", "password": "..." }`
  - Returns: JWT and user.

- `POST /auth/logout`
  - Requires auth.
  - Clears auth cookie.

- `GET /auth/me`
  - Requires auth.
  - Returns current user.

- `POST /auth/forgot-password`
  - Body: `{ "email": "..." }`
  - Generates a reset token.

- `POST /auth/reset-password`
  - Body: `{ "token": "...", "password": "..." }`
  - Resets password and returns JWT.

## Resumes

- `GET /resumes`
  - Requires auth.
  - Query: `search`, `status`.
  - Returns accessible resumes.

- `POST /resumes`
  - Requires auth.
  - Multipart fields: `resume` PDF, optional `targetRole`.
  - Stores and parses resume.

- `GET /resumes/:id`
  - Requires auth.
  - Returns resume and analysis.

- `POST /resumes/:id/analyze`
  - Requires auth.
  - Runs Gemini-backed analysis.

- `GET /resumes/:id/report`
  - Requires auth.
  - Downloads PDF report.

- `DELETE /resumes/:id`
  - Requires auth.
  - Deletes resume metadata and analysis.

## Admin

- `GET /admin/stats`
  - Requires admin.
  - Returns global counts.

- `GET /admin/users`
  - Requires admin.
  - Returns users.

- `PATCH /admin/users/:id`
  - Requires admin.
  - Body: partial user update, commonly `{ "role": "admin" }`.
