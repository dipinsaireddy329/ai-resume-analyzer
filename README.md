# AI Resume Analyzer

A production-oriented full-stack application for uploading PDF resumes, extracting text, analyzing ATS readiness with Gemini, predicting job-role fit, and exporting PDF reports.

## Stack

- React, Vite, React Router, Axios, Tailwind CSS
- Node.js, Express.js, MongoDB Atlas, Mongoose
- JWT authentication, Bcrypt password hashing
- Gemini API behind a modular AI service layer
- Helmet, rate limiting, validation, sanitization
- Docker, Docker Compose, GitHub Actions

## Quick Start

```bash
npm run install:all
cp server/.env.example server/.env
cp client/.env.example client/.env
npm run dev
```

Set `MONGO_URI`, `JWT_SECRET`, and `GEMINI_API_KEY` in `server/.env`.

## Documentation

- [High Level System Design](docs/system-design.md)
- [API Documentation](docs/api.md)
- [Database Schema Documentation](docs/database-schema.md)
- [Installation Guide](docs/installation.md)
- [Deployment Guide](docs/deployment.md)

## Project Structure

```text
root/
├── client/
├── server/
├── docs/
├── docker/
├── .github/
└── README.md
```
