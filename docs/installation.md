# Installation Guide

## Prerequisites

- Node.js 20+
- npm
- MongoDB Atlas connection string
- Gemini API key

## Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Configure backend environment:

```bash
cp server/.env.example server/.env
```

3. Set `MONGO_URI`, `JWT_SECRET`, and `GEMINI_API_KEY` in `server/.env`.

4. Configure frontend environment:

```bash
cp client/.env.example client/.env
```

5. Start development servers:

```bash
npm run dev
```

Client runs on `http://localhost:5173`. API runs on `http://localhost:5001`.

## Admin User

After setting `ADMIN_EMAIL` and `ADMIN_PASSWORD`, run:

```bash
npm run seed:admin --prefix server
```
