# High Level System Design

## Architecture

AI Resume Analyzer is a modular MERN-style application with a Vite React client and an Express API. The backend follows clean architecture boundaries:

- Routes expose HTTP contracts.
- Controllers coordinate request/response behavior.
- Services isolate domain capabilities such as PDF parsing, AI analysis, and report generation.
- Models define MongoDB persistence.
- Middleware centralizes authentication, authorization, validation, security, and error handling.

## Request Flow

1. Users authenticate with email/password.
2. The API issues a JWT in both response body and httpOnly cookie.
3. Authenticated users upload PDF resumes.
4. The server stores the PDF, extracts text, and saves metadata.
5. The AI service sends parsed text to Gemini or uses a deterministic local fallback when no API key is configured.
6. Analysis results are stored separately and connected to the resume.
7. Users can download a generated PDF report.
8. Admin users can view global statistics and manage users.

## Core Components

- Client: React, React Router, Axios, Tailwind CSS.
- API: Node.js, Express.js, JWT, Bcrypt, Helmet, rate limiting, validation, sanitization.
- Data: MongoDB Atlas through Mongoose.
- AI: Gemini API behind a modular service layer.
- Files: Local upload volume suitable for Docker persistence. Production deployments can swap this for object storage.

## Security Design

- Passwords are hashed with Bcrypt.
- JWT protects private routes.
- Admin routes require role-based authorization.
- Helmet sets secure HTTP headers.
- Rate limiting protects authentication and API endpoints.
- express-validator validates request payloads.
- express-mongo-sanitize blocks MongoDB operator injection.
- Multer enforces PDF-only uploads and size limits.
