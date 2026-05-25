# human_capital_project_prathvik_mehra


# 🚀 Backend — Node.js + Express.js + MongoDB

A **production-ready**, scalable REST API backend built with Node.js, Express.js, and MongoDB Atlas.
Designed for clean MVC + service-layer architecture with Render / Railway deployment support.

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── aggregations/          # MongoDB aggregation pipeline builders
│   ├── config/                # DB connection, CORS, rate limiter configs
│   ├── constants/             # Frozen app-wide constants & HTTP status codes
│   ├── controllers/           # Thin HTTP handlers (req → service → res)
│   ├── docs/                  # OpenAPI / Swagger YAML spec
│   ├── middlewares/           # Error handler, asyncHandler, validate
│   ├── models/                # Mongoose schemas & models
│   ├── routes/                # Express routers (mounted at /api/v1)
│   ├── seed/                  # DB seed scripts
│   ├── services/              # Business logic layer
│   ├── utils/                 # ApiError, apiResponse, pagination helpers
│   ├── validations/           # Joi / Zod request schemas
│   ├── app.js                 # Entry point — boots server + DB
│   └── server.js              # Express app factory (middleware stack)
├── tests/
│   ├── integration/           # Supertest HTTP integration tests
│   └── unit/                  # Pure unit tests
├── .env.example               # Environment variable template
├── .gitignore
├── nodemon.json               # Nodemon dev watcher config
├── package.json
└── README.md
```

---

## ⚙️ Environment Setup

### 1. Clone & install

```bash
git clone <your-repo-url>
cd backend
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:

| Variable                | Description                          | Default                  |
|-------------------------|--------------------------------------|--------------------------|
| `NODE_ENV`              | App environment                      | `development`            |
| `PORT`                  | Server port                          | `5000`                   |
| `APP_NAME`              | Application name                     | `MyBackend`              |
| `MONGO_URI`             | MongoDB Atlas connection string      | *(required)*             |
| `CORS_ORIGIN`           | Allowed frontend origin(s), CSV      | `http://localhost:3000`  |
| `RATE_LIMIT_WINDOW_MS`  | Rate limit window in ms              | `900000` (15 min)        |
| `RATE_LIMIT_MAX`        | Max requests per window per IP       | `100`                    |
| `LOG_LEVEL`             | Morgan log format                    | `dev`                    |

---

## 🛠️ Available Scripts

| Command          | Description                              |
|------------------|------------------------------------------|
| `npm run dev`    | Start dev server with Nodemon            |
| `npm start`      | Start production server                  |
| `npm test`       | Run all tests with coverage              |
| `npm run test:watch` | Run tests in watch mode              |
| `npm run lint`   | Lint source files with ESLint            |
| `npm run lint:fix` | Auto-fix lint errors                   |

---

## 🌐 API Endpoints

| Method | Path          | Description          |
|--------|---------------|----------------------|
| GET    | `/health`     | Server health check  |
| GET    | `/api/v1`     | API index / alive    |

> All feature routes will be registered under `/api/v1/<resource>`.

---

## 🏗️ Architecture Overview

```
Request
  └── Express Middleware Stack (Helmet, CORS, Rate Limit, Morgan, Body Parser)
        └── Router  (src/routes/index.js → feature routers)
              └── Controller  (HTTP in/out only — no business logic)
                    └── Service  (all business logic, DB queries)
                          └── Model  (Mongoose schema / DB)
                                └── MongoDB Atlas
```

### Key design principles

- **Thin controllers** — controllers only read `req`, call a service, and call `sendSuccess` / `sendError`.
- **Fat services** — all business logic, validation, and DB access lives in services.
- **Centralised errors** — throw `ApiError` anywhere; the global `errorHandler` catches everything.
- **Consistent responses** — all endpoints use `sendSuccess` / `sendError` for a uniform JSON envelope.
- **Environment-driven** — no secrets in code; all config via `.env`.

---

## ☁️ Deployment

### Render

1. Create a new **Web Service** → connect your GitHub repo.
2. Set **Root Directory** to `backend` (if monorepo).
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `npm start`
5. Add all variables from `.env.example` in the **Environment** tab.

### Railway

1. Create a new project → **Deploy from GitHub**.
2. Add a **MongoDB** plugin or paste your Atlas `MONGO_URI`.
3. Set all environment variables in the **Variables** tab.
4. Railway auto-detects `npm start`.

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage report
npm test -- --coverage

# Watch mode
npm run test:watch
```

Tests are split into:
- `tests/unit/` — pure logic tests (utils, helpers)
- `tests/integration/` — full HTTP request tests via Supertest

---

## 📦 Dependencies

| Package              | Purpose                                  |
|----------------------|------------------------------------------|
| `express`            | HTTP server framework                    |
| `mongoose`           | MongoDB ODM                              |
| `dotenv`             | Environment variable loader              |
| `cors`               | Cross-Origin Resource Sharing            |
| `helmet`             | HTTP security headers                    |
| `morgan`             | HTTP request logger                      |
| `express-rate-limit` | IP-based rate limiting                   |
| `nodemon` *(dev)*    | Auto-restart on file changes             |
| `jest` *(dev)*       | Test framework                           |
| `supertest` *(dev)*  | HTTP integration testing                 |

---

## 📄 API Documentation

The OpenAPI 3.0 spec lives at [`src/docs/swagger.yaml`](src/docs/swagger.yaml).

To serve it interactively, install `swagger-ui-express` and mount it:

```js
// Example — add to server.js when needed
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./src/docs/swagger.yaml");
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
```

---

## 🔒 Security Checklist

- [x] `helmet` — sets secure HTTP headers
- [x] `cors` — restricts origins via allowlist
- [x] `express-rate-limit` — prevents brute-force / DDoS
- [x] `express.json({ limit: "10mb" })` — prevents payload flooding
- [x] `.env` in `.gitignore` — no secrets committed
- [ ] Input validation (add Joi / Zod per route)
- [ ] Authentication (add JWT / session when needed)
- [ ] HTTPS (enforced by Render / Railway in production)

---

## 🤝 Contributing

1. Branch from `main`: `git checkout -b feature/your-feature`
2. Write your code + tests
3. `npm run lint:fix && npm test`
4. Open a Pull Request

---

> Built with ❤️ using Node.js · Express.js · MongoDB
