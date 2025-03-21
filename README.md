# Orgo

Orgo is a SaaS product that helps you organize your life. With multi-language support and an integrated blog, Orgo is built to streamline planning, journaling, and daily management with a clean, modern design.

## Features

- **Multi-Language Support:**
  Provides pages in multiple languages (e.g., English, Arabic) with dynamic content and translations.

- **Blog:**
  Built-in blog featuring SEO-rich layouts, dynamic routing for posts, and an advanced content schema.

- **Modern Tech Stack:**
  - **Astro:** A modern static site generator for lightning-fast performance.
  - **TypeScript:** Ensures strong typing and improved developer experience.
  - **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
  - **Biome:** Fast and comprehensive code formatter & linter.
  - **OXC:** Super-fast linter for additional code quality checks.
  - **Commitlint & Lefthook:** Enforce commit message standards and run pre-commit/push hooks for code quality.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 16 or higher recommended)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MoIbrahim10/orgo.git
   cd orgo
   ```

2. Install dependencies:

   ```bash
   npm i
   ```

### Running the Project Locally

To run the development server:

```bash
npm run dev
```

This will start the Astro development server, and you can navigate to `http://localhost:4321` (or the specified port) to view your project.

## Development Workflow

- **Commitlint & Lefthook:**
  Ensure commit messages follow the Conventional Commit format with emojis. Lefthook automatically runs linters and formatters on staged files.

- **Biome & OXC:**
  Biome formats and lints your code, while OXC provides additional static analysis. Both are integrated into the development workflow (pre-commit, pre-push, and CI).

- **Stylelint:**
  Enforces best practices for CSS and Tailwind styles.

## Blog & Content Management

- Blog posts are managed in `src/content/blog/` with support for multiple languages (e.g., `src/content/blog/en/`, `src/content/blog/ar/`).
- Posts adhere to a structured schema with fields like title, author, publishDate, image, and SEO properties.
- Authors are stored centrally in JSON files under `src/data/authors/`.

## Deployment

This project uses GitHub Actions for Continuous Integration (CI). The CI workflow runs tests, lints, and commit message checks before merging pull requests. Deployment instructions (e.g., for Vercel, Netlify, or your preferred hosting) should be added based on your deployment process.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes with clear and conventional commit messages.
4. Push to your fork and open a pull request.

## License

[MIT License](LICENSE)

## Contact

For any questions or feedback, please contact [dev.mo.ibrahim@gmail.com](mailto:dev.mo.ibrahim@gmail.com).
