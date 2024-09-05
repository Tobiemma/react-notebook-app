# React Notebook App

A React-based notebook application allowing users to create, edit, delete, and manage notes. This application uses Vite for fast builds and testing is handled using Jest and React Testing Library.

## Features

- **Create Notes**: Add new notes with a title, content, creation date, and optional keywords.
- **Edit Notes**: Modify existing notes, including title, content, and creation date.
- **Delete Notes**: Remove notes from the list.
- **Mark Important**: Tag notes as important and filter them accordingly.
- **View Full Content**: Expand notes with lengthy content to view the full text.
- **Paginated Loading**: Load notes in a paginated manner or infinity scrolling.

## Getting started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (>=14.x.x)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (package managers)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Tobiemma/react-notebook-app.git

   cd react-notebook-app

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up JSON Server(for Mock API):**
   JSON Server will be used to simulate a backend API.

   ```bash
   npm install -g json-server
   ```

   Start JSON Server:

   ```bash
    json-server --watch db.json
   ```

   the will start the mock API on
   `http://localhost:3000`.

4. **Run the Development Server:**

   ```bash
   npm run dev
   ```

   this will start the Vite development server, and you can view the application at `http://localhost:5173`by default.
