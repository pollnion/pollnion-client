# Claude Code Guidelines for Pollnion Client

This document contains guidelines and preferences for working with Claude Code on this project.

## Project Overview

**Pollnion Client** is a React Native mobile application built with Expo. The project uses:

- TypeScript for type safety
- Expo Router for file-based routing
- React Navigation for navigation
- Jest and React Testing Library for testing
- Prettier for code formatting
- ESLint for linting

## Development Setup

Before working with Claude Code:

```bash
npm install      # Install dependencies
npm run format   # Format code with Prettier
npm test         # Run tests to ensure everything works
```

## Key Directories

- `app/` - Main application screens and routes (file-based routing)
- `src/` - Reusable components, utilities, and logic
- `src/__tests__/` - Test files
- `scripts/` - Utility and build scripts

## Code Style Preferences

1. **Formatting**: Always run `npm run format` before submitting code
2. **Type Safety**: Use TypeScript types—avoid `any` unless absolutely necessary
3. **Comments**: Only add comments for non-obvious logic
4. **Naming**: Use camelCase for functions/variables, PascalCase for components
5. **Imports**: Organize imports: React → external libraries → local imports

## Working with Claude Code

### When Creating New Features

1. **Read existing code first** - Understand patterns and conventions
2. **Follow project structure** - Place components in `src/`, tests in `src/__tests__/`
3. **Write tests** - New components/functions should have corresponding tests
4. **Format and lint** - Run `npm run format` and `npm run lint` before finishing
5. **Verify tests pass** - Run `npm test` to ensure nothing breaks

### When Making Changes

- Use `Edit` tool for existing files
- Use `Read` tool to understand code before modifying
- Use `Glob` and `Grep` for searching
- Create focused commits with clear messages
- Don't over-engineer—keep solutions simple

## Testing

- Jest tests go in `src/__tests__/` with `.test.ts` or `.test.tsx` extensions
- Test file names should match component names: `Button.test.tsx` for `Button.tsx`
- Use React Testing Library for component tests
- Mock Expo modules as needed (see `jest.setup.js`)

## Common Tasks

### Add a New Component

1. Create the component file in `src/`
2. Write the component with TypeScript
3. Create a corresponding test file in `src/__tests__/`
4. Run `npm run format` and `npm run lint`
5. Verify tests pass with `npm test`

### Run Tests

```bash
npm test              # Run all tests once
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Format and Lint

```bash
npm run format       # Format all code
npm run format:check # Check if formatting is needed
npm run lint         # Check for linting errors
```

### Build and Run

```bash
npm start          # Start Expo dev server
npm run web        # Run on web
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
```

## Git Workflow

- Create feature branches from `main`: `git checkout -b feature/description`
- Make focused commits: `git commit -m "Add feature description"`
- Push to fork and create pull requests
- All PRs should have passing tests and lint checks

## Troubleshooting

### Tests failing after changes

- Check if new mocks are needed in `jest.setup.js`
- Ensure imports are correct (relative vs absolute paths)
- Run `npm run test:watch` for faster debugging

### Build errors

- Clear cache: `npm install` or `yarn install`
- Check TypeScript errors: `npm run lint`
- Verify all imports are correct

### Formatting issues

- Run `npm run format` to auto-fix most issues
- Check `.prettierrc` for formatting rules

## Important Notes

- **No force pushes** to main branch
- **Always test locally** before submitting changes
- **Follow TypeScript** strictly—use types for all variables and functions
- **Commit messages matter**—write clear, descriptive messages
- **Keep changes focused**—one feature or fix per PR

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Guide](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Testing Library](https://testing-library.com/react)
- [Jest Documentation](https://jestjs.io/)

---

Questions? Check the [README.md](./README.md) or [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.
