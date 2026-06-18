<div align="center">

<img src="./src/assets/logo.png" alt="Human Capital Analytics Logo" width="160" style="border-radius: 24px; margin-bottom: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.3);"/>

# 📊 Human Capital Analytics | Client Application

**Enterprise-Grade React Dashboard, Real-Time Charting & Advanced Economics Analytics Platform**

[![React](https://img.shields.io/badge/React-19.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![MUI](https://img.shields.io/badge/Material--UI-9.0-0081CB?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-2.1-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.3-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://framer.com/motion/)

<br/>

[![Live Deployment](https://img.shields.io/badge/Live_Deployment-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://human-capital-project-sahoo-priyabr.vercel.app/)

> A highly performant client-side application designed to visualize consumer price indices, inflation trends, and macro-economic factors utilizing interactive charting, advanced filtering, and a state-of-the-art Glassmorphic & Neumorphic design system.

---

</div>

## 🏗️ Full-Stack Frontend System Architecture

The Human Capital Analytics frontend is a fully decoupled, enterprise-grade **React 19 + Vite 8** SPA. The diagram below illustrates the **complete frontend architecture** — from the browser render layer down to the backend API communication:

```mermaid
graph TB
    subgraph BROWSER["🌐 Browser — React 19 SPA (Port 5173)"]
        MAIN["⚛️ main.jsx\n(React DOM Root + Store Provider)"]
        APP["📱 App.jsx\n(React Router DOM v7 Routes)"]
    end

    subgraph ROUTING["🛡️ Route Guards (routes/)"]
        PUB["PublicRoute\n(Redirect if logged in)"]
        PRIV["PrivateRoute\n(Redirect if no JWT)"]
        ADMIN_ROUTE["AdminRoute\n(RBAC: admin only)"]
    end

    subgraph PAGES["📄 Page Layer (pages/)"]
        LOGIN["🔑 LoginPage"]
        REGISTER["📝 RegisterPage"]
        DASHBOARD["📊 DashboardPage"]
        DATAPAGE["📋 DataPage\n(Price Explorer)"]
        COUNTRY["🌍 CountryPage"]
        PROFILE["👤 ProfilePage"]
        ADMIN_PG["🛠️ AdminPage"]
        NOTFOUND["❌ NotFoundPage"]
    end

    subgraph LAYOUT["📐 Layout Layer (layouts/)"]
        MAINLAYOUT["MainLayout\n(Sidebar + Topbar + Outlet)"]
        AUTHLAYOUT["AuthLayout\n(Centered form wrapper)"]
    end

    subgraph COMPONENTS["🧱 Component Layer (components/)"]
        COMMON["common/\n(Buttons, Modals, Skeletons,\nAlerts, Badges)"]
        CHARTS["charts/\n(AreaChart, BarChart,\nLineChart, PieChart — Recharts)"]
        TABLES["tables/\n(DataGrid, Pagination,\nSortable Columns)"]
        FORMS["forms/\n(Formik + Yup Login,\nRegister, Profile forms)"]
    end

    subgraph STATE["🧠 State Layer — Redux Toolkit (store/ + features/)"]
        STORE["Redux Store\n(configureStore)"]
        AUTH_SLICE["authSlice\n(user, token, isAuthenticated)"]
        DATA_SLICE["dataSlice\n(prices, filters, pagination)"]
        UI_SLICE["uiSlice\n(theme, sidebar, loading)"]
        USER_SLICE["userSlice\n(admin user management)"]
    end

    subgraph HOOKS["🎣 Custom Hooks (hooks/)"]
        USE_AUTH["useAuth()\n(session + role checks)"]
        USE_FETCH["useFetch()\n(GET requests + refetch)"]
        USE_THEME["useTheme()\n(dark/light toggle)"]
    end

    subgraph CONTEXT["🎭 Context Layer (context/)"]
        THEME_CTX["ThemeContext\n(Tailwind .dark/.light sync\n+ MUI palette injection)"]
    end

    subgraph SERVICES["🔌 Service Layer (services/)"]
        AXIOS_INST["api.js\n(Axios Instance\nbaseURL: VITE_API_URL)"]
        REQ_INT["Request Interceptor\n(Inject Bearer token)"]
        RES_INT["Response Interceptor\n(Retry + 401 Auto-logout)"]
        LOCAL["localStorage.js\n(Token get/set/clear)"]
    end

    subgraph BACKEND["⚙️ Backend — Node.js Express (Port 5000)"]
        API_BACKEND["REST API /api/v1/\n(auth, prices, stats,\ncountries, indicators...)"]
    end

    MAIN --> APP
    APP --> ROUTING
    ROUTING --> PUB & PRIV & ADMIN_ROUTE
    PUB --> AUTHLAYOUT --> LOGIN & REGISTER
    PRIV --> MAINLAYOUT --> DASHBOARD & DATAPAGE & COUNTRY & PROFILE
    ADMIN_ROUTE --> MAINLAYOUT --> ADMIN_PG
    MAINLAYOUT --> COMPONENTS
    COMPONENTS --> COMMON & CHARTS & TABLES & FORMS
    PAGES --> STATE
    HOOKS --> STATE
    STATE --> STORE
    STORE --> AUTH_SLICE & DATA_SLICE & UI_SLICE & USER_SLICE
    STATE --> SERVICES
    SERVICES --> AXIOS_INST --> REQ_INT --> RES_INT
    AXIOS_INST --> LOCAL
    RES_INT --> API_BACKEND
    CONTEXT --> THEME_CTX

    classDef browser fill:#1e3a5f,stroke:#3b82f6,color:#fff
    classDef routing fill:#4c1d95,stroke:#8b5cf6,color:#fff
    classDef pages fill:#1e40af,stroke:#60a5fa,color:#fff
    classDef layout fill:#1d4ed8,stroke:#93c5fd,color:#fff
    classDef components fill:#5b21b6,stroke:#a78bfa,color:#fff
    classDef state fill:#7c2d12,stroke:#fb923c,color:#fff
    classDef hooks fill:#0f766e,stroke:#34d399,color:#fff
    classDef context fill:#854d0e,stroke:#fcd34d,color:#fff
    classDef services fill:#166534,stroke:#86efac,color:#fff
    classDef backend fill:#1e293b,stroke:#475569,color:#94a3b8

    class MAIN,APP browser
    class PUB,PRIV,ADMIN_ROUTE routing
    class LOGIN,REGISTER,DASHBOARD,DATAPAGE,COUNTRY,PROFILE,ADMIN_PG,NOTFOUND pages
    class MAINLAYOUT,AUTHLAYOUT layout
    class COMMON,CHARTS,TABLES,FORMS components
    class STORE,AUTH_SLICE,DATA_SLICE,UI_SLICE,USER_SLICE state
    class USE_AUTH,USE_FETCH,USE_THEME hooks
    class THEME_CTX context
    class AXIOS_INST,REQ_INT,RES_INT,LOCAL services
    class API_BACKEND backend
```

---

## 🎯 Component-Driven Layer Architecture

The frontend enforces strict **Separation of Concerns (SoC)** across 6 distinct layers, flowing from browser entry point down to the API:

```mermaid
graph LR
    subgraph L1["Layer 1: Entry"]
        ENTRY["⚛️ main.jsx\n(DOM Root + Providers)"]
    end
    subgraph L2["Layer 2: Routing"]
        ROUTE["🛣️ App.jsx + routes/\n(React Router v7 + Guards)"]
    end
    subgraph L3["Layer 3: Pages & Layouts"]
        VIEW["📄 pages/ + layouts/\n(Route-level views)"]
    end
    subgraph L4["Layer 4: Components"]
        COMP["🧱 components/\n(Atomic UI + Charts + Tables)"]
    end
    subgraph L5["Layer 5: State"]
        STATE["🧠 store/ + features/\n(Redux Toolkit Slices)"]
    end
    subgraph L6["Layer 6: Services"]
        SVC["🔌 services/api.js\n(Axios + Interceptors)"]
    end

    ENTRY --> ROUTE --> VIEW --> COMP --> STATE --> SVC

    classDef layer fill:#1e293b,stroke:#475569,color:#f8fafc
    class ENTRY,ROUTE,VIEW,COMP,STATE,SVC layer
```

---

## 🔄 Frontend Request Lifecycle Workflow

Every user interaction passes through **8 sequential stages** before the UI updates. This ensures predictable state, clean error handling, and optimized re-renders:

```mermaid
flowchart TD
    A["👆 Step 1: User Interaction\ne.g. Click 'Apply Filter' button"]:::step
    B["⚡ Step 2: React Event Handler\nComponent dispatches Redux thunk action"]:::react
    C["🧠 Step 3: Redux Thunk Dispatch\ncreateAsyncThunk → pending state set\nLoading spinner shown"]:::state
    D["🔌 Step 4: Axios Request Interceptor\nInject Bearer token from localStorage\nAttach Authorization header"]:::service
    E["🌐 Step 5: HTTP Request to Backend\nGET /api/v1/prices?page=1&sort=year\nExpress + JWT middleware validates"]:::network
    F["✅ Step 6: Response Interceptor\n200 OK → pass to Redux\n401 → auto-logout + redirect /login\n5xx → retry with exponential backoff"]:::service
    G["🧠 Step 7: Redux State Update\nfulfilled → update store slice\nrejected → set error message"]:::state
    H["⚛️ Step 8: React Re-render\nuseSelector detects state change\nComponent re-renders with new data"]:::react
    I["✅ UI Updated\nRecharts chart redraws\nData table repopulates\nToast notification shown"]:::success
    ERR["🚨 Error Boundary\nNetwork timeout → retry x2\n401 → clear token + /login redirect\n500 → show error toast"]:::error

    A --> B --> C --> D --> E --> F --> G --> H --> I
    D -.->|No token found| ERR
    F -.->|401 Unauthorized| ERR
    F -.->|5xx Server Error| ERR
    ERR -.->|Retry or Redirect| A

    classDef step fill:#1e40af,stroke:#3b82f6,color:#fff
    classDef react fill:#7c3aed,stroke:#a78bfa,color:#fff
    classDef state fill:#b45309,stroke:#fcd34d,color:#fff
    classDef service fill:#15803d,stroke:#4ade80,color:#fff
    classDef network fill:#0e7490,stroke:#67e8f9,color:#fff
    classDef success fill:#166534,stroke:#86efac,color:#fff
    classDef error fill:#9f1239,stroke:#fda4af,color:#fff
```

---

## 👤 User Journey & Page Navigation Flow

```mermaid
flowchart TD
    START(["🌐 User visits app"]):::entry
    AUTH{"🔐 Has valid\nJWT token?"}:::decision

    LOGIN["🔑 /login\nLoginPage\n(Formik + Yup form)"]:::public
    REGISTER["📝 /register\nRegisterPage\n(Formik + Yup form)"]:::public

    DASH["📊 /dashboard\nDashboard KPI Cards\n+ Area/Bar Charts"]:::private
    DATA["📋 /data\nPrice Explorer\nSortable + Paginated Grid"]:::private
    COUNTRY["🌍 /countries/:code\nCountry Profile\nHistorical Trend Charts"]:::private
    PROFILE["👤 /profile\nUser Profile Settings\nPassword & Avatar update"]:::private
    ADMIN["🛠️ /admin\nAdmin Panel\nUser Management (RBAC)"]:::admin

    RBAC{"👑 Role =\n'admin'?"}:::decision
    LOGOUT["🔓 Logout\nClear token + Redux\nRedirect /login"]:::action

    START --> AUTH
    AUTH -->|No| LOGIN
    AUTH -->|Yes| DASH
    LOGIN -->|Success| DASH
    LOGIN --> REGISTER
    REGISTER -->|Success| DASH
    DASH --> DATA & COUNTRY & PROFILE
    DASH --> RBAC
    RBAC -->|Yes| ADMIN
    RBAC -->|No| DASH
    PROFILE --> LOGOUT
    ADMIN --> LOGOUT

    classDef entry fill:#1e293b,stroke:#64748b,color:#94a3b8
    classDef decision fill:#854d0e,stroke:#f59e0b,color:#fff
    classDef public fill:#1e40af,stroke:#60a5fa,color:#fff
    classDef private fill:#15803d,stroke:#4ade80,color:#fff
    classDef admin fill:#9f1239,stroke:#fda4af,color:#fff
    classDef action fill:#4c1d95,stroke:#a78bfa,color:#fff
```

---

## 🔐 Authentication Workflow (Frontend)

```mermaid
sequenceDiagram
    autonumber
    participant User as 👆 User
    participant Form as 📝 Formik Form
    participant Redux as 🧠 Redux authSlice
    participant Axios as 🔌 Axios Instance
    participant API as ⚙️ Backend API
    participant Store as 💾 localStorage

    Note over User,Store: 🔓 Login Flow
    User->>Form: Enter email + password → Submit
    Form->>Form: Yup validates schema client-side
    Form->>Redux: dispatch(loginUser({ email, password }))
    Redux->>Axios: POST /api/v1/auth/login
    Axios->>API: HTTP POST with credentials
    API-->>Axios: 200 OK { token, user } + Set-Cookie
    Axios-->>Redux: Resolved with { token, user }
    Redux->>Store: localStorage.setItem('token', jwt)
    Redux->>Redux: Set state: isAuthenticated=true, user=payload
    Redux-->>Form: fulfilled → navigate('/dashboard')

    Note over User,Store: 🛡️ Auto Token Injection (every request)
    User->>Form: Navigates to /data page
    Form->>Redux: dispatch(fetchPrices(params))
    Redux->>Axios: GET /api/v1/prices
    Axios->>Store: localStorage.getItem('token')
    Store-->>Axios: Return JWT string
    Axios->>Axios: config.headers.Authorization = 'Bearer <jwt>'
    Axios->>API: Authenticated HTTP GET request
    API-->>Axios: 200 OK + paginated price data
    Axios-->>Redux: Resolve with data
    Redux-->>Form: Re-render table with new results

    Note over User,Store: 🚨 Session Expiry / 401 Handling
    API-->>Axios: 401 Unauthorized (token expired)
    Axios->>Store: localStorage.removeItem('token')
    Axios->>Redux: dispatch(logout()) → clear auth state
    Axios-->>User: Redirect to /login page
```

---

## 📈 Frontend UI & Business Workflow

The client application provides a highly visual, step-by-step data analysis journey for end-users:

```mermaid
graph LR
    A["🔑 Login\n/ RBAC Auth"] --> B["📊 Dashboard\nKPI Overview"]
    B --> C["🏷️ Select\nIndicator"]
    C --> D["🔍 Apply\nData Filters"]
    D --> E["🧠 Redux Thunk\nfetchPrices()"]
    E --> F["📈 Recharts\nRe-render"]
    F --> G["📤 Export\n& Share"]

    classDef default fill:#1e293b,stroke:#475569,stroke-width:1px,color:#f8fafc;
    classDef auth fill:#2563eb,stroke:#1d4ed8,stroke-width:2px,color:#fff;
    classDef view fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#fff;
    classDef state fill:#d97706,stroke:#b45309,stroke-width:2px,color:#fff;
    classDef success fill:#059669,stroke:#047857,stroke-width:2px,color:#fff;

    class A auth;
    class B,C,D view;
    class E state;
    class F,G success;
```

---

## 🌌 System Capabilities

| Module | Capability | Key Technologies |
| :--- | :--- | :--- |
| 🔐 **Enterprise Authentication** | JWT sessions, HTTP-only cookies, multi-level RBAC route guards | JWT, React Router, Redux |
| 📈 **Dashboard Viewports** | Real-time KPI cards, indicator counts, country volumes, interactive charts | Recharts, Redux, MUI |
| 📊 **Dynamic Data Explorer** | Server-side pagination, multi-column sorting, complex category filtering | Redux Toolkit, Axios |
| 🗺️ **Country Profiles** | Geo-economic tabs, historical index trends, growth indices, comparisons | Recharts, Redux |
| ⚙️ **Platform Configuration** | Credential updates, browser session tracking, user profile management | Formik, Yup, Redux |
| 🔄 **Comparative Analytics** | Side-by-side country comparisons, yearly trend overlays, distributions | Recharts, Axios |

---

## 🎨 Design System & Custom Components

The visual framework blends **Tailwind CSS** with **Material-UI (MUI)** to construct dark/light themes featuring Neumorphic elements:

### 1. Unified Theme Context (`context/ThemeContext.jsx`)
React context coordinates state between Redux UI settings and the HTML root element class list:
*   **Tailwind Mode**: Synchronizes `.dark` or `.light` selector state on the HTML root element:
    ```javascript
    useEffect(() => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(themeMode);
    }, [themeMode]);
    ```
*   **MUI Integration**: Injectable palettes that style text fields, panels, paper sheets, and modals dynamically depending on active state.

### 2. Micro-Interactions & Transitions
*   **Framer Motion**: Smooth spring animations (`type: "spring", stiffness: 120`) wrapping navigation transitions, cards, lists, and modal overlays to prevent layout shifts.
*   **Tactile Feedback**: Active neumorphic borders (`0 0 10px rgba(99,102,241,0.8)`) applied to status cards.

---

## 🧠 Central State Management (Redux Store)

We use **Redux Toolkit** to handle UI state, cached datasets, and server responses in a predictable single-source-of-truth container:

```mermaid
graph TD
    Store[Redux Global Store]
    Store --> AuthSlice[authSlice: User profile, session storage, authentication state]
    Store --> DataSlice[dataSlice: Dataset grid, totals count, analytics caching]
    Store --> UiSlice[uiSlice: Dark mode toggle, sidebar collapsed/expanded, user preferences]
    Store --> UserSlice[userSlice: Admin panel user listings and management operations]
```

### Redux Slice Breakdown & Key Thunks

| Slice | State Managed | Key Async Thunks |
| :--- | :--- | :--- |
| `authSlice.js` | User profile, JWT token, `isAuthenticated` flag | `loginUser`, `registerUser`, `fetchCurrentUser`, `logoutUser` |
| `dataSlice.js` | Price records, pagination state, sort/filter params | `fetchPrices`, `createPrice`, `updatePrice`, `deletePrice` |
| `uiSlice.js` | `sidebarOpen`, theme mode, loading indicators | N/A — synchronous reducers only |
| `userSlice.js` | Admin user list, role management | `fetchAllUsers`, `updateUserRole`, `deleteUser` |

---

## 🛡️ Input Validation & Form Schema

Forms are powered by **Formik** and validated client-side with **Yup** schemas:

| Field | Rule | Error Message |
| :--- | :--- | :--- |
| `name` | Min 2 characters, required | "Name must be at least 2 characters" |
| `email` | Valid email format, required | "Enter a valid email" |
| `password` | Min 8 chars + lowercase + uppercase + number | "Password must contain a lowercase/uppercase letter/number" |
| `role` | Enum: `user` \| `admin` (optional) | "Invalid role value" |

```javascript
const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[0-9]/, 'Password must contain a number')
    .required('Password is required'),
});
```

---

## 🎣 Custom React Hooks

| Hook | File | Usage | Returns |
| :--- | :--- | :--- | :--- |
| `useAuth()` | `hooks/useAuth.js` | Check session + RBAC role | `{ user, isAuthenticated, role }` |
| `useFetch()` | `hooks/useFetch.js` | Read-only GET requests | `{ data, loading, error, refetch }` |
| `useTheme()` | `hooks/useTheme.js` | Dark/light mode toggle | `{ themeMode, toggleTheme }` |

```javascript
// Example: useFetch in a component
const { data, loading, error, refetch } = useFetch('/stats/distribution');
```

| Return Value | Type | Description |
| :--- | :---: | :--- |
| `data` | `any` | Parsed backend JSON response payload |
| `loading` | `boolean` | `true` while network request is in-flight |
| `error` | `string \| null` | Error message on failure, `null` on success |
| `refetch()` | `function` | Manually re-triggers the GET request |

---

## 🛡️ Token Lifecycle & Axios Interceptors

All API communication flows through `services/api.js` with 3 automatic interceptor behaviors:

| # | Interceptor | Trigger | Action |
| :---: | :--- | :--- | :--- |
| 1 | **Bearer Token Injection** | Every outgoing request | Read `localStorage` → append `Authorization: Bearer <jwt>` header |
| 2 | **Exponential Backoff Retry** | 5xx server error response | Retry up to **2 times** with 1s → 2s progressive delay before failing |
| 3 | **Auto-Logout on 401** | `401 Unauthorized` response | Clear `localStorage` → `dispatch(logout())` → redirect to `/login` |

```javascript
// Request Interceptor — Token Injection
config.headers.Authorization = `Bearer ${token}`;

// Response Interceptor — 401 Auto-Logout
if (error.response?.status === 401) {
  localStorage.removeItem('token');
  store.dispatch(logout());
  window.location.href = '/login';
}
```

---

## 📐 Strict Architectural Principles

| Principle | Rule | Enforcement |
| :--- | :--- | :--- |
| **250-Line Limit** | No `.jsx`/`.js` file may exceed 250 lines | Extract sub-components into `/components` subdirectory |
| **Separation of Concerns** | Visual logic stays in views; state in Redux; API in services | Code review enforced |
| **Lean Components** | Components must not contain direct `axios` calls | All API calls via Redux thunks or `useFetch` hook |
| **Named Exports** | All components use named exports (no default export) | ESLint enforced |

---

## 📂 Folder & Component Blueprint

```text
frontend/
├── 🌍 public/                   # Static SEO assets, icons, and configuration files
├── 📂 src/
│   ├── 🖼️ assets/               # Branding assets, logo SVGs, and fallback illustrations
│   ├── 🧱 components/           # Reusable Atomic UI Architecture
│   │   ├── common/              # Global UI elements (Buttons, Skeleton Loaders, Modals)
│   │   ├── forms/               # Central Formik forms with Yup validators
│   │   ├── tables/              # Modular Data grids with sorting/pagination hooks
│   │   └── charts/              # Recharts wrapper templates (Area, Bar, and Line charts)
│   ├── 🎭 context/              # Global React context providers (Theme, UI settings)
│   ├── 🧠 features/             # Redux Slices coordinating state (Auth, Data, Users)
│   ├── 🎣 hooks/                # Custom React hooks encapsulating state logic (useAuth, useFetch)
│   ├── 📐 layouts/              # Parent wrappers establishing page grid structures
│   ├── 📄 pages/                # Route-level views containing page logic
│   ├── 🛡️ routes/               # Protected route gates and access-control boundaries
│   ├── 🔌 services/             # Axios connection wrappers, interceptors, and local storage utilities
│   ├── 🎨 styles/               # Global CSS files housing Tailwind directives
│   └── 🛠️ utils/                # Pure formatting and mathematics helper modules
```

---

## ⚡ Quick Start Guide

### 1️⃣ Dependencies Installation
Navigate to the root client folder and install required dependencies:
```bash
cd frontend
npm install
```

### 2️⃣ Environment Configuration
Create a `.env` file in the root of the `frontend/` directory:
```env
# URL pointer to the local Express server
VITE_API_URL=http://localhost:5000/api/v1

# Brand configuration
VITE_APP_NAME="Human Capital Analytics"
```

### 3️⃣ Running the App
Launch the Vite server locally with fast HMR:
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🕹️ Command Reference

| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs the local development server (Vite). |
| `npm run build` | Builds the optimized production bundle of static files in the `/dist` directory. |
| `npm run preview` | Locally serves the compiled production build to verify bundles. |
| `npm run lint` | Runs ESLint to check syntax styles and structural warnings. |
| `npm run format` | Runs Prettier to auto-format files inside `/src`. |

---

## 📜 License

Distributed under the **MIT License**. See [LICENSE](file:///c:/Users/priyabrata/Desktop/Human_Capital/human_capital_project_sahoo_priyabrata/LICENSE) for more details.

<p align="left">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white&color=10b981" alt="License: MIT" />
  </a>
</p>

---

## 👨‍💻 Developer & Author

<table align="center" style="border: none; background: transparent; border-collapse: collapse;">
  <tr style="background: transparent; border: none;">
    <td align="center" style="border: none; padding: 24px;">
      <a href="https://github.com/priyabratasahoo780">
        <img src="https://github.com/priyabratasahoo780.png" width="110" style="border-radius: 50%; border: 3px solid #ff6038; box-shadow: 0 10px 30px rgba(255,96,56,0.25);" alt="Priyabrata Sahoo" />
      </a>
      <br /><br />
      <strong style="font-size: 1.25rem; color: #f8fafc;">Priyabrata Sahoo</strong>
      <br />
      <span style="color: #94a3b8; font-size: 0.95rem;">Full-Stack Software Engineer & Platform Architect</span>
    </td>
  </tr>
  <tr style="background: transparent; border: none;">
    <td align="center" style="border: none; padding-bottom: 24px;">
      <a href="https://github.com/priyabratasahoo780" target="_blank">
        <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Profile" />
      </a>
      &nbsp;&nbsp;
      <a href="https://www.linkedin.com/in/priyabrata-sahoo/" target="_blank">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Profile" />
      </a>
    </td>
  </tr>
</table>

---

<div align="center">

<h3>🚀 Deciphering the world's data, one record at a time.</h3>

<br />

<a href="#-human-capital-analytics--client-application">
  <img src="https://img.shields.io/badge/Back_to_Top-ff6038?style=for-the-badge&logo=arrow-up&logoColor=white" alt="Back to Top" />
</a>

</div>
