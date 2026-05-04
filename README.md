# Sales Dashboard

A basic sales dashboard built with Next.js, TypeScript, Tailwind CSS, and Recharts.

## What was added

- Created a `/dashboard` page in the App Router.
- Added an atomic component structure:
  - `src/components/atoms` for buttons, inputs, and stat cards.
  - `src/components/molecules` for chart controls.
  - `src/components/organisms` for the interactive sales chart.
  - `src/components/templates` for the dashboard layout.
- Added mocked sales data for 2024, 2023, and 2022 in `src/lib/sales-data.ts`.
- Added an API route at `/api/sales` that returns the sales data as JSON.
- Added Recharts bar, line, and pie chart views.
- Added a custom sales threshold input so users can filter months by minimum sales.
- Reworked the design of the dashboard to be much more modernized, mostly the layout from shadCN's `dashboard-01`.
- Removed the starter home page and converted the `/dashboard` to be the root page.
- Added a global theme along with theme toggling.
- Added a reset button for the sales treshhold.
- Added mock buttons for side-bar (empty for now).

## Data source note

The mock data is shaped after Kaggle retail and e-commerce sales datasets. A relevant Kaggle example is the E-commerce Orders and Sales Performance Dataset, which includes order dates from 2022 to 2024 plus sales, profit, category, and region fields:

https://www.kaggle.com/datasets/zahranusratt/e-commerce-orders-and-sales-performance-dataset

The project uses local mock data instead of downloading Kaggle files because Kaggle data downloads usually require authenticated API credentials. The internal `/api/sales` route keeps the app ready for a later real API integration.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

Dashboard route:

```text
http://localhost:3000/dashboard
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Recharts
- React
- shadCN
