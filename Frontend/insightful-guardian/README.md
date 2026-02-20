# Insightful Guardian - Frontend

This React + Vite robust frontend application interfaces with the **Vega Backend**. It features real-time charts, modern UI element aesthetics (using Tailwind CSS + Framer Motion animations), and advanced ML risk data visualization.

## Key Screens
- **Login:** Allows registered teachers to access the platform.
- **Dashboard:** At-a-glance predictive overview outlining department-wise, multi-semester dropout trends via Recharts.
- **Students Table:** Comprehensive list of students, visual attendance/risk level progress tracking bars alongside a smooth-scrolling data table.
- **Add Student Risk Analyzer Form:** The registration portal designed to connect natively to the API `Backend/vega-back/data/students.csv`.

## Prerequisites

- **Node.js (v18+)**
- **npm (v9+)**

## Quick Start Development

1. **Clone the repository and enter the frontend directory:**
    ```bash
    cd Frontend/insightful-guardian
    ```

2. **Install all necessary Node modules:**
    ```bash
    npm install
    ```

3. **Link to the local API** (Optional):
The frontend currently defaults pointing HTTP requests to `http://localhost:8000`. You can change this base URL configuration in `src/utils/api.js`.

4. **Run the React + Vite dev server:**
    ```bash
    npm run dev
    ```

## Used Technologies
*   **React + Vite:** Ultra-fast bundling and module loading framework.
*   **Tailwind CSS:** Fully configurable UI token framework supporting dark styling and hover aesthetics.
*   **Framer Motion:** Micro-interactions and transition animation library.
*   **Lucide React:** Modern standard iconography library setup.
*   **Recharts:** Composable visualization library for the analytical graphs.
*   **React Router Dom (v6):** Inter-component logical routing paths.
