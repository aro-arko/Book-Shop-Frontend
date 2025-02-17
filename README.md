# Book-Shop-Frontend

This project is a frontend application for a bookshop, built using React, TypeScript, and Vite.
To check the backend repository, visit: [https://github.com/aro-arko/Book-Shop-Server](https://github.com/aro-arko/Book-Shop-Server).


## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [ESLint Configuration](#eslint-configuration)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [Thank You](#thank-you)

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/bookshop-frontend.git
   cd bookshop-frontend
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open your browser and navigate to http://localhost:3000 to see the application running.


## Project Structure
The project structure is organized as follows:
```bookshop-frontend/
├── public/                     # Public assets
├── src/                        # Source files
│   ├── assets/                 # Static assets (images, fonts, etc.)
│   ├── components/             # Reusable components
│   │   ├── AdminDashboard/     # Components for the admin dashboard
│   │   ├── PublicDashboard/    # Components for the public dashboard
│   │   └── UserDashboard/      # Components for the user dashboard
│   ├── pages/                  # Page components
│   ├── redux/                  # Redux store and slices
│   ├── App.tsx                 # Main application component
│   ├── main.tsx                # Entry point for the application
│   └── index.css               # Global styles
├── .eslintrc.js                # ESLint configuration
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
└── package.json                # Project metadata and dependencies
```

## Available Scripts
In the project directory, you can run the following scripts:

- npm run dev: Starts the development server.
- npm run build: Builds the application for production.
- npm run preview: Previews the production build.
- npm run lint: Runs ESLint to check for linting errors.

```
// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
```


## Dependencies
The project relies on the following main dependencies:
- react: A JavaScript library for building user interfaces.
- react-dom: Provides DOM-specific methods for React.
- react-router-dom: Declarative routing for React.
- redux: A predictable state container for JavaScript apps.
- @reduxjs/toolkit: The official, recommended way to write Redux logic.
- typescript: A typed superset of JavaScript that compiles to plain JavaScript.
- vite: A fast build tool for modern web projects.

## Contributing
Contributions are welcome! If you have any suggestions or improvements, please create an issue or submit a pull request.
- Fork the repository.
- Create a new branch (git checkout -b feature-branch).
- Make your changes.
- Commit your changes (git commit -m 'Add some feature').
- Push to the branch (git push origin feature-branch).
- Open a pull request.

## Thank You
Thank you for checking out this project! If you have any questions or feedback, feel free to reach out.
