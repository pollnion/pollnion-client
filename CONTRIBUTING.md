# Contributing to Pollnion Client

Thank you for your interest in contributing to Pollnion Client! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

Be respectful and professional in all interactions. We're committed to providing a welcoming and inclusive environment for all contributors.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. Install dependencies:
   ```bash
   npm install
   ```

## Development Workflow

### Before Starting

- Check existing issues and pull requests to avoid duplicate work
- For large changes, open an issue first to discuss your approach

### Making Changes

1. Create a new branch from `main`
2. Make your changes in small, focused commits
3. Follow the code style guidelines (see below)
4. Write or update tests for your changes
5. Ensure all tests pass locally

### Code Style Guidelines

This project uses **Prettier** for code formatting and **ESLint** for linting.

- **Format your code** before committing:
  ```bash
  npm run format
  ```

- **Check for linting errors**:
  ```bash
  npm run lint
  ```

- **TypeScript**: All code should be properly typed. Avoid using `any` unless absolutely necessary.

- **Naming conventions**:
  - Components: PascalCase (e.g., `UserProfile.tsx`)
  - Functions/variables: camelCase (e.g., `getUserData()`)
  - Constants: UPPER_SNAKE_CASE (e.g., `MAX_POLL_OPTIONS`)

### Testing

- Write tests for new features and bug fixes
- Tests should cover the happy path and edge cases
- Run tests locally before submitting:
  ```bash
  npm test
  ```

- Generate coverage report to identify untested code:
  ```bash
  npm run test:coverage
  ```

### Git Commit Messages

- Use clear, descriptive commit messages
- Start with a verb: "Add", "Fix", "Update", "Remove", "Refactor"
- Example: `Add polling validation logic` or `Fix navigation bug in results screen`
- Keep commits atomic and focused on a single change

## Submitting Changes

### Pull Request Process

1. Ensure your branch is up to date with `main`:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. Push your changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. Open a Pull Request with:
   - Clear title describing the change
   - Description explaining what and why
   - Reference to related issues (e.g., "Fixes #123")
   - Screenshots for UI changes

4. Ensure all checks pass:
   - Tests pass
   - No linting errors
   - Code is properly formatted

### PR Review Process

- At least one maintainer review is required
- Address feedback promptly
- Keep discussions professional and constructive
- PRs may be merged after approval and all checks passing

## Project Structure

- `app/` - Expo Router screens and navigation
- `src/` - Source code and components
- `src/__tests__/` - Test files
- `scripts/` - Utility scripts

## Questions or Need Help?

- Check the [README.md](./README.md) for setup and available commands
- Review existing issues and documentation
- Open a discussion or issue if you have questions

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

Thank you for contributing! 🙏
