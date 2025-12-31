🏮 Chinese Poetry Viewer
A serene, immersive reader for classical Chinese poetry built with Next.js 16 and SQLite. This project focuses on traditional aesthetics, utilizing horizontal layouts and classic calligraphy fonts to recreate the feeling of reading a physical scroll.

✨ Features
🔏 Calligraphic Typography: Fully integrated with Ma Shan Zheng (Script style) and Noto Serif SC (Songti style) to replicate traditional ink-on-paper aesthetics.

📂 Dynasty Catalog: Browse poems filtered by historical periods (Pre-Qin, Han, Tang, Song, etc.) using a dynamic dynasty sidebar.

🔍 High-Performance Search: Powered by SQLite Full-Text search, allowing millisecond-level querying across titles, authors, and content.

🎲 "Encounter" Mode: A dedicated shuffle button to randomly discover masterpieces from a database of thousands of poems.

⚡ Modern Architecture:

SQLite Engine: Replaced heavy JSON files with a database backend for instant page loads and minimal memory footprint.

Server Actions: Secure, server-side data fetching directly from the database.

Smooth Transitions: Elegant fade-in/out animations using Framer Motion.

🛠️ Tech Stack
Framework: Next.js 16 (App Router)

Build Tool: Turbopack

Styling: Tailwind CSS v4

Database: SQLite (via better-sqlite3)

Animations: Framer Motion

Icons: Lucide React

Fonts: Google Fonts (Ma Shan Zheng, Noto Serif SC)

🚀 Getting Started
1. Clone the Repository
Bash

git clone https://github.com/your-username/poetry-viewer.git
cd poetry-viewer
2. Install Dependencies
Bash

npm install
3. Database Setup
Ensure your poetry.db file is placed in the project root. If you are starting from JSON, run the Python conversion script included in the data processing folder.

4. Run Development Server
Bash

npm run dev
Open http://localhost:3000 to view the application.

📂 Project Structure
Plaintext

├── app/
│   ├── actions.ts       # Server Actions for DB queries
│   ├── layout.tsx      # Font injection & global theme
│   └── page.tsx        # Main UI & filtering logic
├── components/
│   └── PoetryCard.tsx  # Core typography & display component
├── lib/
│   └── db.ts           # SQLite connection singleton
└── poetry.db           # SQLite database file
📜 Data Source
Poetry data is derived from the chinese-poetry repository, the most comprehensive database of Chinese classical poetry.

📄 License
This project is licensed under the MIT License.