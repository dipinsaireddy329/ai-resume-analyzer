# Database Schema Documentation

## User

Stores application accounts.

- `name`: display name.
- `email`: unique login identifier.
- `password`: bcrypt hash, excluded by default.
- `role`: `user` or `admin`.
- `passwordResetToken`: hashed reset token.
- `passwordResetExpires`: reset token expiry.
- `lastLoginAt`: last successful login timestamp.

Relationships:

- One user has many resumes.
- One user has many analyses through resumes.

## Resume

Stores upload metadata and parsed resume text.

- `user`: owner reference.
- `originalName`: uploaded filename.
- `storedName`: generated server filename.
- `path`: upload path.
- `mimetype`: file MIME type.
- `size`: byte size.
- `parsedText`: extracted PDF text.
- `targetRole`: optional role target.
- `status`: `uploaded`, `parsed`, `analyzed`, or `failed`.
- `error`: parsing or processing error.

Relationships:

- Many resumes belong to one user.
- One resume has one analysis.

## Analysis

Stores AI-generated resume analysis.

- `user`: owner reference.
- `resume`: unique resume reference.
- `targetRole`: copied target role for reporting.
- `atsScore`: ATS score from 0 to 100.
- `skills`: extracted skills.
- `missingSkills`: role-relevant gaps.
- `strengths`: positive resume findings.
- `weaknesses`: improvement areas.
- `recommendations`: actionable suggestions.
- `rolePredictions`: role, match percentage, and explanation.
- `rawProviderResponse`: AI provider metadata or fallback trace.
