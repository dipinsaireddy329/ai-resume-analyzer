# AI Resume Analyzer

An AI-powered Resume Analysis and ATS Optimization Platform that helps job seekers improve resume quality, evaluate ATS compatibility, identify skill gaps, and assess job-role fit using Large Language Models and semantic search.

## Features

### Resume Upload & Processing

* Upload resumes in PDF format
* Automated text extraction and preprocessing
* Resume content validation and parsing

### AI-Powered Analysis

* ATS compatibility scoring
* Resume structure evaluation
* Content quality assessment
* Skill gap identification
* Personalized improvement recommendations

### Job Role Matching

* Semantic similarity matching between resumes and job descriptions
* AI-driven candidate-job fit analysis
* Role suitability prediction
* Skill alignment scoring

### AI Technologies

* Gemini API integration through a modular AI service layer
* LangChain-powered workflow orchestration
* ChromaDB vector database for semantic search
* Embedding-based resume-job matching
* Context-aware candidate evaluation

### Reporting

* Detailed ATS analysis reports
* Resume improvement suggestions
* Downloadable PDF reports
* Skill-gap analysis summaries

### Security & Production Readiness

* JWT Authentication
* Bcrypt Password Hashing
* Input Validation & Sanitization
* Helmet Security Middleware
* API Rate Limiting
* Dockerized Deployment
* CI/CD with GitHub Actions

---

## Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

### AI & NLP

* Google Gemini API
* LangChain
* ChromaDB
* Embeddings
* Semantic Search
* Natural Language Processing (NLP)

### DevOps

* Docker
* Docker Compose
* GitHub Actions

---

## System Architecture

User → React Frontend → Express API → AI Service Layer → Gemini API

User → Resume Upload → Text Extraction → Embedding Generation → ChromaDB

Resume + Job Description → Semantic Matching → ATS Analysis → PDF Report Generation

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd ai-resume-analyzer
```

### Install Dependencies

```bash
npm run install:all
```

### Configure Environment Variables

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Update server/.env:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

### Run Development Server

```bash
npm run dev
```

---

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

---

## Key Achievements

* Built an NLP-powered resume screening platform using Large Language Models and semantic search.
* Implemented resume-to-job matching using embeddings and vector similarity search.
* Generated AI-driven candidate recommendations and ATS readiness reports.
* Designed a modular AI architecture supporting scalable LLM integration.
* Developed production-grade authentication, security, and deployment pipelines.
* Created automated skill-gap analysis and resume optimization workflows.

---

## Future Enhancements

* Multi-resume comparison
* Interview question generation
* LinkedIn profile analysis
* Cover letter generation
* Multi-model AI support (Gemini, OpenAI, Claude)
* Recruiter dashboard and analytics
* Resume benchmarking against industry standards

---

## License

MIT License
