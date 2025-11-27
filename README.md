A minimal, test-ready MERN starter focused on unit, integration, and end-to-end (E2E)testing.

## Project purpose

This repository demonstrates a practical testing setup for a MERN app:

- Jest + Supertest + mongodb-memory-server for server unit & integration tests
- React Testing Library for client unit tests and component integration
- Cypress for end-to-end tests (including a simple visual regression option)
- GitHub Actions workflow to run unit, integration and E2E tests in CI plus quick troubleshooting and debugging tips — ready to paste into your repository.


## Project Structure

```
mern-testing/
├── client/                 # React front-end
│   ├── src/                # React source code
│   │   ├── components/     # React components
│   │   ├── tests/          # Client-side tests
│   │   │   ├── unit/       # Unit tests
│   │   │   └── integration/ # Integration tests
│   │   └── App.jsx         # Main application component
│   └── cypress/            # End-to-end tests
├── server/                 # Express.js back-end
│   ├── src/                # Server source code
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── middleware/     # Custom middleware
│   └── tests/              # Server-side tests
│       ├── unit/           # Unit tests
│       └── integration/    # Integration tests
├── jest.config.js          # Jest configuration
└── package.json            # Project dependencies
```

## Getting Started
Quick start (local, from project root)

1. Install dependencies for server and client:

# from project root (you can use the root script if present)
npm run install-all
# or manually:
cd server && npm ci
cd ../client && npm ci

2. Run server unit tests:

cd server
npm run test:unit

3. Run server integration tests (uses in-memory MongoDB):

cd server
npm run test:integration

4. Run client unit tests:
  cd client
npm run test:integration

6. Run E2E (Cypress):

- Start the server and serve the client, then:

cd client
npm run test:e2e
# or interactively:
npx cypress open

---

Scripts you should have

(Example "package.json" scripts — yours may vary)

Root "package.json"

{
  "scripts": {
    "install-all": "cd server && npm install && cd ../client && npm install",
    "test": "npm run test:unit && npm run test:integration",
    "test:unit": "cd server && npm run test:unit && cd ../client && npm run test:unit",
    "test:integration": "cd server && npm run test:integration && cd ../client && npm run test:integration",
    "test:e2e": "cd client && npx cypress run"
  }
}

Server "package.json" (example)

"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js",
  "test:unit": "cross-env NODE_ENV=test jest --config=jest.config.js --runInBand --testPathPattern=tests/unit",
  "test:integration": "cross-env NODE_ENV=test jest --config=jest.config.js --runInBand --testPathPattern=tests/integration"
  }

Client "package.json" (example)

"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test:unit": "react-scripts test --watchAll=false --testPathPattern=src/tests/unit",
  "test:integration": "react-scripts test --watchAll=false --testPathPattern=src/tests/integration",
  "test:e2e": "cypress run"
}
CI (GitHub Actions)

A sample workflow (".github/workflows/ci.yml") will:

- Spin up a MongoDB service
- Run server & client unit + integration tests
- Build and serve the client
- Start the server against the test DB
- Run Cypress E2E headlessly

If you add the workflow, commits will trigger CI and you’ll get logs under the Actions tab.

---

Testing tips & best practices

Server

- Use "mongodb-memory-server" for Jest integration tests to isolate test DB and avoid state bleed
  Export an app factory (e.g., "createServer()" that returns an Express app without calling "listen()") — this makes Supertest straightforward.
- Keep database cleanup in "afterEach()" to drop collections between tests.

Client

- Test components with React Testing Library — prefer user-focused tests (user events and DOM assertions) over implementation details.
- Use MSW (Mock Service Worker) for network-level integration tests that behave like real network calls but deterministic.
- Test custom hooks with "@testing-library/react-hooks" or "renderHook".
- E2E

- For Cypress, seed test data or stub network calls with "cy.intercept()" to reduce flakiness.
- Run Cypress locally with "npx cypress open" to debug interactively; use "npx cypress run" in CI.

---

Debugging tips

Server

- Use Winston or "debug" package for structured logs.
- Attach a debugger with "node --inspect" and your editor (VSCode "launch.json") for breakpoints.
- Print stack traces in a centralized error handler during development.
  
  Client

- Use React DevTools and Redux DevTools.
- Enable source maps in dev ("devtool: 'source-map'") to get readable stack traces.
- Use an Error Boundary to capture and log render errors.

Tests

- Run tests in watch or verbose mode to isolate failures.
- For Jest, run a single test file: "jest path/to/testfile.test.js -i".
- For Cypress, run interactively ("cypress open") to watch commands and replay failures.
  
 Common pitfalls & fixes

- Flaky E2E tests: seed deterministic test data, avoid real network calls unless necessary, use "cy.intercept()" to stub.
- Coverage below threshold: add unit tests for small pure functions (utils, reducers, helpers) — easy coverage wins.
- Mongo download issues in CI: if "mongodb-memory-server" fails downloading, use a real MongoDB service in CI (the provided GitHub Actions uses the official mongo image).
- CORS / API URL issues in E2E: ensure client is pointed at the test server base URL ("CLIENT_BASE_URL" or "proxy" in client config


## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Basic understanding of testing concepts

## Testing Tools

- Jest: JavaScript testing framework
- React Testing Library: Testing utilities for React
- Supertest: HTTP assertions for API testing
- Cypress/Playwright: End-to-end testing framework
- MongoDB Memory Server: In-memory MongoDB for testing



## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Cypress Documentation](https://docs.cypress.io/)
- [MongoDB Testing Best Practices](https://www.mongodb.com/blog/post/mongodb-testing-best-practices) 
